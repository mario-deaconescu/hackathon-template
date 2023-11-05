import {useEffect} from 'react'
import './App.css'
import {OpenAPI} from "./api";
import {ToastContainer} from "react-toastify";
import TestComponent from "./test/TestComponent.tsx";
import {useAppDispatch} from "./redux/store.tsx";
import {updateCurrentUser} from "./redux/userSlice.ts";

import 'react-toastify/dist/ReactToastify.css';

function App() {
    OpenAPI.BASE = "https://localhost:8000";
    OpenAPI.WITH_CREDENTIALS = true;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(updateCurrentUser());
    }, []);
    return (
        <>
            <TestComponent/>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"/>
        </>
    )
}

export default App
