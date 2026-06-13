import './Dices.css'

export default function Dices({value, holdValue, state, id}){
  const style= {
    backgroundColor: state ? "lime" : "white"
  }
  return(
    <>
      <button 
      onClick={() => holdValue(id)} 
      className="container" 
      style={style}
      aria-label={`Die with a value of ${value}, 
      ${state ? "held" : "not held"}`
      }
      aria-pressed={state}
      >
        <p>{value}</p>
      </button>
    </>
  )
}