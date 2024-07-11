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
        const username = username_input.value;
        const password = password_input.value;
        const res = await fetch("http://localhost:4000/auth/signup", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        if (res.status == 401) {
            document.querySelector("#message").innerText =
                "Este usuario ya existe!";
        } else {
            location.href = "tareas.html";
        }
    });
}
