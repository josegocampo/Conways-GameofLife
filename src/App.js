import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import './App.css';
import conway from './conway.png'
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
<div className="App">
   <Main>
      <Orden> 
          
         <Tittle>
             <Top>
               <Big className="pixel">El Juego de la Vida</Big>
               <a href="www.google.com"><BigSmall className="titu2">de Conway</BigSmall></a>
             </Top>
         </Tittle>
         <Rules className="rules">
         Cada bloque es una celula. Puedes elegir donde parten celulas vivas. Cada celula tiene como vecinos los bloques adyacentes. Las celulas negras estan muertas. Las celulas de colores estan vivas.
         Si una celula muerta tiene 3 vecinos cobrará vida. Si una celula viva tiene menos de 2 vecinos morira de soledad. 
         Si una celula viva tiene mas de 3 vecinos morira de sobrepoblación.
        </Rules>
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
                  } : null} className={cell === 0 ? "dead" : cell > 0.9 ? "alive" : cell > 0.7 ? "wtf" : "ble"} />
                    
              ))}
            </div>
    
          )
          )}
        </div>
        <Anios>GENERACIONES: {countRef.current}</Anios>
        <Buttons>
          <Button
            onClick={() => {
              setRunning(!running)
              runningRef.current = true
              simulate()
            }
              } className="buttons">
            {running ? "Parar" : "Empezar"}
          </Button>
          <Button onClick={() => resetStuff()} className="buttons">Reiniciar</Button>
          <Button onClick={() => setNest(randomRows)} className="buttons">Azar</Button>
          <Button onClick={() => speed > 4000 ? null : setSpeed(speed + 200)} className="buttons">+Lento</Button>
          <Button onClick={() => speed < 300 ? null : setSpeed(speed - 200)} className="buttons">+Rapido</Button>
        </Buttons>
    
      </Orden>

  
   </Main>
   <Small className="rip">R.I.P. John Conway<a href="https://es.wikipedia.org/wiki/John_Horton_Conway" className="link"><img src={conway} className="conway"/></a></Small>
</div>

)
            }



const Main = styled.div`
margin: 0 auto;
display: flex;
width: 1000px;
justify-content: center;
flex-direction: row;
align-items: center;
@media ${device.tablet}{
  max-width: 628px;
}
@media ${device.mobileL}{
  max-width: 468px;
}
@media ${device.mobileM}{
  max-width: 372px;
}
@media ${device.mobileS}{
  max-width: 365px;
}

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
font-size: 0.7rem;
padding-left: 50px;
padding-right: 50px;
margin-bottom: 20px;
`
const Tittle = styled.div`
display: flex;
flex-direction: column;
color: #ff7575;
margin-top: 50px;
align-items: flex-end;
`

const Top = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;  
margin-bottom: 20px;

`

const Big = styled.div`
font-size: 30px;
font-weight: 300;
color: black;
`

const BigSmall = styled.div`
font-size: 28px;
font-weight: 600;
`
const Anios = styled.div`
margin-top: 25px;
font-size: 0.9rem;

`

const Small = styled.div`
display: flex;
flex-direction: row;
align-items: center;
font-size: 0.7rem;
font-weight: 500;
color: grey;
`

const Buttons = styled.div`
margin: 0 auto;
width: 70%;
margin-top: 30px;
display: flex;
justify-content: space-around;
margin-bottom: 55px;
`

const Button = styled.button`
width: 90px; 
height: 25px;
border-radius: 5px
background: white;
font-size: 0.7rem;
letter-spacing: 0.5px;

`

export default App;


