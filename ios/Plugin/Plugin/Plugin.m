#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(CAPMultimediaLibraryPlugin, "MultimediaLibrary",
    CAP_PLUGIN_METHOD(saveImage, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(saveVideo, CAPPluginReturnPromise);
)
