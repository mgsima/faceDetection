import React from "react";


/*
Esto lo hemos copiado desde la web de Tachyons.
Como estamos en jsx, 
    los inputs del html se tienen que cerrar con un "/>".
    Hemos agregado el tipo artículo de <article> de tachyons
    Hemos cambiado de class a className
*/

class SignIn extends React.Component {

    /* 
    En este hijo de App.js creamos una clase con su propias variables de estado.
    Esto lo podemos hacer así, porque estas variables de estado solo tienen relación con este subcomponente,
    al resto de la aplicación le da igual si hay un Email o una constraseña, solo le interesa si existe el usuario o no, lo demás le da igual.
    Por eso creamos un subcomponente con variables de estado encerrado en sí mismo.
    */

    constructor(props) {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
            }
        }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = (event) => {
        event.preventDefault();
        fetch('https://facedetectionserver-hjxz.onrender.com/signin',  //fetch automáticamene envía un "GET" request, pero lo que queremos es un POST request:
        {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response=> response.json())
        .then(user=>{
            console.log(user)
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            } else {
                console.log('error:', user)
            }
        }) 
    }

    render () {
        const { onRouteChange } = this.props;
        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">
                            Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">
                                Email</label>
                            <input 
                                onChange={this.onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">
                                Password</label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange}
                                />
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                            onClick={this.onSubmitSignIn}       //onRouteChange('home')} 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={()=>onRouteChange('register')} href="#0" className="f6 link dim black db pointer">
                            Register</p>

                    </div>
                </form>
            </main>     
            </article>    
        );
}
}


export default SignIn;