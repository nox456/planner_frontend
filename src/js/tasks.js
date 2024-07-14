import HOST from "./config.js";

const auth = await fetch(`${HOST}/auth/is-authenticated`, {
    credentials: "include",
});
if (auth.status == 401) {
    location.href = "iniciar_sesion.html";
} else {
    // SHOW TASKS
    const tasks_container = document.querySelector("#tasks-container");
    tasks_container.innerHTML = `<p><b>Cargando...</b></p>`;
    document.querySelector("#username").innerHTML = "<p><b>...</b></p>";
    const res = await fetch(`${HOST}/users/info`, {
        credentials: "include",
    });
    const { data } = await res.json();

    document.querySelector("#username").innerText = data.username;

    const score = document.createElement("span");
    score.innerHTML = data.score;
    document.querySelector("#score").appendChild(score);

    const ach = document.createElement("span");
    ach.innerHTML = data.achievements;
    document.querySelector("#achievements").appendChild(ach);

    const { tasks } = data;

    tasks_container.innerHTML = "";
    const tasks_doned = tasks.filter((t) => t.is_done == true);

    document.querySelector("#tasks-doned").innerText =
        `${tasks_doned.length}/${tasks.length}`;

    if (tasks.length == 0) {
        tasks_container.innerText = "No hay tareas, por ahora...";
    } else {
        tasks
            .sort((a, b) => {
                if (a.is_done == true && b.is_done == false) {
                    return 1;
                } else if (a.is_done == false && b.is_done == true) {
                    return -1;
                }
                return 0;
            })
            .forEach((task) => {
                const container = document.createElement("article");
                if (task.is_done) {
                    container.innerHTML = `
                        <header>
                            <div></div>
                            <h3>${task.name}</h3>
                            <input type="checkbox" id="done-input" checked>
                        </header>
                        <main>
                            <p id="course">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M2 7v1l11 4 9-4V7L11 4z"></path><path d="M4 11v4.267c0 1.621 4.001 3.893 9 3.734 4-.126 6.586-1.972 7-3.467.024-.089.037-.178.037-.268V11L13 14l-5-1.667v3.213l-1-.364V12l-3-1z"></path></svg>
                                ${task.course}
                            </p>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M19 2.01H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.998 5 19.815 5 19.01c0-.101.009-.191.024-.273.112-.575.583-.717.987-.727H20c.018 0 .031-.009.049-.01H21V4.01c0-1.103-.897-2-2-2zm0 14H5v-11c0-.806.55-.988 1-1h7v7l2-1 2 1v-7h2v12z"></path></svg>
                                ${task.topic}
                            </p>
                            <p id="evaluation">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M4 21a1 1 0 0 0 .24 0l4-1a1 1 0 0 0 .47-.26L21 7.41a2 2 0 0 0 0-2.82L19.42 3a2 2 0 0 0-2.83 0L4.3 15.29a1.06 1.06 0 0 0-.27.47l-1 4A1 1 0 0 0 3.76 21 1 1 0 0 0 4 21zM18 4.41 19.59 6 18 7.59 16.42 6zM5.91 16.51 15 7.41 16.59 9l-9.1 9.1-2.11.52z"></path></svg>
                                ${task.evaluation}
                            </p>
                        </main>
                        <footer>
                            <p id="finish-date">
                                ${new Date(task.finish_date).getDate()}
                                /
                                ${new Date(task.finish_date).getMonth()}
                                /
                                ${new Date(task.finish_date).getFullYear()}
                            </p>
                        </footer>
                    `;
                    container.classList.add("task-doned");
                    tasks_container.appendChild(container);
                } else {
                    container.innerHTML = `
                        <header>
                            <button id="delete-button" title="Eliminar">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    style="transform:; msfilter:"
                                >
                                    <path
                                        d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
                                    ></path>
                                </svg>
                            </button>
                            <h3>${task.name}</h3>
                            <input type="checkbox" id="done-input" title="Marcar como hecha">
                            <dialog id="delete-dialog">
                                <h3>Eliminar Tarea</h3>
                                <p>${task.name}</p>
                                <b>¿Estás seguro?</b>
                                <div>
                                    <button id="close-button">No</button>
                                    <button id="confirm-button">Si</button>
                                </div>
                            </dialog>
                            <dialog id="done-dialog">
                                <h3>¿Marcar como Hecha?</h3>
                                <div>
                                    <button id="close-button">No</button>
                                    <button id="confirm-button">Si</button>
                                </div>
                            </dialog>
                        </header>
                        <main>
                            <p id="course" title="Materia">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M2 7v1l11 4 9-4V7L11 4z"></path><path d="M4 11v4.267c0 1.621 4.001 3.893 9 3.734 4-.126 6.586-1.972 7-3.467.024-.089.037-.178.037-.268V11L13 14l-5-1.667v3.213l-1-.364V12l-3-1z"></path></svg>
                                ${task.course}
                            </p>
                            <p title="Tema">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M19 2.01H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.998 5 19.815 5 19.01c0-.101.009-.191.024-.273.112-.575.583-.717.987-.727H20c.018 0 .031-.009.049-.01H21V4.01c0-1.103-.897-2-2-2zm0 14H5v-11c0-.806.55-.988 1-1h7v7l2-1 2 1v-7h2v12z"></path></svg>
                                ${task.topic}
                            </p>
                            <p id="evaluation" title="Evaluación">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M4 21a1 1 0 0 0 .24 0l4-1a1 1 0 0 0 .47-.26L21 7.41a2 2 0 0 0 0-2.82L19.42 3a2 2 0 0 0-2.83 0L4.3 15.29a1.06 1.06 0 0 0-.27.47l-1 4A1 1 0 0 0 3.76 21 1 1 0 0 0 4 21zM18 4.41 19.59 6 18 7.59 16.42 6zM5.91 16.51 15 7.41 16.59 9l-9.1 9.1-2.11.52z"></path></svg>
                                ${task.evaluation}
                            </p>
                        </main>
                        <footer>
                            <p id="finish-date" title="Fecha de Finalización">
                                ${new Date(task.finish_date).getDate()}
                                /
                                ${new Date(task.finish_date).getMonth()}
                                /
                                ${new Date(task.finish_date).getFullYear()}
                            </p>
                        </footer>
                    `;
                    tasks_container.appendChild(container);
                    const delete_button =
                        container.querySelector("#delete-button");
                    delete_button.addEventListener("click", async () => {
                        container.querySelector("#delete-dialog").showModal();
                    });
                    const close_button =
                        container.querySelector("#close-button");
                    close_button.addEventListener("click", () => {
                        container.querySelector("#delete-dialog").close();
                    });
                    const confirm_button =
                        container.querySelector("#confirm-button");
                    confirm_button.addEventListener("click", async () => {
                        await fetch(`${HOST}/tasks?id=${task.id}`, {
                            method: "DELETE",
                        });
                        container.querySelector("#delete-dialog").close();
                        container.remove();
                        document.querySelector("#tasks-doned").innerText =
                            `${tasks_doned.length}/${tasks_container.children.length}`;
                        if (tasks_container.children.length == 0) {
                            tasks_container.innerText =
                                "No hay tareas, por ahora...";
                        }
                    });
                    const done_input = container.querySelector("#done-input");
                    const done_dialog = container.querySelector("#done-dialog");
                    done_input.addEventListener("change", async () => {
                        done_input.checked = false;
                        done_dialog.showModal();
                    });
                    done_dialog
                        .querySelector("#close-button")
                        .addEventListener("click", () => {
                            done_input.checked = false;
                            done_dialog.close();
                        });
                    done_dialog
                        .querySelector("#confirm-button")
                        .addEventListener("click", async () => {
                            done_input.checked = true;
                            await fetch(`${HOST}/tasks/done?id=${task.id}`, {
                                credentials: "include",
                                method: "PUT",
                            });
                            container.remove();
                            location.reload();
                        });
                }
            });
    }

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
    // FILTERS
    const allTasks = Array.from(tasks_container.children);
    // Name
    const search_name_input = document.querySelector("#search-name");
    search_name_input.addEventListener("input", () => {
        const value = search_name_input.value;
        if (value == "") {
            tasks_container.innerHTML = "";
            allTasks.forEach((t) => {
                tasks_container.appendChild(t);
            });
        } else {
            const tasks = Array.from(tasks_container.children).filter(
                (task) => {
                    const task_name = task.querySelector("h3");
                    return task_name.innerText.startsWith(value);
                },
            );
            tasks_container.innerHTML = "";
            tasks.forEach((t) => {
                tasks_container.appendChild(t);
            });
        }
    });
    // Finish date
    const finish_input = document.querySelector("#filter-finish");
    finish_input.addEventListener("change", () => {
        let value = finish_input.value;
        if (value == "") {
            tasks_container.innerHTML = "";
            allTasks.forEach((t) => {
                tasks_container.appendChild(t);
            });
        } else {
            const tasks = Array.from(tasks_container.children).filter(
                (task) => {
                    const task_finish_date = new Date(
                        task.querySelector("#finish-date").innerText,
                    );
                    const finish_date = `${task_finish_date.getFullYear()}-${task_finish_date.getMonth()}-${task_finish_date.getDate()}`;
                    value = new Date(value);
                    const value_formated = `${value.getFullYear()}-${value.getMonth()}-${value.getDate() + 1}`;
                    return finish_date == value_formated;
                },
            );
            tasks_container.innerHTML = "";
            tasks.forEach((task) => {
                tasks_container.appendChild(task);
            });
        }
    });
    // Evaluation
    const evaluation_input = document.querySelector("#evaluation-input");
    evaluation_input.addEventListener("change", () => {
        const value = evaluation_input.value;
        if (value == "none") {
            tasks_container.innerHTML = "";
            allTasks.forEach((t) => {
                tasks_container.appendChild(t);
            });
        } else {
            const tasks = allTasks.filter((task) => {
                const evaluation = task.querySelector("#evaluation").innerText;
                return evaluation == value;
            });
            tasks_container.innerHTML = "";
            tasks.forEach((t) => {
                tasks_container.appendChild(t);
            });
        }
    });
    // Course
    const course_input = document.querySelector("#course-input");
    course_input.addEventListener("change", () => {
        const value = course_input.value;
        if (value == "none") {
            tasks_container.innerHTML = "";
            allTasks.forEach((t) => {
                tasks_container.appendChild(t);
            });
        } else {
            const tasks = allTasks.filter((task) => {
                const course = task.querySelector("#course").innerText;
                return course == value;
            });
            tasks_container.innerHTML = "";
            tasks.forEach((t) => {
                tasks_container.appendChild(t);
            });
        }
    });
    // Is done
    const is_done_input = document.querySelector("#is-done-input");
    is_done_input.addEventListener("change", () => {
        const value = is_done_input.value;
        if (value == "none") {
            tasks_container.innerHTML = "";
            allTasks.forEach((t) => {
                tasks_container.appendChild(t);
            });
        } else {
            const tasks = allTasks.filter((task) => {
                return (
                    (task.classList.contains("task-doned") &&
                        value == "Hecha") ||
                    (!task.classList.contains("task-doned") &&
                        value == "No Hecha")
                );
            });
            tasks_container.innerHTML = "";
            tasks.forEach((t) => {
                tasks_container.appendChild(t);
            });
        }
    });
}
