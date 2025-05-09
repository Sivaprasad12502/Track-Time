import React from 'react'
import useFrom from '../../hooks/useFrom'

export default function AddProjects() {
  const {values,handleChange,resetForm}=useFrom({projectName:"",clientName:"",description:""})
  function handleSubmit(e){
    e.preventDefault()
    console.log(values)
    resetForm()
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text"  placeholder='Enter Project name' name='projectName' value={values.projectName} onChange={handleChange}/>
                <input type="text"  placeholder='Enter clientname name' name='clientName' value={values.clientName} onChange={handleChange}/>
                <textarea name='description'  placeholder='About the project' value={values.description} onChange={handleChange}></textarea>
                <button type='submit'>add</button>
            </div>
        </form>
    </div>
  )
}
