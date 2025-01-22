import React, { useState } from 'react'
import '../styles/searchComponent.css'
const emails = [
    {
      sender: "john.doe@example.com",
      recipient: "jane.smith@example.com",
      subject: "Meeting Reminder",
      folder: "inbox",
    },
    {
      sender: "jane.smith@example.com",
      recipient: "john.doe@example.com",
      subject: "Project Update",
      folder: "sent",
    },
    {
      sender: "mark.taylor@example.com",
      recipient: "john.doe@example.com",
      subject: "Invoice Details",
      folder: "inbox",
    },
  ];

const SearchComponent = () => {

    const [query, setQuery] = useState(""); // Tracks the search input
    const [results, setResults] = useState([]); // Stores filtered results
  
    // Automatically search when typing
    const handleInputChange = (e) => {
      const searchValue = e.target.value;
      setQuery(searchValue);
  
      // Perform the search only if input is not empty
      if (searchValue.trim() !== "") {
        const filtered = emails.filter((email) =>
          ["sender", "recipient", "subject", "folder"].some((key) =>
            email[key].toLowerCase().includes(searchValue.toLowerCase())
          )
        );
        setResults(filtered);
      } else {
        // Clear results when input is empty
        setResults([]);
      }
    };
  
    return (
        <div className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
        {/* <input type="search" className="form-control form-control-light text-bg-light" placeholder="Search..." aria-label="Search" /> */}
        <div className="search-container">
            {/* Search bar */}
            <input
              className="form-control search-input"
              type="text"
              placeholder="Search emails..."
              value={query}
              onChange={(e)=>handleInputChange(e)} // Trigger search on input change
            />

            {/* Search Results */}
            {results.length > 0 && (
              <div className="search-results">
                {results.map((result, index) => (
                  <div className="result-item" key={index}>
                    <p>
                      <strong>Subject:</strong> {result.subject}
                    </p>
                    <p>
                      <strong>Sender:</strong> {result.sender}
                    </p>
                    <p>
                      <strong>Recipient:</strong> {result.recipient}
                    </p>
                    <p>
                      <small>
                        <strong>Folder:</strong> {result.folder}
                      </small>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    )
}

export default SearchComponent