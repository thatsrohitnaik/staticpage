import HelloWorld from './components/HelloWorld'
import defaultBg from "./assets/images/home.png";
import CountdownBar from "./components/countdown/CountdownBar.jsx";
import React from "react";
import Letter from "./components/letter/Letter.jsx";
import Timetable from "./components/Timetable/Timetable.jsx";
import Itenary from "./components/details/itenary.jsx";

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
        <Itenary/>
    </div>
  )
}
