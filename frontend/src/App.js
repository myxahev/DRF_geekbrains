import React from "react";
import './App.css';
import UserList from "./components/Users";
import Footer from "./components/Footer";
import ProjectsList from "./components/Projects";
import TodosList from "./components/Todos";
import {BrowserRouter, Route, Link, Navigate} from 'react-router-dom';
import axios from "axios";
// import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';
import TodoForm from "./components/TodoForm";
import ProjectForm from "./components/ProjectForm";

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

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }


    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username,
            password: password
        })
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete('http://localhost:8000/api/todos/${id}', {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((todo) => todo.id !== id)})
            }).catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete('http://127.0.0.1:8000/api/projects/${id}', {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    createTodo(text, project, user) {
        const headers = this.get_headers()
        const data = {text: text, project: project, user: user}
        axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers})
            .then(response => {
                let new_todo = response.data
                const project = this.state.projects.filter((item) => item.id === new_todo.project)[0]
                const user = this.state.users.filter((item) => item.uid === new_todo.user)[0]
                new_todo.project = project
                new_todo.user = user
                this.setState({todos: [...this.state.todos, new_todo]})
            }).catch(error => console.log(error))
    }

    createProject(name, repo_url) {
        const headers = this.get_headers()
        const data = {name: name, repo_url: repo_url, users:[]}
        axios.post('http://127.0.0.1:8000/api/projects/', data, {headers})
            .then(response => {
                let new_project = response.data.result
                console.log(new_project)
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }


    load_data() {
        const headers = this.get_headers()
        axios.get('http://localhost:8000/api/todos/', {headers})
            .then(response => {
                this.setState({todos: response.data.results})
            }).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })

        axios.get('http://localhost:8000/api/projects/', {headers})
            .then(response => {
                this.setState({projects: response.data.results})
            }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })

        axios.get('http://localhost:8000/api/users/', {headers})
            .then(response => {
                this.setState({users: response.data.results})
            }).catch(error => {
            console.log(error)
            this.setState({users: []})
        })
    }


    componentDidMount() {
        this.get_token_from_storage()
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

                        <Route exact path='/todos' component={() => <TodosList todos={this.state.todos}
                            deleteTodo={(id) => this.deleteTodo(id)}/>}/>

                        <Route exact path='/todos/create' component={() => <TodoForm projects={this.state.projects}
                            createTodo={(text, project, user) => this.createTodo(text, project, user)}/>}/>

                        <Route exact path='/projects' component={() => <ProjectsList
                            projects={this.state.projects}/>}/>

                        <Route exact path='/projects/create' component={() => <ProjectForm
                            createProject={(name, repo_url) => this.createProject(name, repo_url)}/>}/>

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