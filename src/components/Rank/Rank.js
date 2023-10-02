import React from "react";


const Rank = ({nameUser, entriesUser}) => {
    return (
        <div>
            <div className="white f3">
                {`${nameUser}, tu actual rango es ...`}
            </div>
            
            <div className="white f1">
                {entriesUser}
            </div>
        </div>
    );
}

//TAREA: Añadir para que el ojo siga al cursor

export default Rank;