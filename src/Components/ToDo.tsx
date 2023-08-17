import React from "react";
import { IToDo, todoState } from "./Atoms";
import { useSetRecoilState } from "recoil";

const ToDo = ({ id, text, category }: IToDo) => {
  const setToDos = useSetRecoilState(todoState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("I wanna go to", e.currentTarget.name);

    const {
      currentTarget: { name },
    } = e;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldTodo = oldToDos[targetIndex];
      const newTodo = { id, text, category: name as any };
      console.log(oldTodo, newTodo);
      return [
        ...oldToDos.slice(0, targetIndex),
        newTodo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {/*Doing이 아닐땐
      doing버튼나오게*/}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          Todo
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
};

export default ToDo;
