const auth = await fetch("http://localhost:4000/auth/is-authenticated", {
    credentials: "include",
});
if (auth.status == 401) {
    location.href = "iniciar_sesion.html";
} else {
    const res = await fetch("http://localhost:4000/users/info", {
        credentials: "include",
    });
    const { data } = await res.json();

    document.querySelector("#username").innerText = data.username;
    document.querySelector("#score").innerText = `Puntos: ${data.score}`;
    document.querySelector("#achievements").innerText =
        `Logros: ${data.achievements}`;

    const tasks_container = document.querySelector("#tasks-container");

    const { tasks } = data;

    if (tasks.length == 0) {
        tasks_container.innerText = "No hay tareas, por ahora...";
    } else {
        tasks.forEach((task) => {
            const container = document.createElement("article");
            container.innerHTML = `
                <h3>${task.name}</h3>
                <dialog>
                    <h3>Eliminar Tarea</h3>
                    <p>${task.name}</p>
                    <p>¿Estás seguro?</p>
                    <button id="close-button">No</button>
                    <button id="confirm-button">Si</button>
                </dialog>
                <button id="delete-button">Eliminar</button>
                <input type="checkbox" id="done-input">
                <hr>
                <p>${task.course}</p>
                <p>${task.topic}</p>
                <p>${task.evaluation}</p>
                <hr>
                <p>${task.finish_date}</p>
            `;
            tasks_container.appendChild(container);
            const delete_button = container.querySelector("#delete-button");
            delete_button.addEventListener("click", async () => {
                container.querySelector("dialog").showModal();
            });
            const close_button = container.querySelector("#close-button")
            close_button.addEventListener("click", () => {
                container.querySelector("dialog").close()
            })
            const confirm_button = container.querySelector("#confirm-button")
            confirm_button.addEventListener("click", async () => {
                await fetch(`http://localhost:4000/tasks?id=${task.id}`, {
                    method: "DELETE"
                })
                container.querySelector("dialog").close()
                container.remove()
                if (tasks_container.children.length == 0) {
                    tasks_container.innerText = "No hay tareas, por ahora..."
                }
            })
            document.querySelector("#done-input").addEventListener("click", async () => {
                await fetch(`http://localhost:4000/tasks/done?id=${task.id}`, {
                    credentials: "include",
                    method: "PUT"
                })
                container.remove()
                location.reload()
            })
        });
    }
    const logout_dialog = document.querySelector("#logout-dialog")
    document.querySelector("#username").addEventListener("click", () => {
        logout_dialog.showModal()
    })
    logout_dialog.querySelector("#close-button").addEventListener("click", () => {
        logout_dialog.close()
    })
    document.querySelector("#logout-button").addEventListener("click", async() => {
        await fetch("http://localhost:4000/auth/logout", {
            credentials: "include"
        })
        location.href = '../index.html'
    })
}
