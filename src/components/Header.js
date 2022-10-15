import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch } from "react-redux";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import { useAddTodoMutation } from "../features/api/apiSlice";
// import {added,completeall,clear} from '../redux/todos/actionCreators'

export default function Header() {
    // const dispatch = useDispatch();
    
    const [ addTodo ] = useAddTodoMutation();
    
    const [todoText,setTodoText] = useState('');

    const handleAddTodo = (e) => {
        e.preventDefault();
        // dispatch(added(todoText))
        addTodo({
            text : todoText,
            completed : false,
            color : ""
        })

        setTodoText('');
        toast.success('Todo Saved Successfully!', {
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

    return (
        <div>
            <ToastContainer limit={1}/>
            <form className="flex items-center bg-gray-100 px-4 py-4 rounded-md" onSubmit={handleAddTodo}>
                <img src={noteImage} className="w-6 h-6" alt="Add todo" />
                <input
                    type="text"
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                    placeholder="Type your todo"
                    className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                    required
                />
                <button
                    type="submit"
                    className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
                ></button>
            </form>
        </div>
    );
}
