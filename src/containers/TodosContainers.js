// import { connect } from "react-redux";
import React, { useCallback } from "react";
import { changeInput, insert, toggle, remove, edit, editDone } from "../modules/todos";
import TodosComponents from "../components/TodosComponents";
import { useSelector, useDispatch } from "react-redux";

// 리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트라 한다.
// 리덕스 스토어에 접근해서 원하는 상태 값 가져오기

const TodoContainers = () => {
    // useSelector로 상태 조회하기
    // connect 함수를 사용하지 않고 리덕스 상태를 조회할 수 있다.
    // 상태 값을 useSelctor로 조회
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.todos);
    const input = useSelector(state => state.todos.input)

    return (
        <TodosComponents
            todos={todos}
            input={input}
            changeInput={useCallback(input => dispatch(changeInput(input)), [dispatch])}
            onInsert={text => dispatch(insert(text))}
            onToggle={(id) => dispatch(toggle(id))}
            onRemove={(id) => dispatch(remove(id))}
            onEdit={(id) => dispatch(edit(id))}
            onEditDone={(id, text) => dispatch(editDone(id, text))}
        />
    )
}

export default React.memo(TodoContainers);


// const TodosContainers = ({
//     input,
//     todos,
//     changeInput,
//     insert,
//     toggle,
//     remove,
// }) => {
//     return (
//         <TodosComponents
//             input={input}
//             todos={todos}
//             onChangeInput={changeInput}
//             onInsert={insert}
//             onToggle={toggle}
//             onRemove={remove} />
//     );
// };




// 리덕스와 연동하기 위해 react-redux에서 제공하는 connect 함수 삿용
// 첫 번째 파라미터에는 리덕스 안의 상태를 컴포넌트의 props로 넘겨주기 위함
// 두 번째 파라미터에는 액션 생성 함수를 컴포넌트의 props로 념겨주기 위함


// export default connect(
//     ({ todos }) => ({
//         input: todos.input,
//         todos: todos.todos
//     }),
//     {
//         changeInput,
//         insert,
//         toggle,
//         remove
//     },
// )(TodosContainers);

