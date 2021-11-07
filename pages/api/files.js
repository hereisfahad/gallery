import fs from "fs";
import path from "path";

const getFiles = async (req, res) => {
    const dirRelativeToPublicFolder = 'upload'
    try {
        const dir = path.join(process.cwd(), './public', dirRelativeToPublicFolder);
        const fileNames = fs.readdirSync(dir);
        const files = fileNames.map(name => path.join('/', dirRelativeToPublicFolder, name))
        return res.status(201).send(files);
    } catch (error) {
        return res.status(404).send(error);
    }
};


export default (req, res) => {
    req.method === "POST"
        ? console.log("PUT")
        : req.method === "PUT"
            ? console.log("PUT")
            : req.method === "DELETE"
                ? console.log("DELETE")
                : req.method === "GET"
                    ? getFiles(req, res)
                    : res.status(404).send("");
};
