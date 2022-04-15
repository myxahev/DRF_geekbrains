import React from 'react';
import {Link} from 'react-router-dom'

const TodosItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.author}</td>
            <td>{todo.project}</td>
            <td>
                <button onClick={() => deleteTodo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}
const TodosList = ({todos, deleteTodo}) => {
    return (
        <div>
        <table>
            <th>id</th>
            <th>title</th>
            <th>author</th>
            <th>project</th>
            {todos.map((todo) => <TodosItem todo={todo} deleteTodo={deleteTodo}/>)}
        </table>
        <Link to='/todos/create'>Create</Link>
        </div>
    )
}
export default TodosList