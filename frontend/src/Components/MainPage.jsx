import axios from "axios";
import { useState } from "react";

const MainPage = () => {
    const base_url = import.meta.env.VITE_BACKEND_URL;

    // managing states using hooks
    const [description,setDescription] = useState('');

    const addTodo = async(e) => {
        e.preventDefault();
        const response = await axios.post(`${base_url}/api/addTodo`,{description},{withCredentials:true});
        console.log(response.data);
    }

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
        </>
    )
}

export default MainPage;