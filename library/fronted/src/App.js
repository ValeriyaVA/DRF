import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AuthorList from './components/Author.js';
import ProjectList from './components/Projects.js';
import TodoList from './components/ToDo.js';
import ProjectForm from './components/ProjectForm';
import TodoForm from './components/TodoForm';
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
        axios.get('http://127.0.0.1:8000/api/projects/', { headers })
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


    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, { headers }).then(response => {
            this.setState({ projects: this.state.projects.filter((project) => project.id !== id) })
        }).catch(error => console.log(error))
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, { headers }).then(response => {
            this.setState({ todos: this.state.projects.filter((todo) => todo.id !== id) })
        }).catch(error => console.log(error))
    }


    createProject(project_title, repolink, author) {
        const headers = this.get_headers()
        const data = { title: project_title, repolink: repolink, author: author }
        axios.post(`http://127.0.0.1:8000/api/project/`, data, { headers }).then(response => {
            let new_project = response.data
            const author = this.state.authors.filter((author) => author.id === new_project.author)
            new_project.author = author
            this.setState({ projects: [...this.state.projects, new_project] })
        }).catch(error => console.log(error))
    }

    createTodo(note, project) {
        const headers = this.get_headers()
        const data = { note: note, project: project }
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, { headers }).then(response => {
            let new_todo = response.data.results
            const project = this.state.projects.filter((project) => project.id === new_todo.project)
            new_todo.project = project
            this.setState({ todos: [...this.state.todos, new_todo] })
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
                                <Link to='/authors'>Авторы</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Проекты</Link>
                            </li>
                            <li>
                                <Link to='/todos'>Заметки</Link>
                            </li>
                            <li>
                                {this.is_authenticated() ? <button
                                    onClick={() => this.logout()}>Выйти</button> : <Link to='/login'>Зайти</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path='/authors' element={<AuthorList authors={this.state.authors} />} Route />
                        {/* <Route path='/projects' element={<ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} Route /> */}
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)} />} Route />
                        <Route path="/projects" >
                            <Route index element={<ProjectList projects={this.state.projects} />} />
                            <Route path=":project_title" element={<ProjectTodoList todos={this.state.todos} />} />
                        </Route>
                        <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users} createProject={(project_title, repolink, author) => this.createProject(project_title, repolink, author)} />} />
                        <Route exact path='/todos/create' component={() => <TodoForm projects={this.state.projects} createTodo={(text, project) => this.createTodo(text, project)} />} />
                        <Route element={NotFound404} Route />
                        <Route exact path='/login' element={<LoginForm
                            get_token={(login, password) => this.get_token(login, password)} />} Route />
                    </Routes>
                </BrowserRouter>
            </div >
        )
    }
}
export default App;