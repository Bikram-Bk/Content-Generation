import React, { useState } from "react";
import axios from "axios";

function App() {
  const [textField, setTextField] = useState(""); 
  const [response, setResponse] = useState(null); 
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const result = await axios.post("https://content-generation-server.onrender.com/api/generate", {
        textField,
      });
      setResponse(result.data); 
      setError(null); 
    } catch (err) {
      setError(err.response ? err.response.data.message : "Something went wrong");
      setResponse(null); 
    }
  };
  return (
    <div className='main'>
        <h2>Content Generation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter Input:</label>
          <input
            type="text"
            value={textField}
            onChange={(e) => setTextField(e.target.value)}
            placeholder="Enter text"
          />
        </div>
        <button type="submit">Generate Content</button>
      </form>

      {response && (
        <div className="response-box">
          <label className="content-title">Generated Content</label>
          <textarea
            value={`${response.content}`}
            readOnly
            rows={8}
          />
        </div>
      )}

      {error && (
        <div className="error">
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;



