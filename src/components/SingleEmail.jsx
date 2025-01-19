import React, { useEffect, useState } from 'react'
import { generateToast, TOAST_ERROR, TOAST_SUCCESS } from '../utils/generateToast';
import axiosInstance from '../utils/axiosInstance';
import { useParams } from 'react-router-dom';

const SingleEmail = () => {

    const [email, setEmail] = useState(null);
    const {email_id} = useParams();
    const fetchSingleEmailData = async ()=>{
        try {
          
            const token = localStorage.getItem("token-url");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response  = await axiosInstance.post('/api/email/fetch-an-email', {email_id}, config);
            const data = await response.data;
            setEmail(data.emailData);
            generateToast(data.message, TOAST_SUCCESS)
        } catch (error) {
            generateToast(error.response.message, TOAST_ERROR);
        }
    }

    useEffect(()=>{

        fetchSingleEmailData();
        

    }, [])


  return (
    <div className="card mt-3">
    <div className="card-body">
    <p className="card-subtitle text-muted">From: {email?.sender?.email}</p>
      <h5 className="card-title">{email?.subject}</h5>
      <p className="card-text">{email?.body}</p>
      <div className="mt-3">
        {email?.attachment &&
          (
            <div  className="mb-2">
            {email.attachment.endsWith(".jpg") || email.attachment.endsWith(".png") ? (
              <img
                src={`http://localhost:6002/${email.attachment}`}
                alt={`Attachment`}
                style={{ maxWidth: "150px", maxHeight: "150px" }}
                className="img-thumbnail"
              />
            ) : (
              <a href={`http://localhost:6002/${email.attachment}`} target="_blank" rel="noopener noreferrer" download>
                <button className="btn btn-sm btn-outline-primary">
                  Download Attachment 
                </button>
              </a>
            )}
          </div>
          )}
      </div>
    </div>
  </div>
  
  )
}

export default SingleEmail