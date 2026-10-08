document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${text}</span>
            <div class="actions">
                <button class="complete-btn">✓</button>
                <button class="delete-btn">✕</button>
            </div>
        `;

        li.querySelector(".complete-btn").addEventListener("click", () => li.classList.toggle("completed"));
        li.querySelector(".delete-btn").addEventListener("click", () => li.remove());

        taskList.appendChild(li);
        input.value = "";
    });
});