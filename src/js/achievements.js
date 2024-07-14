import HOST from "./config.js";

const auth = await fetch(`${HOST}/auth/is-authenticated`, {
    credentials: "include",
});
if (auth.status == 401) {
    location.href = "iniciar_sesion.html";
} else {
    const container = document.querySelector("#ach-container");
    container.innerHTML = "<p><b>Cargando...</b></p>";
    document.querySelector("#username").innerHTML = "<p><b>...</b></p>";
    const res = await fetch(`${HOST}/users/info`, {
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
            await fetch(`${HOST}/auth/logout`, {
                credentials: "include",
            });
            location.href = "../index.html";
        });

    const res1 = await fetch(`${HOST}/achievements/unfinished`, {
        credentials: "include",
    });
    const unfinished = await res1.json();
    const ach_unfinished = unfinished.data;

    const res2 = await fetch(`${HOST}/achievements/finished`, {
        credentials: "include",
    });
    const finished = await res2.json();
    const ach_finished = finished.data;
    container.innerHTML = "";

    document.querySelector("#achievements-doned").innerText =
        `${ach_finished.length}/${ach_unfinished.length + ach_finished.length}`;

    ach_unfinished.forEach((ach) => {
        const achievement = document.createElement("article");

        const left_side = document.createElement("div");
        left_side.id = "left-side"
        const name = document.createElement("h3");
        name.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M12 22c3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.86 0-7 3.141-7 7s3.14 7 7 7zm0-12c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5 2.243-5 5-5zm-1-8H7v5.518a8.957 8.957 0 0 1 4-1.459V2zm6 0h-4v4.059a8.957 8.957 0 0 1 4 1.459V2z"></path><path d="m10.019 15.811-.468 2.726L12 17.25l2.449 1.287-.468-2.726 1.982-1.932-2.738-.398L12 11l-1.225 2.481-2.738.398z"></path></svg>
            ${ach.name}
        `;
        left_side.appendChild(name);

        const reward = document.createElement("p");
        reward.innerText = `Recompensa: ${ach.reward}pts`;
        left_side.appendChild(reward);

        const right_side = document.createElement("div");
        right_side.id = "right-side"
        const requirement = document.createElement("p");
        requirement.innerText = ach.requirement;
        right_side.appendChild(requirement);

        const progress = document.createElement("p");
        progress.innerHTML = `
            ${ach.progress}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M5 22h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2zM5 5h2v2h10V5h2v15H5V5z"></path><path d="m11 13.586-1.793-1.793-1.414 1.414L11 16.414l5.207-5.207-1.414-1.414z"></path></svg>
        `
        right_side.appendChild(progress);

        achievement.appendChild(left_side);
        achievement.appendChild(right_side);

        container.appendChild(achievement);
    });
    ach_finished.forEach((ach) => {
        const achievement = document.createElement("article");
        achievement.classList.add("ach-doned")

        const left_side = document.createElement("div");
        left_side.id = "left-side"
        const name = document.createElement("h3");
        name.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M12 22c3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.86 0-7 3.141-7 7s3.14 7 7 7zm0-12c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5 2.243-5 5-5zm-1-8H7v5.518a8.957 8.957 0 0 1 4-1.459V2zm6 0h-4v4.059a8.957 8.957 0 0 1 4 1.459V2z"></path><path d="m10.019 15.811-.468 2.726L12 17.25l2.449 1.287-.468-2.726 1.982-1.932-2.738-.398L12 11l-1.225 2.481-2.738.398z"></path></svg>
            ${ach.name}
        `;
        left_side.appendChild(name);

        const reward = document.createElement("p");
        reward.innerText = `Recompensa: ${ach.reward}pts`;
        left_side.appendChild(reward);

        const right_side = document.createElement("div");
        right_side.id = "right-side"
        const requirement = document.createElement("p");
        requirement.innerText = ach.requirement;
        right_side.appendChild(requirement);

        const progress = document.createElement("p");
        progress.innerHTML = `
            ${ach.progress}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M5 22h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2zM5 5h2v2h10V5h2v15H5V5z"></path><path d="m11 13.586-1.793-1.793-1.414 1.414L11 16.414l5.207-5.207-1.414-1.414z"></path></svg>
        `
        right_side.appendChild(progress);

        achievement.appendChild(left_side);
        achievement.appendChild(right_side);

        container.appendChild(achievement);
    });
}
