import {Plugins} from "@capacitor/core";

declare global {
    interface PluginRegistry {
        MultimediaLibrary?: MultimediaLibraryPlugin;
    }
}

export interface MultimediaLibraryPlugin {
    saveImage(call: {file: string, album?: string}): Promise<{filePath: string}>;
    saveVideo(call: {file: string, album?: string}): Promise<{filePath: string}>;
}

export namespace MultimediaLibraryPlugin {

    export async function saveImage(file: string, album?: string): Promise<{filePath: string}> {
        return await Plugins.MultimediaLibrary.saveImage({file: file, album: album});
    }

    export async function saveVideo(file: string, album?: string): Promise<{filePath: string}> {
        return await Plugins.MultimediaLibrary.saveVideo({file: file, album: album});
    }
}
