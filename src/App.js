import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
//import { input } from '@testing-library/user-event/dist/types/event';

const initialState = {
    input: '',
    imageURL: '',
    box: {},      //Variable para saber dónde está la cara de la foto y dibujar una varible alrededor de ella.
    route: 'signin',      // Variable de estado para saber en qué página estamos
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    /* Ejemplo de lo que hay dentro de boundig_box
        "bounding_box":{
          "bottom_row":float 0.4601788
          "left_col":float 0.6742708
          "right_col":float 0.7372631
          "top_row":float 0.32203546 
    */
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const widthImage = Number(image.width);
    const heightImage = Number(image.height);

    return {
        leftCol: clarifaiFace.left_col * widthImage *0.95,
        topRow: clarifaiFace.top_row * heightImage * 1.15 ,
        rightCol: (widthImage - (clarifaiFace.right_col * widthImage)) * 0.95,
        bottomRow: heightImage - (clarifaiFace.bottom_row * heightImage)
      }}

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (route) => {
    if (route ==='signout'){
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  
  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input}, () => {
      fetch('http://localhost:3000/APIFaceDetection', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            imageURL: this.state.imageURL
        })
    })  
        .then(response => response.json())
        .then(result => {
          this.displayFaceBox(this.calculateFaceLocation(result));

          if (result) {
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body:JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response=> response.json())
            .then(count =>{
              this.setState(Object.assign(this.state.user, {entries: count}))
            })

          }

        })
        .catch(error => console.log('error', error));
      });

  }


  render () {
    const {isSignedIn, imageURL, route, box} = this.state;
    return (
      <div className="App">
        <div className='particles-container'>
          <ParticlesBg color="#92d7ff" num={100} type="cobweb" bg={true} />;
        </div>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        {route === 'home' 
          ? <div>
              <Logo />
              <Rank nameUser={this.state.user.name} entriesUser={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageURL={imageURL}/>
            </div> 
          : ( route === 'signin' 
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
    </div>
  );
  }
}

export default App;

/*  */