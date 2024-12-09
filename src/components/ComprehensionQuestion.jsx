import React, { useState } from 'react';
import { Link } from 'react-router';

function ComprehensionQuestion() {

  const [para, setPara] = useState("");
  const [question, setQuestion] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [options, setOptions] = useState([]);

  function addAnswer() {
    setOptions([...options, answerInput]);
    setAnswerInput(" ")
  }

  async function handleAddQuestion() {
    const type = "Comprehension";
    try {
      const response = await fetch("https://form-builder-project-backend.onrender.com/addComprehension", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, para, question, options }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      console.log(data);
      alert("Question added");
      setPara("");
      setQuestion("");
      setAnswerInput("");
      setOptions([]);

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className='ml-5 mb-5'>

      <h1 className="text-2xl font-bold mt-5">Comprehension Question</h1>
      <textarea cols="50" rows="10" placeholder='Enter Paragraph' value={para} className='p-2 border border-black mt-5' onChange={(e) => setPara(e.target.value)} />
      <br />
      <input
        type="text"
        placeholder="Enter question"
        className="w-2/5 m-1 h-9 rounded-md border border-black p-2 mt-5"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {question && <p className='bg-green-500 w-max p-2 py-1'>{question}</p>}<br />
      <input
        type="text"
        value={answerInput}
        placeholder="Enter answer"
        className="w-2/5 m-1 mr-2 mb-2 h-9 rounded-md border border-black p-2 mt-5"
        onChange={(e) => setAnswerInput(e.target.value)}
      />
      <button onClick={addAnswer}>Add</button>

      {
        options && options.map((option, index) => (
          <p key={index} className='bg-red-200 w-max p-2 py-1 mt-1'>• {option}</p>
        ))
      }
      <br />
      <button onClick={handleAddQuestion} className="mb-2 mt-3 border border-black bg-slate-100 p-2 rounded-md">Add Question</button><br />

      <Link to="/renderPage">
        <button className="mb-2 mt-3 border border-black bg-slate-100 p-2 rounded-md">See Render Page</button>
      </Link>
    </div>
  );
};

export default ComprehensionQuestion;