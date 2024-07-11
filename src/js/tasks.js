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

    if (tasks.length > 0) {
    }
}
