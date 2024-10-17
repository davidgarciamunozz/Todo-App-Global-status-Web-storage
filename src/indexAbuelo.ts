import taskForm from "./components/taskForm";
import taskList from "./components/taskList";
import './components/taskItem';
import { store } from "./redux/store";

class AppContiner extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        const form = new taskForm();
        const list = new taskList();
        //imprimir el estado inicial
        console.log(store.getState());
    }

    render () {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <task-form></task-form>
                <task-list></task-list>
            `;
        }
    }
}

customElements.define('app-container', AppContiner);