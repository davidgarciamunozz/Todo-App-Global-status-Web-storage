import { store } from "../redux/store";


class taskList extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode:'open'})
    }

    connectedCallback (){
        this.render();
        //Suscribirse al store para recibir notificaciones cuando cambie el estado
        store.subscribe(() => {this.render();});
        
    }

    render (){
        const state = store.getState();
        const tasks = state.tasks;

        if(this.shadowRoot) {
            this.shadowRoot.innerHTML = `
             <style>
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0;
                    padding: 10px;
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
            </style>
            <ul>
                ${tasks.map((task:any) => `
                    <li>
                        <task-item 
                            task-name="${task.name}" 
                            task-desc="${task.description}" 
                            task-completed="${task.completed}"
                        ></task-item>
                        <button class="delete-btn" data-name="${task.name}">Delete</button>
                        <button class="toggle-btn" data-name="${task.name}">Toggle Complete</button>
                    </li>
                `).join('')}
            </ul>
            `;
            // Eventos para eliminar y alternar tareas
        this.shadowRoot.querySelectorAll('.delete-btn').forEach((button) => {
            button.addEventListener('click', (e) => {
                const taskName = (e.target as HTMLElement).getAttribute('data-name');
                const task = tasks.find((t: any) => t.name === taskName);
                store.dispatch({ type: 'DELETE_TASK', payload: task });
            });
        });

        this.shadowRoot.querySelectorAll('.toggle-btn').forEach((button) => {
            button.addEventListener('click', (e) => {
                const taskName = (e.target as HTMLElement).getAttribute('data-name');
                const task = tasks.find((t: any) => t.name === taskName);
                store.dispatch({ type: 'TOGGLE_TASK', payload: task });
            });
        });
        }
    }
}

customElements.define('task-list', taskList);

export default taskList;