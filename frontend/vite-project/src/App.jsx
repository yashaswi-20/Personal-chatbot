import { useState } from 'react'
import './App.css'
import { URL } from './constant'
import { API } from './api'
import Answers from './components/Answers'

function App() {
  const [question, setQuestion] = useState('')
  const [result,setResult]=useState([])
  const [history,setHistory]=useState(JSON.parse(localStorage.getItem('item')))

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
    let response = await fetch(URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    response = await response.json()
    let dataString=response.candidates[0].content.parts[0].text
    dataString=dataString.split("* ")
    dataString=dataString.map((item)=>item.trim())
   // console.log(dataString)
    // console.log(result.candidates[0].content.parts[0].text)
    setResult([...result,{type:'q',text:question},{type:'a',text:dataString}])

    let item=JSON.parse(localStorage.getItem('item'));
    if(localStorage.getItem('item')){
      setHistory([question,...item]);
      let total=[question,...item];
      localStorage.setItem('item',JSON.stringify(total));
    }else{
    localStorage.setItem('item',JSON.stringify([question]))
    setHistory([question])
    }
  }

  console.log(result);
  return (
    <div className='grid grid-cols-5'>
      <div className='col-span-1 bg-zinc-700 h-screen'>
         <ul>
        { 
          history && history.map((item,idx)=>(
            <li key={idx+Math.random()}>
              {item}
            </li>
          )) 
        }
        </ul>
      </div>

      <div className='col-span-4 p-10'>
        <div className='container h-150 overflow-scroll scrollbar-hide'>
            <div className='text-zinc-300'>
              <ul>
              {
                result.map((item,idx)=>(
                  <div key={idx+Math.random()} className={item.type=='q'?'flex justify-end':''}>
                    {
                    item.type=='q'?
                    <li key={idx+Math.random()} 
                    className='text-right border-5 bg-zinc-700 border-zinc-700 w-fit rounded-tl-3xl rounded-bl-3xl rounded-br-3xl' >
                    <Answers totalresult={1} ans={item.text} index={idx} type={item.type} /> </li>:
                    item.text.map((anstext,ansidx)=>(
                    <li key={ansidx+Math.random()} className='text-left' ><Answers totalresult={item.text.length} ans={anstext} index={ansidx} type={item.type} /> </li>
                    ))
                    }
                  </div>
                )) 
              }
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
