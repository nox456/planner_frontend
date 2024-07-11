const auth = await fetch("http://localhost:4000/auth/is-authenticated", {
    credentials: "include",
});
if (auth.status != 401) {
    location.href = "../pages/tareas.html";
} else {
    const form = document.querySelector("#form");
    const username_input = form.querySelector("#username");
    const password_input = form.querySelector("#password");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (document.querySelector("#message")) {
            document.querySelector("#message").remove()
        }
        const username = username_input.value;
        const password = password_input.value;
        const res = await fetch("http://localhost:4000/auth/signin", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        console.log(await res.json())
        if (res.status == 200) {
            location.href = '../pages/tareas.html'
        } else {
            const message = document.createElement("p")
            message.id = "message"
            if (res.status == 404) {
                message.innerText = "Usuario no encontrado!"
            } else if (res.status == 401) {
                message.innerText = "Contraseña Incorrecta!"
            }
            document.body.appendChild(message)
        }
    });
}
