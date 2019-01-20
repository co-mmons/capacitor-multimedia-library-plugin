import {Capacitor, Plugins} from "@capacitor/core";
import {MultimediaLibraryPlugin} from "./plugin";
import {MultimediaLibraryWebPlugin} from "./web";

export * from "./plugin";
export * from "./web";
export {pluginInstance as MultimediaLibrary};

var pluginInstance: MultimediaLibraryPlugin;
if (!pluginInstance) {
    pluginInstance = Capacitor.platform == "web" ? new MultimediaLibraryWebPlugin() : Plugins.MultimediaLibrary;
}