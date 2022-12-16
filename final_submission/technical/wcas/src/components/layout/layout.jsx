import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Doctors from "./doctors";
import Services from "./services";
import Header from "../home/header";
import Home from "../home/home";
import Signin from "../signin/signin";
import Signup from "../signup/signup";
import { getLoggedUserData } from '../config/firbaseconfig';


function Layout() {
    const [userData, setUserData] = useState({});
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = () => {
        let uData = getLoggedUserData();
        if (!!uData) {
            setUserData(JSON.parse(uData));
            setIsSignedIn(true)
        }
        else {
            setIsSignedIn(false);
        }
    }

    return (
        <BrowserRouter>
            <Header userData={userData} isSignedIn={isSignedIn} />
            <Routes>
                <Route exact path="/" element={<Home isSignedIn={isSignedIn} />} />
                <Route exact path="/signin" element={<Signin isGuestUser={false} />} />
                <Route exact path="/guestuser" element={<Signin isGuestUser={true} />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/services" element={<Services />} />
                <Route exact path="/doctors" element={<Doctors />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Layout;
