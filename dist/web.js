import { WebPlugin } from "@capacitor/core";
export class MultimediaLibraryWebPlugin extends WebPlugin {
    constructor() {
        super({ name: "MultimediaLibrary", platforms: ["web"] });
    }
    saveImage(call) {
        throw new Error("Method not implemented.");
    }
    saveVideo(call) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=web.js.map