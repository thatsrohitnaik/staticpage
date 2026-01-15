import beach from '../../assets/images/beach.png';
import food from '../../assets/images/food.png';
import silk from '../../assets/images/silk.png';
import {useState} from "react";
import {useOnInView} from "react-intersection-observer";
import Fireworks from '../Fireworks/Fireworks';


const Info = () => {
    const [inViewCanvas, setInViewCanvas] = useState(false);

    const inViewRef = useOnInView(
        (inView, entry) => {
            if (inView) {
                setInViewCanvas(true);

                // Do something with the element that came into view
                console.log("Element is in view", entry.target);
            } else {
                setInViewCanvas(false);
                console.log("Element left view", entry.target);
            }
        }
        // Optional IntersectionObserver options
    );
    return (<div style={{fontFamily: "cursive"}}>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="Izwocg"
                 style={{
                     opacity: "0.8",
                     width: "144.389px",
                     height: "155.886px",
                     transform: "translate(0px, 0px) rotate(0deg)",
                     backgroundImage: `url(${beach})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                 }}>
            </div>
        </div>
        <h2 style={{width: "100%", textAlign: "center", fontWeight: "bold"}}>
            Venue
        </h2>
        <p style={{width: "100%", textAlign: "center"}}>
            We’re getting married where the waves break and the sun sets—right on the lawns of
        </p>
        <p style={{width: "100%", textAlign: "center"}}>
            <a href={"https://maps.app.goo.gl/3VhMUyUZEZ86dn5i7"} target={"_blank"}>
                Sala De Gasper Hall, Miramar</a>
        </p>
        <br/>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="Izwocg"
                 style={{
                     opacity: "0.9",
                     width: "222px",
                     height: "192px",
                     transform: "translate(0px, 0px) rotate(0deg)",
                     backgroundImage: `url(${food})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                 }}>
            </div>
        </div>
        <br/>
        <h2 style={{width: "100%", textAlign: "center", fontWeight: "bold"}}>
            Reception
        </h2>
        <p style={{width: "100%", textAlign: "center"}}>
            Prepare your taste buds—Marathi tadka and Konkani flavour are joining hands… just like we are!
        </p>
        <p style={{width: "100%", textAlign: "center"}}>
            1:30 PM
        </p>
        <br/>

        <div style={{opacity: "0.9", display: "flex", justifyContent: "center", alignItems: "center"}} ref={inViewRef}>
            <div className="Izwocg"
                 style={{
                     width: "261px",
                     height: "130px",
                     transform: "translate(0px, 0px) rotate(0deg)",
                     backgroundImage: `url(${silk})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                 }}>
            </div>
        </div>
        <h2 style={{width: "100%", textAlign: "center", fontWeight: "bold"}}>
            Attire
        </h2>
        <p style={{width: "100%", textAlign: "center"}}>
            If your out fit doesn’t make a little swish-swish sound when you walk,try again. </p>
        <p style={{width: "100%", textAlign: "center"}}>
            Silk & Tradition
        </p>
        {<Fireworks density={100}/>}
    </div>)
}

export default Info;