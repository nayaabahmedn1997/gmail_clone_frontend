import React, { useEffect, useState } from 'react'
import { generateToast, TOAST_ERROR, TOAST_SUCCESS } from '../utils/generateToast';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import '../styles/singleEmail.css'

// Extend Day.js with the RelativeTime plugin
dayjs.extend(relativeTime);


const TrashEmailDetail = () => {
    const navigate = useNavigate();
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

    const deleteEmail = async  ()=>{
      try {
        const token = localStorage.getItem("token-url");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response  = await axiosInstance.post('/api/email/delete-an-email', {email_id}, config);
        const data = await response.data;
        generateToast(data.message, TOAST_SUCCESS);
        navigate("/trash")
      } catch (error) {
        generateToast(error.response.message, TOAST_ERROR);
      }
    }

    useEffect(()=>{

        fetchSingleEmailData();
        

    }, [])





  return (
    <div className=" card email-container container">
    
    <div className="email-navbar">
      <button className="email-navbar-back-button"
      data-toggle="tooltip" data-placement="bottom" title="Go back"
      onClick={()=>navigate("/trash")}
      >
      <ArrowLeftOutlined />
      </button>
      <button className="email-navbar-delete-button"
      data-toggle="tooltip" data-placement="bottom" title="Delete mail"
      onClick={()=>deleteEmail()}
      >
        <DeleteOutlined />
      </button>
    </div>
    <div className="email-subject">
      <h3 className="email-subject-text">
        {email?.subject}
         <span className="email-folder">
          {email?.folder}
         </span>
      </h3>
    </div>

    <div className="email-sender-detail">
      <div className="sender-icon">
      <UserOutlined />
      </div>
      <div className="sender-info">
        <div className="sender-details">
          <h6>{email?.sender?.name}</h6> <span className='grey-text'> {email?.sender?.email}</span>
        </div>
        <div className="email-date-time">
          <p className='grey-text'>{dayjs(email?.timestamp).format('HH:mm')} ({dayjs(email?.timestamp).fromNow()})</p>
        </div>
      </div>
    </div>




    <div className="card mt-3">
    <div className="card-body">
    
      <p className="card-text">{email?.body}</p>
    </div>
  </div>

  <div className="mt-3">
        {email?.attachment &&
          (
            <div  className="mb-2">
            {email.attachment.endsWith(".jpg") || email.attachment.endsWith(".png") ? (
              <img
                src={`https://gmail-clone-backend-pfid.onrender.com/${email.attachment}`}
                alt={`Attachment`}
                style={{ maxWidth: "150px", maxHeight: "150px" }}
                className="img-thumbnail"
              />
            ) : (
              <a href={`https://gmail-clone-backend-pfid.onrender.com/${email.attachment}`} target="_blank" rel="noopener noreferrer" download>
                <button className="btn btn-sm btn-outline-primary">
                 {email?.attachment.split("\\")[1] || "Download attachment"}
                </button>

                
              </a>
            )}
          </div>
          )}
      </div>

  </div>
  
  )
}

export default TrashEmailDetail