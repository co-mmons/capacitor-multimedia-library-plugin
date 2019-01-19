import {WebPlugin} from "@capacitor/core";
import {MultimediaLibraryPlugin} from "./plugin";

export class MultimediaLibraryWebPlugin extends WebPlugin implements MultimediaLibraryPlugin {
	
	constructor() {
		super({name: "MultimediaLibrary", platforms: ["web"]});
	}
	
	save(call: {file: string, album?: string}): Promise<{newFile: string}> {
		throw new Error("Method not implemented.");
	}
	
}
