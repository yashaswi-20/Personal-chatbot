import { useEffect, useRef, useState } from "react";
import "./App.css";
import { URL } from "./constant";
import { API } from "./api";
import Answers from "./components/Answers";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("item")),
  );
  const [searchHistory, setSearchHistory] = useState("");
  const scroolToAns = useRef();
  const [loader,setLoader]=useState(false)

  const generate = async (whoCalls = false) => {
    if (!question && !searchHistory) return false;
    setLoader(true)

    const payload = {
      contents: [
        {
          parts: [
            {
              text: question,
            },
          ],
        },
      ],
    };

    let response = await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());
    // console.log(dataString)
    // console.log(result.candidates[0].content.parts[0].text)
    setResult([
      ...result,
      { type: "q", text: question },
      { type: "a", text: dataString },
    ]);

    if (whoCalls === false) {
      let item = JSON.parse(localStorage.getItem("item"));
      if (localStorage.getItem("item")) {
        setHistory([question, ...item]);
        let total = [question, ...item];
        localStorage.setItem("item", JSON.stringify(total));
      } else {
        localStorage.setItem("item", JSON.stringify([question]));
        setHistory([question]);
      }
    }
    setQuestion("");
    setLoader(false);
  };
  useEffect(() => {
    if (!scroolToAns.current) return;
    scroolToAns.current.scrollTop = scroolToAns.current.scrollHeight;
  }, [result]);

  // console.log(result);
  const clearHistory = () => {
    localStorage.clear();
    setHistory([]);
  };

  const isEnter = (e) => {
    if (e.key == "Enter") generate();
  };

  const showHistory = (item) => {
    console.log(item);
    setQuestion(item);
    setSearchHistory(item);
  };
  useEffect(() => {
    if (!searchHistory) return;
    generate(true);
  }, [searchHistory]);

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1 bg-zinc-700 h-screen">
        <ul>
          <div className="flex justify-center">
            <span className="text-white text-center p-3 text-xl">
              Recent Search
            </span>
            <button className="hover:cursor-pointer" onClick={clearHistory}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#e3e3e3"
              >
                <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
              </svg>
            </button>
          </div>
          {history &&
            history.map((item, idx) => (
              <li
                key={idx}
                onClick={() => showHistory(item)}
                className="text-zinc-300 hover:bg-zinc-500 cursor-pointer truncate pl-3"
              >
                {item}
              </li>
            ))}
        </ul>
      </div>

      <div className="col-span-4 p-10">
        <h1 className=" text-center text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700"
        >Hello User, Ask Me Anything</h1>
        {
          loader?<div role="status" className="flex justify-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 animate-spin text-gray-300 fill-blue-500"

            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>:null
          
        }
        
        <div
          ref={scroolToAns}
          className="container h-150 overflow-scroll scrollbar-hide"
        >
          <div className="text-zinc-300">
            <ul>
              {result.map((item, idx) => (
                <div
                  key={idx}
                  className={item.type == "q" ? "flex justify-end" : ""}
                >
                  {item.type == "q" ? (
                    <li className="text-right border-5 bg-zinc-700 border-zinc-700 w-fit rounded-tl-3xl rounded-bl-3xl rounded-br-3xl">
                      <Answers
                        totalresult={1}
                        ans={item.text}
                        index={idx}
                        type={item.type}
                      />{" "}
                    </li>
                  ) : (
                    item.text.map((anstext, ansidx) => (
                      <li key={ansidx} className="text-left">
                        <Answers
                          totalresult={item.text.length}
                          ans={anstext}
                          index={ansidx}
                          type={item.type}
                        />{" "}
                      </li>
                    ))
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-zinc-700 w-1/2 text-white m-auto rounded-4xl border p-1 pr-5 border-zinc-600 flex">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full h-full p-3 outline-none"
            placeholder="Ask anything"
            onKeyDown={isEnter}
          />
          <button type="button" onClick={generate}>
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
