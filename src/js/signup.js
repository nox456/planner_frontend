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
        const username = username_input.value;
        const password = password_input.value;
        const res = await fetch(`${HOST}/auth/signup`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        if (res.status == 400) {
            const dialog = document.querySelector("dialog")
            dialog.showModal()
            dialog.querySelector("p").innerText = "El usuario ya existe!"
            dialog.querySelector("button").addEventListener("click", () => {
                dialog.close()
            })
        } else {
            location.href = "tareas.html";
        }
    });
}
