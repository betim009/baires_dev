// JavaScript Code (script.js)
document.addEventListener('DOMContentLoaded', function () {
    console.log('s')
    // TODO: Fill in the code below
    // 1. Get the button with id "revealButton" and assign it to the variable "revealButton"
    const revealButton = document.getElementById('revealButton');
    // 2. Get the div with id "hiddenContent" and assign it to the variable "hiddenContent"
    const hiddenContent = document.getElementById('hiddenContent');
    // 3. Get the form with id "sampleForm" and assign it to the variable "sampleForm"
    const sampleForm = document.getElementById('sampleForm')
    // 4. Get the element with id "formMessage" and assign it to the variable "formMessage"
    const formMessage = document.getElementById('formMessage')
    // 5. Add a click event listener to "revealButton"
    revealButton.addEventListener('click', function () {
        //    - When clicked, set the display style of "hiddenContent" to 'block'
        hiddenContent.style.display = "block"
    })

    

    // 6. Add a submit event listener to "sampleForm"
    sampleForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nameInput = document.getElementById("name");
        const ageInput = document.getElementById("age");

        const nameLen = nameInput.value.length;
        const numAge = Number(ageInput.value)

        if(nameLen > 8 && numAge >= 4 && numAge <= 99) {
            formMessage.style.display = "block";
        } else {
            alert("Invalid input. Please check your name and age.")
        }
    })
    //    - Prevent the default form submission behavior
    //    - Get the input elements with ids "name" and "age" and assign them to the variables "nameInput" and "ageInput"
    //    - Check if the length of the value in "nameInput" is greater than 8 and the value in "ageInput" is between 4 and 99 (inclusive)
    //      - If true, set the display style of "formMessage" to 'block'
    //      - If false, display an alert with the message 'Invalid input. Please check your name and age.'
});
