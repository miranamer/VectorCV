import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "PDF"];

type pdfType = {
    name: string,
    url: string
}

type propTypes = {
  files: pdfType[]
  setFiles: React.Dispatch<React.SetStateAction<pdfType[]>>;
};

function FileDropper({ files, setFiles }: propTypes) {

  const handleChange = (file: File) => {
    console.log(file);

    // Create a URL for the uploaded file
    const fileURL = URL.createObjectURL(file);

    // Create a new object that includes the file and its URL
    const newFileObject: pdfType = {
      name: file.name,
      url: fileURL,
    };

    // Create a new array by spreading the existing selectedFiles and adding the new file object
    const newFiles = [...files, newFileObject];
    setFiles(newFiles);
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    </div>
  );
}

export default FileDropper;