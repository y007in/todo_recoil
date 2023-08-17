import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { todoState, toDoSelector, categoryState } from "./Atoms";
import CreateTodo from "./CreateTodo";
import ToDo from "./ToDo";

const TodoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [toDo, doing, done] = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value);
  };
  console.log(category);

  return (
    <div>
      <h1>Todo's</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value="TO_DO">ToDo</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateTodo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
};

export default TodoList;
