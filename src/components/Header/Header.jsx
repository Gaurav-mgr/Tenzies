import "./Header.css"
import TenziesIcon from "../../assets/TenziesIcon.png"

export default function Header({message, gameWon, gameLose}){
  const style = {
    color: gameWon ? "#28d828" : gameLose ? "red" : "#0b2434"
  }
  return(
    <>
      <div className="title">
        {message.length === 0 && 
        <img 
          src={TenziesIcon} 
          alt="Tenzies Icon" 
        />}
        <h1 className="title" style={style}>{ message.length > 0 ? message : "Tenzies"}</h1>
      </div>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    </>
  )
}