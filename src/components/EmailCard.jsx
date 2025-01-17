import React from 'react'
import {
  DeleteOutlined,
} from '@ant-design/icons';
const EmailCard = ({senderName, subject,emailContent}) => {
  return (
    <div className="email-card card">
        <div className="card-title">
            <h6>{senderName}</h6>
        </div>
        <div className="card-content">
            <p className="card-subject">
                {subject}
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