document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('#choices button');
    const timerElement = document.getElementById('timer');
    const resultElement = document.getElementById('result');
    let countdown;
    let userChoice;

    const mapping = {
        '1': 'rock',
        '2': 'paper',
        '3': 'scissors'
    };

    const startCountdown = (timeLeft = 10) => {
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

    window.addEventListener('keydown', (e) => {
        const keyNum = e.key;
        const mappedValue = getNumberMapping(keyNum);

        if (!mappedValue) {
            return;
        }

        clearInterval(countdown);
        const computerChoice = Math.floor(Math.random() * 3) + 1; // 1 for rock, 2 for paper, 3 for scissors
        sessionStorage.setItem('computerChoice', computerChoice);
        userChoice = mappedValue;
        const didPlayerWin = playerWon(keyNum, computerChoice);
        displayResult(userChoice, computerChoice, didPlayerWin);
    });

    choices.forEach(button => {
        button.addEventListener('mousedown', (e) => {
            const computerChoice = Math.floor(Math.random() * 3) + 1; // 1 for rock, 2 for paper, 3 for scissors
            sessionStorage.setItem('computerChoice', computerChoice);
        });

        button.addEventListener('mouseup', (e) => {
            clearInterval(countdown);
            userChoice = button.id;
            const computerChoice = sessionStorage.getItem('computerChoice');
            displayResult(userChoice, Number(computerChoice));
        });
    });

    const getNumberMapping = (keyNum) => {
        if (!(keyNum in mapping)) {
            return false;
        }

        return mapping[keyNum];
    }

    const getKeyByValue = (value) => {
        for (const [key, val] of Object.entries(mapping)) {
            if (val === value) {
                return Number(key);
            }
        }
        return null;
    };

    const displayResult = (userChoice, computerChoice) => {
        const computerChoiceMapping = getNumberMapping(computerChoice);
        const userChoiceNumber = getKeyByValue(userChoice);
        const playerResponse = playerWon(userChoiceNumber, computerChoice);
        const resultText = `You chose ${userChoice}. Computer chose ${computerChoiceMapping}. ${playerResponse}`;
        resultElement.textContent = resultText;

        startCountdown(3);
        userChoice = false;
    };

    const playerWon = (userChoiceNumber, computerChoiceNumber) => {
        let playerResponse = '';

        if (userChoiceNumber === computerChoiceNumber) {
            playerResponse = 'It\'s a tie!';
        } else if ((userChoiceNumber === computerChoiceNumber + 1) || (userChoiceNumber === 1 && computerChoiceNumber === 3)) {
            playerResponse = 'You win!';
        } else {
            playerResponse = 'You lose, computer wins.';
        }

        return playerResponse;
    }

    startCountdown(3);
});
