// import React, { useState } from 'react'
// import '../styles/searchComponent.css'
// const emails = [
//     {
//       sender: "john.doe@example.com",
//       recipient: "jane.smith@example.com",
//       subject: "Meeting Reminder",
//       folder: "inbox",
//     },
//     {
//       sender: "jane.smith@example.com",
//       recipient: "john.doe@example.com",
//       subject: "Project Update",
//       folder: "sent",
//     },
//     {
//       sender: "mark.taylor@example.com",
//       recipient: "john.doe@example.com",
//       subject: "Invoice Details",
//       folder: "inbox",
//     },
//   ];

// const SearchComponent = () => {

//     const [query, setQuery] = useState(""); // Tracks the search input
//     const [results, setResults] = useState([]); // Stores filtered results

//     // Automatically search when typing
//     const handleInputChange = (e) => {
//       const searchValue = e.target.value;
//       setQuery(searchValue);

//       // Perform the search only if input is not empty
//       if (searchValue.trim() !== "") {
//         const filtered = emails.filter((email) =>
//           ["sender", "recipient", "subject", "folder"].some((key) =>
//             email[key].toLowerCase().includes(searchValue.toLowerCase())
//           )
//         );
//         setResults(filtered);
//       } else {
//         // Clear results when input is empty
//         setResults([]);
//       }
//     };

//     return (
//         <div className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
//         {/* <input type="search" className="form-control form-control-light text-bg-light" placeholder="Search..." aria-label="Search" /> */}
//         <div className="search-container">
//             {/* Search bar */}
//             <input
//               className="form-control search-input"
//               type="text"
//               placeholder="Search emails..."
//               value={query}
//               onChange={(e)=>handleInputChange(e)} // Trigger search on input change
//             />

//             {/* Search Results */}
//             {results.length > 0 && (
//               <div className="search-results">
//                 {results.map((result, index) => (
//                   <div className="result-item" key={index}>
//                     <p>
//                       <strong>Subject:</strong> {result.subject}
//                     </p>
//                     <p>
//                       <strong>Sender:</strong> {result.sender}
//                     </p>
//                     <p>
//                       <strong>Recipient:</strong> {result.recipient}
//                     </p>
//                     <p>
//                       <small>
//                         <strong>Folder:</strong> {result.folder}
//                       </small>
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//     )
// }

// export default SearchComponent

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../utils/axiosInstance";
import { generateToast, TOAST_ERROR, TOAST_SUCCESS } from "../utils/generateToast";
import '../styles/searchComponent.css'
const SearchBar = ({ fetchUrl }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const navigate = useNavigate();

  const handleFetchData = async () => {
    if (!isDataFetched) {
      try {
        const token = localStorage.getItem("token-url");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axiosInstance.get("/api/email/fetch-all-mails", config);
        const data = await response.data;
        setData(data.emails);
        generateToast(data.message, TOAST_SUCCESS);
        setIsDataFetched(true);
      } catch (error) {
        generateToast(error.response.data.message, TOAST_ERROR);
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setQuery(searchValue);

    if (searchValue) {
      const filteredResults = data.filter(
        (item) =>
          item.sender.name.toLowerCase().includes(searchValue) ||
          item.sender.email.toLowerCase().includes(searchValue) ||
          item.recipient.toLowerCase().includes(searchValue) ||
          item.body.toLowerCase().includes(searchValue) ||
          item.folder.toLowerCase().includes(searchValue)
      );
      setResults(filteredResults);
      console.log(results)
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (event, id, folder) => {
    event.preventDefault();
    console.log(id, folder);
    setQuery("");
    setResults([]);
    switch (folder) {
      case "inbox":
        navigate(`/inbox/${id}`);
        break;
      case "sent":
        navigate(`/sent/${id}`);
        break;
      case "drafts":
        navigate(`/draft/${id}`);
        break;
      case "trash":
        navigate(`/trash/${id}`);
        break;

      default:
        console.log("Folder not found");
    }
  };

  return (
    <div className="search-bar-container col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        onClick={handleFetchData}
        placeholder="Search..."
        key="awdaibdbaib"
        className="search-bar-input"
      />

      {results.length > 0 && (
        <div className="search-results"
          key="adaiwbdab"
        >
          {results.map((item) => (
            <div
              key={item._id}
              onClick={(event) => handleResultClick(event, item._id, item.folder)}
              className="search-result-item"
            >
              <strong>{item.sender.email}</strong> → <strong>{item.recipient}</strong>
              <p>{item.body.slice(0, 50)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
