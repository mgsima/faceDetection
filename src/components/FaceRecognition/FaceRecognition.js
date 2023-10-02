import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({box, imageURL}) => {
    return (
        <div className="center ma">
            <div className="absolute nt3">
                <img id='inputImage' src={imageURL} style={{paddingTop: '30px'}} alt="" width="400px" height='auto'/>
                <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    );
}


export default FaceRecognition;        
