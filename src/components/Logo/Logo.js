import React from "react";
import Tilt from "react-parallax-tilt";
import brain from './brain.png'
import "./Logo.css"


const Logo = () => {
    return (
        <div className="center ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{max : 70 }}  style={{ height: '200px', width: '200px', backgroundColor: 'black' }}>
                <div className="Tilt-inner pa3"><img style={{paddingTop: '5px'}} src={brain} alt="logo"/></div>
            </Tilt>
        </div>
    );
}

//TAREA: Añadir para que el ojo siga al cursor

export default Logo;