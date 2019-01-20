import { Capacitor, Plugins } from "@capacitor/core";
import { MultimediaLibraryWebPlugin } from "./web";
export * from "./plugin";
export * from "./web";
export { pluginInstance as MultimediaLibrary };
var pluginInstance;
if (!pluginInstance) {
    pluginInstance = Capacitor.platform == "web" ? new MultimediaLibraryWebPlugin() : Plugins.MultimediaLibrary;
}
//# sourceMappingURL=index.js.map