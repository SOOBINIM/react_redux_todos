import "./TodosComponents.scss";
import React from "react";
import { useState } from "react";
import {
    MdRemoveCircleOutline,
    MdEdit,
    MdDoneOutline
} from "react-icons/md";


const TodosComponents = ({
    todos, // 할 일 목록이 들어 있는 객체
    onInsert,
    onToggle,
    onRemove,
    onEdit,
    onEditDone
}) => {

    const [text, setText] = useState({ TodoInsert: "", TodoItemInsert: "" })
    const onChange = e => {
        setText({
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault();
        onInsert(text.TodoInsert);
        setText('')
    };

    return (
        <div className="TodoTemplate">
            <div className="TodoTitle">투두리스트</div>
            <form className="TodoForm" onSubmit={onSubmit}>
                <input name="TodoInsert" value={text.TodoInsert || ''} onChange={onChange} placeholder="할 일을 입력하세요" />
                <button type="submit">등록</button>
            </form>
            <div className="TodoList">
                {todos.map(todo => (
                    <div className="TodoListItem" key={todo.id}>
                        <input className="TodoCheckbox" type="checkbox" onClick={() => onToggle(todo.id)} checked={todo.done} readOnly={true} />
                        {todo.editMode ?
                            <>
                                <input name="TodoItemInsert" className="TodoTextEdit" defaultValue={todo.text || ''} style={{ textDecoration: todo.done ? 'line-through' : 'none', }} onChange={onChange} readOnly={false} />
                                <button className="TodoRemove" onClick={() => onRemove(todo.id)}><MdRemoveCircleOutline /></button>
                                <button className="TodoEdit" onClick={() => onEditDone(todo.id, text.TodoItemInsert)}><MdDoneOutline /> {todo.editMode}</button>
                            </>
                            :
                            <>
                                <input name="TodoItemInsert" className="TodoText" defaultValue={todo.text || ''} style={{ textDecoration: todo.done ? 'line-through' : 'none', }} readOnly={true} />
                                <button className="TodoRemove" onClick={() => onRemove(todo.id)}><MdRemoveCircleOutline /></button>
                                <button className="TodoEdit" onClick={() => onEdit(todo.id)}><MdEdit />{todo.editMode}</button>
                            </>
                        }
                    </div>
                ))}
            </div>
        </div >
    )
}


export default TodosComponents;
