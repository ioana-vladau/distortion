"use strict";

document.addEventListener("DOMContentLoaded", ()=>{
    getData("https://kea-alt-del.dk/kata-distortion/");
});

function getData(link) {
    // console.log(link);
   setInterval(()=>{
    fetch(link)
    .then(function(response) {
        return response.json();
    })
    .then(getQueueNumber) 
   }, 2000);
}

function getQueueNumber(data){
    let queueTemplate = document.querySelector('.queueTemplate').content;
    let clone = queueTemplate.cloneNode(true);
    document.querySelector("#queue-bar").style.width = `${data.inQueue}vw`;
    document.querySelector("#people-in-queue").setAttribute("value", data.inQueue);


    console.log(data.inQueue);
    document.querySelector("#queue").appendChild(clone);
}