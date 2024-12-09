import { useEffect } from "react";
import { useState } from "react";
import EachCategorizeRender from "./EachCategorizeRender";

function CategorizeRender() {

  const [formData, setFormData] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch("https://form-builder-project-backend.onrender.com/getCategorize", {
        method: "GET",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      console.log(data);
      setFormData(data);

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="text-center border-b border-black pb-8">
      <h1 className="text-3xl font-bold mt-5">Categorize Question</h1>
      {
        formData && formData.map(eachData => (
          <EachCategorizeRender key={eachData._id} data={eachData} />
        ))
      }
    </div>
  )
};

export default CategorizeRender;