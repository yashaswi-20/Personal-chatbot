import { useEffect, useState } from "react"

const Answers=({ans,index,totalresult,type})=>{
   // console.log(index)
   //console.log(ans)
    const [heading,setHeading]=useState(false);
    const[answer,setAnswer]=useState('')
    useEffect(()=>{
        if(checkHeading(ans)){
            setHeading(true)
            setAnswer(replaceHeadingStart(ans))
        }
    },[])

    const checkHeading=(str)=>{
        return /^(\*)(\*)(.*)\*$/.test(str)
    }   
    const replaceHeadingStart=(str)=>{
        return str.replace(/^(\*)(\*)|(\*)$/g,'')
    }

    return(
        <>
        {
        index===0 && totalresult>1?<span className="py-2 block text-lg text-white ">{answer || ans}</span>:
        heading?<span className="py-2 block text-lg text-white ">{answer}</span>:
        <span className={type=='q'?'pl-1':'pl-5'}>{ans}</span>
        }
        </>
    )
}

export default Answers