#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(CAPMultimediaLibraryPlugin, "MultimediaLibrary",
    CAP_PLUGIN_METHOD(save, CAPPluginReturnPromise);
)
