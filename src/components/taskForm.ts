import { store } from "../redux/store";
import { addTask } from "../redux/actions";

class taskForm extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback (){
        this.render();
        this.attachEvents();
    }

    attachEvents() {
        const form = this.shadowRoot?.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const taskNameInput = this.shadowRoot?.querySelector('input[type="text"]') as HTMLInputElement;
                const taskDescriptionInput = this.shadowRoot?.querySelectorAll('input[type="text"]')[1] as HTMLInputElement;

                if (taskNameInput && taskDescriptionInput) {
                    const taskName = taskNameInput.value;
                    const taskDescription = taskDescriptionInput.value;

                    // Crear la nueva tarea
                    const newTask = {
                        name: taskName,
                        description: taskDescription,
                        completed: false,
                    };

                    // Despachar acción para agregar la tarea
                    store.dispatch(addTask(newTask));

                    // Limpiar los campos del formulario
                    taskNameInput.value = '';
                    taskDescriptionInput.value = '';
                }
            });
        }
    }

    render (){
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                }
                input {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    width: 300px;
                }
                button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    background-color: #333;
                    color: white;
                    margin-left: 10px;
                    cursor : pointer;
                }
            </style>
                <form>
                    <input type="text" placeholder="Task name">
                    <input type="text" placeholder="Task description">
                    <button type="submit">Add task</button>
                </form>
            `;
        }

    }
}

customElements.define('task-form', taskForm);

export default taskForm;