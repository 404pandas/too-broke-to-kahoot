import React, { useState } from "react";
import { createUserFile } from "../../api/ticketAPI"; // Adjust path as necessary
import xlsx from "xlsx"; // Ensure you have xlsx installed
import "../../assets/css/landing.css"; // Optional: for styling

export interface LandingProps {}

export function Landing(props: LandingProps) {
  const [jsonData, setJsonData] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonData(e.target.value);
  };

  const handleUpload = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const text = event.target?.result as string;
        await convertAndDownload(text);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a JSON file or paste JSON data.");
    }
  };

  const convertAndDownload = async (data: string) => {
    setLoading(true);
    try {
      const jsonData = JSON.parse(data);
      const xlsxData = convertToXlsx(jsonData);

      // Assuming `createUserFile` sends the data to the server and returns a link
      const response = await createUserFile(xlsxData);
      setDownloadLink(response.downloadUrl || ""); // Adjust as needed
    } catch (error) {
      console.error("Error converting JSON to XLSX:", error);
      alert("Error processing your request.");
    } finally {
      setLoading(false);
    }
  };

  const convertToXlsx = (data: any) => {
    // Convert data to the required format for XLSX
    return data; // Adjust this as necessary
  };

  return (
    <div className='app-container'>
      <h1>Upload JSON and Convert to XLSX</h1>
      <div className='upload-section'>
        <input type='file' accept='.json' onChange={handleFileChange} />
        <textarea
          placeholder='Paste your JSON data here...'
          value={jsonData}
          onChange={handleJsonChange}
        />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Processing..." : "Convert to XLSX"}
        </button>
      </div>
      {loading && <div className='spinner'>Loading...</div>}
      {downloadLink && (
        <div className='download-section'>
          <a href={downloadLink} download='quiz_data.xlsx'>
            Download XLSX
          </a>
        </div>
      )}
    </div>
  );
}
