import {FirebaseMessagingPlugin} from "./plugin";
import {Capacitor, Plugins} from "@capacitor/core";
import {FirebaseMessagingWebPlugin} from "./web";

export * from "./notifications-permission-state";
export * from "./plugin";
export * from "./web";
export * from "./remote-message";

var pluginInstance: FirebaseMessagingPlugin;
if (!pluginInstance) {
    pluginInstance = Capacitor.platform == "web" ? new FirebaseMessagingWebPlugin() : Plugins.FirebaseMessaging;
}

export {pluginInstance as FirebaseMessaging};