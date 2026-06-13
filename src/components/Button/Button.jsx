import "./Button.css"

export default function Button({btnValue, generateNewDice, buttonRef, rollLeft, gameWon, Life}){
  function handleClick(){
    generateNewDice();
    Life();
  }
  return(
    <>
      <button ref={buttonRef} className="RollDice" onClick={handleClick}>
        <p>{btnValue}{!gameWon && rollLeft != 0 ? ` Left: ${rollLeft}`: ""}</p>
      </button>  
    </>
  )
}