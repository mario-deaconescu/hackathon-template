import {toast} from "react-toastify";

const ErrorHandler = (message: string) => {
    toast(message, {
        type: "error",
    });
}

export default ErrorHandler;
