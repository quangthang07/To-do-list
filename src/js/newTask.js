

//add new task
function addNewTask() {
    const title = document.getElementById("task-title");
    const detail = document.getElementById("task-detail");
    const date = document.getElementById("task-date");
    const time = document.getElementById("task-time");
    const tag = document.getElementById("task-tag");
    console.log(title.value);
    if (title.value === ""){
        window.alert("Missing task title");
        return;
    }


    db.set("title", title.value);
    db.set("detail", detail.value);
    db.set("date", date.value);
    db.set('time', time.value);
    db.set("tag", tag.value);
    db.set("deleted", false);
    db.save()
        .then(() => {
            title.value = "";
            detail.value = "";
            date.value = "";
            time.value = "";
            tag.value = "";
            window.alert("Added new task!");
        }
        )
        .catch(console.log);
    getData();
}