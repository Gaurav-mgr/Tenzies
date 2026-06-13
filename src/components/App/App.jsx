import { useState, useEffect, useRef } from 'react'
import './App.css'
import {nanoid} from "nanoid"

import Header from '../Header/Header'
import Dices from '../Dices/Dices'
import Button from '../Button/Button'
import Confetti from 'react-confetti'
import Loading from '../preloader/Loading'

function App() {
  const [msg, setMsg] = useState("")
  const [loseCount, setLoseCount] = useState(10)

  //tenzie app start
  const [btnValue, setBtnValue] = useState("Roll")

  //generate random dice numbers as an object
  function generateAllNewDice(){
    return new Array(10).fill().map(()=>(
      {value: Math.ceil(Math.random()*6),
        isHeld: false,
        id: nanoid()
      }))
  }
  
  const [dieValue, setDieValue] = useState(() => generateAllNewDice())

  //game winning and losing conditions
  const gameWon = 
    dieValue.every(die => die.isHeld) &&
    dieValue.every(die=>die.value === dieValue[0].value)

  const gameLose = loseCount === 0 && !gameWon

  function reduceLife(){
    if (gameWon || gameLose) {
      setLoseCount(10) // Reset lives to 10 when starting a new game!
    } else {
      setLoseCount(prevLife => prevLife > 0 ? prevLife - 1 : 0) // Prevents going negative
    }
  }

  useEffect(()=>{
    if(gameWon){
      setMsg("Congratulations! You Won.")
      setBtnValue("New Game")
    }else if(gameLose){
      setMsg("Game Over! You Lose.")
      setBtnValue("New Game")
    }else{
      setBtnValue("Roll")
    }
  },[gameWon, gameLose])
  

  //function to toggle between isHeld and !isHeld of die when clicked
  function holdValue(id){
    if(gameWon || gameLose ) return

    setDieValue(oldDice => oldDice.map(die => (
       die.id === id ? {...die, isHeld: !die.isHeld} : die
    )))
  }
  
  //render dice with it's ojbect value
  const dieElements = dieValue.map(dieObj => 
    <Dices 
      holdValue={holdValue} 
      state={dieObj.isHeld} 
      key={dieObj.id} 
      id={dieObj.id} 
      value={dieObj.value} 
    />
  )

  //function to change the random value in the dices
  function changeDiceValue(){
    if(!gameWon && !gameLose){
      setDieValue(oldValue => oldValue.map(die =>
      (
        die.isHeld ?
        die :
        {...die, value: Math.ceil(Math.random()*6)}
      )
      ))
    }else{
      setMsg("")
      setDieValue(generateAllNewDice())
    }
  }

  //chage focus to new game button once gameWon or gameLose
  const buttonRef = useRef(null)

  useEffect(() => {
    if(gameWon && buttonRef.current || gameLose && buttonRef.current){
      buttonRef.current.focus()
    }
  },[gameWon, gameLose])


  return (
    <>
    <Loading />
    {gameWon && <Confetti />}
    <div aria-live="polite" className="sr-only">
      {gameWon && <p>Congratulation! You won! Press New Game to start again</p>}
      {gameLose && <p>Game Over! Better luck next time</p>}
    </div>
      <div className="GameContainer">

        <div className="header-container">
          <Header message={msg} gameWon = {gameWon} gameLose={gameLose}/>
        </div>

        <div className="dices" disabled={gameWon, gameLose}>
          {dieElements}
        </div>

        <div className="Button">
          <Button 
            buttonRef={buttonRef} 
            generateNewDice={changeDiceValue} 
            btnValue={btnValue}
            rollLeft={loseCount}
            gameWon = {gameWon}
            Life = {reduceLife}
          />
        </div>
      </div>
    </>
  )
}

export default App