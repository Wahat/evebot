import fs from "fs";

export namespace FileUtils {
    export function openJsonFile(filePath: string): object {
        if (!fs.existsSync(filePath)) {
            return {}
        }
        let rawdata = fs.readFileSync(filePath);
        // @ts-ignore
        return JSON.parse(rawdata)
    }

    export function deleteFile(filePath: string, sync:boolean = true, callback=()=>{}) {
        if (sync) {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }
        } else {
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, callback)
            }
        }
    }
}
