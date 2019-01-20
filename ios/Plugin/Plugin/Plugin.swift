import Foundation
import Capacitor
import Photos.PHPhotoLibrary

@objc(CAPMultimediaLibraryPlugin)
public class CAPMultimediaLibraryPlugin: CAPPlugin {
    
    public override func load() {
        
    }
    
    @objc func saveImage(call: CAPPluginCall) {
        
        let status = PHPhotoLibrary.authorizationStatus();
        
        if (status == PHAuthorizationStatus.authorized) {
            doSaveImage(call: call);
            
        } else if (status == PHAuthorizationStatus.notDetermined) {
            
            PHPhotoLibrary.requestAuthorization {status in
                if (status == PHAuthorizationStatus.authorized) {
                    self.doSaveImage(call: call);
                } else {
                    self.rejectNotAuthorized(call: call);
                    return;
                }
            }
            
        } else {
            rejectNotAuthorized(call: call);
            return;
        }
        
    }
    
    func rejectNotAuthorized(call: CAPPluginCall) {
        call.reject("Not authorized to access multimedia library");
    }
    
    func doSaveImage(call: CAPPluginCall) {
        
        let inputPath = call.getString("file");
        if (inputPath == nil) {
            call.reject("Input file path must be given");
            return;
        }
        
        let inputImage = UIImage(contentsOfFile: inputPath!);
        
        let albumName = call.getString("album");
        if (albumName == nil) {
            call.reject("Destination album name must be given");
            return;
        }
        
        PHPhotoLibrary.saveImage(image: inputImage!, albumName: albumName!, completion: { imageAsset, error in
            if (imageAsset != nil) {
                
                var result: [String: Any] = [:];
                result["fileId"] = imageAsset?.burstIdentifier;
                
                imageAsset!.requestContentEditingInput(with: PHContentEditingInputRequestOptions()) { (input, _) in
                    result["filePath"] = input!.fullSizeImageURL;
                }
                
                call.resolve(result);
            } else {
                call.reject("Unknown error, image not saved in the library", error);
            }
        });
    }
}
