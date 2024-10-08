import { useState, useEffect } from "react";

function TodoText({ todos, setTodos, editTask }) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editDeadLine, setEditDeadLine] = useState("");
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      updateCountdown();
    }, 1000);
    return () => clearInterval(timer);
  }, [todos]);

  const updateCountdown = () => {
    const updatedTimeLeft = todos.map((item) => ({
      id: item.id,
      time: calculateTimeLeft(item.deadLine),
    }));
    setTimeLeft(updatedTimeLeft);
  };

  const calculateTimeLeft = (deadline) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const difference = deadlineDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragEnter = (index) => {
    const newList = [...todos];
    const draggedItemContent = newList[draggedItem];
    newList.splice(draggedItem, 1);
    newList.splice(index, 0, draggedItemContent);
    setDraggedItem(index);
    setTodos(newList);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const isDeadlineOver = (deadline) => new Date(deadline) < new Date();

  const startEditing = (item) => {
    setEditingIndex(item.id);
    setEditContent(item.textContent);
    setEditDeadLine(item.deadLine);
  };

  const saveEdit = (itemId) => {
    editTask(itemId, editContent, editDeadLine);
    setEditingIndex(null);
    setEditContent("");
    setEditDeadLine("");
  };

  const deleteTask = (itemId) => {
    setTodos((prevTodos) => prevTodos.filter((task) => task.id !== itemId));
  };

  return (
    <div className="bg-gray-200 p-10 w-1/2">
      <ul className="w-full">
        {todos.map((item, index) => {
          const time = timeLeft.find((timeItem) => timeItem.id === item.id)
            ?.time || {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };

          return (
            <li
              key={item.id}
              className={`${
                isDeadlineOver(item.deadLine)
                  ? "bg-red-400"
                  : "bg-green-400 text-white"
              } text-gray-800 font-semibold py-5 px-4 mb-6 rounded-lg shadow-md cursor-move select-none flex items-center justify-between w-full`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
            >
              {editingIndex === item.id ? (
                <div className="flex items-center justify-center w-full">
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="border border-gray-300 p-1 rounded w-full mr-2"
                  />
                  <input
                    type="date"
                    value={editDeadLine}
                    onChange={(e) => setEditDeadLine(e.target.value)}
                    className="border border-gray-300 p-1 rounded w-full mr-2"
                  />
                  <button
                    onClick={() => saveEdit(item.id)}
                    className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded transition"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center w-full">
                    <span
                      className={`${
                        isDeadlineOver(item.deadLine)
                          ? "line-through decoration-slate-700"
                          : ""
                      } text-xl`}
                    >
                      {item.textContent}
                    </span>
                    <span className="text-xs ml-2 text-zinc-900">
                      DeadLine: {item.deadLine} _ ({time.days}d {time.hours}h{" "}
                      {time.minutes}m {time.seconds}s remaining)
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => startEditing(item)}
                        disabled={isDeadlineOver(item.deadLine)}
                        className={`${
                          isDeadlineOver(item.deadLine)
                            ? "cursor-none opacity-50 bg-slate-400 hover:bg-slate-400"
                            : ""
                        } text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm transition`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(item.id)}
                        className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-sm transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoText;
