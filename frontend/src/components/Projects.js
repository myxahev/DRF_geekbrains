import React from 'react';
import {useParams} from 'react-router-dom'

const ProjectItem = ({project}) => {
    return (
        <tr>
            {/*<td>{project.id}</td>*/}
            <td>{project.name}</td>
            <td>{project.users}</td>
            <td>{project.repo_url}</td>

        </tr>
    )
}
const ProjectsList = ({projects}) => {
    let {id} = useParams();
    let filtered_items = projects.filter((project) => project.id === id)
    return (
        <table>
            {/*<th>id</th>*/}
            <th>name</th>
            <th>users</th>
            <th>repo_url</th>
            {filtered_items.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}
export default ProjectsList