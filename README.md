# 투두리스트 예제 (redux)

## 프레젠테이셔널 컴포넌트
- UI 를 보여주는 컴포넌트
- 스타일 파일은 scss로 분리하여 사용

## 컨테이너 컴포넌트
(기존 connect 사용)
```javascript
// (기존) connect 사용
// 해당 컨테이너 컴포넌트의 부모 컴포넌트가 리렌더링될 때
// 해당 컨테이너 컴포넌트의 props가 바뀌지 않았다면 리렌더링이 자동으로 방지
// 성능이 최적화 된다.
import { changeInput, insert, toggle, remove } from "../modules/todos";
import TodosComponents from "../components/TodosComponents";
import { connect } from "react-redux";

const TodosContainers = ({
    todos,
    insert,
    toggle,
    remove,
    edit,
    editDone
}) => {
    return (
        <TodosComponents
            todos={todos}
            onInsert={insert}
            onToggle={toggle}
            onRemove={remove}
            onEdit={edit}
            onEditDone={editDone}
             />

    );
};

export default connect(
    ({ todos }) => ({
        todos: todos.todos
    }),
    {
        insert,
        toggle,
        remove,
        edit,
        editDone
    },
)(TodosContainers);
```
(connect 대신 useSelector + useDispatch 사용)
```javascript
// useSelector + useDispatch 사용
// useSelector를 사용하여 리덕스 상태를 조회했을 때는 최적화 작업이 자동으로 이루어지지 않음
// 성능 최적화를 위해 React.memo를 컨테이너 컴포넌트에 사용해주어야 한다. 
import React from 'react';
import { changeInput, insert, toggle, remove } from "../modules/todos";
import TodosComponents from "../components/TodosComponents";
import { useSelector, useDispatch } from "react-redux";

const TodoContainers = () => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.todos);

    return (
        <TodosComponents
            todos={todos}
            onInsert={text => dispatch(insert(text))}
            onToggle={(id) => dispatch(toggle(id))}
            onRemove={(id) => dispatch(remove(id))}
            onEdit={(id) => dispatch(edit(id))}
            onEditDone={(id, text) => dispatch(editDone(id, text))}
        />
    )
}

export default React.memo(TodoContainers);
```
### useSelector
connect 함수를 사용하지 않고 리덕스의 상태를 조회할 떄 사용한다.

### useDispatch
액션을 디스패치 해야할 때 사용한다.

이벤트 함수를 불러와서 사용하고 싶을 떄 

---
## 모듈 (디스패치)
```javascript
// actions, reducers, constatns 
// 액션 타입, 액션 생성 함수, 리듀서 함수를 기능별로 파일 하나에 몰아 넣기
import { createAction, handleActions } from "redux-actions";

// 액션 타입 생성
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';
const EDIT = 'todos/EDIT';
const EDITDONE = 'todos/EDITDONE';

let id = 3;

// 액션 생성함수 redux-actions
export const insert = createAction(INSERT, text => ({ id: id++, text, done: false, editMode: false }));
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);
export const edit = createAction(EDIT, id => id)
export const editDone = createAction(EDITDONE, (id, text) => ({ id, text }));

// 초깃값 설정
const initialState = {
    input: '',
    todos: [
        {
            id: 1,
            text: '투두리스트 리덕스 적용',
            editMode: false,
            done: true
        },
        {
            id: 2,
            text: '투두리스트 리덕스 사가 적용',
            editMode: false,
            done: false
        }
    ]
};

// 리듀서 함수
// handleActions
// action은 스토어에 저장되어 있는 데이터를 꺼내오는 유일한 방법이다.
// 액션 생성 함수는 액션에 필요한 추가 데이터를 모두 payload라는 이름으로 사용한다.
const todos = handleActions(
    {
        [INSERT]: (state, action) => ({ ...state, todos: state.todos.concat(action.payload) }),
        [TOGGLE]: (state, action) => ({ ...state, todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, done: !todo.done } : todo,), }),
        [REMOVE]: (state, action) => ({ ...state, todos: state.todos.filter(todo => todo.id !== action.payload), }),
        [EDIT]: (state, action) => ({ ...state, todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, editMode: !todo.editMode } : todo,), }),
        [EDITDONE]: (state, action) => ({ ...state, todos: state.todos.map(todo => todo.id === action.payload.id ? { ...todo, text: action.payload.text, editMode: !todo.editMode } : todo), }),

    }, initialState
)

export default todos;
```
### createAcion
액션에 필요한 추가 데이터는 payload라는 이름을 사용한다. 
```javascript
const MY_ACTION = 'sample/MY_ACTION';
const myAction = createAction(MY_ACTION, text => `${text}!`);
const action = myAction('hello world');
/*
    결과:
    { type: MY_ACTION, payload: 'hello world!' }
*/
```
### handleActions
createAction으로 만든 액션 생성 함수는 파라미터로 받아 온 값을 객체 안에 넣을 떄 
원하는 이름으로 넣는 것이 아닌 `action.id`, `action.todo`와 같이 `action.payload`라는 이름을 공통적으로 넣어 주게 된다. 

