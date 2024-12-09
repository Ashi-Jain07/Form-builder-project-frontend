import { useEffect } from "react";
import { useState } from "react";
import EachClozeRender from "./EachClozeRender";

function ClozeRender() {
    const [formData, setFormData] = useState([]);

    async function fetchData() {
        try {
            const response = await fetch("https://form-builder-project-backend.onrender.com/getCloze", {
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
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="text-center border-b border-black p-8">
            <h1 className="text-3xl font-bold mt-10">Cloze Question</h1>
            {
                formData && formData.map(eachData => (
                    <EachClozeRender key={eachData._id} data={eachData} />
                ))
            }
        </div>
    )
};

export default ClozeRender;