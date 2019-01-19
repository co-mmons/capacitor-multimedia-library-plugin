import Photos.PHPhotoLibrary
import Photos.PHAsset

// https://gist.github.com/ricardopereira/636ccd0a3c8a327c43d42e7cbca4d041
extension PHPhotoLibrary {
    
    typealias PhotoAsset = PHAsset
    typealias PhotoAlbum = PHAssetCollection
    
    static func saveImage(image: UIImage, albumName: String, completion: @escaping (PHAsset?, Error) -> ()) {
        
        if let album = self.findAlbum(albumName: albumName) {
            saveImage(image: image, album: album, completion: completion);
            return;
        }
        
        createAlbum(albumName: albumName) { album in
            if let album = album {
                self.saveImage(image: image, album: album, completion: completion);
            }
            else {
                assert(false, "Album is nil");
            }
        }
    }
    
    static private func saveImage(image: UIImage, album: PhotoAlbum, completion: @escaping (PHAsset?, Error)->()) {
        
        var placeholder: PHObjectPlaceholder?
        
        PHPhotoLibrary.shared().performChanges({
            
            // request creating an asset from the image
            let createAssetRequest = PHAssetChangeRequest.creationRequestForAsset(from: image);
            
            // request editing the album
            guard let albumChangeRequest = PHAssetCollectionChangeRequest(for: album) else {
                assert(false, "Album change request failed");
                return;
            }
            
            // get a placeholder for the new asset and add it to the album editing request
            guard let photoPlaceholder = createAssetRequest.placeholderForCreatedAsset else {
                assert(false, "Placeholder is nil");
                return;
            }
            
            placeholder = photoPlaceholder;
            
            albumChangeRequest.addAssets([photoPlaceholder] as NSFastEnumeration);
            
        }, completionHandler: { success, error in
            
            guard let placeholder = placeholder else {
                assert(false, "Placeholder is nil");
                completion(nil, );
                return;
            }
            
            if success {
                let assets = PHAsset.fetchAssets(withLocalIdentifiers: [placeholder.localIdentifier], options: nil);
                completion(assets[0]);
            } else {
                print(error ?? "Unknow error, when adding file to multimedia library");
                completion(nil);
            }
        })
    }
    
    static func findAlbum(albumName: String) -> PhotoAlbum? {
        
        let fetchOptions = PHFetchOptions();
        fetchOptions.predicate = NSPredicate(format: "title = %@", albumName);
        
        let fetchResult = PHAssetCollection.fetchAssetCollections(with: .album, subtype: .albumRegular, options: fetchOptions);
        
        guard let photoAlbum = fetchResult.firstObject else {
            return nil;
        }
        
        return photoAlbum;
    }
    
    static func createAlbum(albumName: String, completion: @escaping (PhotoAlbum?)->()) {
        
        var albumPlaceholder: PHObjectPlaceholder?;
        
        PHPhotoLibrary.shared().performChanges({
            
            // request creating an album with parameter name
            let createAlbumRequest = PHAssetCollectionChangeRequest.creationRequestForAssetCollection(withTitle: albumName);
            
            // get a placeholder for the new album
            albumPlaceholder = createAlbumRequest.placeholderForCreatedAssetCollection;
        }, completionHandler: { success, error in
            
            guard let placeholder = albumPlaceholder else {
                assert(false, "Album placeholder is nil");
                completion(nil);
                return;
            }
            
            let fetchResult = PHAssetCollection.fetchAssetCollections(withLocalIdentifiers: [placeholder.localIdentifier], options: nil);
            
            guard let album = fetchResult.firstObject else {
                assert(false, "FetchResult has no PHAssetCollection");
                completion(nil);
                return;
            }
            
            if success {
                completion(album);
            } else {
                print(error ?? "Unknown error when creating multimedia album");
                completion(nil);
            }
        })
    }
    
}
