import React, { useEffect, useState } from 'react'
import EmailCard from './EmailCard'
import axiosInstance from '../utils/axiosInstance';
import { generateToast, TOAST_ERROR, TOAST_SUCCESS } from '../utils/generateToast';
import SingleEmail from './EmailDetail';
import { useNavigate } from 'react-router-dom';
import PaginationComp from './PaginationComp';


// const email = {
//     senderName: "ICCC bank",
//     senderEmail: "no-reply@icicilombard.com",
//     subject: "Confirmation of bike insurance",
//     emailContent: `Dear Sir/Ma'am,

//                     We thank you for choosing www.icicilombard.com for your insurance needs.

//                     Please find your Two Wheeler Insurance Policy Certificate attached.

//                     The attached soft copy is a valid document that can be used in place of a hard copy. As per our Go Green initiative we would request you to please use the soft copy in place of the hard copy.

//                     The policy details are as follows:
//                     Policy Number: 3005/O/277482714/02/000
//                     Policy Start Date: 28/01/2025
//                     Policy End Date: 27/01/2026
//                     Premium Amount:    759  

//                     Click here to logon to your account on www.icicilombard.com using your Registered Email ID and Password to view a valid soft copy of your policy.

//                     To better familiarise yourself with your policy, kindly visit our FAQs section.

//                     How do I make a claim?
//                     Call our Toll Free Helpline on 1800 2666 to register your claim. We recommend you save this number in your mobile as well. For detailed instructions, click here.

//                     Which garages fall in your network?
//                     Please click here to access our All India Cashless Garage network.

//                     How do I renew my policy?
//                     Simply logon to ‘My Insurance Account’ to easily renew your policy.

//                     For more details on your policy, please read the Policy Wordings carefully.

//                     In case of any queries or assistance, please call us on our 24x7 Toll Free Helpline 1800 2666 or write to us at customersupport@icicilombard.com.

//                     We look forward to seeing you again on our website.
//                     Warm Regards,
//                     Team icicilombard.com`
// }


const EmailList = () => {


    const [emails, setEmails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate  = useNavigate();
    const fetchEmails = async () => {
        const token = localStorage.getItem("token-url");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
          const response = await axiosInstance.get("/api/email/get-emails", config);
          generateToast(response.data.message, TOAST_SUCCESS);
          setEmails(response.data.emails);
        } catch (err) {
            generateToast(err.response.message, TOAST_ERROR);
          console.error("Error fetching emails:", err);
        }
      };

    useEffect(() => {
      
  
      fetchEmails();
    }, []);


     // Calculate indices for current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmails = emails.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Navigate to Next Page
  const nextPage = () => {
    if (currentPage < Math.ceil(emails?.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Navigate to Previous Page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

    return (
        <div> 
            {
                emails? currentEmails.map((email)=>(
                    <EmailCard  
                    id={email._id}
                    key = {email._id}
                    subject={email.subject}
                    senderName={email.sender.name}
                    emailContent={email.body}
                
                    /> 
                    // <SingleEmail 
                    // key = {email._id}
                    // email={email} />
                )):<h1>No emails</h1>
            }
           
           {
            currentEmails.length> 0 ?
            <PaginationComp
            itemsPerPage={itemsPerPage}
            totalItems={emails?.length}
            paginate={paginate}
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />:""
           }
          
        </div>
    )
}

export default EmailList