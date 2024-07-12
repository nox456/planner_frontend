const auth = await fetch("http://localhost:4000/auth/is-authenticated", {
    credentials: "include",
});
if (auth.status == 401) {
    location.href = "iniciar_sesion.html";
} else {
    // SHOW TASKS
    const res = await fetch("http://localhost:4000/users/info", {
        credentials: "include",
    });
    const { data } = await res.json();

    document.querySelector("#username").innerText = data.username;
    document.querySelector("#score").innerText = `Puntos: ${data.score}`;
    document.querySelector("#achievements").innerText =
        `Logros: ${data.achievements}`;

    const tasks_container = document.querySelector("#tasks-container");

    const { tasks } = data;

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
                        <h3>${task.name}</h3>
                        <dialog>
                            <h3>Eliminar Tarea</h3>
                            <p>${task.name}</p>
                            <p>¿Estás seguro?</p>
                            <button id="close-button">No</button>
                            <button id="confirm-button">Si</button>
                        </dialog>
                        <input type="checkbox" id="done-input" checked>
                        <hr>
                        <p id="course">${task.course}</p>
                        <p>${task.topic}</p>
                        <p id="evaluation">${task.evaluation}</p>
                        <hr>
                        <p id="finish-date">${task.finish_date}</p>
                    `;
                    container.classList.add("task-doned")
                    tasks_container.appendChild(container);
                } else {
                    container.innerHTML = `
                        <h3>${task.name}</h3>
                        <dialog>
                            <h3>Eliminar Tarea</h3>
                            <p>${task.name}</p>
                            <p>¿Estás seguro?</p>
                            <button id="close-button">No</button>
                            <button id="confirm-button">Si</button>
                        </dialog>
                        <button id="delete-button">Eliminar</button>
                        <input type="checkbox" id="done-input">
                        <hr>
                        <p id="course">${task.course}</p>
                        <p>${task.topic}</p>
                        <p id="evaluation">${task.evaluation}</p>
                        <hr>
                        <p id="finish-date">${task.finish_date}</p>
                    `;
                    tasks_container.appendChild(container);
                    const delete_button =
                        container.querySelector("#delete-button");
                    delete_button.addEventListener("click", async () => {
                        container.querySelector("dialog").showModal();
                    });
                    const close_button =
                        container.querySelector("#close-button");
                    close_button.addEventListener("click", () => {
                        container.querySelector("dialog").close();
                    });
                    const confirm_button =
                        container.querySelector("#confirm-button");
                    confirm_button.addEventListener("click", async () => {
                        await fetch(
                            `http://localhost:4000/tasks?id=${task.id}`,
                            {
                                method: "DELETE",
                            },
                        );
                        container.querySelector("dialog").close();
                        container.remove();
                        if (tasks_container.children.length == 0) {
                            tasks_container.innerText =
                                "No hay tareas, por ahora...";
                        }
                    });
                    const done_input = container.querySelector("#done-input");
                    done_input.addEventListener("change", async () => {
                        await fetch(
                            `http://localhost:4000/tasks/done?id=${task.id}`,
                            {
                                credentials: "include",
                                method: "PUT",
                            },
                        );
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
            await fetch("http://localhost:4000/auth/logout", {
                credentials: "include",
            });
            location.href = "../index.html";
        });
    // FILTERS
    const allTasks = Array.from(tasks_container.children)
    // Name
    const search_name_input = document.querySelector("#search-name")
    search_name_input.addEventListener("input", () => {
        const value = search_name_input.value
        if (value == "") {
            tasks_container.innerHTML = ""
            allTasks.forEach((t) => {
                tasks_container.appendChild(t)
            })
        } else {
            const tasks = Array.from(tasks_container.children).filter((task) => {
                const task_name = task.querySelector("h3")
                return task_name.innerText.startsWith(value) 
            })
            tasks_container.innerHTML = ""
            tasks.forEach((t) => {
                tasks_container.appendChild(t)
            })
        }
    })
    // Finish date
    const finish_input = document.querySelector("#filter-finish")
    finish_input.addEventListener("change", () => {
        let value = finish_input.value
        if (value == "") {
            tasks_container.innerHTML = ""
            allTasks.forEach((t) => {
                tasks_container.appendChild(t)
            })
        } else {
            const tasks = Array.from(tasks_container.children).filter((task) => {
                const task_finish_date = new Date(task.querySelector("#finish-date").innerText)
                const finish_date = `${task_finish_date.getFullYear()}-${task_finish_date.getMonth()}-${task_finish_date.getDate()}`
                value = new Date(value)
                const value_formated =  `${value.getFullYear()}-${value.getMonth()}-${value.getDate() + 1}`
                return finish_date == value_formated
            })
            tasks_container.innerHTML = ""
            tasks.forEach((task) => {
                tasks_container.appendChild(task)
            })
        }
    })
    // Evaluation
    const evaluation_input = document.querySelector("#evaluation-input")
    evaluation_input.addEventListener("change", () => {
        const value = evaluation_input.value        
        if (value == "none") {
            tasks_container.innerHTML = ""
            allTasks.forEach((t) => {
                tasks_container.appendChild(t)
            })
        } else {
            const tasks = allTasks.filter((task) => {
                const evaluation = task.querySelector("#evaluation").innerText
                return evaluation == value
            })
            tasks_container.innerHTML = ""
            tasks.forEach((t) => {
                tasks_container.appendChild(t)
            })
        }
    })
    // Course 
    const course_input = document.querySelector("#course-input")
    course_input.addEventListener("change", () => {
        const value = course_input.value        
        if (value == "none") {
            tasks_container.innerHTML = ""
            allTasks.forEach((t) => {
                tasks_container.appendChild(t)
            })
        } else {
            const tasks = allTasks.filter((task) => {
                const course = task.querySelector("#course").innerText
                return course == value
            })
            tasks_container.innerHTML = ""
            tasks.forEach((t) => {
                tasks_container.appendChild(t)
            })
        }
    })
    // Is done 
    const is_done_input = document.querySelector("#is-done-input")
    is_done_input.addEventListener("change", () => {
        const value = is_done_input.value        
        if (value == "none") {
            tasks_container.innerHTML = ""
            allTasks.forEach((t) => {
                tasks_container.appendChild(t)
            })
        } else {
            const tasks = allTasks.filter((task) => {
                return (task.classList.contains("task-doned") && value == "Hecha") || (!task.classList.contains("task-doned") && value == "No Hecha")
            })
            tasks_container.innerHTML = ""
            tasks.forEach((t) => {
                tasks_container.appendChild(t)
            })
        }
    })
}
