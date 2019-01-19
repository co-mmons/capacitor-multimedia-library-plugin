var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Plugins } from "@capacitor/core";
export var FirebaseMessagingPlugin;
(function (FirebaseMessagingPlugin) {
    /**
     * Open permission settings for current app. On iOS it will open settings related to system notifications,
     * on android it will open "about app" view, where the user will be able to grant system notifications.
     */
    function openNotificationsPermissionSettings() {
        Plugins.FirebaseMessaging.openNotificationsPermissionSettings();
    }
    FirebaseMessagingPlugin.openNotificationsPermissionSettings = openNotificationsPermissionSettings;
    /**
     * Returns state of permission for system notifications (not only push, local as well).
     *
     * @return On Android only `NotificationsPermissionState.granted` and `NotificationsPermissionState.denied`.
     */
    function notificationsPermissionState() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield Plugins.FirebaseMessaging.notificationsPermissionState();
            return result.state;
        });
    }
    FirebaseMessagingPlugin.notificationsPermissionState = notificationsPermissionState;
    /**
     * Subscribes to topic.
     * @param topic The name of the topic to subscribe. Must match the following regular expression: "[a-zA-Z0-9-_.~%]{1,900}".
     * @return A promise, which is resolved when subscription successful, rejects other case.
     * @see https://firebase.google.com/docs/reference/android/com/google/firebase/messaging/FirebaseMessaging.html#subscribeToTopic(java.lang.String)
     */
    function subscribeToTopic(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Plugins.FirebaseMessaging.subscribeToTopic({ topic: topic });
        });
    }
    FirebaseMessagingPlugin.subscribeToTopic = subscribeToTopic;
    /**
     * Unsubscribes from topic.
     * @param topic The name of the topic to subscribe. Must match the following regular expression: "[a-zA-Z0-9-_.~%]{1,900}".
     * @return A promise, which is resolved when unsubscription successful, rejects other case.
     * @see https://firebase.google.com/docs/reference/android/com/google/firebase/messaging/FirebaseMessaging.html#unsubscribeFromTopic(java.lang.String)
     */
    function unsubscribeFromTopic(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Plugins.FirebaseMessaging.unsubscribeFromTopic({ topic: topic });
        });
    }
    FirebaseMessagingPlugin.unsubscribeFromTopic = unsubscribeFromTopic;
    /**
     * Delete the firebase instance (so it applies for other firebase components, e.g. Analytics or Firestore) and the data associated with it.
     * This stops the periodic sending of data to the Firebase backend started when the instance was generated, unless
     * another library that requires instance (like FCM, RemoteConfig or Analytics) is used or it's configured to be executed automatically.
     *
     * @return A promise, which is resolved when destroy successful, rejects other case.
     */
    function destroy() {
        return Plugins.FirebaseMessaging.destroy();
    }
    FirebaseMessagingPlugin.destroy = destroy;
    /**
     *
     * @param eventName
     * @param listener
     */
    function addListener(eventName, listener) {
        return Plugins.FirebaseMessaging.addListener(eventName, listener);
    }
    FirebaseMessagingPlugin.addListener = addListener;
})(FirebaseMessagingPlugin || (FirebaseMessagingPlugin = {}));
//# sourceMappingURL=plugin.js.map