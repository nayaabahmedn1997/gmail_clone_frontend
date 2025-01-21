import React from 'react'
import {
  DeleteOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { generateToast, TOAST_ERROR, TOAST_SUCCESS } from '../utils/generateToast';
import axiosInstance from '../utils/axiosInstance';
const TrashEmailCard = ({id, senderName, subject,emailContent}) => {

  const deleteEmail = async  ()=>{
    try {
      const token = localStorage.getItem("token-url");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response  = await axiosInstance.post('/api/email/delete-an-email', {email_id:id}, config);
      const data = await response.data;
      generateToast(data.message, TOAST_SUCCESS);
      navigate("/trash")
    } catch (error) {
      generateToast(error.response.message, TOAST_ERROR);
    }
  }
  const navigate = useNavigate();
  return (
    <div className="email-card card"
    onClick={()=>navigate(`/trash/${id}`)}
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
        onClick={deleteEmail}
        />
        </div>
    </div>
  )
}

export default TrashEmailCard