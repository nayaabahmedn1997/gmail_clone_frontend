import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import '../styles/composeEmail.css';
import axiosInstance from '../utils/axiosInstance';
import { useSelector } from 'react-redux';
import { generateToast, TOAST_ERROR, TOAST_SUCCESS } from '../utils/generateToast';
import * as Yup from "yup";

const ComposeEmail = ({ onClose }) => {
  const [attachment, setAttachment] = useState(null);
  const [fileName, setFileName] = useState();
  const [isDraftEmail, setIsDraftEmail] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  // Handle file attachment change
  const handleAttachmentChange = (e) => {
    console.log(typeof e.target.value);
    
  const filename = e.target.value.split("\\");
  setFileName(filename[filename.length -1])
    const file = e.target.files[0];
    setAttachment(file);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string(),
  });


  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }, actionType)=> {
    const { to, subject, body } = values;
    setSubmitting(true);

    const url =
      actionType === "submit"
        ? "/api/email/create-email" // Endpoint to submit the form
        : "/api/email/draft-a-email"; // Endpoint to save the form as a draft

    console.log(url)

    try {
      const formData = new FormData();
      formData.append('to', to);
      formData.append('subject', subject);
      formData.append('body', body);
      formData.append('fileName', fileName);
      if (attachment) {
        formData.append('attachment', attachment);
      }
      const response = await axiosInstance.post(url , formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token-url')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const data  = await response.data;
     
        generateToast(data.message, TOAST_SUCCESS);
        // Reset the form and close the compose modal
        onClose();
      
    } catch (error) {
      console.error('Error sending email:', error);
     // generateToast(error.response.message, TOAST_ERROR);
    }
  };

// Handle form draft
const handleDraftMail = async (values) => {
  const { to, subject, body } = values;

  const emailData = {
  recipient: to, 
  subject, 
  body,
  folder:'draft',
    attachment,
  };

  try {
    const formData = new FormData();
    formData.append('to', to);
    formData.append('subject', subject);
    formData.append('body', body);
    formData.append('fileName', fileName);
    formData.append('folder', 'draft');
    if (attachment) {
      formData.append('attachment', attachment);
    }
    console.log(formData)
    const response = await axiosInstance.post('/api/email/draft-a-email', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token-url')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    const data  = await response.data;
   
      generateToast(data.message, TOAST_SUCCESS);
      // Reset the form and close the compose modal
      onClose();
    
  } catch (error) {
    console.error('Error sending email:', error);
    generateToast(error.response.data.message, TOAST_ERROR);
  }
};

  return (
    <div className="compose-email-modal">
      <div className="compose-email-header">
        <h2>Compose New Email</h2>
        <button className="close-btn btn btn-danger" onClick={onClose}>X</button>
      </div>

      {/* Formik Form */}
      <Formik
        initialValues={{
          to: '',
          subject: '',
          body: '',
        }}
        onSubmit={(values, actions) => {
          // Formik onSubmit will only set the initial behavior. We'll handle button-specific logic separately.
          console.log("Formik Submitted Values: ", values);
        }}
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.to) {
        //     errors.to = 'Required';
        //   }
        //   if (!values.subject) {
        //     errors.subject = 'Required';
        //   }
        //   if (!values.body) {
        //     errors.body = 'Required';
        //   }
        //   return errors;
        // }}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, isSubmitting, values, resetForm }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="to">To:</label>
              <Field type="email" id="to" name="to" className="input-field" />
              <ErrorMessage name="to" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <Field type="text" id="subject" name="subject" className="input-field" />
              <ErrorMessage name="subject" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="body">Body:</label>
              <Field as="textarea" id="body" name="body" className="input-field" rows="5" />
              <ErrorMessage name="body" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="attachment">Attachment:</label>
              <input
                type="file"
                id="attachment"
                onChange={(e) => {
                  handleAttachmentChange(e);
                  setFieldValue('attachment', e.target.files[0]);
                }}
              />
            </div>

           {/* Two Buttons with Different Action Types */}
          <button
            type="button"
            className='btn btn-primary'
            onClick={() =>
              handleSubmit(values, { setSubmitting, resetForm }, "submit")
            }
            disabled={isSubmitting}
          >
            Submit
          </button>
          <button
          className='ms-1 btn btn-danger'
            type="button"
            onClick={() =>
              handleSubmit(values, { setSubmitting, resetForm }, "save_draft")
            }
            disabled={isSubmitting}
          >
            Save as Draft
          </button>

            
          </Form>
          
        )}
      </Formik>
      
    </div>
  );
};

export default ComposeEmail;
