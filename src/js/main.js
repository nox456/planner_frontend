import HOST from "./config.js"

const auth = await fetch(`${HOST}/auth/is-authenticated`, {
    credentials: "include",
});
if (auth.status != 401) {
    location.href = "../pages/tareas.html"
}
