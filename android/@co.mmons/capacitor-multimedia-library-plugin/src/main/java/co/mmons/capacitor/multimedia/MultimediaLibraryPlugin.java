package co.mmons.capacitor.multimedia;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Environment;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;
import java.text.SimpleDateFormat;
import java.util.Date;

@NativePlugin(name = "MultimediaLibrary", requestCodes = {9800, 9801})
public class MultimediaLibraryPlugin extends Plugin {

    public void load() {
    }

    @PluginMethod
    public void saveImage(PluginCall call) {

        if (hasPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
            doSaveFile(call);
        } else {
            saveCall(call);
            pluginRequestPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE, 9800);
        }
    }

    @PluginMethod
    public void saveVideo(PluginCall call) {

        if (hasPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
            doSaveFile(call);
        } else {
            saveCall(call);
            pluginRequestPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE, 9801);
        }
    }

    private void doSaveFile(PluginCall call) {

        String inputPath = call.getString("file");
        if (inputPath == null) {
            call.reject("Input file path is required");
            return;
        }

        Uri inputUri = Uri.parse(inputPath);
        File inputFile = new File(inputUri.getPath());

        String album = call.getString("album");
        File albumDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        if (album != null) {
            albumDir = new File(albumDir, album);
        }

        try {
            File expFile = copyFile(inputFile, albumDir);
            scanPhoto(expFile);

            JSObject result = new JSObject();
            result.put("filePath", expFile.toString());
            call.resolve(result);

        } catch (RuntimeException e) {
            call.reject("RuntimeException occurred", e);
        }
    }

    private File copyFile (File inputFile, File albumDir) {

        // if destination folder does not exist, create it
        if (!albumDir.exists()) {
            if (!albumDir.mkdir()) {
                throw new RuntimeException("Destination folder does not exist and cannot be created.");
            }
        }

        String absolutePath = inputFile.getAbsolutePath();
        String extension = absolutePath.substring(absolutePath.lastIndexOf("."));

        // generate image file name using current date and time
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmssSSS").format(new Date());
        File newFile = new File(albumDir,"MEDIA_" + timeStamp + "." + extension);

        // Read and write image files
        FileChannel inChannel = null;
        FileChannel outChannel = null;

        try {
            inChannel = new FileInputStream(inputFile).getChannel();
        } catch (FileNotFoundException e) {
            throw new RuntimeException("Source file not found: " + inputFile + ", error: " + e.getMessage());
        }
        try {
            outChannel = new FileOutputStream(newFile).getChannel();
        } catch (FileNotFoundException e) {
            throw new RuntimeException("Copy file not found: " + newFile + ", error: " + e.getMessage());
        }

        try {
            inChannel.transferTo(0, inChannel.size(), outChannel);
        } catch (IOException e) {
            throw new RuntimeException("Error transfering file, error: " + e.getMessage());
        } finally {
            if (inChannel != null) {
                try {
                    inChannel.close();
                } catch (IOException e) {
                    Log.d("SaveImage", "Error closing input file channel: " + e.getMessage());
                    // does not harm, do nothing
                }
            }
            if (outChannel != null) {
                try {
                    outChannel.close();
                } catch (IOException e) {
                    Log.d("SaveImage", "Error closing output file channel: " + e.getMessage());
                    // does not harm, do nothing
                }
            }
        }

        return newFile;
    }

    /**
     * Invoke the system's media scanner to add your photo to the Media Provider's database,
     * making it available in the Android Gallery application and to other apps.
     *
     * @param imageFile The image file to be scanned by the media scanner
     */
    private void scanPhoto(File imageFile) {
        Intent mediaScanIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
        Uri contentUri = Uri.fromFile(imageFile);
        mediaScanIntent.setData(contentUri);
        bridge.getActivity().sendBroadcast(mediaScanIntent);
    }

    protected void handleRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.handleRequestPermissionsResult(requestCode, permissions, grantResults);

        if (savedLastCall == null) {
            Log.d(getLogTag(),"No stored plugin call for permissions request result");
            return;
        }

        for (int r : grantResults) {
            if (r == PackageManager.PERMISSION_DENIED) {
                Log.d(getLogTag(), "Permission not granted by the user");
                savedLastCall.reject("Permission denied");
                return;
            }
        }

        if (requestCode == 9800) {
            doSaveImage(savedLastCall);
        } else if (requestCode == 9801) {
            doSaveVideo(savedLastCall);
        }

        savedLastCall = null;
    }

}
