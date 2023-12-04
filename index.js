// Define an array to store leads
let myLeads = []

// Get references to HTML elements
let inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const buttonClick = document.getElementById("input-btn")
const deleteClick = document.getElementById("delete-btn")
const saveBtnClick= document.getElementById("save-btn")

deleteClick.addEventListener("dblclick", clearStorage)

// Retrieve leads from localStorage
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

// Check if there are leads in localStorage
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderFunction(myLeads)
}

// Add a click event listener to the button
buttonClick.addEventListener("click", function()
{
    // Get the input value and add it to the leads array
    const lead = inputEl.value.trim()
    
    if (lead !== "") {
        myLeads.push(lead)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderFunction(myLeads)
    }
})

function clearStorage()
{
    console.log("sadjio")
    localStorage.clear
    myLeads = []
    renderFunction(myLeads)
}

saveBtnClick.addEventListener("click", function()
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderFunction(myLeads)
    })
})


function renderFunction(leads) {
    let listItems = ""

    // Iterate through the leads and create list items
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'> 
                ${myLeads[i]}
            </a>
        </li>`
    }

    // Set the HTML content of the ul element
    ulEl.innerHTML = listItems
}
