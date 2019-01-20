declare global {
    interface PluginRegistry {
        MultimediaLibrary?: MultimediaLibraryPlugin;
    }
}
export interface MultimediaLibraryPlugin {
    saveImage(call: {
        file: string;
        album?: string;
    }): Promise<{
        filePath: string;
    }>;
}
export declare namespace MultimediaLibraryPlugin {
    function save(file: string, album?: string): Promise<{
        filePath: string;
    }>;
}
