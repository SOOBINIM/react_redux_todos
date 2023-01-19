// actions, reducers, constatns 
// 액션 타입, 액션 생성 함수, 리듀서 함수를 기능별로 파일 하나에 몰아 넣기
import { createAction, handleActions } from "redux-actions";

// 리액트 사가 
// import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects'

// 액션 타입 생성
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';
const EDIT = 'todos/EDIT';
const EDITDONE = 'todos/EDITDONE';



let id = 3;

// 액션 생성함수 redux-actions
export const changeInput = createAction(CHANGE_INPUT, (input) => (input));
export const insert = createAction(INSERT, text => ({ id: id++, text, done: false, editMode: false }));
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);
export const edit = createAction(EDIT, id => id)
export const editDone = createAction(EDITDONE, (id, text) => ({ id, text }));

// 초깃값 설정
const initialState = {
    // input: '',
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
        [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
        [INSERT]: (state, action) => ({ ...state, todos: state.todos.concat(action.payload) }),
        [TOGGLE]: (state, action) => ({ ...state, todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, done: !todo.done } : todo,), }),
        [REMOVE]: (state, action) => ({ ...state, todos: state.todos.filter(todo => todo.id !== action.payload), }),
        [EDIT]: (state, action) => ({ ...state, todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, editMode: !todo.editMode } : todo,), }),
        [EDITDONE]: (state, action) => ({ ...state, todos: state.todos.map(todo => todo.id === action.payload.id ? { ...todo, text: action.payload.text, editMode: !todo.editMode } : todo), }),

    }, initialState
)

export default todos;