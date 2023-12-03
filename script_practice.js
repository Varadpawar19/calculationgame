// script.js


function generateProblem() {
    const operators = ["+", "-", "*"];
    const minOperand = 1;
    const maxOperand = 15;

    const left = Math.floor(Math.random() * (maxOperand - minOperand + 1) + minOperand);
    const right = Math.floor(Math.random() * (maxOperand - minOperand + 1) + minOperand);
    const operator = operators[Math.floor(Math.random() * operators.length)];

    const expr = `${left} ${operator} ${right}`;
    const ans = eval(expr);
    return [expr, ans];
}

function createProblemElement(problem) {
    const problemElement = document.createElement("div");
    problemElement.innerHTML = `<p>${problem}</p>`;
    return problemElement;
}

function createInputBox() {
    const inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    return inputBox;
}

function createSubmitButton(callback) {
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", callback);
    return submitButton;
}

function createResultElement(result) {
    const resultElement = document.createElement("p");
    resultElement.textContent = result;
    return resultElement;
}

function startPractice() {
    const totalProblems = parseInt(prompt("Enter total number of problems for practice:"));

    alert("Press OK to start practice...");

    const container = document.querySelector(".container");
    container.innerHTML = "<h1>Practice Your Game</h1>";

    let currentProblemIndex = 0;
    const startTime = new Date().getTime(); // Capture start time

    function displayCurrentProblem() {
        const [expr, ans] = generateProblem();

        const problemElement = createProblemElement(`Problem #${currentProblemIndex + 1}: ${expr} =`);
        const inputBox = createInputBox();
        const submitButton = createSubmitButton(() => checkAnswer(inputBox, ans));
        const resultElement = createResultElement("");

        container.appendChild(problemElement);
        container.appendChild(inputBox);
        container.appendChild(submitButton);
        container.appendChild(resultElement);
    }

    function checkAnswer(inputBox, ans) {
        const userAnswer = parseInt(inputBox.value);

        if (!isNaN(userAnswer)) {
            if (userAnswer === ans) {
                // Display correctness on the screen
                const resultElement = createResultElement("Correct!");
                container.appendChild(resultElement);

                // Clear current problem and proceed to the next one
                container.innerHTML = "";
                currentProblemIndex++;

                if (currentProblemIndex < totalProblems) {
                    displayCurrentProblem();
                } else {
                    // All problems solved
                    const endTime = new Date().getTime();
                    const totalTime = (endTime - startTime) / 1000;

                    container.innerHTML = `<p>Practice completed! Your total time is: ${totalTime} seconds.</p>`;
                }
            } else {
                // Display correctness on the screen
                const resultElement = createResultElement("Incorrect! Try again.");
                container.appendChild(resultElement);
            }
        } else {
            // Display correctness on the screen
            const resultElement = createResultElement("Invalid input. Please enter a number.");
            container.appendChild(resultElement);
        }
    }

    // Start with the first problem
    displayCurrentProblem();
}
