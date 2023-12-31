import React from "react";


/*
Esto lo hemos copiado desde la web de Tachyons.
Como estamos en jsx, 
    los inputs del html se tienen que cerrar con un "/>".
    Hemos agregado el tipo artículo de <article> de tachyons
    Hemos cambiado de class a className
*/

class Register extends React.Component {

    constructor(props) {
        super();
        this.state = {
            email: '',
            name: '',
            password: ''
            }
        }
        
    onEmailChange  = (event) => {
        this.setState({email: event.target.value})
        
    }

    onNameChange  = (event) => {
    this.setState({name: event.target.value})
    }

    onPasswordChange  = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitRegister = (event) => {
        fetch('https://facedetectionserver-hjxz.onrender.com/register',  //fetch automáticamene envía un "GET" request, pero lo que queremos es un POST request:
        {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response=> response.json())
        .then(data=>{
            if (data.id) {
                this.props.loadUser(data)
                this.props.onRouteChange('home')
            } else {
                console.log(data)
            }
        }) 
    }

    render() {
        const { onRouteChange } = this.props
        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">
                            Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">
                                Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange={this.onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">
                                Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange}
                            />
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
                            onClick={this.onSubmitRegister} 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register"/>
                    </div>
                    <div className="lh-copy mt3">
                    </div>
                </div>
            </main>     
            </article>    
        );
}    
}

export default Register;