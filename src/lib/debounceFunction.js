const debounceFunction = (callback, delay) => {
    let timer;
    return (...args) => {
        // timer를 취소
        clearTimeout(timer);;
        // delay가 지나면 callback 함수를 실행
        timer = setTimeout(() => callback(...args), delay)
    }
}

export default debounceFunction;

