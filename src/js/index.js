
const APPLICATION_KEY = "6bf0d0f88387f1da20687ebb5ffad5661538aae4bb755a388dadd77ad582daa8";
const CLIENT_KEY = "a983630bad18c17bd98760fd681d20f273edf7045a5abf64865deef2fce9ed7c";
const ncmb = new NCMB(APPLICATION_KEY, CLIENT_KEY);
const DataBase = ncmb.DataStore("TodoList")
const db = new DataBase();

let todolist = [];
let finishedList = [];
let date = new Date();
let thisMonth = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`;
const today = `${date.getFullYear()}-${thisMonth}-${date.getDate()}`;
console.log(today);

const newTaskTemplate = document.querySelector(".new-task")
const upcomingTemplate = document.querySelector(".upcoming");
const calendaTemplate = document.querySelector(".calendar");
const historyTemplate = document.querySelector(".history");
let currentDisplayTemplate = upcomingTemplate;

function displayNewTask() {
    currentDisplayTemplate.style.display = "none";
    newTaskTemplate.style.display = "inline";
    currentDisplayTemplate = newTaskTemplate;
}
function displayUpcoming() {
    currentDisplayTemplate.style.display = "none";
    upcomingTemplate.style.display = "inline";
    currentDisplayTemplate = upcomingTemplate;
}
function displayCalenda() {
    currentDisplayTemplate.style.display = "none";
    calendaTemplate.style.display = "block";
    currentDisplayTemplate = calendaTemplate;
}
function displayHistory() {
    currentDisplayTemplate.style.display = "none";
    historyTemplate.style.display = "inline";
    currentDisplayTemplate = historyTemplate;
}


//data getting
function getData() {
    DataBase.order("date", false)
        .fetchAll()
        .then((result) => {
            result.forEach(ele => {
                if (ele.get("date") >= today && (ele.get("title") !== "" && ele.get("deleted") === false) && !checkExistedElement(todolist,ele) && !checkExistedElement(finishedList,ele)) {
                    todolist.push(ele);
                }
            })
            console.log(result);
            displayList(todolist);
            displayListInHistory(finishedList);
        })
        .catch(err => {
            console.log("Something went wrong: ",err);
        })
}

getData();
function removeData(object){
    db.set("title", object.get("title"));
    db.set("detail", object.get('detail'));
    db.set("date", object.get('date'));
    db.set('time', object.get('time'));
    db.set("tag", object.get('tag'));
    db.set("deleted", false);
    db.save()
        .then(() => {
            db.set('deleted', true);
            return db.update();
        })
        .then(() => {
            console.log("deleted data");
        })
        .catch(err => {
            console.log(err);
        })
}
// check existed item in todoList
function checkExistedElement(array ,element) {
    for (let ele of array) {
        if (ele.get('title') === element.get('title')) {
            console.log(ele.get('detail'));
            console.log(element.get('detail'));
            if (ele.get('detail') === element.get('detail')) {
                if (ele.get('date') === element.get('date')) {
                    console.log(ele);
                    return true;
                }
            }
        }
    }
    return false;
}
