"use strict";

//on DOMLoad, call the function that fetches the JSON
document.addEventListener("DOMContentLoaded", ()=>{
    getData("https://kea-alt-del.dk/kata-distortion/");
});

//function that fetches the JSON once X seconds
function getData(link) {
    // console.log(link);
   setInterval(()=>{
    fetch(link)
    .then(function(response) {
        return response.json();
    })
    .then(getQueueNumber) 
   }, 3000);
}

// function that gets the queue number, that contains another function that populates the page
/*function getQueueNumber(data){
    // IN CASE WE NEED TO HAVE A TEMPLATE, USE THIS

    // let queueTemplate = document.querySelector('.queueTemplate').content;
    // let clone = queueTemplate.cloneNode(true);
    // document.querySelector("#queue").appendChild(clone);

    //function populatePage that receives the same parameter as getQueueNumber
    populatePage(data);
}*/

function getQueueNumber(data){
    document.querySelector("#queue-bar").style.width = `${data.inQueue}vw`;
    document.querySelector("#total-people").innerHTML="";

    let arrayDiv = new Array();
    let last = false;

    for(let i=0; i<data.inQueue; i++){
        let elementNumber = arrayDiv[i];
        arrayDiv[i] = document.createElement('img');
        arrayDiv[i].className = 'person-in-queue';
        // setting the class-name of the created elements:    
        document.querySelector("#total-people").appendChild(arrayDiv[i]);
    }

    document.querySelector("#people-in-queue").setAttribute("value", data.inQueue);
    document.querySelector("#queue-number").innerHTML = data.inQueue;
    document.querySelector(".queue-number-ending").innerHTML = getOrdinal(data.inQueue);
    // console.log(data.inQueue);
}

function getOrdinal(n) {
    let s = ["th","st","nd","rd"];
    let v = n % 100;
    return s[(v-20)%10]||s[v]||s[0];
    // return n+(s[(v-20)%10]||s[v]||s[0]);
 }