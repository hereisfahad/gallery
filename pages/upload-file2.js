import React from "react";

export default function ImageUploader() {
  function onSubmit(event) {
    event.preventDefault()

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
      <input type="file" multiple />
      <button type="submit">Submit</button>
    </form>
  );
}
