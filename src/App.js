import React, {useState, useEffect, useReducer} from 'react'
import TodoList from './TodoList'
import {Context} from './context'
import reducer from "./reducer";

export default function App() {
    // Объявляем новую переменную состояния "count"
    const [count, setCount] = useState(0);
    useEffect(() => {
        // Обновляем заголовок документа, используя API браузера
        document.title = `Вы нажали ${count} раз`;
    });


    const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('todos')))
    // const [todos, setTodos] = useState([])
    // const [todos, setTodos] = useState([
    //     {id: 1, title: 'First todo', completed: false},
    //     {id: 2, title: 'Second todo', completed: true},
    // ])
    // state = {
    //   todos: [
    //     {id: 1, title: 'First todo', completed: false},
    //     {id: 2, title: 'Second todo', completed: true},
    //   ]
    // }
    // useEffect(() => {
    //     const raw = localStorage.getItem('todos') || []
    //     setTodos(JSON.parse(raw))
    // }, [])
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(state))
    }, [state])

    const [todoTitle, setTodoTitle] = useState('')

    const addTodo = e => {
        if (e.key === 'Enter') {
            dispatch({
                type: 'add',
                payload: todoTitle
            })
            dispatch([...state,
                {
                    id: Date.now(),
                    title: todoTitle,
                    completed: false
                }])
            setTodoTitle('')
        }
    }
    // const removeTodo = id => {
    //     setTodos(todos.filter(todo => {
    //         return todo.id = !id
    //     }))
    // }
    // const toglleTodo = id => {
    //     setTodos(todos.map(todo => {
    //         if (todo.id === id) {
    //             todo.completed = !todo.completed
    //         }
    //         return todo
    //     }))
    // }

    return (
        <Context.Provider value={{
            dispatch
            // toglleTodo, removeTodo
        }}>
            <div className="container">
                <h1>Todo app</h1>

                <div className="input-field">
                    <input type="text"
                           value={todoTitle}
                           onChange={e => {
                               setTodoTitle(e.target.value)
                           }}
                           onKeyPress={addTodo}
                    />
                    <label>Todo name</label>
                </div>

                <TodoList todos={state}/>
                <div>
                    <p>Вы нажали {count} раз</p>
                    <button onClick={() => setCount(count + 1)}>
                        Нажми на меня
                    </button>
                </div>
            </div>
        </Context.Provider>
    );

}