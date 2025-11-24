import HelloWorld from './components/HelloWorld'
import defaultBg from "./assets/images/home.png";
import CountdownBar from "./components/countdown/CountdownBar.jsx";
import React from "react";
import Letter from "./components/letter/Letter.jsx";
import Itenary from "./components/details/itenary.jsx";
import GoogleFormRSVP from "./components/googleformrsvp/GoogleFormRSVP.jsx";
import GooglePhotos from "./components/googlephoto/GooglePhotos.jsx";

export default function App() {

    const style = {
        backgroundImage: `url(${defaultBg})`,
        backgroundRepeat: 'repeat',
        minHeight: '100vh',
    }

    return (
    <div className="app" style={style}>
        <CountdownBar />
        <HelloWorld />
        <br/>
        <Letter/>
        {/*<Itenary/>*/}
        <GoogleFormRSVP/>
    </div>
  )
}


