import {useEffect, useState} from 'react'
import './App.css'
import {IUser, OpenAPI, UsersService} from "./api";

function App() {
    OpenAPI.BASE = "http://localhost:8000";
    const [user, setUser] = useState<IUser>();
    useEffect(() => {
        UsersService.getUser("1").then(setUser);
    }, []);
    return (
        <>
            <div>
                {user?.name}
            </div>
        </>
    )
}

export default App
