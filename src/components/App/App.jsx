import { useState, useEffect, useRef } from 'react'
import './App.css'
import {nanoid} from "nanoid"

import Dices from '../Dices/Dices'
import Button from '../Button/Button'
import Confetti from 'react-confetti'
import Loading from '../preloader/Loading'

function App() {


  //tenzie app start

  const [btnValue, setBtnValue] = useState("Roll")

  //generate dice numbers object
  function generateAllNewDice(){
    return new Array(10).fill().map(()=>(
      {value: Math.ceil(Math.random()*6),
        isHeld: false,
        id: nanoid()
      }))
  }
  
  const [dieValue, setDieValue] = useState(() => generateAllNewDice())

  const gameWon = 
    dieValue.every(die => die.isHeld) &&
    dieValue.every(die=>die.value === dieValue[0].value)

  useEffect(()=>{
    if(gameWon){
      setBtnValue("New Game")
    }else{
      setBtnValue("Roll")
    }
  },[gameWon])
  

  //hold value function
  function holdValue(id){
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

  function changeDiceValue(){
    if(!gameWon){
      setDieValue(oldValue => oldValue.map(die =>
      (
        die.isHeld ?
        die :
        {...die, value: Math.ceil(Math.random()*6)}
      )
      ))
    }else{
      setDieValue(generateAllNewDice())
    }
  }

  //chage focus to new game button once gameWon
  const buttonRef = useRef(null)

  useEffect(() => {
    if(gameWon && buttonRef.current){
      buttonRef.current.focus()
    }
  },[gameWon])


  return (
    <>
    <Loading />
    {gameWon && <Confetti />}
    <div aria-live="polite" className="sr-only">
      {gameWon && <p>Congratulation! You won! Press New Game to start again</p>}
    </div>
      <div className="GameContainer">

        <div className="header-container">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>

        <div className="dices">
          {dieElements}
        </div>

        <div className="Button">
          <Button buttonRef={buttonRef} generateNewDice={changeDiceValue} btnValue={btnValue} />
        </div>
      </div>
    </>
  )
}

export default App
