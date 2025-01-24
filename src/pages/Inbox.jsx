import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import EmailList from "../components/EmailList";
import EmailDetail from "../components/EmailDetail";


const Inbox = () => {

  

  return (
    <div>
      {/* Nested Routes for Inbox */}
      <Routes>
        <Route index  element={<EmailList />} />
        <Route path=":email_id" element={<EmailDetail />} />
      </Routes>
    </div>
  );
};

export default Inbox;
