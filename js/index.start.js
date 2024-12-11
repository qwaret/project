const body = document.body;
body.style.backgroundColor = 'black';
body.style.color = 'white';
body.style.fontFamily = 'Arial, sans-serif';
body.style.display = 'flex';
body.style.flexDirection = 'column';
body.style.alignItems = 'center';
body.style.justifyContent = 'center';
body.style.height = '100vh';
body.style.margin = '0';
body.style.backgroundImage = 'url("/img/project.jpg")';
body.style.backgroundSize = 'cover';
body.style.backgroundPosition = 'center';

const heading = document.createElement('h1');
heading.textContent = 'Welcome to the Star Game!';
body.appendChild(heading);

const ticketsDiv = document.createElement('div');
ticketsDiv.style.marginTop = '20px';

const ticketCountText = document.createElement('p');
ticketCountText.textContent = 'Your tickets: 0';
ticketsDiv.appendChild(ticketCountText);
body.appendChild(ticketsDiv);

const button = document.createElement('button');
button.textContent = 'Play';
button.style.color = 'white';
button.style.backgroundColor = 'black';
button.style.border = '2px solid white';
button.style.fontSize = '20px';
button.style.padding = '10px 20px';
button.style.cursor = 'pointer';
button.style.marginTop = '20px';
body.appendChild(button);

let ticketCount = localStorage.getItem('ticketCount') ? parseInt(localStorage.getItem('ticketCount')) : 0;

function updateTickets() {
    ticketCountText.textContent = `Your tickets: ${ticketCount}`;
    localStorage.setItem('ticketCount', ticketCount);
}

function addTicketsEvery5Seconds() {
    setInterval(() => {
        ticketCount++;
        updateTickets();
    }, 5000);
}

function startGame() {
    body.innerHTML = '';
    const gameContainer = document.createElement('div');
    gameContainer.style.position = 'relative';
    gameContainer.style.width = '100vw';
    gameContainer.style.height = '100vh';
    gameContainer.style.overflow = 'hidden';
    body.appendChild(gameContainer);

    const scoreText = document.createElement('p');
    scoreText.textContent = 'Score: 0';
    scoreText.style.color = 'white';
    scoreText.style.fontSize = '20px';
    scoreText.style.position = 'absolute';
    scoreText.style.top = '10px';
    scoreText.style.left = '10px';
    gameContainer.appendChild(scoreText);

    let score = 0;
    function updateScore() {
        scoreText.textContent = `Score: ${score}`;
    }

    let gameTime = 30;
    const timerText = document.createElement('p');
    timerText.style.color = 'white';
    timerText.style.position = 'absolute';
    timerText.style.top = '10px';
    timerText.style.right = '10px';
    timerText.style.fontSize = '20px';
    timerText.textContent = `Time: ${gameTime}s`;
    gameContainer.appendChild(timerText);

    const timer = setInterval(() => {
        gameTime--;
        timerText.textContent = `Time: ${gameTime}s`;
        if (gameTime <= 0) {
            clearInterval(timer);
            clearInterval(starSpawner);
            alert(`Game Over! Your score: ${score}`);
        }
    }, 1000);

    function spawnStar() {
        const star = document.createElement('div');
        star.textContent = '★'; 
        const size = Math.random() * 50 + 20;
        star.style.fontSize = `${size}px`;
        const neonColor = '#FFFFFF';
        star.style.color = neonColor;
        star.style.textShadow = `
        0 0 5px ${neonColor},
        0 0 10px ${neonColor},
        0 0 20px ${neonColor},
        0 0 40px ${neonColor},
        0 0 50px ${neonColor},
        0 0 75px ${neonColor}
        `;
        star.style.position = 'absolute';
        star.style.left = `${Math.random() * (window.innerWidth - size)}px`;
        star.style.top = '-50px';
        star.style.transition = `top 3s linear`;
        gameContainer.appendChild(star);

        setTimeout(() => {
            star.style.top = `${window.innerHeight}px`;
        }, 0);

        star.addEventListener('click', () => {
            score++;
            updateScore();
            star.remove();
        });

        setTimeout(() => {
            if (gameContainer.contains(star)) {
                star.remove();
            }
        }, 3000);
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const starSpawner = setInterval(spawnStar, 300); 
}

button.addEventListener('click', () => {
    if (ticketCount > 0) {
        ticketCount--;
        updateTickets();
        startGame();
    } else {
        alert("You don't have enough tickets for the game!");
    }
});

addTicketsEvery5Seconds();
updateTickets();