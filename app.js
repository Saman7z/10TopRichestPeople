// Vars
let itemsContainer = document.getElementById("list-items");
const listItems = [];
let dragStartIndex;
const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Bernard Arnault",
  "Warren Buffett",
  "Larry Ellison",
  "Amancio Ortega",
  "Mark Zuckerberg",
  "Carlos Slim Helu",
  "Michael Bloomberg",
  "Jim Walton",
];
let randomized = [...richestPeople]
  .map((item) => ({ value: item, sorted: Math.random() }))
  .sort((a, b) => a.sorted - b.sorted)
  .map((item) => item.value);
// itemsContainer.innerHTML = `${[...randomized]
//   .map(
//     (item, index) => `
  
//   <div id="item" class="items" data-index="${index}">
//   <div class="number-container">
//       <div id="${index + 1}" class="index-number">${index + 1}</div>
//   </div>
//   <div id="text-data" draggable="true" class="draggble">${item}</div>
//   <div class="data-container">
     
//       <i class="fa fa-grip-lines"></i>
//   </div>
// </div>
//   `
//   )
//   .join("")}`;
[...randomized].forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add('items');
    div.setAttribute("data-index", index);
    div.setAttribute("draggable", 'true');
    div.innerHTML = `<div class="number-container">
           <div id="${index + 1}" class="index-number">${index + 1}</div>
       </div>
       <div id="text-data"  class="draggble">${item}</div>
       <div class="data-container">
         
           <i class="fa fa-grip-lines"></i>
       </div>`;
       itemsContainer.appendChild(div);
       listItems.push(div)
})
//draggable="true"
let draggbles = document.querySelectorAll(".draggble");
let items = document.querySelectorAll(".items");

//functions
//check

const check = () => {
    document.querySelectorAll(".items").forEach((item, index) => {
        const name = item.querySelector(".draggble").innerText.trim();
        if(name != richestPeople[index]) {
            item.style.backgroundColor = "rgb(252, 89, 61)";
            item.style.color = "#fff";
        }else{
            item.style.backgroundColor = "rgb(91, 236, 47)";
            item.style.color = "#fff";
        }
    })
    setTimeout(() => {
      document.querySelectorAll(".items").forEach(item => {
        item.style.backgroundColor = "rgb(197, 255, 243)";
        item.style.color = "#333";
    })
    }, 4000)
}
// SWAP ITEMS
const swapItems = (start, end) => {
 
    let startItem = listItems[start].querySelector(".draggble")
    let endItem = listItems[end].querySelector(".draggble")
  
    // swap
    let temp = startItem.innerText;
    startItem.innerText = endItem.innerText;
    endItem.innerText = temp
    //
};

const dragStart = (e) => {
  dragStartIndex = Number(e.target.getAttribute("data-index"));
  //console.log(dragStartIndex);
  //event.dataTransfer.effectAllowed = "copyMove";
};
const dragOver = (e) => {
  e.preventDefault();
};
const dragDrop = (e) => {
  const dragEndIndex = Number(
    e.target.getAttribute("data-index")
  );
  swapItems(dragStartIndex, dragEndIndex);
  e.target.classList.remove("over");
 // console.log(dragEndIndex);
  //console.log('cl')
};
const dragEnter = (e) => {
  // console.log(e.target);
  e.target.classList.add("over");
  //event.dataTransfer.dropEffect = "copy";
};
const dragLeave = (e) => {
  e.target.classList.remove("over");
};
// DRag event listeners
//draggbles.forEach((item) => item.addEventListener("dragstart", dragStart));
items.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragover", dragOver);
  item.addEventListener("drop", dragDrop);
  item.addEventListener("dragenter", dragEnter);
  item.addEventListener("dragleave", dragLeave);
});

document.getElementById("check-btn").addEventListener("click", check)