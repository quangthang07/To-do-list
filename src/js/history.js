//upcoming execution
let displayingPageInHistory = 0;
const historyPageSelectBtn = document.querySelectorAll(".history-pages-select-btn span");
// let deleteBtn = [];
console.log(historyPageSelectBtn);
function displayListInHistory(result) {
    let historyContent= document.querySelector(".history-content ul");
    historyContent.innerHTML= "";
    for (let i=0; i<result.length; i++) {
        if (Math.floor(i/3) == displayingPageInHistory) {
            const li = document.createElement("li");
            li.className = `item-content-${i}`;
            const tag = document.createElement("span");
            if (result[i].deleted == true) {
                tag.className = "deleted-tag";
                tag.innerHTML = "Deleted";
            }else if (result[i].isDone == true) {
                tag.className = "checked-tag";
                tag.innerHTML = "Done";
            }
            const item = document.createElement("span");
            item.innerHTML = `
                Title: ${result[i].get('title')}</br>
                Date: ${result[i].get('date')} ${result[i].get('time')}</br>
                Details: ${result[i].get("detail")}
            `;
            li.appendChild(tag);
            li.appendChild(item);
            historyContent.appendChild(li);
        }
        console.log(historyContent);
        
    };
    // deleteBtn = document.querySelectorAll(".delete-btn");
    // // console.log(deleteBtn);
    // deleteBtn.forEach(btn => {
    //     btn.addEventListener("click", ()=>{
    //         // btn.parentElement.style.display = 'none';
    //         // const clicked = btn.parentElement
    //         const clicked = (btn.parentElement.className.slice(-1));
    //         removeData(todolist.splice(clicked,1)[0]);
    //         // console.log(todolist);
    //         displayListInHistory(todolist);
            
    //     })
    // })
}

historyPageSelectBtn.forEach(btn => {
    btn.addEventListener("click", ()=> {
        displayingPageInHistory = btn.id === "history-prev-page" ? displayingPageInHistory-1 : displayingPageInHistory+1;
        if (displayingPageInHistory == -1) {
            displayingPageInHistory = 0;
        }else if (displayingPageInHistory == Math.floor(todolist.length/3)+1) {
            displayingPageInHistory = Math.floor(todolist.length/3);
        }
        document.querySelector("#history-page").innerHTML = `Page ${displayingPageInHistory+1}`;
        console.log(displayingPageInHistory);
        displayListInHistory(todolist);
    })
})

