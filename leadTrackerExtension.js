const inputElement = document.querySelector("#inpBox");
const saveBtn = document.querySelector("#save");
const saveTabBtn = document.querySelector("#saveTab");
const deleteBtn = document.querySelector("#delete");
const ulListElement = document.querySelector("#ulListElem");

let leadsList = [];
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("leadsList"));

if (leadsFromLocalStorage){
   leadsList = leadsFromLocalStorage ;
   displayLeads(leadsList);
}

saveBtn.addEventListener("click", function(){
   leadsList.push(inputElement.value);
   inputElement.value = "";
   localStorage.setItem("leadsList", JSON.stringify(leadsList));
   displayLeads(leadsList);
});

saveTabBtn.addEventListener("click", function(){
   chrome.tabs.query({active: true , currentWindow: true}, function(tabs){
      leadsList.push(tabs[0].url);
      localStorage.setItem("leadsList", JSON.stringify(leadsList));
      displayLeads(leadsList);
   })
});

deleteBtn.addEventListener("click", function(){
   localStorage.clear();
   leadsList = []
   displayLeads(leadsList);
});


function displayLeads(leads){
   let leadsString = "";
   for(let i=0;i< leads.length ; i++){
      if (isValidURL(leads[i])){
         leadsString += `<li><a href= "${leads[i]}" target="_blank"> ${leads[i]} </a></li>`;
      }
      else{
         leadsString += `<li> ${leads[i]} </li>`;
      }
   }
   ulListElement.innerHTML = leadsString ;
}

function isValidURL(string) {
   var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
   return (res !== null)
 };













































