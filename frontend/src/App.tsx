import {useEffect} from 'react'
import './App.css'
import {OpenAPI} from "./api";
import {ToastContainer} from "react-toastify";
import {useAppDispatch} from "./redux/store.tsx";
import {updateCurrentUser} from "./redux/userSlice.ts";

import 'react-toastify/dist/ReactToastify.css';
import {NextUIProvider} from "@nextui-org/react";
import {Outlet, useNavigate} from "react-router-dom";

function App() {
    OpenAPI.BASE = "https://localhost:8000";
    OpenAPI.WITH_CREDENTIALS = true;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(updateCurrentUser());
    }, []);

    const navigate = useNavigate();
    return (
        <NextUIProvider navigate={navigate}>
            <main className="purple-dark text-foreground bg-background" style={{
                width: '100vw',
                height: '100vh',
            }}>
                <Outlet/>
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
            </main>
        </NextUIProvider>
    )
}

export default App
