const auth = await fetch("http://localhost:4000/auth/is-authenticated", {
    credentials: "include",
});
if (auth.status != 401) {
    location.href = "../pages/tareas.html"
}
