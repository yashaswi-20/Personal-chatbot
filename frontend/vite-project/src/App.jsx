import { useState } from 'react'
import './App.css'
import { URL } from './constant'
import { API } from './api'
import Answers from './components/Answers'

function App() {
  const [question, setQuestion] = useState('')
  const [result,setResult]=useState([])

  const payload = {
    contents: [
      {
        parts: [
          {
            text: question
          }
        ]
      }
    ]
  }

  const generate = async () => {
    let result = await fetch(URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    result = await result.json()
    let dataString=result.candidates[0].content.parts[0].text
    dataString=dataString.split("* ")
    dataString=dataString.map((item)=>item.trim())
   // console.log(dataString)
    // console.log(result.candidates[0].content.parts[0].text)
    setResult(dataString)
  }

  return (
    <div className='grid grid-cols-5'>
      <div className='col-span-1 bg-zinc-700 h-screen'>
      </div>

      <div className='col-span-4 p-10'>
        <div className='container h-150 overflow-scroll scrollbar-hide'>
            <div className='text-zinc-300'>
              <ul>
                {result && result.map((item,idx)=><li key={idx} className='text-left' ><Answers ans={item} index={idx} /> </li>)}

                </ul>
            </div>
        </div>

        <div className='bg-zinc-700 w-1/2 text-white m-auto rounded-4xl border p-1 pr-5 border-zinc-600 flex'>
          <input
            type='text'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className='w-full h-full p-3 outline-none'
            placeholder='Ask anything'
          />
          <button type='button' onClick={generate}>
            Ask
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
