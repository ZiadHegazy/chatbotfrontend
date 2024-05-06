import { useEffect, useRef, useState } from "react";
import './Home.css'
export function Home() {
    const [lines, setLines] = useState([]);
    const [question, setQuestion] = useState("");
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [questionTemp,setQuestionTemp]=useState("");
    const [answerTemp,setAnswerTemp]=useState([]);
    const [letterIndex,setLetterIndex]=useState(0);
    const [answerIndex,setAnswerIndex]=useState(0);
    const handleQuestionChange=(e)=>{
        setQuestion(e.target.value);
    }
    const handleQuestionSubmit=()=>{
        const lines=["Doctor Amr will be available today at 10pm","Anything else you want to ask?"]
        setLines(lines);
        setAnswerTemp(lines);
        setQuestionTemp(question);
        handleLineByLine(lines,question);
    }
    const handleLineByLine=(lines2,questionTemp2)=>{
        var letterIndex2=letterIndex;
        var answerIndex2=answerIndex;
        var timer=0;
        var interval=setInterval(()=>{
            timer+=1;
            if(timer%2.25==0){
                document.getElementById("lastQ1")?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            if(lines2.length>0 &&  letterIndex2<lines2[answerIndex2].length){
                setLetterIndex(letterIndex=>letterIndex+1);
                letterIndex2+=1;
            }
            else{
                setLetterIndex(0);
                letterIndex2=0;
                answerIndex2+=1;
                setAnswerIndex(answerIndex=>answerIndex+1);
            }
            if(answerIndex2>=lines2.length){
                clearInterval(interval);
                setQuestions(questions=>[...questions,questionTemp2]);
                setQuestion("");
                setAnswers(answers=>[...answers,lines2]);
                setQuestionTemp("");
                setAnswerTemp([]);
                setAnswerIndex(0);
                setLetterIndex(0);
                
        
            }
        },40);

    }
    useEffect(()=>{
        console.log(questions);
        document.getElementById("lastQ")?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [questions]);
    
  return (
    <div className="mainDiv">
      
      <h1>Customer Service Chatbot</h1>
      <div className="question-answer">
        {
            questions.map((question,index)=>{
                return( <div id={index==questions.length-1? "lastQ":("Q"+index)} className="QA"> 
                    <div className="question">
                    <label>You:</label>
                    <br></br>
                    <label>{question}</label>
                </div>
                <br></br>
                <div className="answer" >
                    <label>Chatbot:</label>
                    <ul>
                        {answers[index].map((answer)=>{
                            return <li>{answer}</li>
                        })}
                    </ul>
                </div>
                     </div>)
            })
        }
       {questionTemp!="" &&  <div  className="QA"> 
                    <div className="question">
                    <label>You:</label>
                    <br></br>
                    <label>{questionTemp}</label>
                </div>
                <br></br>
                <div id="lastQ1" className="answer" >
                    <label>Chatbot:</label>
                    <ul>
                        {answerTemp.slice(0,answerIndex+1).map((answer,index)=>{
                            if(index==answerIndex){
                                return <li>{answer.substring(0,letterIndex)}</li>
                            }else{
                                return <li>{answer}</li>
                            }
                        })}
                    </ul>
                </div>
         </div>}
        
      </div>
      <br></br>
      <div className="chat-form">
                <textarea value={question} onChange={handleQuestionChange} class="chat-input" placeholder="Ask Question..."></textarea>
                <button className="submitbtn" onClick={handleQuestionSubmit}>Send</button>
     </div>
    </div>
  );
}