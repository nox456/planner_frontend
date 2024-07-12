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

    // LOGOUT
    const logout_dialog = document.querySelector("#logout-dialog");
    document.querySelector("#username").addEventListener("click", () => {
        logout_dialog.showModal();
    });
    logout_dialog
        .querySelector("#close-button")
        .addEventListener("click", () => {
            logout_dialog.close();
        });
    document
        .querySelector("#logout-button")
        .addEventListener("click", async () => {
            await fetch("http://localhost:4000/auth/logout", {
                credentials: "include",
            });
            location.href = "../index.html";
        });

    const res1 = await fetch("http://localhost:4000/users/leaderboard", {
        credentials: "include",
    });
    const data1 = await res1.json();

    const table = document.querySelector("table")
    
    data1.data.forEach((user, index) => {
        const row = document.createElement("tr")
        const pos = document.createElement("td")
        const username = document.createElement("td")
        const score = document.createElement("td")

        pos.innerText = `#${index + 1}`
        username.innerText = user.username
        score.innerText = `${user.score}pts`

        row.appendChild(pos)
        row.appendChild(username)
        row.appendChild(score)
        table.appendChild(row)
    })
}
