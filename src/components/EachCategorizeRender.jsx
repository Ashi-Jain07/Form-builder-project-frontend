import { useState } from "react";

function EachCategorizeRender(props) {

    const [categories, setCategories] = useState(
        props.data.categories.map((category) => ({
            name: category,
            items: [],
        }))
    );

    // Function to handle drag start
    const handleDragStart = (event, text) => {
        event.dataTransfer.setData("text/plain", text);
    };

    // Function to handle drop
    const handleDrop = (event, categoryName) => {
        event.preventDefault();
        const draggedText = event.dataTransfer.getData("text/plain");

        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.name === categoryName
                    ? { ...category, items: [...category.items, draggedText] }
                    : category
            )
        );
    };

    // Function to allow dropping
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <h2 className="text-xl font-semibold mt-8">Q. {props.data.description}</h2>

            {/* Render answers as draggable items */}
            <p className="m-7">
                {props.data.answers.map((data) => (
                    <span
                        key={data._id}
                        className="bg-red-200 text-xl w-max m-2 p-2 cursor-pointer"
                        draggable
                        onDragStart={(event) => handleDragStart(event, data.text)}
                    >
                        {data.text}
                    </span>
                ))}
            </p>

            {/* Render categories as drop zones */}
            <div className="flex justify-center mt-8 ">
                {categories.map((category) => (
                    <div key={category.name}>
                        <p className="border border-black px-5 py-2 mt-2 text-center">
                            {category.name}
                        </p>
                        <p
                            className="border border-black h-10 flex items-center justify-center px-5 py-5"
                            onDrop={(event) => handleDrop(event, category.name)}
                            onDragOver={handleDragOver}
                        >
                            {category.items.length > 0
                                ? category.items.map((item, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-200 text-xl px-2 py-0.5 m-1 rounded"
                                    >
                                        {item}
                                    </span>
                                ))
                                : <span className="text-gray-500">Drop here</span>}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EachCategorizeRender;