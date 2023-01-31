import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AuthorList from './components/Author.js';
import ProjectList from './components/Projects.js';
import TodoList from './components/ToDo.js';
import ProjectTodoList from './components/ProjectTodos';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';


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
            'todos': []
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/authors/')
            .then(response => {
                const authors = response.data.results
                this.setState(
                    {
                        'authors': authors
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/project/')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
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
                        </ul>
                    </nav>
                    <Routes>
                        <Route path='/authors' element={<AuthorList authors={this.state.authors} />} Route />
                        <Route path='/projects' element={<ProjectList projects={this.state.projects} />} Route />
                        <Route path='/todos' element={<TodoList todos={this.state.todos} />} Route />
                        <Route element={NotFound404} Route />
                        <Route path="/projects/:project_title" element={<ProjectTodoList todos={this.state.todos} />} Route />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}
export default App;
