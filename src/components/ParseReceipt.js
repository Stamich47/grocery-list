import React, { useState } from "react";
import RenderTableRiteAid from "./RenderTableRiteAid";
import RenderShoppingItemRiteAid from "./RenderShoppingItemRiteAid";

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
    formData.append("isTable", true);
    formData.append("isOverlayRequired", false);

    try {
      const response = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      setParsedText(data.ParsedResults[0].ParsedText);
      setJsonResponse(data);
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <h1>Upload Receipt</h1>
      <form onSubmit={handleSubmit} className="d-inline-flex flex-column gap-2">
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {parsedText && <RenderShoppingItemRiteAid jsonResponse={jsonResponse} />}
    </div>
  );
}
