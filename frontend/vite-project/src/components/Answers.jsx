import { useEffect, useState } from "react"

const Answers=({ans,index})=>{
    console.log(index)
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
        index==0?<span className="py-2 block text-lg ">{answer}</span>:
        heading?<span className="py-2 block text-lg ">{answer}</span>:
        <span className="pl-5">{ans}</span>
        }
        </>
    )
}

export default Answers