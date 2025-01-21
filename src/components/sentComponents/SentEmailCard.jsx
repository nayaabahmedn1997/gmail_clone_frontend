import React from 'react'
import {
  DeleteOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { generateToast, TOAST_ERROR, TOAST_SUCCESS } from '../../utils/generateToast';


const SentEmailCard = ({id, senderName, subject,emailContent}) => {

  const moveEmailToTrash = async()=>{
    try {
      const token = localStorage.getItem("token-url");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response  = await axiosInstance.post('/api/email/move-to-trash', {email_id:id}, config);
      const data = await response.data;
      generateToast(data.message, TOAST_SUCCESS)
    } catch (error) {
      generateToast(error.response.message, TOAST_ERROR)
      console.log(error)
    }
  }
  const navigate = useNavigate();
  return (
    <div className="email-card card"
    onClick={()=>navigate(`/sent/${id}`)}
    >
        <div className="card-title">
            <h6>{senderName}</h6>
        </div>
        <div className="card-content">
            <p className="card-subject">
                {subject} -- 
            </p>
            <span>{emailContent.slice(0, 140)}</span>
        </div>
        <div className="email-deleteIcon"
        >
         
        <DeleteOutlined
        aria-description='delete email'
        onClick={moveEmailToTrash}
        />
        </div>
    </div>
  )
}

export default SentEmailCard