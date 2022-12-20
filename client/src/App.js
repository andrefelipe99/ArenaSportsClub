import React, { useEffect, useState } from "react";
import './App.css'

function App() {

  const [backendData, setBackendData] = useState ([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, []) 
  
  return (
    <div className="back">
      <div className="back">
        

    {(typeof backendData.partidas === 'undefined') ? (
      <p>Loading...</p>
    ): (
      backendData.partidas.map((partida, i) => (
        <div className="partida" key={i}>
          <img className="pad" src={partida.imgUrlCasa} alt={`${partida.equipeCasa}`} width="80"/>
          <h1>{partida.equipeCasa} {partida.placarCasa} X {partida.placarFora} {partida.equipeFora} </h1>
          <img className="pad" src={partida.imgUrlFora} alt={`${partida.equipeFora}`} width="80"/>
          <p className="datas">{partida.data}</p>
        </div>
      ))
    )}
      </div>
    </div>
  )
}

export default App;