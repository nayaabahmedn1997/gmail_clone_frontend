import { toast } from "react-toastify";

export const TOAST_ERROR = "TOAST_ERROR";
export const TOAST_SUCCESS = "TOAST_SUCCESS";


export const generateToast = (toastMessage, toastType)=>
{
    switch(toastType)
    {
        case TOAST_ERROR:
            toast.error(toastMessage);
            break;
        case TOAST_SUCCESS:
            toast.success(toastMessage);
            break;
        default:
            toast.info("Unknown issue")
    }
}