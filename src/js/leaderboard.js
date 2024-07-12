const auth = await fetch("http://localhost:4000/auth/is-authenticated", {
    credentials: "include",
});
if (auth.status == 401) {
    location.href = "iniciar_sesion.html";
} else {
    const res = await fetch("http://localhost:4000/users/leaderboard", {
        credentials: "include",
    });
    const { data } = await res.json();

    const table = document.querySelector("table")
    
    data.forEach((user, index) => {
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
