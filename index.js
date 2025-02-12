// REQ's

// Cache at least one element using selectElementById

// Cache at least one element using querySelector or querySelectorAll.

// the parent-child-sibling relationship to navigate between elements at least once (firstChild, lastChild, parentNode, nextElementSibling, etc.).

// Iterate over a collection of elements to accomplish some task.

// Create at least one element using createElement.

// Use appendChild and/or prepend to add new elements to the DOM.

// Use the DocumentFragment interface or HTML templating with the cloneNode method to create templated content. 

// Modify the HTML or text content of at least one element in response to user interaction using innerHTML, innerText, or textContent.

// Modify the style and/or CSS classes of an element in response to user interactions using the style or classList properties.

// Modify at least one attribute of an element in response to user interaction.

// Register at least two different event listeners and create the associated event handler functions.

// Use at least two Browser Object Model (BOM) properties or methods.

// Include at least one form and/or input with HTML attribute validation.

// Include at least one form and/or input with DOM event-based validation. (This can be the same form or input as the one above, but should include event-based validation in addition to the HTML attribute validation.)

// Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).

// Commit frequently to the git repository. (3x minimum) -- 1x done 2/9 3am

// Include a README file that contains a description of your application.

// Level of effort displayed in creativity, presentation, and user experience.



// const allDivsWithClassName = document.getElementsByClassName("keys");

// Array.from(allDivsWithClassName).forEach(element => {
//     element.addEventListener('keydown', handleKeyPress);
// });

// // turned keyCode into "key" bc "keyCode" is deprecated
// document.addEventListener("keydown", function (event) {
//     console.log(event.key);
//     const audio = document.querySelector(`audio[data-key="${event.key}"]`);
//     console.log(audio);
//     if (audio) {
//         audio.play();
//     }
// });


// function handleKeyPress(event) {

//     if (event.key === 'A') {
//         // Do something when Enter key is pressed
//       }
//     }
  
   
//   // Add event listener to an element
  


function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!audio) return; // stops the function from running
audio.currentTime=0; // rewinds to the start
    audio.play();
    key.classList.add("playing");

    console.log(key);
};

function removeTransition(e){
console.log(e);
if (e.propertyName !== "transition") return; // skip if it's not a transform
console.log(e.propertyName);
this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");

// listen for an event called transition end on each one (bc you cannot listen on an array -- you have to loop over)
keys.forEach(key => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playSound);