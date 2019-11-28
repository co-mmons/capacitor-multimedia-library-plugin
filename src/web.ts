import {WebPlugin} from "@capacitor/core";
import {MultimediaLibraryPlugin} from "./plugin";

export class MultimediaLibraryWebPlugin extends WebPlugin implements MultimediaLibraryPlugin {
	
	constructor() {
		super({name: "MultimediaLibrary", platforms: ["web"]});
	}
	
	saveImage(call: {file: string, album?: string}): Promise<{filePath: string}> {
		throw new Error("Method not implemented.");
	}

	saveVideo(call: {file: string, album?: string}): Promise<{filePath: string}> {
		throw new Error("Method not implemented.");
	}
}
