import {dirname, isAbsolute, join} from "node:path";
import {promises} from "node:fs";

export class FileService {
    private async isExist(path: string): Promise<boolean> {
        try {
            await promises.stat(path);
            return true;
        } catch {
            return false;
        }
    }

    public getFilePath(path: string, name: string, ext: string): string {
        if (!isAbsolute(path)) {
            path = join(__dirname + "/" + path);
        }
        return join(dirname(path) + "/" + name + "." + ext);
    }

    public async deleteFileIfExists(path: string): Promise<void> {
        if (await this.isExist(path)) {
            await promises.unlink(path);
        }
    }
}