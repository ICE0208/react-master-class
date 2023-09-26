import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo: ITodo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });

    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form
        onSubmit={handleSubmit(onValid)}
        autoComplete="off"
      >
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        ></input>
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            $isDraggingOver={info.isDraggingOver}
            $draggingFromThisWith={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => {
              return (
                // key와 draggableId는 같아야 한다.
                <DraggableCard
                  key={toDo.id}
                  index={index}
                  toDoId={toDo.id}
                  toDoText={toDo.text}
                />
              );
            })}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 200px;
`;

interface IAreaProps {
  $isDraggingOver: boolean;
  $draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "#dfe6e9"
      : props.$draggingFromThisWith
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 14px;
`;

const Title = styled.h1`
  text-align: center;
  padding: 6px;
  padding-bottom: 10px;
  font-weight: boldx;
  font-size: 24px;
`;

export default Board;
