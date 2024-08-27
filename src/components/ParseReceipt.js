import React, { useState } from "react";

export default function ParseReceipt() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedText, setParsedText] = useState("");
  const [jsonResponse, setJsonResponse] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("apikey", process.env.REACT_APP_OCR_SPACE_API_KEY);
    formData.append("file", selectedFile);
    formData.append("detectOrientation", true);
    formData.append("scale", true);
    formData.append("OCREngine", "2");
    // formData.append("isTable", true);

    try {
      const response = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      setParsedText(data.ParsedResults[0].ParsedText);
      setJsonResponse(data);
      console.log(formData);
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  return (
    <div>
      <h1>Upload Receipt</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {parsedText && (
        <div className="d-flex flex-column align-items-center">
          <h2>Parsed Text</h2>
          <pre>{parsedText}</pre>
        </div>
      )}
      <h2>JSON Response</h2>
      <pre>{JSON.stringify(jsonResponse, null, 2)}</pre>
    </div>
  );
}
