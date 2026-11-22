import React from 'react'
import axios from "axios"
import { useEffect } from 'react';
import { useState } from 'react';

const App = () => {
  // ^usestates
  const [notes, setnotes] = useState([{}])

  const [edit, setedit] = useState(null)
  const [title, settitle] = useState("")
  const [des, setdes] = useState("")
  const [imgUrl, setimgUrl] = useState("")

  // ^usestates

  // fetch notes
  async function fetchData() {
    const response = await axios.get("https://backend-crr8.onrender.com/api/notes")
    setnotes(response.data.notes)


  }

  // ^formsubmit handler
  async function submitHandler(e) {
    e.preventDefault()

    // check for create note or update note
    //^ PATCH
    if (edit) {
      await axios.patch(`https://backend-crr8.onrender.com/api/notes/${edit}`, {
        title: title,
        des: des,
        imgUrl: imgUrl
      })
      
      fetchData()
      settitle("")
      setdes("")
      setimgUrl("")
      setedit(null)

    } else {
      const [title, des, imgUrl] = e.target.elements
      // console.log(title.value, des.value, imgUrl.value);

      // call api to create note
      //^ POST
      await axios.post("https://backend-crr8.onrender.com/api/notes", ({
        title: title.value,
        des: des.value,
        imgUrl: imgUrl.value,
      }))
     
      fetchData()
       settitle("")
      setdes("")
      setimgUrl("")
      setedit(null)

    }
  }

  // to delete card call api
  // delete logic
  // ^DELETE
  async function deleteHandler(noteId) {
    await axios.delete("https://backend-crr8.onrender.com/api/notes/" + noteId)
    fetchData()
  }

  // to update something in note call api
  // upate logic
  // ^PATCH
  async function updatNoteHandler(noteId) {
    const selectedNote = notes.find((note) => {
      return noteId === note._id
    })
    setedit(noteId)
    settitle(selectedNote.title)
    setdes(selectedNote.des)
    setimgUrl(selectedNote.imgUrl)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='big'>
      {/* form */}
      <form onSubmit={submitHandler}>
        <input value={title}
         onChange={(e) => {
          settitle(e.target.value)
        }}
          type="text" placeholder='Enter title' />
        <input value={des}
         onChange={(e) => {
          setdes(e.target.value)
        }}
          type="text" placeholder='Enter description' />
        <input value={imgUrl}
         onChange={(e) => {
          setimgUrl(e.target.value)
        }}
          type="text" placeholder='Enter imgUrl' />
        <button className='sub-btn'>Create note</button>
      </form>
      {/* form */}

      {/* cards */}
      <div className='all-cards'>
        {notes.map((note, idx) => {
          return <div className='card' key={idx}>
            <img src={note.imgUrl} />
            <h3>{note.title}</h3>
            <p>{note.des}</p>
            <div className='btns'>
              {/* delete btn */}
              <button onClick={() => {
                deleteHandler(note._id)
              }}
                className='btn delete'>Delete</button>
              {/* edit btn */}
              <button onClick={() => {
                updatNoteHandler(note._id)
              }}
                className='btn edit'>Edit</button>
            </div>
          </div>
        })}
      </div>
      {/* cards */}
    </div>
  )
}

export default App