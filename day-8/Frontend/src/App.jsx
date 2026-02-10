import { useState,useEffect } from 'react'
import axios from 'axios'



function App() {
  const [notes, setnotes] = useState([
    {
    title : "test title 1",
    description : "test description 1"},
    {
    title : "test title 2",
    description : "test description 2"},
    {
    title : "test title 3",
    description : "test description 3"},
  ])

  function fetchNotes(){
      axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
    setnotes(res.data.notes);
    
  })
  
  }
useEffect(()=>{
  fetchNotes();
},[])

function submtHandler(e){
  e.preventDefault();

  const {title,description} = e.target.elements;

  axios.post("http://localhost:3000/api/notes",{
    title : title.value,
    description : description.value
  }).then((res)=>{
    fetchNotes();
  })

}

function deleteHandler(id){
  axios.delete(`http://localhost:3000/api/notes/${id}`)
  .then((res)=>{
    fetchNotes();
  })
}

  return (
    <>
    <form className='create-form' onSubmit={submtHandler}>
      <input type="text" placeholder='Title' name="title" />
      <textarea placeholder='Description' name="description"></textarea>
      <button type='submit'>Create Note</button>
    </form>
    <div className="notes">
      {notes.map((note, index) => (
        <div key={index} className="note">
          <h2>{note.title}</h2>
          <p>{note.description}</p>
          <button onClick={()=>deleteHandler(note._id)}>delete</button>
        </div>
      ))}
    </div>
    </>
  )
}

export default App
