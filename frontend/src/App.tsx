// Created by Georgina Alacaraz
import * as React from "react";
import 'normalize.css';
import './defaults.css';// Don't forget to import React!
import { Routes, Route } from 'react-router-dom';
import MuiBottomNavigation from './MuiBottomNavigation';
import Shop from './Shop';
import Add from './Shop/pages/create';
//import Chat from "./Shop/pages/chat";
import Profile from './Shop/pages/profile';
import Newsletter from "./Shop/pages/newsletter";
import AuthProvider from "./Shop/components/Auth";
import Mybody from "./Shop/pages/mybody";
import SocialMediaBlog from "./Shop/pages/blogpages/SocialMediaBlog";
import Blogilates from "./Shop/pages/blogpages/Blogilates";
import BodyImage from "./Shop/pages/blogpages/BodyImage";
import Eatingdisorders from "./Shop/pages/blogpages/Eatingdisorders";
import Sexed from "./Shop/pages/blogpages/sexed";
import Chat from "./Shop/pages/chat";
import ChatCreator from "./Shop/pages/chatCreator";
import Comments from "./Shop/components/comments";

function App() {
    const user = null;
    return (
        <AuthProvider>
            <Routes>
                <Route path="/Shop" element={<Shop />} />
                <Route path="/Add" element={<Add />} />
                <Route path="/Profile" element={<Profile />} />// Make sure Profile is a valid React component
                <Route path="/Newsletter" element={<Newsletter />} />
                <Route path="/mybody" element={<Mybody />} />
                <Route path="/sexed" element={<Sexed />} />
                {/*<Route path="/Chat" element={<Chat />} />*/}
                <Route path="/socialmediaBlog" element={<SocialMediaBlog />} />
                <Route path="/Blogilates" element={<Blogilates />} />
                <Route path="/BodyImage" element={<BodyImage />} />
                <Route path="/Eatingdisorders" element={<Eatingdisorders />} />
                <Route path="/Chat" element={<Chat />} />
                <Route path="/ChatCreator" element={<ChatCreator />} />
                <Route path="/comments" element={<Comments />} />

            </Routes>
            <MuiBottomNavigation />
        </AuthProvider>
    );
}

export default App;