import { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';


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
   


    const renderer={
        code({node,inline,className,children,...props}){
            
            console.log("inline:", inline);
            console.log("className:", className);
            console.log("children:", children);
            console.log("props:", props);
            const match= /language-(\w+)/.exec(className || '');
            return !inline && match?(
                <SyntaxHighlighter
                {...props}
                children={String(children).replace(/\n$/,'')}
                language={match[1]}
                style={dark}
                PreTag="div"
                />
            ):(
                <code {...props}className={className}>
                    {children}
                </code>
            )
        }
    }
     
               
            

    return(
        <>
        {
        index===0 && totalresult>1?<span className="py-2 block text-lg dark:text-white text-zinc-800 ">{answer || ans}</span>:
        heading?<span className="py-2 block text-lg dark:text-white text-zinc-700 ">{answer}</span>:
        <span className={type=='q'?'pl-1 dark:text-white text-zinc-800':'pl-5 dark:text-white text-zinc-800'}>
           
            <ReactMarkdown components={renderer}>{String(ans)}</ReactMarkdown>
            </span>
        }
        </>
    )
}

export default Answers