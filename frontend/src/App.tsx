import {useEffect} from 'react'
import './App.css'
import {OpenAPI} from "./api";

function App() {
    OpenAPI.BASE = "http://localhost:8000";
    useEffect(() => {
        //AuthService.getUser() pentru a verifica daca userul este logat
    }, []);
    return (
        <>
            <div>
            </div>
        </>
    )
}

export default App
