import Foundation
import Capacitor
import Photos.PHPhotoLibrary

@objc(CAPMultimediaLibraryPlugin)
public class CAPMultimediaLibraryPlugin: CAPPlugin {
    
    public override func load() {
        
    }
    
    @objc func save(call: CAPPluginCall) {
        
        let status = PHPhotoLibrary.authorizationStatus();
        
        if (status == PHAuthorizationStatus.authorized) {
            doSave(call: call);
            
        } else if (status == PHAuthorizationStatus.notDetermined) {
            
            PHPhotoLibrary.requestAuthorization {status in
                if (status == PHAuthorizationStatus.authorized) {
                    self.doSave(call: call);
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
    
    func doSave(call: CAPPluginCall) {
        
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
        
        PHPhotoLibrary.saveImage(image: inputImage!, albumName: albumName!, completion: { asset in
            <#code#>
        });
    }
}
