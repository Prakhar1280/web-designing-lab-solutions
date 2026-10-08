document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    const taskCounter = document.getElementById('taskCounter');
    const currentDate = document.getElementById('currentDate');

    // Display formatted current date
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    currentDate.textContent = new Date().toLocaleDateString('en-US', options);

    let tasks = JSON.parse(localStorage.getItem('prakhar_tasks')) || [
        { id: 1, text: 'Complete Web Lab Experiment 3', completed: false },
        { id: 2, text: 'Review PostgreSQL query optimization notes', completed: true }
    ];

    function saveAndRender() {
        localStorage.setItem('prakhar_tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        
        const remainingCount = tasks.filter(t => !t.completed).length;
        taskCounter.textContent = `${remainingCount} Task${remainingCount === 1 ? '' : 's'} Remaining`;

        if (tasks.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';

            tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <div class="task-content" onclick="toggleTask(${task.id})">
                        <div class="check-btn">
                            <i class="fa-solid fa-check"></i>
                        </div>
                        <span class="task-text">${escapeHTML(task.text)}</span>
                    </div>
                    <button class="btn-delete" onclick="deleteTask(${task.id})" title="Delete task">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                `;

                taskList.appendChild(li);
            });
        }
    }

    // Add Task
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (text !== '') {
            const newTask = {
                id: Date.now(),
                text: text,
                completed: false
            };
            tasks.unshift(newTask);
            taskInput.value = '';
            saveAndRender();
        }
    });

    // Toggle Complete State
    window.toggleTask = (id) => {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveAndRender();
    };

    // Delete Task
    window.deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        saveAndRender();
    };

    // Sanitize user inputs
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // Initial render
    renderTasks();
});