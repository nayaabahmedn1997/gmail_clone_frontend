import React from 'react'
import EmailCard from './EmailCard'


const email = {
    senderName: "ICCC bank",
    senderEmail: "no-reply@icicilombard.com",
    subject: "Confirmation of bike insurance",
    emailContent: `Dear Sir/Ma'am,

                    We thank you for choosing www.icicilombard.com for your insurance needs.

                    Please find your Two Wheeler Insurance Policy Certificate attached.

                    The attached soft copy is a valid document that can be used in place of a hard copy. As per our Go Green initiative we would request you to please use the soft copy in place of the hard copy.

                    The policy details are as follows:
                    Policy Number: 3005/O/277482714/02/000
                    Policy Start Date: 28/01/2025
                    Policy End Date: 27/01/2026
                    Premium Amount:    759  

                    Click here to logon to your account on www.icicilombard.com using your Registered Email ID and Password to view a valid soft copy of your policy.

                    To better familiarise yourself with your policy, kindly visit our FAQs section.

                    How do I make a claim?
                    Call our Toll Free Helpline on 1800 2666 to register your claim. We recommend you save this number in your mobile as well. For detailed instructions, click here.

                    Which garages fall in your network?
                    Please click here to access our All India Cashless Garage network.

                    How do I renew my policy?
                    Simply logon to ‘My Insurance Account’ to easily renew your policy.

                    For more details on your policy, please read the Policy Wordings carefully.

                    In case of any queries or assistance, please call us on our 24x7 Toll Free Helpline 1800 2666 or write to us at customersupport@icicilombard.com.

                    We look forward to seeing you again on our website.
                    Warm Regards,
                    Team icicilombard.com`
}


const EmailContent = () => {
    return (
        <div> 
            <EmailCard  
            subject={email.subject}
            senderName={email.senderName}
            emailContent={email.emailContent}
        
            /> 
        
        </div>
    )
}

export default EmailContent