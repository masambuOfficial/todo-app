import { useState } from "react";
import { format, isPast } from "date-fns";

function TaskItem({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.text);

  const handleToggleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTask({ ...task, text: editedTask });
    setIsEditing(false);
  };

  const isDeadlinePassed = task.deadline && isPast(new Date(task.deadline));
  
  return (
    <li className={`flex items-center justify-between mb-2 p-2 border-0 rounded ${
      isDeadlinePassed ? 'bg-red-600 text-white' : 'bg-white'
    }`}>
      <div>
        {isEditing ? (
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            className="border rounded p-2 mr-2"
          />
        ) : (
          <span className={task.completed ? "line-through" : ""}>
            {task.text}
          </span>
        )}
        <span className="text-sm text-gray-500 ml-4">
          {task.deadline ? `Due: ${format(new Date(task.deadline), "PP")}` : ""}
        </span>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleToggleComplete}
          className="ml-2 mr-1  text-green-700 px-2 py-1 flex bg-transparent"
        >
          <i
            className={`bx ${task.completed ? "bx-check-circle" : "bx-circle"}`}
          ></i>
        </button>
        {!task.completed && (
          <button
            onClick={isEditing ? handleSave : handleEdit}
            className="mr-1  text-blue-700 px-2 py-1 bg-transparent"
          >
            <i className={`bx ${isEditing ? "bx-save" : "bx-edit-alt"}`}></i>
          </button>
        )}
        <button onClick={handleDelete} className="text-red-700 px-2 py-1 flex bg-transparent">
          <i className="bx bxs-trash"></i>
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
