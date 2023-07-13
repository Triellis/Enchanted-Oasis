import React, { useState } from "react";

const FileUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("pic", file);
      formData.append("name", "test");

      try {
        const response = await fetch("/api/test", {
          method: "POST",
          body: formData,
        });
        const json = await response.json();
        console.log(json);
        if (response.ok) {
          // File successfully uploaded
          console.log("File uploaded successfully");
        } else {
          // Handle error response
          console.error("Error uploading file");
        }
      } catch (error) {
        // Handle network or fetch error
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default FileUploader;
