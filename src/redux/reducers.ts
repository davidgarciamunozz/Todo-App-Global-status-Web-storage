export const reducer = (previousState:any , action:any) => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_TASK':
            return {
                ...previousState,
                tasks: [...previousState.tasks, payload]
            }
        case 'DELETE_TASK':
            return {
                ...previousState,
                tasks: previousState.tasks.filter((task:any) => task !== payload)
            }
        case 'TOGGLE_TASK':
            return {
                ...previousState,
                tasks: previousState.tasks.map((task:any) => {
                    if (task === payload) {
                        return {
                            ...task,
                            completed: !task.completed
                        }
                    }
                    return task;
                })
            }
        default:
            return previousState;
    }
}