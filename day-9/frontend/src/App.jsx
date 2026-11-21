import React, { useEffect, useState } from 'react'
import axios from "axios"
const App = () => {
  const [notes, setnotes] = useState([{}])

  async function fetchData(){
    const response = await axios.get("http://localhost:3000/api/notes")
    setnotes(response.data.notes)
    
  }

  useEffect(() => {
  
    fetchData()

  }, [])
  
  return (
    <div className='main'>
      {notes.map((note,indx)=>{
        return <div className='bg' key={indx}>
          <h2>{note.tittle}</h2>
          <p>{note.des}</p>
        </div>
      })}
    </div>
  )
}

export default App