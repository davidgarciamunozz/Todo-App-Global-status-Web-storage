import { reducer } from "./reducers";

//recuperar tareas del local storage si existen
export let initialState = {
    tasks : JSON.parse(localStorage.getItem('tasks') || '[]')
}

let currentState = initialState;

export const createStore = (reducer:any) => {
    let listeners:any[] = [];

    //Obtener el estado actual
    const getState = () => currentState;

    //Despachar una acción para actualizar el estado
    const dispatch = (action:any) => {
        currentState = reducer(currentState, action);
        localStorage.setItem('tasks', JSON.stringify(currentState.tasks)); // Persistir el estado en localStorage
        listeners.forEach((listener) => listener()); // Notificar a los listeners
    }

    //Suscribir un listener para ser notificado cuando cambie el estado

    const subscribe = (listener:any) => {
        listeners.push(listener);
        //Devolver una función para eliminar el listener
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        }
    }

    //Retornar las funciones para interactuar con el store
    return {
        getState,
        dispatch,
        subscribe
    };
};

export const store = createStore(reducer); // Crear el store