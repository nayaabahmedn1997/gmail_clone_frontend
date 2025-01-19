import React from 'react'
import {
  DeleteOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const EmailCard = ({id, senderName, subject,emailContent}) => {

  const navigate = useNavigate();
  return (
    <div className="email-card card"
    onClick={()=>navigate(`/inbox/${id}`)}
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
        aria-description='delete email' />
        </div>
    </div>
  )
}

export default EmailCard