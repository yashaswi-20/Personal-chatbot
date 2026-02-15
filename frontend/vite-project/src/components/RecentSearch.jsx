function RecentSearch({history,setQuestion,setSearchHistory,setHistory}) {
  const clearHistory = () => {
    localStorage.clear();
    setHistory([]);
  };
   const showHistory = (item) => {
      console.log(item);
      setQuestion(item);
      setSearchHistory(item);
    };
  return (
    <>
      <div className="col-span-1 dark:bg-zinc-700 bg-red-100 h-screen">
        <ul>
          <div className="flex justify-center">
            <span className="dark:text-white text-zinc-700 text-center p-3 text-xl">
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
                className="dark:text-zinc-300 text-zinc-700 dark:hover:bg-zinc-500  hover:bg-zinc-300  cursor-pointer truncate pl-3"
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
export default RecentSearch;
