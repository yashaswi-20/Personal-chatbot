import Answers from "./Answers";
const QuestionAnswer = ({item,idx}) => {
  return (
    <div key={idx} className={item.type == "q" ? "flex justify-end" : ""}>
      {item.type == "q" ? (
        <li className="text-right border-5 dark:bg-zinc-700  bg-red-200 dark:border-zinc-700 border-red-200 w-fit rounded-tl-3xl rounded-bl-3xl rounded-br-3xl">
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
  );
};
export default QuestionAnswer;
