import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let rowNum = 25
  let colNum = 25

  // const neighbours = [
  //   [-1, -1],
  //   [-1, 0],
  //   [-1, 1],
  //   [0, -1],
  //   [0, 1],
  //   [1, -1],
  //   [1, 0],
  //   [1,1]
  // ]


  const [nest, SetNest] = useState(()=>{
    const rows = []
    for (let i = 0; i < rowNum; i++){
      rows.push(Array.from(Array(colNum), ()=> 0))
    }
    return rows
  })

  // const GetGoing = () => {
  //   const running = true
  //   if (running){
  //     nest.map((array, i1) => array.map((each, i2) =>{
  //       neightbours.map((nei) =>{
  //         nest[i1][i2]
  //       })
  //     }))
  //   }
  // }


  const newNest = []

  const changeInitialStatus = (inx1,inx2) =>{
        if (nest[inx1][inx2] === 0 ){
        SetNest([...nest], nest[inx1][inx2] = 1)
      }
        else{
        SetNest([...nest], nest[inx1][inx2] = 0)
        }
  }
  

  return (
    <div className="App">w
        <div className="grid">
  
            {nest.map ((row, inx1) => (
                <div className="first">
                  {row.map((cell, inx2) =>( 
                    cell == 1 ? <div className="alive" onClick={() => changeInitialStatus(inx1,inx2)}></div> : 
                                <div className="dead"  onClick={() => changeInitialStatus(inx1,inx2)}></div>
                      ))}
                </div>
              )
          )} 
        </div>
    </div>

 )
}

export default App;
