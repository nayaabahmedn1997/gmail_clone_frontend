import React from 'react'
import {
  DeleteOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { generateToast, TOAST_ERROR, TOAST_SUCCESS } from '../../utils/generateToast';


const SentEmailCard = ({id, senderName, subject,emailContent}) => {
  const navigate = useNavigate();
  const moveEmailToTrash = async()=>{
    try {
      const token = localStorage.getItem("token-url");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response  = await axiosInstance.post('/api/email/move-to-trash', {email_id:id}, config);
      const data = await response.data;
      generateToast(data.message, TOAST_SUCCESS);
      navigate("/sent")
    } catch (error) {
      generateToast(error.response.message, TOAST_ERROR)
      console.log(error)
    }
  }

  return (
    <div className="email-card card"
   
    >
        <div className="card-title"
         onClick={()=>navigate(`/sent/${id}`)}
        >
            <h6>{senderName}</h6>
        </div>
        <div className="card-content"
         onClick={()=>navigate(`/sent/${id}`)}
        >
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