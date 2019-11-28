import {Capacitor, Plugins} from "@capacitor/core";
import {MultimediaLibraryPlugin} from "./plugin";
import {MultimediaLibraryWebPlugin} from "./web";

export * from "./plugin";
export * from "./web";

let pluginInstance: MultimediaLibraryPlugin;
if (!pluginInstance) {
    pluginInstance = Capacitor.platform == "web" ? new MultimediaLibraryWebPlugin() : Plugins.MultimediaLibrary as MultimediaLibraryPlugin;
}

export {pluginInstance as MultimediaLibrary};
