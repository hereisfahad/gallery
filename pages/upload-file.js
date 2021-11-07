import { useState } from "react";
import useSWR from 'swr';

export default function Gallery() {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: uploadedFiles } = useSWR('/api/files', fetcher);
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);

    const uploadToClient = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setCreateObjectURL(URL.createObjectURL(file));
        }
    };

    const uploadToServer = async () => {
        const body = new FormData();
        body.append("file", image);
        const response = await fetch("/api/upload", {
            method: "POST",
            body
        });
        console.log(response)
    };

    return (
        <div>
            <div>
                <img src={createObjectURL} width="100px" height="100px" />
                <h4>Select Image</h4>
                <input type="file" name="myImage" onChange={uploadToClient} />
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={uploadToServer}
                >
                    Send to server
                </button>
            </div>

            <main>
                <h1>Images read from API route: </h1>
                {!uploadedFiles && "Loading..."}
                <div style={{
                    display: "flex",
                    placeContent: "space-evenly",
                    flexWrap: "wrap",
                    alignContent: "center",
                    justifyContent: "space-evenly",
                    alignItems: "center"
                }}
                >
                    {uploadedFiles && uploadedFiles.map(imgPath => <img key={imgPath} src={imgPath} alt="" width="100px" height="100px" />)
                    }
                </div>
            </main>
        </div>
    );
}
