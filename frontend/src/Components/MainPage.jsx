import axios from "axios";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';

const MainPage = () => {
    const base_url = import.meta.env.VITE_BACKEND_URL;

    // managing states using hooks
    const [description,setDescription] = useState('');
    const [todos,setTodos] = useState([]);
    const [acknowledgment,setAcknowledgment] = useState('');
    const [errMessage,setErrMessage] = useState('');
    
    // handler for adding todos
    const addTodo = async(e) => {
        e.preventDefault();
        const response = await axios.post(`${base_url}/api/addTodo`,{description},{withCredentials:true});
        if(response.data.status!=200){
            console.log(response.data);
            setErrMessage('You cannot add duplicate todos');
            return;
        }
        setDescription('');
        setErrMessage('');
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

    // handler for updating a todo
    const updateTodo = async (e) => {
        const todoID = e.target.value;
        const newDoneStatus = e.target.checked;
        try {
            const response = await axios.patch(`${base_url}/api/todo/${todoID}`,{ done: newDoneStatus },{ withCredentials: true });
            console.log(response.data);    
            if (response.data.success) {
                e.target.checked = newDoneStatus;
            }
        } catch (err) {
            console.log(err);
        }
    };
    
    // for getting userInfo
    const checkAuth = async() => {
        try{
            const response = await axios.get(`${base_url}/api/checkAuth`,{withCredentials:true});
            if(response.data.status!=200){
                console.log(response.data);
                window.location.href="/";
            }
            console.log(response.data);
            setAcknowledgment(`Logged in as ${response.data.username}`);
        } catch(err){
            console.log(err.message);
        }
    }

    // handler for logout
    const handleLogout = async() => {
        setAcknowledgment('Logging out');
        const response = await axios.get(`${base_url}/api/logout`,{withCredentials:true});
        console.log(response.data);
        window.location.href="/";
    }

    useEffect(()=>{
        checkAuth();
        getTodos();
    },[]);

    return(
        <>
            <div className="container text-center mt-4 pt-3">
                <h1>TaskEasy - A Todo App</h1>
            </div>
            <div className="container userInfo-div mt-4">
                <h4 className="username-ele">{acknowledgment}</h4>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
            <div className="container big-container">
                <article className="mt-4 pt-3">
                    <form method="post" className="todo-form" onSubmit={addTodo}>
                        <input type="text" value={description} placeholder="Todo" onChange={(e)=>{setDescription(e.target.value)}} className="todo-desc form-control" />
                        <button type="submit" className="btn btn-success">Add Todo</button>
                    </form>
                    <div className="errAck-div text-center mt-3">
                        <h5>{errMessage}</h5>
                    </div>
                </article>
                
                <div className="container todos-div mt-4">
                    <ul className="todo-list">
                        {todos.slice().reverse().map(todo=>{ 
                            const uniqueKey = uuidv4();
                            return(
                            <div className="container todo-div" key={uniqueKey}>
                                <li className="todo my-2">
                                    <input type="checkbox" value={todo.id} onChange={updateTodo} checked={todo.doneStatus} className="mx-3"/>{todo.todoText}<button onClick={deleteTodo} className="mx-3 btn btn-primary" value={todo.id}>Delete</button>
                                </li>
                            </div>
                        )})}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MainPage;