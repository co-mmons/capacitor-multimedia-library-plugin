import { Capacitor, Plugins } from "@capacitor/core";
import { MultimediaLibraryWebPlugin } from "./web";
export * from "./plugin";
export * from "./web";
let pluginInstance;
if (!pluginInstance) {
    pluginInstance = Capacitor.platform == "web" ? new MultimediaLibraryWebPlugin() : Plugins.MultimediaLibrary;
}
export { pluginInstance as MultimediaLibrary };
//# sourceMappingURL=index.js.map