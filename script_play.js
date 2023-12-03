// script_play.js

document.addEventListener("DOMContentLoaded", function () {
    playGame(1);
});

function playGame(playerId) {
    const totalProblems = parseInt(prompt("Enter total number of problems for practice:"));
    const playerContainer = document.getElementById(`player${playerId}`);

    let currentProblemIndex = 0;
    const startTime = new Date().getTime();

    function displayCurrentProblem() {
        if (currentProblemIndex < totalProblems) {
            const [expr, ans] = generateProblem();

            const problemElement = document.createElement("div");
            problemElement.innerHTML = `<p>Player ${playerId}'s Chance - Problem #${currentProblemIndex + 1}: ${expr} =</p>`;

            const inputBox = document.createElement("input");
            inputBox.setAttribute("type", "text");

            const submitButton = document.createElement("button");
            submitButton.textContent = "Submit";
            submitButton.addEventListener("click", function () {
                checkAnswer(inputBox, ans);
            });

            const resultElement = document.createElement("p");

            playerContainer.appendChild(problemElement);
            playerContainer.appendChild(inputBox);
            playerContainer.appendChild(submitButton);
            playerContainer.appendChild(resultElement);
        } else {
            const endTime = new Date().getTime();
            const totalTime = (endTime - startTime) / 1000;

            playerContainer.innerHTML += `<p>Player ${playerId}'s total time is: ${totalTime} seconds.</p>`;

            if (playerId === 1) {
                playerContainer.innerHTML += `<p>Player 2, get ready! You will have your chance shortly.</p>`;
                currentProblemIndex = 0;

                setTimeout(function () {
                    playerContainer.innerHTML = "";
                    playGame(2);
                }, 3000); // Delay for 3 seconds before starting the second player's turn
            } else {
                comparePlayers();
            }
        }
    }

    function checkAnswer(inputBox, ans) {
        const userAnswer = parseInt(inputBox.value);

        if (!isNaN(userAnswer)) {
            if (userAnswer === ans) {
                const resultElement = document.createElement("p");
                resultElement.textContent = "Correct!";
                resultElement.className = "result-correct";
                playerContainer.appendChild(resultElement);

                playerContainer.innerHTML = "";
                currentProblemIndex++;

                if (currentProblemIndex < totalProblems) {
                    displayCurrentProblem();
                }
            } else {
                const resultElement = document.createElement("p");
                resultElement.textContent = "Incorrect! Try again.";
                resultElement.className = "result-incorrect";
                playerContainer.appendChild(resultElement);
            }
        } else {
            const resultElement = document.createElement("p");
            resultElement.textContent = "Invalid input. Please enter a number.";
            resultElement.className = "result-incorrect";
            playerContainer.appendChild(resultElement);
        }
    }

    function comparePlayers() {
        const player1Time = parseFloat(document.getElementById("player1").textContent.match(/\d+\.\d+/)[0]);
        const player2Time = parseFloat(document.getElementById("player2").textContent.match(/\d+\.\d+/)[0]);

        let winner;
        if (player1Time < player2Time) {
            winner = "Player 1";
        } else if (player1Time > player2Time) {
            winner = "Player 2";
        } else {
            winner = "It's a tie!";
        }

        document.getElementById("result").innerHTML = `<p>${winner} wins!</p>`;
    }

    displayCurrentProblem();
}

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
