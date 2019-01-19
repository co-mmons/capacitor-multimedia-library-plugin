import { Capacitor, Plugins } from "@capacitor/core";
import { FirebaseMessagingWebPlugin } from "./web";
export * from "./notifications-permission-state";
export * from "./plugin";
export * from "./web";
var pluginInstance;
if (!pluginInstance) {
    pluginInstance = Capacitor.platform == "web" ? new FirebaseMessagingWebPlugin() : Plugins.FirebaseMessaging;
}
export { pluginInstance as FirebaseMessaging };
//# sourceMappingURL=index.js.map