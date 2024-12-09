import React, { useState } from 'react';

function ClozeQuestion() {

  const [question, setQuestion] = useState("");
  const [questionArray, setQuestionArray] = useState([]);
  const [options, setOptions] = useState([]);

  function addQuestion(e) {
    e.preventDefault();
    const stringToArr = question.split(" ");
    setQuestionArray(stringToArr);
  }

  function addOptions(item) {
    setOptions([...options, item]);
    const newQuestion = question.replaceAll(item, "__");
    setQuestion(newQuestion)
  }

  async function handleAddQuestion() {
    const type = "Cloze";
    try {
      const response = await fetch("https://form-builder-project-backend.onrender.com/addCloze", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, question, options }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      console.log(data);
      alert("Question added");
      setQuestion("");
      setQuestionArray([]);
      setOptions([]);

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className='ml-5 border-b border-black'>

      <h1 className="text-2xl font-bold mt-5">Cloze Question</h1>
      {question && <p className='text-lg mt-2 bg-green-500 w-max p-2 py-1'>{question}</p>}

      <input
        type="text"
        placeholder="Enter question"
        className="w-2/5 m-1 h-9 rounded-md border border-black p-2 mt-5"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={(e) => addQuestion(e)}>Add</button><br />

      <h3 className='text-lg mt-4 font-semibold'>Select word to underline</h3>
      {
        questionArray && questionArray.map((item, index) => (
          <span key={index} onClick={() => addOptions(item)} className='mr-2 hover:cursor-pointer'>{item}</span>
        ))
      }

      <h3 className='text-lg mt-4 font-semibold'>Options</h3>
      {
        options && options.map((item, index) => (
          <p key={index} className='bg-red-200 w-max p-2 py-1 mt-1'>• {item}</p>
        ))
      }

      <button onClick={handleAddQuestion} className="mb-2 mt-5 border border-black bg-slate-100 p-2 rounded-md">Add Question</button>
    </div>
  );
};

export default ClozeQuestion;