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

    const form = document.querySelector("#form");
    const name_input = form.querySelector("#name");
    const course_input = form.querySelector("#course");
    const evaluation_input = form.querySelector("#evaluation");
    const topic_input = form.querySelector("#topic");
    const finish_input = form.querySelector("#finish_date");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = name_input.value;
        const course = course_input.value;
        const evaluation = evaluation_input.value;
        const topic = topic_input.value;
        const finish_date = finish_input.value;

        const res = await fetch("http://localhost:4000/tasks/save", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: { name, course, evaluation, topic, finish_date },
            }),
        });

        if (res.status == 200) {
            location.href = '../pages/tareas.html'
        }
    });
}
