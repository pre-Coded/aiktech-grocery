export const debounce = (fn, delay) => {   //debounce for text search
    let timeoutID;
    return function (...args) {

        if (timeoutID) {
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}
