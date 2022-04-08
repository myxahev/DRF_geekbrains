import React from 'react';
import {useParams} from 'react-router-dom'

const TodosItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.author}</td>
            <td>{todo.project}</td>

        </tr>
    )
}
const TodosList = ({todos}) => {
    let {id} = useParams();
    let filtered_items = todos.filter((todo) => todo.project.id == id)
    return (
        <table>
            <th>id</th>
            <th>title</th>
            <th>author</th>
            <th>project</th>
            {filtered_items.map((todo) => <TodosItem todo={todo}/>)}
        </table>
    )
}
export default TodosList