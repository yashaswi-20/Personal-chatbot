import { useState } from 'react'
import './App.css'
import { URL } from './constant'
import { API } from './api'
import Answers from './components/Answers'

function App() {
  const [question, setQuestion] = useState('')
  const [result,setResult]=useState([])
  const [history,setHistory]=useState(JSON.parse(localStorage.getItem('item')))
  const [searchHistory,setSearchHistory]=useState("")

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
    if(!question)return false;
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
    setQuestion("")
  }

 // console.log(result);
 const clearHistory=()=>{
  localStorage.clear();
  setHistory([]);
 }

 const isEnter=(e)=>{
    if(e.key=='Enter') generate();
 }
  
  return (
    <div className='grid grid-cols-5'>
      <div className='col-span-1 bg-zinc-700 h-screen'>
         <ul>
          <div className='flex justify-center'>
          <span className='text-white text-center p-3 text-xl'>Recent Search</span>
          <button className='hover:cursor-pointer' onClick={clearHistory}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg></button>
          </div>
        { 
          history && history.map((item,idx)=>(
            <li key={idx} className='text-zinc-300 hover:bg-zinc-500 cursor-pointer truncate pl-3'>
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
                  <div key={idx} className={item.type=='q'?'flex justify-end':''}>
                    {
                    item.type=='q'?
                    <li 
                    className='text-right border-5 bg-zinc-700 border-zinc-700 w-fit rounded-tl-3xl rounded-bl-3xl rounded-br-3xl' >
                    <Answers totalresult={1} ans={item.text} index={idx} type={item.type} /> </li>:
                    item.text.map((anstext,ansidx)=>(
                    <li key={ansidx} className='text-left' ><Answers totalresult={item.text.length} ans={anstext} index={ansidx} type={item.type} /> </li>
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
            onKeyDown={isEnter}
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
