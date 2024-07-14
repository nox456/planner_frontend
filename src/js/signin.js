import HOST from "./config.js"

const auth = await fetch(`${HOST}/auth/is-authenticated`, {
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
        const dialog = document.querySelector("#message")
        const username = username_input.value;
        const password = password_input.value;
        dialog.innerHTML = `<p><b>Cargando...</b></p>`
        dialog.showModal()
        const res = await fetch(`${HOST}/auth/signin`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        dialog.close()
        dialog.innerHTML = `
            <p></p>
            <button>Aceptar</button>
        `
        if (res.status == 200) {
            location.href = '../pages/tareas.html'
        } else {
            dialog.showModal()
            if (res.status == 404) {
                dialog.querySelector("p").innerText = 'Usuario no encontrado!'
            } else if (res.status == 401) {
                dialog.querySelector("p").innerText = 'Contraseña Incorrecta!'
            }
            dialog.querySelector("button").addEventListener("click", () => {
                dialog.close()
            })
        }
    });
}
