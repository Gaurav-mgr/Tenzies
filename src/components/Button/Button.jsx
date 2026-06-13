import "./Button.css"

export default function Button({btnValue, generateNewDice, buttonRef}){
  return(
    <>
      <button ref={buttonRef} className="RollDice" onClick={generateNewDice}>
        <p>{btnValue}</p>
      </button>  
    </>
  )
}