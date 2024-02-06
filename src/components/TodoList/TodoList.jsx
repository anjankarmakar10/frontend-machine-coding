import { useState } from "react";
import styles from "./TodoList.module.css";
import { useReducer } from "react";

const reducer = (state, action) => {
  if (action.type === "add-todo") {
    return [
      ...state,
      {
        value: action.todo,
        id: crypto.randomUUID(),
        chacked: false,
      },
    ];
  }
  if (action.type === "remove-todo") {
    return state.filter((todo) => todo.id !== action.todoId);
  }
  if (action.type === "update-todo") {
    return state.map((todo) =>
      todo.id === action.todoId ? { ...todo, chacked: !todo.chacked } : todo
    );
  }
};

function TodoList() {
  const [tentativeTodo, setTentativeTodo] = useState("");
  const [state, dispatch] = useReducer(reducer, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tentativeTodo.trim("")) {
      setTentativeTodo("");
      return;
    }

    dispatch({
      type: "add-todo",
      todo: tentativeTodo,
    });
    setTentativeTodo("");
  };

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo-input">What needs to be done?</label>
        <input
          required
          value={tentativeTodo}
          onChange={(e) => setTentativeTodo(e.target.value)}
          id="todo-input"
        />
      </form>
      <ol>
        {state.map((todo) => (
          <li key={todo.id}>
            <input
              onChange={() =>
                dispatch({
                  type: "update-todo",
                  todoId: todo.id,
                })
              }
              type="checkbox"
              id="todo-1"
            />
            <label htmlFor="todo-1">{todo.value}</label>
            <button
              onClick={() =>
                dispatch({
                  type: "remove-todo",
                  todoId: todo.id,
                })
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default TodoList;
