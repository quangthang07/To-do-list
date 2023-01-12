

//upcoming execution
let displayingPage = 0;
const pageSelectBtn = document.querySelectorAll(".pages-select-btn span");
let deleteBtnList = [];
let checkBtnList =[];
console.log(pageSelectBtn);
function displayList(result) {
    let content= document.querySelector(".content ul");
    content.innerHTML= "";
    for (let i=0; i<result.length; i++) {
        
        if (Math.floor(i/3) == displayingPage) {
            const li = document.createElement("li");
            li.className = `item-content-${i}`;
            const deleteBtn = document.createElement("span");
            deleteBtn.className = "delete-btn";
            deleteBtn.innerHTML = "&times";
            const checkBtn = document.createElement("span");
            checkBtn.className = "check-btn";
            checkBtn.innerHTML = "&check;";
            const item = document.createElement("span");
            item.innerHTML = `
                Title: ${result[i].get('title')}</br>
                Date: ${result[i].get('date')} ${result[i].get('time')}</br>
                Details: ${result[i].get("detail")}
            `;
            li.appendChild(deleteBtn);
            li.appendChild(checkBtn);
            li.appendChild(item);
            content.appendChild(li);
        }
        
    };
    deleteBtnList = document.querySelectorAll(".delete-btn");
    // console.log(deleteBtn);
    deleteBtnList.forEach(btn => {
        btn.addEventListener("click", ()=>{
            const clicked = (btn.parentElement.className.slice(-1));
            // removeData(todolist.splice(clicked,1)[0]);
            const deletedObj = todolist.splice(clicked, 1)[0];
            deletedObj.deleted = true;
            finishedList.push(deletedObj);
            displayList(todolist);
            displayListInHistory(finishedList);
            // console.log(finishedList);
            
        })
    })
    checkBtnList = document.querySelectorAll(".check-btn");
    checkBtnList.forEach(btn => {
        btn.addEventListener("click", ()=>{
            const clicked = btn.parentElement.className.slice(-1);
            const checkedObj = todolist.splice(clicked, 1)[0];
            checkedObj.isDone = true;
            finishedList.push(checkedObj);
            // finishedList.sort(a, b => {
            //     return a.get('date')-b.get('date')
            // })
            displayList(todolist);
            displayListInHistory(finishedList);
            console.log(finishedList);
        })
    })
}

pageSelectBtn.forEach(btn => {
    btn.addEventListener("click", ()=> {
        if (btn.id === "prev-page") {
            displayingPage = displayingPage-1;
        }else if (btn.id === "next-page"){
            displayingPage = displayingPage+1;
        }
        // displayingPage = btn.id === "prev-page" ? displayingPage-1 : displayingPage+1;
        if (displayingPage == -1) {
            displayingPage = 0;
        }else if (displayingPage == Math.floor(todolist.length/3)+1) {
            displayingPage = Math.floor(todolist.length/3);
        }
        document.querySelector("#page").innerHTML = `Page ${displayingPage+1}`;
        console.log(displayingPage);
        displayList(todolist);
    })
})

