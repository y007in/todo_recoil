import { error } from "console";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// const TodoList = () => {
//   const [todo, setTodo] = useState("");
//   const [todoError, setTodoError] = useState("");

//   const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = e;
//     setTodoError("");
//     setTodo(value);
//   };
//   const onSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (todo.length < 5) {
//       return setTodoError("Todo should be longer...");
//     }
//     console.log(todo);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input value={todo} placeholder="Write a Todo" onChange={onChange} />
//         <button>Add</button>
//         {todoError !== "" ? todoError : null}
//       </form>
//     </div>
//   );
// };

interface IForm {
  todo: string;
}

const TodoList = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    console.log("add todo", data.todo);
    setValue("todo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("todo", { required: "Please Write a Todo" })}
          placeholder="Write a Todo"
        />
        <button>Add</button>
      </form>
    </div>
  );
};

// interface IForm {
//   email: string;
//   firstName: string;
//   lastName: string;
//   userName: string;
//   passWord: string;
//   passWord1: string;
// }

// const TodoList = () => {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm();
//   const onValid = (data: IForm) => {
//     if (data.passWord !== data.passWord1) {
//       setError(
//         "passWord1",
//         { message: "passWord id not the same..." },
//         { shouldFocus: true }
//       );
//     }
//     console.log(data);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onValid)}>
//         {/* add버튼을 클릭하면 값 출력 */}
//         <input
//           {...register("email", {
//             required: true,
//             pattern: {
//               value: /^[A-Za-z0-9]+@naver.com/gm,
//               message: "Only naver.com emails allowed",
//             },
//           })} //입력되지 않으면 넘어가지 않도록 설정(필수값) -> require 기본값 true => 조건에 맞을 때 메세지를 띄울 수 있음
//           placeholder="Write a email"
//         />
//         <span>{errors?.email?.message as string}</span>

//         <input
//           {...register("firstName", {
//             required: "Write Here",
//             validate: (value) => !value.includes("test"),
//           })}
//           placeholder="Write a firstName"
//         />
//         <span>{errors?.firstName?.message as string}</span>

//         <input {...register("lastName")} placeholder="Write a lastName" />
//         <span>{errors?.lastName?.message as string}</span>

//         <input
//           {...register("userName", { required: true, minLength: 2 })} //최소 입력 지정
//           placeholder="Write a userName"
//         />
//         <span>{errors?.userName?.message as string}</span>

//         <input
//           {...register("passWord", {
//             required: true,
//             minLength: {
//               value: 5,
//               message: "Your password is too short",
//             },
//           })}
//           placeholder="Write a passWord"
//         />
//         <span>{errors?.passWord?.message as string}</span>

//         <input {...register("passWord1")} placeholder="Write a passWord1" />
//         <span>{errors?.passWord1?.message as string}</span>
//         <button>Add</button>
//       </form>
//     </div>
//   );
// };

export default TodoList;
