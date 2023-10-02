import React from "react";


const Navigation = ({onRouteChange, isSignedIn}) => {
        if(isSignedIn) {
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                    onClick={()=>onRouteChange('signout')}  
                    // Para que no se llame siempre a la función, y solo cambie cuando es necesario
                    // Hay que crear una función para que se active solo cuando se haga click.
                    className="f3 link dim black underline pa3 pointer">
                        Sign Out</p>
                </nav>
            )
        } else {
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                    onClick={()=>onRouteChange('signin')} 
                    className="f3 link dim black underline pa3 pointer">
                        Sign In
                </p>
                <p 
                    onClick={()=>onRouteChange('register')} 
                    className="f3 link dim black underline pa3 pointer">
                        Register
                </p>
                </nav>
            )
        }
}

export default Navigation;