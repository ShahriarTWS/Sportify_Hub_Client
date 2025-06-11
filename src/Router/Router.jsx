import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        children: ([
            {
                path: '',
                element: <Home></Home>
            }
        ])
    },
    {
        path: '*',
        element: <h1>Error Page</h1>
    }
])