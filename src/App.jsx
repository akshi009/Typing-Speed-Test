import React, { useEffect, useState } from 'react'

function App() {

  const[time,setTime]=useState(60)
  const [text ,setText]=useState('')
  useEffect(()=>{
    if(time>0){
      const timer = setTimeout(()=>{
        setTime((prev)=>prev-1)
      },1000)

      console.log(timer)
      return () => clearTimeout(timer);
    }
    else if(time===0) setText('end')
  },[time])
  return (
    <div>
    <div className='text-center my-20 text-3xl font-bold text-gray-950'>{time}</div>
    <div className='text-center text-3xl font-bold text-red-500'>{text}</div>
    </div>
  )
}

export default App