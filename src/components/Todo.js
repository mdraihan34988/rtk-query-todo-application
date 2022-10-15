// import { useDispatch } from "react-redux";
import { useState } from "react";
import cancelImage from "../assets/images/cancel.png";
import editImage from "../assets/images/pencil.png";
import { useDeleteTodoMutation, useEditTodoMutation } from "../features/api/apiSlice";
// import {toggoled,deleted,colorChange} from '../redux/todos/actionCreators'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Todo({todo}) {
    // const dispatch = useDispatch();
    const [deleteTodo] = useDeleteTodoMutation();
    const [editTodo] = useEditTodoMutation();

    const {id,text,completed,color} = todo;

    const [editToggle,setEditToggle] = useState(false);
    const [todoText,setTodoText] = useState(text);
    

    const handleChangeStatus = (id) => {
        editTodo({id, data : {
            ...todo,
            completed : !completed,
        }});
        toast.success('Todo Status Changed Successfully!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            limit : 1
        });
    }

    const handleDeleteTodo = (id) => {
        deleteTodo(id);
        toast.success('Todo Deleted Successfully!', {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            limit : 1
        });
    }
    
    const handleTodoColorChange = (id,value) => {
        if(!completed) {
            editTodo({id, data : {
                ...todo,
                color : value
            }});
    
            let messsage = "";
            if( value === "red") {
                messsage = "High priory set to "+ text;
            } else if( value === "yellow" ) {
                messsage = "Medium priory set to "+ text;
            } else if( value === "green" ) {
                messsage = "Low priory set to "+ text;
            } 
            toast.success(messsage, {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                limit : 1
            });
        } else {
            toast.error('Can not permitted to set priority at completed task!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                limit : 1
            });
        }
        
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        editTodo({id, data : {
            ...todo,
            text : todoText,
        }});
        toast.success('Todo Updated Successfully!', {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            limit : 1
        });

        setEditToggle(false);
    }
    

    return (
        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
            <div className="rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 border-green-500 focus-within:border-green-500 ">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => handleChangeStatus(id)}
                    className="opacity-0 absolute rounded-full cursor-pointer"
                />
                {completed && <svg
                    className="fill-current w-3 h-3 text-green-500 pointer-events-none"
                    viewBox="0 0 20 20"
                >
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>}
            </div>

            <div
                className={`select-none flex-1`}
            >
                {editToggle?
                <form onSubmit={submitHandler}>
                    <input type="text" id="floating_outlined" value={todoText} onChange={ (e) => setTodoText(e.target.value)} 
                    className="block rounded-t-lg px-2.5 pb-1 pt-1 w-full text-sm text-gray-900 bg-white-50 dark:bg-white-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-black
                     dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                </form> 
                :<>{todoText}</>}
            </div>
            {!completed && <img
                src={editImage}
                className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                alt="Edit"
                onClick={() => setEditToggle(true)}
            />}

            <div className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-green-500 hover:bg-green-500 ${color === 'green' && 'bg-green-500'}`} 
            onClick={() => handleTodoColorChange(id,'green')}
            ></div>

            <div className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-yellow-500 hover:bg-yellow-500 ${color === 'yellow' && 'bg-yellow-500'}`} 
            onClick={() => handleTodoColorChange(id,'yellow')}
            ></div>

            <div className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-red-500 hover:bg-red-500 ${color === 'red' && 'bg-red-500'}`}
             onClick={() => handleTodoColorChange(id,'red')}
            ></div>

            <img
                src={cancelImage}
                className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                alt="Cancel"
                onClick={() => handleDeleteTodo(id)}
            />
        </div>
    );
}
