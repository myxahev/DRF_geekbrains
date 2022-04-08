import React from "react";
import './App.css';
import UserList from "./components/Users";
import Footer from "./components/Footer";
import ProjectsList from "./components/Projects";
import TodosList from "./components/Todos";
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import axios from "axios";
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';

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
        return this.state.token != ''
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