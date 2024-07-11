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
        tasks_container.innerText = "No hay tareas, por ahora..."
    } else {
        tasks.forEach((task) => {
            const container = document.createElement("article")
            container.innerHTML = `
                <h3>${task.name}</h3>
                <button id="delete-button">Eliminar</button>
                <hr>
                <p>${task.course}</p>
                <p>${task.topic}</p>
                <p>${task.evaluation}</p>
                <hr>
                <p>${task.finish_date}</p>
            `
            tasks_container.appendChild(container)
            const delete_button = container.querySelector("#delete-button")
            delete_button.addEventListener("click", async (e) => {
                e.preventDefault()
                container.remove()
                if (tasks_container.children.length == 0) {
                    tasks_container.innerText = "No hay tareas, por ahora..."
                }
                await fetch(`http://localhost:4000/tasks?id=${task.id}`, {
                    method: "DELETE"
                })
            })
        })
    }
}
