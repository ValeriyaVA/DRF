import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AuthorList from './components/Author.js';
import ProjectList from './components/Projects.js';
import TodoList from './components/ToDo.js';
import ProjectTodoList from './components/ProjectTodos';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './components/Auth.js';
import Cookies from 'universal-cookie';


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>)
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'authors': [],
            'projects': [],
            'todos': [],
            'token': ''
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({ 'token': token }, () => this.load_data())
    }
    //проверяем авторизацию
    is_authenticated() {
        return this.state.token !== ''
    }
    // уничтожаем токен
    logout() {
        this.set_token('')
    }
    // получаем токен из хранилища
    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({ 'token': token }, () => this.load_data())
    }


    get_token(login, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', { username: login, password: password })
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
        axios.get('http://127.0.0.1:8000/api/authors/', { headers })
            .then(response => {
                const authors = response.data.results
                this.setState(
                    {
                        'authors': authors
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/project/', { headers })
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/', { headers })
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
        this.load_data()
    }
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/authors'>Authors</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/todos'>ToDos</Link>
                            </li>
                            <li>
                                {this.is_authenticated() ? <button
                                    onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path='/authors' element={<AuthorList authors={this.state.authors} />} Route />
                        <Route path='/projects' element={<ProjectList projects={this.state.projects} />} Route />
                        <Route path='/todos' element={<TodoList todos={this.state.todos} />} Route />
                        <Route element={NotFound404} Route />
                        <Route path="/projects/:project_title" element={<ProjectTodoList todos={this.state.todos} />} Route />
                        <Route path='/login' element={<LoginForm
                            get_token={(login, password) => this.get_token(login, password)} />} Route />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}
export default App;
