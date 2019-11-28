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
    saveVideo(call: {
        file: string;
        album?: string;
    }): Promise<{
        filePath: string;
    }>;
}
export declare namespace MultimediaLibraryPlugin {
    function saveImage(file: string, album?: string): Promise<{
        filePath: string;
    }>;
    function saveVideo(file: string, album?: string): Promise<{
        filePath: string;
    }>;
}
