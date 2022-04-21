import React, { FC, useState, ChangeEvent } from "react";
import "./App.css";
import TodoTask from "./components/TodoTask";
import { ITask } from "./interfaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskToDo: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  };

  const completeTask = (taskToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.taskToDo !== taskToDelete
    }))
  }

  return (
    <div className="App">
      <div className="title">Smile's Todo App</div>
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Your task"
            name="task"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in days)"
            name="deadline"
            onChange={handleChange}
          />
        </div>

        <button onClick={addTask}>Add task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return (
            <TodoTask key={key} task={task} completeTask={completeTask}></TodoTask>
          );
        })}
      </div>
    </div>
  );
};

export default App;
