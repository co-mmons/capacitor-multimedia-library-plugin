import { FirebaseMessagingPlugin } from "./plugin";
export * from "./notifications-permission-state";
export * from "./plugin";
export * from "./web";
export * from "./remote-message";
declare var pluginInstance: FirebaseMessagingPlugin;
export { pluginInstance as FirebaseMessaging };
