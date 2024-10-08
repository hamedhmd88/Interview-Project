import { useState } from "react";

function TodoInput({ addTodo }) {
  const [textContent, setTextContent] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [error, setError] = useState("");
  const [textError, setTextError] = useState(false); // State to track text content error
  const [dateError, setDateError] = useState(false); // State to track date error

  // Function to capitalize the first letter of each word
  const capitalizeFirstLetter = (text) => {
    return text.replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const handleTextChange = (e) => {
    const capitalizedText = capitalizeFirstLetter(e.target.value);
    setTextContent(capitalizedText);
  };

  const handleAddTodo = () => {
    let hasError = false; // Flag to track if there's an error

    // Reset error states before validating
    setTextError(false);
    setDateError(false);
    setError("");

    // Validation: Character limit
    if (textContent.length > 25) {
      setError("Character limit exceeded. Please enter less than 25 characters.");
      setTextError(true); // Mark text content as error
      hasError = true;
    }

    // Validation: Deadline must be greater than or equal to the creation date
    if (new Date(deadLine) < new Date(createDate)) {
      setError("Deadline cannot be earlier than the creation date.");
      setDateError(true); // Mark date input as error
      hasError = true;
    }

    if (hasError) return; // If there's an error, stop here

    // Check if all fields are properly filled out
    if (textContent.trim() && createDate && deadLine) {
      addTodo(textContent, createDate, deadLine);
      setTextContent("");
      setCreateDate("");
      setDeadLine("");
      setError(""); // Clear the error message on successful addition
    }
  };

  return (
    <div className="flex flex-col space-y-2 mb-4 items-center mt-5">
      <div className="w-64">
        <label htmlFor="taskContent" className="block text-gray-700 text-sm font-bold mb-2">
          Task Content
        </label>
        <input
          type="text"
          id="taskContent"
          placeholder="New Task..."
          className={`border p-2 rounded w-full ${
            textError ? "border-red-500" : "border-gray-300"
          }`}
          value={textContent}
          onChange={handleTextChange}
        />
      </div>

      <div className="w-64">
        <label htmlFor="creationDate" className="block text-gray-700 text-sm font-bold mb-2">
          Creation Date
        </label>
        <input
          type="date"
          id="creationDate"
          className={`border p-2 rounded w-full ${
            dateError ? "border-red-500" : "border-gray-300"
          }`}
          value={createDate}
          onChange={(e) => setCreateDate(e.target.value)}
        />
      </div>

      <div className="w-64">
        <label htmlFor="deadline" className="block text-gray-700 text-sm font-bold mb-2">
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          className={`border p-2 rounded w-full ${
            dateError ? "border-red-500" : "border-gray-300"
          }`}
          value={deadLine}
          onChange={(e) => setDeadLine(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Display error message if it exists */}

      <button
        onClick={handleAddTodo}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800 mt-2"
      >
        Add Task
      </button>
    </div>
  );
}

export default TodoInput;
