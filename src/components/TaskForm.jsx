import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function TaskForm({ addTask }) {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() && deadline) {
      addTask({ id: Date.now(), text: task, completed: false, deadline });
      setTask('');
      setDeadline(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border rounded py-2 px-3 mr-2 "
        placeholder="Enter your new task here"
      />
       <DatePicker
        selected={deadline}
        onChange={(date) => setDeadline(date)}
        className="border rounded p-2 mr-2"
        placeholderText="Select deadline"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
      <i className='bx bx-plus'></i> Add Task 
      </button>
    </form>
  );
}

export default TaskForm;
