'use client'
import { it } from 'mocha';
import React, { useRef, useState } from 'react'

function Home() {

  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);
  let secondsPassed = 0;
  if (startTime != 0 && currentTime != 0) {
    secondsPassed = (currentTime - startTime.current) / 1000;
  }
  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>{secondsPassed.toFixed(3) }</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={()=>{
            startTime.current = Date.now()
            clearInterval(intervalRef.current)
            intervalRef.current = setInterval(()=>{
              setCurrentTime(Date.now())
            },10)
          }}>START</button>
          <button className="stop-btn" onClick={()=>{
            clearInterval(intervalRef.current)
          }}>STOP</button>
          <button className="lap-btn" onClick={()=>{
            setLaps((oldValue)=>{
              const copyArr = [...oldValue]
              copyArr.push(secondsPassed)
              return copyArr
            })
          }}>LAP</button>
          <button className="reset-btn" onClick={()=>{
            clearInterval(intervalRef.current)
            setCurrentTime(0)
            startTime.current = 0
            setLaps([])
          }}>RESET</button>
        </section>
      </section>
      {laps.length > 0 && <section className='lap-section'>
        <h2>Laps</h2>
        <section className='laps'>
          {laps.map((item)=>(
            <p key={item}>{item}</p>
          ))}
        </section>
      </section>}
    </div>
  )
}

export default Home
