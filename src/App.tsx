import React, { useEffect, useState } from "react";
import FileDropper from './components/FileDropper';
import axios from "axios";
import Spinner from "./components/Spinner";
import TextBox from "./components/TextBox";
import TextArea from "./components/TextArea";
import logo from './assets/VectorCVLogo.png'

type pdfType = {
  name: string,
  url: string
}

function App() {
  const [files, setFiles] = useState<pdfType[]>([]);
  const [candidatesData, setCandidatesData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [query, setQuery] = useState<string>("");

  const handleUpload = async () => {
    setLoading(true)
    if (files.length === 0) {
      alert("Please select files to upload.");
      return;
    }
  
    const formData = new FormData();

    formData.append("query", query)
  
    // Create an array of promises to fetch and append files
    const fetchAndAppendPromises = files.map(async (file) => {
      const response = await fetch(file.url);
      const pdfBlob = await response.blob();
      console.log(pdfBlob, file.name);
      formData.append('pdfFile', pdfBlob, file.name);
    });

    // Wait for all promises to resolve
    await Promise.all(fetchAndAppendPromises);

    //console.log(formData);
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/upload-pdf", formData);
      console.log("PDF files uploaded successfully!", response.data);
      setCandidatesData(response.data);
      setFiles([]);
    } catch (error) {
      console.error("Error uploading PDF files:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="bg-gray-800 h-screen w-full">
        <div className="w-full flex flex-col items-center justify-center gap-5 text-white">
          <img src={logo} alt="" height={20} />
          {loading === false && !candidatesData ? <><p>V-CV will determine the best candidates for the job based on your ideal position</p>
          <p className='font-bold'>Drag & Drop CV's from potential candidates.</p>
          <div className="mt-5">
            <FileDropper files={files} setFiles={setFiles} />
          </div>
          {files.length > 0 ? files.map((file, id) => {
            return (
              <div key={id}>
                <h1>File Name: <a className="text-blue-400 font-bold underline" href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a></h1>
              </div>
            )
          }) : <h1>Add Some Files (.pdf)</h1>}
            <div className=" w-[500px]">
              <TextArea setQuery={setQuery} />
            </div>
            <button onClick={handleUpload} className="bg-green-400 rounded-md px-6 py-2 border-2 border-green-600 font-semibold text-green-600">Confirm</button></> : loading === true && !candidatesData ? <Spinner /> : loading === false && candidatesData ? <TextBox text={candidatesData} /> : null}
        </div>
      </div>
    </>
  )
}

export default App;
