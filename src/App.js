import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import './App.css';

let rowNum = 25
let colNum = 50

const possibleNeighbours = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
]

const initRows = []
for (let i = 0; i < rowNum; i++) {
  initRows.push(Array.from(Array(colNum), () => 0))
}

const App = () => {
 
  const randomRows = []
for (let i = 0; i < rowNum; i++) {
  randomRows.push(Array.from(Array(colNum), () => Math.random() > 0.75 ? Math.random() : 0))
}

  const [nest, setNest] = useState(() => {
    return initRows
  })

  const [speed, setSpeed] = useState(1000)

  const [running, setRunning] = useState(false)

  const runningRef = useRef(running)
  runningRef.current = running

  const speedRef = useRef(speed)
  speedRef.current = speed

  const resetStuff = () =>{
    setNest(initRows)
    setSpeed(1000)
  }
  console.log(speedRef.current)

  const simulate = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setNest(n => {
      return produce(n, nestCopy => {
        for (let i = 0; i < rowNum; i++) {
          for (let j = 0; j < colNum; j++) {
            let neighbours = 0;
            possibleNeighbours.forEach(([x,y]) => {
              const neigI = i + x;
              const neigJ = j + y;
              if (neigI >= 0 && neigI < rowNum && neigJ >= 0 && neigJ < colNum){
                if(n[neigI][neigJ] > 0){
                neighbours += 1} 
              }
            })
            if (neighbours < 2 || neighbours > 3){
              nestCopy[i][j] = 0;
            }
            else if (n[i][j] === 0 && neighbours === 3){
              nestCopy[i][j] = Math.random();
            }
          }
        }
      })
    })
    setTimeout(simulate, speedRef.current)

  }, [])




return (
  <div className="App">
    <div className="grid">

      {nest.map((row, ix1) => (

        <div className="rows">
          {row.map((cell, ix2) => (

            <div key={`${ix1}-${ix2}`}
              onClick={!running ? () => {
                const newNest = produce(nest, nestCopy => {
                  if (nest[ix1][ix2] === 0) {
                    nestCopy[ix1][ix2] = Math.random()
                    console.log(cell)
                  }
                  else {
                    nestCopy[ix1][ix2] = 0
                  }
                })
                setNest(newNest)
              } : null} className={cell === 0 ? "dead" : cell > 0.8 ? "bro" : cell > 0.6 ? "color": cell > 0.4 ? "wtf" : cell > 0.2? "alive" : "ble"} />
                
          ))}
        </div>

      )
      )}
    </div>
    <div className="buttons">
      <button
        onClick={() => {
          setRunning(!running)
          runningRef.current = true
          simulate()
        }
          }>
        {running ? "Stop" : "Start"}
      </button>
      <button onClick={() => resetStuff()} >Reset</button>
      <button onClick={() => setNest(randomRows)}>Azar</button>
      <button onClick={() => speed > 4000 ? null : setSpeed(speed + 200)}>Lento</button>
      <button onClick={() => speed < 300 ? null : setSpeed(speed - 200)}>Rapido</button>
    </div>

  </div>

)
            }

export default App;


