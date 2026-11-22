import React, { useEffect, useState } from 'react'
import axios from "axios"
const App = () => {
  const [notes, setnotes] = useState([{}])
  const [editId, seteditId] = useState(null)
  const [tittle, settittle] = useState("")
  const [des, setdes] = useState("")

  async function fetchData(){
    const response = await axios.get("http://localhost:3000/api/notes")
    setnotes(response.data.notes)
    
    
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  // on submit 
  // and send data to db with POST method
  async function submitHandler(e){
    e.preventDefault()

    
    if (editId) {
      await axios.patch(`http://localhost:3000/api/notes/${editId}`, {
      tittle: tittle,
      des: des
    })
    
    } else {
      let [tittle,des] = e.target.elements
    // console.log(tittle.value,des.value);

    await axios.post("http://localhost:3000/api/notes",({
      tittle:tittle.value,
      des:des.value
    }))
    
    }
    fetchData()
    seteditId(null)
    settittle("")
    setdes("")
  }

  // delete button
  // delete from database with noteid
  function deleteNoteHandler(noteId){
    console.log(noteId);
    axios.delete(`http://localhost:3000/api/notes/${noteId}`)
    .then((res)=>{
      console.log(res.data);
    fetchData()
      
    })
    
  }

  // update something in note
  // updat somethig in notes with PATCH
  function updateNoteHandler(noteId){
    // console.log(noteId);
    const selectedNote = notes.find((note)=>{
      return note._id === noteId

    })
    seteditId(noteId)
    settittle(selectedNote.tittle)
    setdes(selectedNote.des)
    
  }
  
  return (
   <>
   {/* form */}
   <div className='form-wala'>
    <form onSubmit={submitHandler}>
      <input onChange={(e)=>{
        settittle(e.target.value)
      }}
       type="text" placeholder='Enter Tittle'/>

      <input onChange={(e)=>{
        setdes(e.target.value)
      }}
       type="text" placeholder='Enter description'/>
      <button>Create note</button>
    </form>

   </div>
    <div className='main'>
      {notes.map((note,indx)=>{
        return <div className='bg' key={indx}>
          <h2>{note.tittle}</h2>
          <p>{note.des}</p>
          <div className='btns'>
            <button onClick={()=>{
            deleteNoteHandler(note._id)
          }}>delete</button>
          <button onClick={()=>{
            updateNoteHandler(note._id)
          }}>Edit</button>
          </div>
        </div>
      })}
    </div>
   </>
  )
}

export default App