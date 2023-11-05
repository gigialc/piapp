import * as React from "react";
import 'normalize.css';
import './defaults.css';// Don't forget to import React!
import { Routes,Route } from 'react-router-dom';
import MuiBottomNavigation from './MuiBottomNavigation';
import Shop from './Shop';
import Add from './Add';
import Chat from "./Chat";
import Profile from './Profile';
import Newsletter from "./Newsletter";

function App() {
    return (
        <>
    <Routes>
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Newsletter" element={<Newsletter />} />
        <Route path="/Chat" element={<Chat />} />


    </Routes>  
    <MuiBottomNavigation />
    </>
    );  
}

export default App;