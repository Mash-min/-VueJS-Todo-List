Vue.component('todo-item', {
    props: ['todo'],
    template: `
        <li class="list-group-item d-flex justify-content-between align-items-start" v-bind:class="{ 'text-muted' : todo.isCompleted }">
            <div class="ms-2 me-auto">
                <div class="fw-bold">
                    {{ todo.id }}. {{ todo.todo }}
                </div>
            </div>
            <template>
                <button class="btn btn-sm btn-primary text-white"
                    v-on:click="markAsComplete(todo)"
                    v-if="!todo.isCompleted">
                    <i class="fa fa-check"></i>
                </button>
                <button class="btn btn-sm btn-default text-muted" disabled v-else>
                    <i class="fa fa-check"></i>
                </button>
            </template>
            <button class="btn btn-sm btn-danger text-white ms-1"
                @click="$emit('remove')">
                <i class="fa fa-times"></i>
            </button>
            <button class="btn btn-sm btn-success text-white ms-1"
                @click="editTodo(todo)">
                <i class="fa fa-pencil"></i>
            </button>
        </li>
    `,
    methods: {
        markAsComplete(todo) {
            todo.isCompleted = true;
        },
        editTodo(todo) {
            app.todo.todo = todo.todo
            app.todo.id = todo.id
            app.onEdit = true
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        todos: [
            { id: 1, todo: "Sample todo 1", isCompleted: false },
            { id: 2, todo: "Sample todo 2", isCompleted: false },
            { id: 3, todo: "Sample todo 3", isCompleted: false },
            { id: 4, todo: "Sample todo 4", isCompleted: false },
            { id: 5, todo: "Sample todo 5", isCompleted: false },
        ],
        todo: {
            id: '',
            todo: '',
            isCompleted: false
        },
        onEdit: false
    },
    methods: {
        saveTodo() {
            if(!this.onEdit) {
                let todoId = Object.keys(this.todos).length + 1
                this.todos.push({
                    id: todoId,
                    todo: this.todo.todo,
                    isCompleted: false
                })
                this.todo.todo = ''
            }else {
                let newTodo = this.todos.filter(todo => {
                    return todo.id == this.todo.id
                })
                for(var x in newTodo) {
                    newTodo[x].todo = this.todo.todo
                }
                this.todo.todo = ''
                this.onEdit = false
            }
        },
    }
})
