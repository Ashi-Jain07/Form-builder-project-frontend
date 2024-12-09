import { useState } from "react";

function CategorizeQuestion() {
  const [description, setDescription] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [answers, setAnswers] = useState([]);

  async function handleAddQuestion() {
    const type = "Categorize";
    try {
      const response = await fetch("https://form-builder-project-backend.onrender.com/addCategorize", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, description, categories, answers }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      console.log(data);
      alert("Question added");
      setDescription("");
      setCategories([]);
      setAnswers([]);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  function addCategory() {
    if (categoryInput.trim()) {
      setCategories([...categories, categoryInput]);
      setCategoryInput("");
    }
  };

  function addAnswer(e) {
    e.preventDefault();
    if (text && category) {
      setAnswers([...answers, { text, category }]);
      setText("");
      setCategory("");
    };
  }

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("draggedItemIndex", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedItemIndex"), 10);
    if (draggedIndex === dropIndex) return; // No reordering needed

    const updatedCategories = [...categories];
    const [draggedItem] = updatedCategories.splice(draggedIndex, 1);
    updatedCategories.splice(dropIndex, 0, draggedItem);

    setCategories(updatedCategories);
  };

  return (
    <div className="ml-5 border-b border-black pb-5">

      <h1 className="text-2xl font-bold mt-5">Categorize Question</h1>
      <input
        type="text"
        placeholder="Enter description of question"
        className="w-2/5 m-1 h-9 rounded-md border border-black p-2 mt-5"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div>

        <h2 className="text-2xl font-semibold mt-5 m-1">Add Categories</h2>
        <div>
          {categories.map((category, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="bg-red-200 w-max m-2 p-2 cursor-pointer"
            >
              <p>• {category}</p>
            </div>
          ))}
        </div>

        <input
          type="text"
          className="w-1/5 h-9 rounded-md border border-black p-1 m-2"
          value={categoryInput}
          placeholder="Enter Category"
          onChange={(e) => setCategoryInput(e.target.value)}
        />
        <button onClick={addCategory}>Add</button>

      </div>

      <div>

        <h2 className="text-2xl font-semibold mt-5 m-1">Add Answer</h2>
        <div>
          {answers.map((answer, index) => (
            <div key={index} className="flex gap-4 bg-red-200 w-max m-2 p-2">
              <p>• {answer.text} -</p>
              <p>{answer.category}</p>
            </div>
          ))}
        </div>

        <form>
          <input
            type="text"
            className="w-1/5 h-9 rounded-md border border-black p-1 m-2"
            placeholder="Enter Answer"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            required
            className="w-1/5 h-9 rounded-md border border-black p-1 m-2"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
          <button onClick={addAnswer} type="submit">
            Add
          </button>
        </form>
      </div>

      <button onClick={handleAddQuestion} className="m-2 border border-black bg-slate-100 p-2 rounded-md">Add Question</button>
    </div>
  );
};

export default CategorizeQuestion;