import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      pokeName: 'Ditto',
      secondsRemaining: 10
    }
  }
  
  timer() {
    let dumbTimer = setInterval(() => {
    if(this.state.secondsRemaining <= 0){
      console.log(this.state.secondsRemaining);
      document.getElementById("countdown").innerHTML = "Time's up!";
      this.setState({ showPokemon: true, secondsRemaining: 0 });
      clearInterval(dumbTimer);
    } else {
      document.getElementById("countdown").innerHTML = this.state.secondsRemaining + " seconds remaining";
      this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    }
  }, 1000)};

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    document.getElementById("grabName").style.filter = "brightness(0%)";
    document.getElementById('')
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          secondsRemaining: 10,
          showPokemon: false
        })
      })
      .catch((err) => console.log(err))

  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.pokeName !== prevState.pokeName){
      this.timer();
      console.log("starting timer")
    }
  }


  render() {

    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        {/* <h1 className={'timer'} >Timer Display</h1> */}
        <div id="countdown" className="timer" style={{ fontSize: "2em"}}></div>
        <div className={'pokeWrap'}>

          {/* Option to show pokemon based on ternary */}
          <img className={'pokeImg'} alt="a pokemon" id="grabImage" src={this.state.pokeSprite} style={this.state.showPokemon ? { filter: "brightness(100%)"} : { filter: "brightness(0%)"}}/>

          <h1 className={'pokeName'} id="grabName" style={this.state.showPokemon ? {display: "block"} : { display: "none"}}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;