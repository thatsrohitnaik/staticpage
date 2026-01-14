import beach from '../../assets/images/beach.png';
import food from '../../assets/images/food.png';
import silk from '../../assets/images/silk.png';


const Info = () => {

    return (<>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="Izwocg"
                 style={{width: "144.389px", height: "155.886px", transform: "translate(0px, 0px) rotate(0deg)",backgroundImage: `url(${beach})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',}}>
            </div>
        </div>
        <h1 style={{width:"100%", textAlign: "center"}}>
            Ceremony
        </h1>
        <p style={{width:"100%", textAlign: "center"}}>
            We’re getting married where the waves break and the sunsets—right on the lawn of
        </p>
        <p style={{width:"100%", textAlign: "center"}}>
            <a href={"https://maps.app.goo.gl/3VhMUyUZEZ86dn5i7"} target={"_blank"}>
                Sala De Gasper Hall, Miramar</a>
        </p>
<br/>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div className="Izwocg"
             style={{width: "222px", height: "192px", transform: "translate(0px, 0px) rotate(0deg)",backgroundImage: `url(${food})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',}}>
            </div>
        </div>
        <h1 style={{width:"100%", textAlign: "center"}}>
            Reception
        </h1>
        <p style={{width:"100%", textAlign: "center"}}>
             Prepare your taste buds—Marathi tadka and Konkani flavour are joining hands… just like we are!
        </p>
        <p style={{width:"100%", textAlign: "center"}}>
            1:30 PM
        </p>
        <br/>

        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="Izwocg"
                 style={{width: "261px", height: "130px", transform: "translate(0px, 0px) rotate(0deg)",backgroundImage: `url(${silk})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',}}>
            </div>
        </div>
        <h1 style={{width:"100%", textAlign: "center"}}>
            Attire
        </h1>
        <p style={{width:"100%", textAlign: "center"}}>
            If your out fit doesn’t make a little swish-swish sound when you walk,try again.        </p>
        <p style={{width:"100%", textAlign: "center"}}>
            Silk & Tradition
        </p>
    </>)
}

export default Info;