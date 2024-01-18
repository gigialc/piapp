// Created by Georgina Alacaraz
import * as React from "react";
import 'normalize.css';
import './defaults.css';// Don't forget to import React!
import { Routes, Route } from 'react-router-dom';
import MuiBottomNavigation from './MuiBottomNavigation';
import Shop from './Shop';
import Add from './Shop/pages/create';
import Chat from "./Shop/pages/chat";
import Profile from './Shop/pages/profile';
import Newsletter from "./Shop/pages/newsletter";
import AuthProvider from "./Shop/components/Auth";
import Mybody from "./Shop/pages/mybody";
import SocialMediaBlog from "./Shop/pages/blogpages/SocialMediaBlog";
import Blogilates from "./Shop/pages/blogpages/Blogilates";
import Covid19 from "./Shop/pages/blogpages/Covid19";
import Contraception from "./Shop/pages/blogpages/Contraception";
import BodyDismorphia from "./Shop/pages/blogpages/BodyDismorphia";
import BodyImage from "./Shop/pages/blogpages/BodyImage";
import Parenting from "./Shop/pages/blogpages/Parenting";
import PCos from "./Shop/pages/blogpages/pcos";
import Mother from "./Shop/pages/blogpages/Mothers";

function App() {
    const user = null;
    return (
        <AuthProvider>
            <Routes>
                <Route path="/Shop" element={<Shop />} />
                <Route path="/Add" element={<Add />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Newsletter" element={<Newsletter />} />
                <Route path="/mybody" element={<Mybody />} />
                <Route path="/Covid19" element={<Covid19 />} />
                <Route path="/Chat" element={<Chat />} />
                <Route path="/socialmediaBlog" element={<SocialMediaBlog />} />
                <Route path="/Blogilates" element={<Blogilates />} />
                <Route path="/BodyDismorphia" element={<BodyDismorphia />} />
                <Route path="/Contraception" element={<Contraception />} />
                <Route path="/BodyImage" element={<BodyImage />} />
                <Route path="/Parenting" element={<Parenting />} />
                <Route path="/PCos" element={<PCos />} />
                <Route path="/Mother" element={<Mother />} />

            </Routes>
            <MuiBottomNavigation />
        </AuthProvider>
    );
}

export default App;