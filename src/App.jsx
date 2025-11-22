import HelloWorld from './components/HelloWorld'
import defaultBg from "./assets/images/home.png";
import CountdownBar from "./components/countdown/CountdownBar.jsx";
import React from "react";
import Letter from "./components/letter/Letter.jsx";

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
        <Letter/>
    </div>
  )
}
