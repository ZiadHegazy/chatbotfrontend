import { useEffect, useRef, useState } from "react";
import './Home.css'
export function Home() {
    const [lines, setLines] = useState([]);
    const [question, setQuestion] = useState("");
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const handleQuestionChange=(e)=>{
        setQuestion(e.target.value);
    }
    const handleQuestionSubmit=()=>{
        setQuestions([...questions,question]);
        setQuestion("");
        setAnswers([...answers,["I am a chatbot, I am here to help you with your queries.","Doctor mohamed will be available today at 10pm"]]);
        setLines(["I am a chatbot, I am here to help you with your queries.","Doctor mohamed will be available today at 10pm"]);
    }
    useEffect(()=>{
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
        
      </div>
      <br></br>
      <div className="chat-form">
                <textarea value={question} onChange={handleQuestionChange} class="chat-input" placeholder="Ask Question..."></textarea>
                <button className="submitbtn" onClick={handleQuestionSubmit}>Send</button>
     </div>
    </div>
  );
}