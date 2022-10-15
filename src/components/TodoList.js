import { useSelector } from "react-redux";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "../features/api/apiSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todo from "./Todo";
import tickImage from "../assets/images/double-tick.png";
// import { useEffect } from "react";

export default function TodoList({ statusTodo }) {
  const filters = useSelector((state) => state.filters);
  const { status, colors } = filters;

  const {
    data: todos,
    isLoading,
    isError,
    isSuccess: fetchSuccess,
  } = useGetTodosQuery({ status, colors });
  
  const [ deleteTodo ] = useDeleteTodoMutation();
  const [ editTodo ] = useEditTodoMutation();

  // const filterByStatus = (todo) => {
  //   switch (status) {
  //     case "Complete":
  //       return todo.completed;
  //     case "Incomplete":
  //       return !todo.completed;
  //     case "All":
  //       return todo;
  //     default:
  //       return todo;
  //   }
  // };

  // const filterByColor = (todo) => {
  //   if (colors.length > 0) {
  //     if (colors.includes(todo?.color)) {
  //       return todo;
  //     }
  //     return;
  //   }
  //   return todo;
  // };

  const handleCompleteAllTodo = () => {
    todos.forEach((todo) =>
      !todo.completed
        ? editTodo({
            id: todo.id,
            data: { ...todo, completed: !todo.completed },
          })
        : ""
    );
      toast.success('All tasks completed Successfully!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        limit : 1
    });
  };

  const handleClearCompletedTodo = () => {
    todos.forEach((todo) => (todo.completed ? deleteTodo(todo.id) : ""));
      toast.success('Clear completed tasks Successfully!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        limit : 1
    });
  };

  let content = null;

  if (isLoading) {
    content = (
      <>
        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
          {statusTodo
            ? "Loading Complete Todos..."
            : "Loading Incomplete Todos..."}
        </div>
      </>
    );
  }

  if (!isLoading && isError) {
    content = (
      <>
        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
          An error has been occurred during fetching Todos...
        </div>
      </>
    );
  }

  if (!isLoading && !isError && todos?.length === 0) {
    content = (
      <>
        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
          {statusTodo ? "No Complete Task Found" : "No Incomplete Task Left"}
        </div>
      </>
    );
  }

  if (!isLoading && !isError && todos?.length > 0) {
    // let totalTodosByStatus = todos.filter(filterByStatus).filter(filterByColor);
    let totalTodosByStatus = todos;
    if (
      totalTodosByStatus.filter((todo) => todo.completed === statusTodo)
        .length > 0
    ) {
      content = totalTodosByStatus.map(
        (todo) =>
          todo.completed === statusTodo && <Todo key={todo.id} todo={todo} />
      );
    } else {
      content = (
        <>
          <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
            {statusTodo ? "No Complete Task Found" : "No Incomplete Task Left"}
          </div>
        </>
      );
    }
  }

  const todosByStatus = todos
    ? todos.filter((todo) => {
        if (statusTodo) {
          return todo.completed;
        } else if (!statusTodo) {
          return !todo.completed;
        }
        return false;
      })
    : [];

  return (
    <>
      <h6 className="mb-4 text-sm font-extrabold tracking-tight leading-none text-gray-900 md:text-sm lg:text-sm dark:text-black">
        <ul className="flex justify-between my-4 text-xs text-gray-500">
          <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
            {statusTodo ? "Completed " : "Incomplete "}{" "}
            {todosByStatus.length < 2 ? "Task" : "Tasks"} (
            {todosByStatus.length})
          </span>

          {fetchSuccess && (
            <>
              {!statusTodo && (
                <li
                  className="flex space-x-1 cursor-pointer"
                  onClick={handleCompleteAllTodo}
                >
                  <img className="w-4 h-4" src={tickImage} alt="Complete" />
                  <span>Complete All Tasks</span>
                </li>
              )}
              {statusTodo && (
                <li
                  className="cursor-pointer"
                  onClick={handleClearCompletedTodo}
                >
                  * Clear completed
                </li>
              )}
            </>
          )}
          {isLoading && <li>Loading...</li>}
        </ul>
      </h6>
      <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
        {content}
      </div>
    </>
  );
}
