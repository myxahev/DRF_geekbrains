import React from "react";
import './App.css';
import UserList from "./components/Users";
import Footer from "./components/Footer";
import ProjectsList from "./components/Projects";
import TodosList from "./components/Todos";
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import axios from "axios";

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount() {

        axios.get('http://localhost:8000/api/todos/')
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://localhost:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://localhost:8000/api/users/')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Users</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/todos'>Todos</Link>
                            </li>
                        </ul>
                    </nav>
                    <Route>
                        <Route exact path='/' component={() => <UserList
                            users={this.state.users}/>}/>

                        <Route exact path='/todos' component={() => <TodosList
                            todos={this.state.todos}/>}/>

                        <Route exact path='/projects' component={() => <ProjectsList
                            projects={this.state.projects}/>}/>

                        <Route path="/todos/:id">
                            <TodosList todos={this.state.todos}/>
                        </Route>

                        <Navigate from='/authors' to='/'/>
                        <Route component={NotFound404}/>
                    </Route>

                    <footer>
                        <Footer/>
                    </footer>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;