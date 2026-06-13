import React from 'react'
import './Preloader.css'

export default function Preloader({isLoading}){
  return(
    <div className={isLoading ? "preloader-container" : "preloader-container slide-up"}>
      <div className="text">
        <p>Welcome to <span className={isLoading ? "tenzie" : "tenzie slide-up"}>Tenzies Game</span></p>
      </div>
      <div className="custom-loader">
        <div className="load"></div>
      </div>
    </div>
  )
}