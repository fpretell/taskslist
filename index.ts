interface Task {
    readonly id: number;
    readonly title: string;
    completed: boolean;
}

class TaskManager {
    private tasks: Task[] = [];
    private nextId: number = 1;

    addTask(title: string): Task {
        const newTask: Task = { id: this.nextId++, title, completed: false };
        this.tasks.push(newTask);
        return newTask;
    }

    deleteTask(id: number): void {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index === -1) {
            throw new Error(`Task with id ${id} does not exist.`);
        }
        this.tasks.splice(index, 1);
    }

    markTaskCompleted(id: number): void {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            throw new Error(`Task with id ${id} does not exist.`);
        }
        task.completed = true;
    }

    listTasks(): Task[] {
        return this.tasks;
    }
}

function showTasks(taskManager: TaskManager): void {
    const tasks = taskManager.listTasks();
    const completedTasks = tasks.filter(task => task.completed);
    const incompleteTasks = tasks.filter(task => !task.completed);

    console.log('Completed Tasks:');
    completedTasks.forEach(task => console.log(`- [${task.id}] ${task.title}`));

    console.log('Incomplete Tasks:');
    incompleteTasks.forEach(task => console.log(`- [${task.id}] ${task.title}`));
}
