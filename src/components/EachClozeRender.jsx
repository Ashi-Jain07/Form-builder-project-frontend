import { useState } from "react";

function EachClozeRender(props) {

    // Initialize the question with blanks
    const [question, setQuestion] = useState(
        props.data.question.split(" ").map((word) => ({
            text: word,
            isBlank: word === "__",
            filled: null,
        }))
    );

    // Attach the dragged text to the dataTransfer object
    const handleDragStart = (event, optionText) => {
        event.dataTransfer.setData("text/plain", optionText);
    };

    const handleDrop = (event, index) => {
        event.preventDefault();
        const draggedText = event.dataTransfer.getData("text/plain");

        // Update the state to replace the blank with the dropped text
        setQuestion((prevQuestion) =>
            prevQuestion.map((word, wordIndex) =>
                wordIndex === index && word.isBlank
                    ? { ...word, filled: draggedText }
                    : word
            )
        );
    };

    // Allow drop by preventing default behavior
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div>

            <h2 className="text-xl font-semibold mt-8">
                Q.{" "}
                {question.map((word, index) => (
                    <span
                        key={index}
                        className={`m-2 ${word.isBlank
                            ? "border-b-2 border-dashed border-gray-400 px-2"
                            : ""
                            }`}
                        onDrop={word.isBlank ? (event) => handleDrop(event, index) : null}
                        onDragOver={word.isBlank ? handleDragOver : null}
                    >
                        {word.isBlank ? (word.filled) : word.text}
                    </span>
                ))}
            </h2>

            {/* Render draggable options */}
            <div className="m-7">
                {props.data.options.map((option, index) => (
                    <span
                        key={index}
                        className="bg-red-200 text-xl w-max m-2 p-2 cursor-pointer"
                        draggable
                        onDragStart={(event) => handleDragStart(event, option)}
                    >
                        {option}
                    </span>
                ))}
            </div>

        </div>
    );
};

export default EachClozeRender;