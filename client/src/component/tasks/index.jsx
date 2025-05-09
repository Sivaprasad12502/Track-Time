import React from 'react'
import useFrom from '../../hooks/useFrom'

export default function Tasks() {
    const {values,handleChange,resetForm}=useFrom({task:''})
    function handleSubmit(e){
        e.preventDefault()
        console.log(values)
        resetForm()
    }
  return (
    <div className='flex flex-col gap-4 text-center ' >
        <h3>Enter Your Daily Taks</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='enter here ' name='task' value={values.task} onChange={handleChange} />
        </form>
        <div>
            <ul>
                <li>task 1</li>
                <li>task 2</li>
                <li>task 3</li>
            </ul>
        </div>
    </div>
  )
}
