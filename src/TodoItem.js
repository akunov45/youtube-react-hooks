import React,{useState,useContext} from 'react'
import {Context} from "./context";

export default function TodoItem({title, id, completed}) {
  // const [checked,setChecked] = useState(completed)
  const {dispatch} = useContext(Context)

  const clas = ['todo']
  if (completed){
    clas.push('completed')
  }
  return (
    <li className={clas.join(' ')}>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={()=>dispatch({
              type: 'toggle',
              payload: id
          })}
        />
        <span>{title}</span>

        <i
          className="material-icons red-text"
          onClick={()=>dispatch({
            type: 'remove',
            payload:id
          })}
        >
          delete
        </i>
      </label>
    </li>
  )
}