import React from "react";
import { useRecoilState } from "recoil";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";

import { toDoState } from "./Atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const App = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: any) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return; //예외처리 : 영역밖으로 옮겼을 경우 원래상태로
    if (destination.droppableId === source.droppableId) {
      // 같은 보드에서 움직이는 경우
      setToDos((oldToDos) => {
        const copyToDos = [...oldToDos[source.droppableId]];
        const taskObj = copyToDos[source.index];
        // 1) source 아이템요소 잘라내기
        copyToDos.splice(source.index, 1);
        // 2) destination 도착지점에 붙여넣기
        copyToDos.splice(destination?.index, 0, taskObj);
        return {
          ...oldToDos,
          [source.droppableId]: copyToDos,
        };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      // 서로 다른 보드에서 움직이는 경우
      setToDos((oldToDos) => {
        const sourceBoard = [...oldToDos[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...oldToDos[destination.droppableId]];
        // 1) source 아이템요소 잘라내기
        sourceBoard.splice(source.index, 1);
        // 2) destination 도착지점에 붙여넣기
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...oldToDos,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardID) => (
            <Board boardID={boardID} key={boardID} toDos={toDos[boardID]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
};

export default App;
