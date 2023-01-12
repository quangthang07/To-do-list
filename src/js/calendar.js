

//calendar
const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
let liTagList = [];
const prevNextIcons = document.querySelectorAll(".icons span");
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

const month = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];

function rendeCalendar() {
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    let lastDateOfMonth = new Date(currentYear, currentMonth+1, 0).getDate();
    let lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDay();
    let lastDateOflastMonth = new Date(currentYear, currentMonth, 0).getDate();
    let liTag ="";
    for(let i = firstDayOfMonth; i>0; i--) {
        liTag += `<li class=\"inactive\">${lastDateOflastMonth - i + 1}</li>`;
    }

    for(let i=1; i<=lastDateOfMonth; i++) {
        let istoday = i === date.getDate() && currentMonth === new Date().getMonth()
                    && currentYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${istoday}">${i}</li>`;
    }

    for(let i=lastDayOfMonth; i<6; i++) {
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }
    currentDate.innerText = `${month[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;
    liTagList = document.querySelectorAll(".days li");
    liTagList.forEach(li => {
        if (li.className !== "inactive"){
            li.addEventListener("click", () => {
                const monthToString = currentMonth+1 > 9 ? `${currentMonth+1}` : `0${currentMonth+1}`;
                const dateToString = li.innerText.length > 1 ? `${li.innerText}` : `0${li.innerHTML}`;
                const clickedDate = `${currentYear}-${monthToString}-${dateToString}`;
                console.log(clickedDate);
                const modal = document.getElementById("myModal");
                const modalContent = document.querySelector('.modal-content');
                const span = document.getElementsByClassName("modal-close-btn")[0];
                modal.style.display = "block";
                span.onclick = function() {
                    modal.style.display = "none";
                    modalContent.innerHTML = `<span class="modal-close-btn">&times;</span>`;
                }
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                        modalContent.innerHTML = `<span class="modal-close-btn">&times;</span>`;
                    }
                }
                let hasContent = false;
                todolist.forEach(obj => {
                    if(obj.get('date') === clickedDate) {
                        hasContent = true;
                        console.log(obj);
                        const liForModal = document.createElement('li');
                        const item = document.createElement("span");
                        item.innerHTML = `
                            Title: ${obj.get('title')}</br>
                            Date: ${obj.get('date')} ${obj.get('time')}</br>
                            Details: ${obj.get("detail")}</br>
                        `;
                        liForModal.append(item);
                        modalContent.append(liForModal);
                    }
                })
                if (!hasContent) {
                    const pTagForModal = document.createElement('p');
                    pTagForModal.innerHTML = 'No scheduled';
                    modalContent.appendChild(pTagForModal);
                }
                

            })
        }
    })
}
rendeCalendar();

prevNextIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        console.log(icon.id);
        currentMonth = icon.id === "previous" ? currentMonth-1 : currentMonth+1;
        if (currentMonth < 0 || currentMonth > 11) {
            date = new Date(currentYear, currentMonth);
            currentYear = date.getFullYear();
            currentMonth = date.getMonth();
        }else {
            date = new Date();
        }
        rendeCalendar();
    })
})