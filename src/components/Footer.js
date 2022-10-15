import { useDispatch, useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/api/apiSlice";
import { chengestatus, changecolor} from '../features/filters/filterSlice'

export default function Footer() {
    const filters = useSelector((state) => state.filters);

    const { status,colors } = filters; 
    const { data: todos, isSuccess, isError, isLoading } = useGetTodosQuery({ status,colors });

    const dispatch = useDispatch();

    const remainingTask = () => {
        let task =  todos.filter(task => !task.completed).length;
        
        switch(task) {
            case 0 : 
                return 'No tasks';
            case 1 : 
                return task + ' task';
            default : 
                return task + ' tasks'
        }
    }

    const handleChangeStatus = (status) => {
        dispatch(chengestatus(status))
    }

    const handlechangecolor = (color) => {
        let type;
        type = colors.includes(color) ? 'remove' : 'add';
        dispatch(changecolor({color,type}))
    }

    let content = null;

    if(isLoading) {
        content = <p>Loading...</p>
    }

    if(!isLoading && isSuccess) {
        content = <p>{remainingTask()} left</p>
    }

    if(!isLoading && !isSuccess && isError) {
        content = <p style={{color:'red'}}>Error Occured!</p>
    }

    return (
        <div className="mt-4 flex justify-between text-xs text-gray-500">
            {content}
            {isSuccess && <ul className="flex space-x-1 items-center text-xs">
                <li className={`cursor-pointer ${ status === 'All' && 'font-bold'}`} onClick={() => handleChangeStatus('All')}>All</li>
                <li>|</li>
                <li className={`cursor-pointer ${ status === 'Incomplete' && 'font-bold'}`} onClick={() => handleChangeStatus('Incomplete')}>Incomplete</li>
                <li>|</li>
                <li className={`cursor-pointer ${ status === 'Complete' && 'font-bold'}`} onClick={() => handleChangeStatus('Complete')}>Complete</li>
                <li></li>
                <li></li>
                <li className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${colors.includes('green') && 'bg-green-500'}`} onClick={() => handlechangecolor('green')}></li>
                <li className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${colors.includes('red') && 'bg-red-500'}`} onClick={() => handlechangecolor('red')}></li>
                <li className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${colors.includes('yellow') && 'bg-yellow-500'}`} onClick={() => handlechangecolor('yellow')}></li>
            </ul>}
        </div>
    );
}
