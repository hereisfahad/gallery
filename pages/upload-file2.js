import React from "react";
import { useRef } from "react";

export default function ImageUploader() {
  const fileInputRef = useRef();

  function onSubmit(event) {
    event.preventDefault()

    const files = fileInputRef.current.files;
    const body = new FormData();

    for (let index = 0; index <= files.length; index++) {
      const element = files[index];
      body.append('file', element)
    }

    fetch("/api/upload2", {
      method: "POST",
      body
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <input ref={fileInputRef} type="file" multiple />
      <button type="submit">Submit</button>
    </form>
  );
}
