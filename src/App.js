import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import './App.css';
import styled from "styled-components";


let rowNum = 40
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
    const Back = styled.div`
   
    `

    const Main = styled.div`
    margin: 0 auto;
    display: flex;
    width: 1000px;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    `

    const Orden = styled.div`
    margin: 0 auto;
    width: 80%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    `
    const Rules = styled.div`
    margin: 0 auto;
    width: 20%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    margin-bottom: 200px;
    padding-left: 40px;
    font-size: 0.7rem;
    letter-spacing: 0.8px;
    `
    const Tittle = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 50px;
    justify-content: space-around;
    color: #ff7575;
    `
    
    const Buttons = styled.div`
    margin: 0 auto;
    width: 70%;
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 200px;
    `
    
    const Button = styled.button`
    width: 80px; 
    height: 30px;
    border: 1px solid #ffa8ff;
    background: #bbdcff;
    color: black;
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 1px;

    `
 
  const randomRows = []
for (let i = 0; i < rowNum; i++) {
  randomRows.push(Array.from(Array(colNum), () => Math.random() > 0.90 ? Math.random() : 0))
}

  const [nest, setNest] = useState(() => {
    return initRows
  })

  const [count, setCount] = useState(0)

  const [speed, setSpeed] = useState(1000)

  const [running, setRunning] = useState(false)

  const runningRef = useRef(running)
  runningRef.current = running

  const speedRef = useRef(speed)
  speedRef.current = speed

  const countRef = useRef(count)
  countRef.current = count

  const resetStuff = () =>{
    setNest(initRows)
    setSpeed(1000)
    setCount(0)
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
    setCount(countRef.current += 1)
    setTimeout(simulate, speedRef.current)

  }, [])




return (
<Back>
   <Main>
      <Orden> 
          
         <Tittle>
             <h1>Conway's Game of Life</h1>
         </Tittle>
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
        <h1>Years since Big Bang: {countRef.current}</h1>
        <Buttons className="buttons">
          <Button
            onClick={() => {
              setRunning(!running)
              runningRef.current = true
              simulate()
            }
              }>
            {running ? "Stop" : "Start"}
          </Button>
          <Button onClick={() => resetStuff()} >Reset</Button>
          <Button onClick={() => setNest(randomRows)}>Azar</Button>
          <Button onClick={() => speed > 4000 ? null : setSpeed(speed + 200)}>+Lento</Button>
          <Button onClick={() => speed < 300 ? null : setSpeed(speed - 200)}>+Rapido</Button>
        </Buttons>
    
      </Orden>
      <Rules>
        <h2>The Rules:</h2>
         <h3>Every circle is a cell</h3>
         <h3>Black cells are dead</h3>
         <h3>Colored cells are alive</h3>
         <h3>If a dead cell has 3 neighbours it will come to life</h3>
         <h3>If a live cell has less than 2 neighbours, it will die of solitude</h3>
         <h3>If a live cell has more than 3 neighbours, it will die of overcrowding</h3>
        </Rules>
  
  
  
    
  
   </Main>
</Back>

)
            }

export default App;


