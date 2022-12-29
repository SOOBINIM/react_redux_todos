import "./TodosComponents.scss";
import React from "react";
import {
    IoMdRemoveCircleOutline,
} from "react-icons/io";

const TodosComponents = ({
    input, // 인풋에 입력되는 텍스트
    todos, // 할 일 목록이 들어 있는 객체
    onChangeInput,
    onInsert,
    onToggle,
    onRemove,
}) => {
    const onSubmit = e => {
        e.preventDefault();
        onInsert(input);
        onChangeInput(''); // 등록 후 인풋 초기화
    };
    const onChange = e => onChangeInput(e.target.value);
    return (
        <div className="TodoTemplate">
            <div className="TodoTitle">투두리스트</div>
            <form className="TodoForm" onSubmit={onSubmit}>
                <input value={input} onChange={onChange} placeholder="할 일을 입력하세요" />
                <button type="submit">등록</button>
            </form>
            <div className="TodoList">
                {todos.map(todo => (
                    <div className="TodoListItem" key={todo.id}>
                        <input className="TodoCheckbox" type="checkbox" onClick={() => onToggle(todo.id)} checked={todo.done} readOnly={true} />
                        <span className="TodoText" style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</span>
                        <button className="TodoRemove" onClick={() => onRemove(todo.id)}><IoMdRemoveCircleOutline /></button>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default TodosComponents;
