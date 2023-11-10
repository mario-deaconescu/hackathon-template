import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouteObject, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store.tsx";
import routes from "./routes/routes.tsx";

const router = createBrowserRouter(routes as RouteObject[]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
