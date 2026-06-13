export default function Header({message, gameWon, gameLose}){
  const style = {
    color: gameWon ? "#28d828" : gameLose ? "red" : "#0b2434"
  }
  return(
    <>
      <h1 className="title" style={style}>{ message.length > 0 ? message : "Tenzies"}</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    </>
  )
}