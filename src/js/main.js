const auth = await fetch("https://planner-backend-uy1a.onrender.com/auth/is-authenticated", {
    credentials: "include",
});
if (auth.status != 401) {
    location.href = "../pages/tareas.html"
}
