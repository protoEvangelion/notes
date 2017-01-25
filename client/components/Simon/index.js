import React, {Component} from 'react'
import Radium from 'radium'
import Game from './Game'

const styles = {
  container: {
  	width: '250px',
  },
}

class Simon extends Component {
  constructor(props){
    super(props)
    this.state = {
      round: 2,
      colors: ['green', 'red', 'blue', 'yellow'],
      memorize: '',
      roundColors: [],
      clicks: 0
    }
    this.padClick = this.padClick.bind(this)
    this.start = this.start.bind(this)
  }
  beginRound(colorArr){
    let i = 0
    this.setState({
      memorize : colorArr[i],
      roundColors: colorArr
    })
    i++
    const loop = () => {
      console.log('entering loop')
      setTimeout(() => {
        console.log(i, 'waited 2 seconds', colorArr[i])
        this.setState({
          memorize : colorArr[i]
        })
        i++
        if(i < this.state.round+1) {
          loop()
        }
      }, 2000)
    }
    loop()
  }
  start(round) {
    console.log('start')
    let colorArr = []
    for (let i = 0; i < round; i++) {
      let rand = Math.floor(Math.random() * 4) + 0
      colorArr.push(this.state.colors[rand])
    }
    console.log(colorArr)
    this.beginRound(colorArr)
  }
  padClick(color) {
    this.setState({clicks: this.state.clicks + 1})
    let roundColors = this.state.roundColors
    let round = this.state.round

    //handle wrong click
    if(roundColors[this.state.clicks] !== color) {
      console.log('error')
      this.setState({
        round: 0
      })
      setTimeout(() => this.setState({round: round}), 1000)

    } else if(roundColors.length - 1 === this.state.clicks && roundColors[roundColors.length - 1] === color){
        //
        console.log('you win this round')
        this.setState({
          round: round + 1,
          clicks: 0
        })
        let rand = Math.floor(Math.random() * 4) + 0
        let newColor = this.state.colors[rand]
        let newArr = [...this.state.roundColors, newColor]
        this.beginRound(newArr)
    }
  }
  render() {
    return(
      <div id="gameContainer">
        <Game
          click={this.padClick}
          start={this.start}
          round={this.state.round}
          memorize={this.state.memorize}
        />
      </div>
    )
  }
}

export default Simon = Radium(Simon)
