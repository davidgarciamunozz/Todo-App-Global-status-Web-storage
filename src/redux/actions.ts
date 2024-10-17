export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';


export const addTask = (task: any) => ({
    type: ADD_TASK,
    payload: task
});

export const removeTask = (task:any) => {
    return {
        type: DELETE_TASK,
        payload: task
    }
}

export const toggleTask = (task:any) => {
    return {
        type: TOGGLE_TASK,
        payload : task
    }
}