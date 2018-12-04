import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';

import './App.css';

const app = new Clarifai.App({
 apiKey: 'a29bec32604745d4b83b3fc511fd1d22'
});

const particlesOption ={
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 900 
                }
            }
        }
    }

class App extends Component {
    constructor(){
        super();
        this.state = {
            input:'',
            imageUrl:'',
            box: {},
        }
    }
    
    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height),
        }
    }
    
    displayFaceBox = (box) => {
        this.setState({box: box});
    }
    
    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }
    
    onSubmit = () => {
        this.setState({imageUrl: this.state.input})
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input) 
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response))) 
        .catch(err => console.log(err));
   
}    
    
  render() {
    return (
      <div className="App">
        
        <Particles className='particles'
              params={particlesOption}
            />
        
            <Navigation />
            <Logo />
            
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <FaceRecognition box={this.state.box} imageUrl = {this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
