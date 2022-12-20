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
    <div class="back">

    {(typeof backendData.partidas === 'undefined') ? (
      <p>Loading...</p>
    ): (
      backendData.partidas.map((turtle, i) => (
        <div class="turtle" key={i}>
          <h1>{turtle.name} ({turtle.nickName})</h1>
          <p>Weapon of choice: {turtle.weapon}</p>
          <img src={turtle.imgUrl} alt={`${turtle.name}`} max-width="180"/>
        </div>
      ))
    )}

    </div>
  )
}

export default App;