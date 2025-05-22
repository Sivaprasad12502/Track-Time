import React from 'react'
import { useNavigate } from 'react-router-dom'
import {LuArrowLeft} from 'react-icons/lu'

export default function BackButton() {
    const navigate=useNavigate()
  return (
    <div className='p-1'>
        <button onClick={()=>navigate('/user')}><LuArrowLeft size={20}/></button>
    </div>
  )
}
