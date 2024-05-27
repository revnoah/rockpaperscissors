document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('#choices button');
    const timerElement = document.getElementById('timer');
    const resultElement = document.getElementById('result');
    let countdown;
    let userChoice;

    const startCountdown = () => {
        let timeLeft = 3;
        timerElement.textContent = timeLeft;
        countdown = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(countdown);
                if (!userChoice) {
                    resultElement.textContent = 'Please make a choice!';
                }
            }
        }, 1000);
    };

    choices.forEach(button => {
        button.addEventListener('keydown', (e) => {
            // Simulate the computer's choice when any key is pressed
            const computerChoice = Math.floor(Math.random() * 3) + 1; // 1 for rock, 2 for paper, 3 for scissors
            sessionStorage.setItem('computerChoice', computerChoice);

            console.log(computerChoice);
        });

        button.addEventListener('keyup', (e) => {
            clearInterval(countdown);
            userChoice = button.id;
            const computerChoice = sessionStorage.getItem('computerChoice');
            displayResult(userChoice, computerChoice);
        });
    });

    const displayResult = (userChoice, computerChoice) => {
        // Logic to determine winner and display result
        // For simplicity, assume 1: Rock, 2: Paper, 3: Scissors
        const resultText = `User chose ${userChoice}. Computer chose ${computerChoice}.`;
        resultElement.textContent = resultText;
    };

    startCountdown();
});
