class taskItem extends HTMLElement {
    constructor (){
        super();
        this.attachShadow({mode:'open'});
    }
    connectedCallback (){
        this.render();
    }
    render (){
        const taskName = this.getAttribute('task-name');
        const taskDesc = this.getAttribute('task-desc');
        const taskCompleted = this.getAttribute('task-completed') === 'true' ? 'Completed' : 'Pending';
        if(this.shadowRoot) {
            this.shadowRoot.innerHTML = `
             <style>
                    .task {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding: 10px;
                        border: 1px solid #ccc;
                        margin: 5px 0;
                    }
                </style>
                <div class="task">
                    <span>${taskName} - ${taskDesc}</span>
                    <span>Status: ${taskCompleted}</span>
                </div>
            `;
        }
    }
}

customElements.define('task-item', taskItem);