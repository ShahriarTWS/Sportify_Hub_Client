import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import Auth from "../pages/Auth/Auth";
import Login from "../pages/Auth/Login";
import Events from "../pages/Events/Events";
import CreateEvent from "../pages/Events/CreateEvent";
import PrivateRoute from "../provider/PrivateRoute";
import AllEvents from '../pages/Events/AllEvents';
import EventsLayouts from "../pages/Events/EventsLayouts";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        children: ([
            {
                path: '',
                element: <Home></Home>
            },
        ])
    },
    {
        path: '/auth',
        element: <Auth></Auth>,
        children: ([
            {
                path: '/auth/register',
                element: <Register></Register>
            },
            {
                path: '/auth/login',
                element: <Login></Login>
            },
            
        ])
    },
    {
        path: '/events',
        element: <EventsLayouts></EventsLayouts>,
        children: ([
            { index: true, element: <AllEvents></AllEvents> },
            {
                path: '/events/create-event',
                element: <PrivateRoute>
                    <CreateEvent></CreateEvent>
                </PrivateRoute>
            }
        ])
    },
    {
        path: '*',
        element: <h1>Error Page</h1>
    }
])