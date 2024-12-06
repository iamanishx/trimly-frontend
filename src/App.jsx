import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [view, setView] = useState("input"); // 'input' or 'result'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}`,
        { url }
      );
      setShortUrl(response.data.shortUrl);
      setView("result");  
    } catch (error) {
      console.error("Error shortening the URL:", error.response || error.message);
      alert(error.response?.data?.error || "Failed to shorten URL. Please try again.");
    }
  };

  const handleBack = () => {
    setView("input");  
    setUrl("");  
    setShortUrl("");  
  };

  return (
    <div className="container">
      {view === "input" && (
        <div className="shortener-box">
          <h1>Trim your URL:</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="url"
              placeholder="Enter URL to Trim"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button type="submit">TRIM</button>
          </form>
        </div>
      )}

      {view === "result" && (
        <div className="result-box">
          <button className="back-button" onClick={handleBack}>
            &#8592; Back
          </button>
          <h3>Trimmed URL:</h3>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
