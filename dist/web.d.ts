import { WebPlugin } from "@capacitor/core";
import { MultimediaLibraryPlugin } from "./plugin";
export declare class MultimediaLibraryWebPlugin extends WebPlugin implements MultimediaLibraryPlugin {
    constructor();
    saveImage(call: {
        file: string;
        album?: string;
    }): Promise<{
        filePath: string;
    }>;
}
