// script.js

// 1. Our Data Structure
// This array holds objects representing each step of our tutorial.
const lessonSteps = [
    {
        title: "Step 1: Your First Component",
        content: "Welcome! To begin, drag a <strong>battery</strong> to the center of the workspace from the left menu. This will be our power source."
    },
    {
        title: "Step 2: Adding Wires",
        content: "Now, grab a <strong>wire</strong> and connect it to the positive terminal of the battery. Wires allow charge to flow."
    },
    {
        title: "Step 3: What is Voltage?",
        content: "The battery provides <strong>Voltage</strong>. Think of voltage as 'electrical pressure' pushing the electrons through the wire."
    },
    {
        title: "Step 4: Close the Loop",
        content: "Connect the battery, wire, and a bulb into a continuous circle. Notice how the bulb lights up when the loop is closed!"
    }
];

// 2. State Machine Variables
// We track which step the user is currently on (0-indexed).
let currentStepIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    // 3. Grab Elements from the DOM
    const stepTitle = document.getElementById("step-title");
    const stepContent = document.getElementById("step-content");
    const stepContainer = document.getElementById("step-container");
    const progressText = document.getElementById("progress-text");
    
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const resetBtn = document.getElementById("reset-btn");

    // 4. Update Function
    // This handles rendering the text and managing the animation
    function renderStep(index) {
        // First, we remove the 'fade-in' class to trigger the CSS transition back to opacity 0
        stepContainer.classList.remove("fade-in");
        
        // We wait a tiny bit (300ms) for the fade-out to finish, then swap the text!
        setTimeout(() => {
            const step = lessonSteps[index];
            
            // Inject the data from our array into the HTML elements
            stepTitle.textContent = step.title;
            stepContent.innerHTML = step.content; // Use innerHTML to allow <strong> tags
            progressText.textContent = `Progress: ${index + 1} of ${lessonSteps.length}`;
            
            // Add the 'fade-in' class back to trigger the fade-up animation
            stepContainer.classList.add("fade-in");
            
            // Update button disabled/enabled states
            updateButtons(index);
        }, 300);
    }

    // This handles the logic for when buttons should be clickable
    function updateButtons(index) {
        // Can't go back if we are on the first step
        prevBtn.disabled = index === 0;
        
        // If we are on the last step, change Next to Finish
        if (index === lessonSteps.length - 1) {
            nextBtn.textContent = "Finish";
            nextBtn.disabled = true;
        } else {
            nextBtn.textContent = "Next Step";
            nextBtn.disabled = false;
        }
    }

    // 5. Button Click Listeners (The Triggers)
    
    // Go forward
    nextBtn.addEventListener("click", () => {
        if (currentStepIndex < lessonSteps.length - 1) {
            currentStepIndex++;
            renderStep(currentStepIndex);
        }
    });

    // Go backward
    prevBtn.addEventListener("click", () => {
        if (currentStepIndex > 0) {
            currentStepIndex--;
            renderStep(currentStepIndex);
        }
    });

    // Start over entirely
    resetBtn.addEventListener("click", () => {
        currentStepIndex = 0;
        renderStep(currentStepIndex);
    });

    // 6. Initialization
    // Run this once when the page loads to show the very first step
    renderStep(currentStepIndex);
});
