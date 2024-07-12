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

    const res1 = await fetch("http://localhost:4000/achievements/unfinished", {
        credentials: "include"
    });
    const unfinished = await res1.json();
    const ach_unfinished = unfinished.data

    const res2 = await fetch("http://localhost:4000/achievements/finished", {
        credentials: "include"
    });
    const finished = await res2.json();
    const ach_finished = finished.data

    console.log(ach_unfinished)
    console.log(ach_finished)
    document.querySelector("#achievements-doned").innerText = `${ach_finished.length}/${ach_unfinished.length + ach_finished.length}`

    const table = document.querySelector("table")

    ach_unfinished.forEach((ach) => {
        const row = document.createElement("tr")

        const name = document.createElement("td")
        name.innerText = ach.name

        const reward = document.createElement("td")
        reward.innerText = `Recompensa: ${ach.reward}`

        const progress = document.createElement("td")
        progress.innerText = ach.progress

        const requirement = document.createElement("td")
        requirement.innerText = ach.requirement

        row.appendChild(name)
        row.appendChild(reward)
        row.appendChild(progress)
        row.appendChild(requirement)

        table.appendChild(row)
    })
    ach_finished.forEach((ach) => {
        const row = document.createElement("tr")

        const name = document.createElement("td")
        name.innerText = ach.name

        const reward = document.createElement("td")
        reward.innerText = `Recompensa: ${ach.reward}`

        const progress = document.createElement("td")
        progress.innerText = ach.progress

        const requirement = document.createElement("td")
        requirement.innerText = ach.requirement

        row.appendChild(name)
        row.appendChild(reward)
        row.appendChild(progress)
        row.appendChild(requirement)

        table.appendChild(row)
    })
}
