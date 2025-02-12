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



// Include a README file that contains a description of your application.

// Level of effort displayed in creativity, presentation, and user experience.




// turned keyCode into "code" on JS bc "keyCode" is deprecated
// changed data type on HTML

document.addEventListener("DOMContentLoaded", () => {
    console.log("JS Loaded!");

    const title = document.getElementById("title"); // getElementById

    const keysContainer = document.querySelector(".keys"); // query selector

    const keys = document.querySelectorAll(".key");

    // display last key pressed
    const lastKeyDisplay = document.createElement("p");
    lastKeyDisplay.id = "lastKey";
    lastKeyDisplay.innerText = "Last Key Pressed: None";
    lastKeyDisplay.style.fontSize = "20px";
    lastKeyDisplay.style.color = "white";
    lastKeyDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    lastKeyDisplay.style.padding = "10px";
    lastKeyDisplay.style.borderRadius = "5px";
    keysContainer.prepend(lastKeyDisplay); // use prepend

    function playSound(e) {
        console.log(`Key pressed: ${e.code}`); // Debugging log
        const keyCode = e.code || e.target.dataset.key;
        const audio = document.querySelector(`audio[data-key="${e.code}"]`);
        const key = document.querySelector(`.key[data-key="${e.code}"]`);

        if (!audio) {
            console.log(`No audio found for keyCode: ${e.code}`); // debugging
            return; // stops the function from running
        }
        lastKeyDisplay.innerText = `Last Key Pressed: ${key.innerText.trim()}`;

        audio.currentTime = 0; // rewinds to the start
        audio.play();
        key.classList.add("playing");

        console.log(key);

        key.setAttribute("title", `You pressed: ${keyCode}`); // modify attribute dynamically

        if (isRecording) {
            recordedSequence.push({keyCode, time: Date.now() - recordingStartTime});
        }
    };

    function removeTransition(e) {
        console.log(e);
        if (e.propertyName !== "transform") return; // skip if it's not a transform
        console.log(e.propertyName);
        this.classList.remove("playing");
    }


    // listen for an event called transition end on each one (bc you cannot listen on an array -- you have to loop over)
    keys.forEach(key => key.addEventListener("transitionend", removeTransition));

    window.addEventListener("keydown", playSound);

    keys.forEach(key => key.addEventListener("click", playSound)); //  Click-to-play functionality

    // metronome functionality
    let metronomeInterval;
    const metronomeContainer = document.createElement("div");
    metronomeContainer.style.marginTop = "20px";
    document.body.appendChild(metronomeContainer);

    const metronomeButton = document.createElement("button"); 
    metronomeButton.innerText = "Start metronome";
    metronomeButton.style.display = "block";
    metronomeButton.style.fontSize = "16px";
    metronomeButton.style.padding = "10px";
    document.body.appendChild(metronomeButton);


    // option #1 for adding BPM input
    // const bpmInput = document.createElement("input");
    // bpmInput.type = "number";
    // bpmInput.id = "bpmInput";
    // bpmInput.placeholder = "Enter BPM (40-300)";
    // bpmInput.min = "40";
    // bpmInput.max = "300";
    // bpmInput.style.marginLeft = "10px";
    // bpmInput.style.fontSize = "16px";
    // bpmInput.style.padding = "5px";
    // document.body.appendChild(bpmInput);

    metronomeButton.addEventListener("click", () =>{
        const bpm = parseInt(bpmInput.value, 10);
        // const bpm = prompt("Enter BPM (ex: 120):"); 
        if (!bpm || isNaN (bpm) || bpm<40 || bpm> 300){
            alert("Please enter a valid BPM between 40 and 300.");
            return;
        }

        if (metronomeInterval) clearInterval(metronomeInterval); 
        const metronomeSound = new Audio("sounds/metronome.mp3");

        metronomeInterval = setInterval(() => {
            metronomeSound.currentTime = 0;
            metronomeSound.play();
        }, (60/bpm) * 1000);
        metronomeButton.innerText = `Metronome: ${bpm} BPM (Click to stop)`;
    });

    // Recording and playback functionality
    let isRecording = false;
    let recordedSequence = [];
    let recordingStartTime = 0;

    const recordButton = document.createElement("button");
    recordButton.innerText = "Start Recording";
     recordButton.style.fontSize = "16px";
    recordButton.style.padding = "10px";
    recordButton.style.marginTop = "10px";
    document.body.appendChild(recordButton);

    recordButton.addEventListener("click", () => {
        if (!isRecording) {
            isRecording = true;
            recordedSequence = [];
            recordingStartTime = Date.now();
            recordButton.innerText = "Stop recording";
        } else {
            isRecording = false;
            recordButton.innerText = "Start Recording";
            playBackRecording();
        }
    });

    function playBackRecording() {
        if (recordedSequence.length === 0) {
            alert("No recording available.");
            return;
        }

        recordedSequence.forEach(({ keyCode, time }) => {
            setTimeout(() => playSound({ code: keyCode }), time);
        });
    }

    // user input validation -- BPM entry
    const bpmForm = document.createElement("form");
    bpmForm.innerHTML = `
        <label for="bpmInput">Set BPM:</label>
        <input type="number" id="bpmInput" name="bpm" min="40" max="300" required>
        <button type="submit">Set</button>
    `;
    document.body.appendChild(bpmForm);

    bpmForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const bpmInput = document.getElementById("bpmInput");
        const bpmValue = parseInt(bpmInput.value, 10);

        if (bpmValue < 40 || bpmValue > 300) {
            alert("Enter a BPM between 40 and 300.");
        } else {
            alert(`BPM set to ${bpmValue}`);
        }
    });
    
    // BOM features
    setTimeout(() => {
        alert("Welcome to your advanced drum kit! Click keys or use your keyboard to play.");
    }, 1500);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            console.log("Drum kit paused...");
        } else {
            console.log("Drum kit active!");
        }
    });
});