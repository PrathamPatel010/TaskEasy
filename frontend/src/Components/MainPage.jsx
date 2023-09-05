import axios from "axios";
import { useEffect, useState } from "react";

const MainPage = () => {
    const base_url = import.meta.env.VITE_BACKEND_URL;

    // managing states using hooks
    const [description,setDescription] = useState('');
    const [todos,setTodos] = useState([]);

    // handler for adding todos
    const addTodo = async(e) => {
        e.preventDefault();
        const response = await axios.post(`${base_url}/api/addTodo`,{description},{withCredentials:true});
        if(response.data.status!=200){
            return;
        }
        setDescription('');
        console.log(response.data);
        getTodos();
    }

    // handler for getting all todos
    const getTodos = async() => {
        try{
            const response = await axios.get(`${base_url}/api/todos`,{withCredentials:true});
            // formatting data so that it can be inserted directly into todos Array
            const formattedData = response.data.map(todo=>({
                todoText:todo.description,
                doneStatus:todo.done,
                id:todo._id,
            }));
            setTodos(formattedData);
        } catch(err){
            console.log(err.message);
        }
    }

    // handler for deleting a todo
    const deleteTodo = async(e) => {
        const todoID = e.target.value;
        const response = await axios.delete(`${base_url}/api/todo/${todoID}`,{withCredentials:true});
        if(response.data.status!=200){
            return;
        }
        getTodos();
    }


    useEffect(()=>{
        getTodos();
    },[]);

    return(
        <>
            <div className="text-center mt-4 pt-3">
                <h1>TaskEasy - A Todo App</h1>
            </div>
            <article className="mt-4 pt-3">
                <form method="post" className="todo-form" onSubmit={addTodo}>
                    <input type="text" value={description} placeholder="Todo" onChange={(e)=>{setDescription(e.target.value)}} className="todo-desc form-control" />
                    <button type="submit" className="btn btn-success">Add Todo</button>
                </form>
            </article>
            
            <div className="todos-div mt-4">
                <ul className="todo-list">
                    {todos.map(todo=>{ return(
                        <li className="todo my-3" key={todo.id}>
                            <input type="checkbox" checked={todo.doneStatus}/>{todo.todoText}<button onClick={deleteTodo} className="mx-3 btn btn-primary" value={todo.id}>Delete</button>
                        </li>
                    )})}
                </ul>
            </div>
        </>
    )
}

export default MainPage;