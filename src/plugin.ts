import {Plugins} from "@capacitor/core";

declare global {
    interface PluginRegistry {
        MultimediaLibrary?: MultimediaLibraryPlugin;
    }
}

export interface MultimediaLibraryPlugin {
    save(call: {file: string, album?: string}): Promise<{newFile: string}>;
}

export namespace MultimediaLibraryPlugin {

    export async function save(file: string, album?: string): Promise<string> {
        let newFile = await Plugins.MultimediaLibrary.save({file: file, album: album});
        return newFile.newFile;
    }

}