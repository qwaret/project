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
const heading = document.createElement('h1');
heading.textContent = 'Welcome to the game!';
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
    let gameTime = 90; 
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
            clearInterval(ballSpawner);
            alert(`Game Over! Your score: ${score}`);
        }
    }, 1000);
    function spawnBall() {
        const ball = document.createElement('div');
        const size = Math.random() * 50 + 20;
        ball.style.width = `${size}px`;
        ball.style.height = `${size}px`;
        ball.style.borderRadius = '50%';
        ball.style.position = 'absolute';
        ball.style.backgroundColor = getRandomColor();
        ball.style.left = `${Math.random() * (window.innerWidth - size)}px`;
        ball.style.top = '-50px'; 
        ball.style.transition = `top 3s linear`; 
        gameContainer.appendChild(ball);
        setTimeout(() => {
            ball.style.top = `${window.innerHeight}px`;
        }, 0);
        ball.addEventListener('click', () => {
            score++;
            updateScore();
            ball.remove();
        });
        setTimeout(() => {
            if (gameContainer.contains(ball)) {
                ball.remove();
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
    const ballSpawner = setInterval(spawnBall, 500);
}
button.addEventListener('click', () => {
    if (ticketCount > 0) {
        ticketCount--; 
        updateTickets();
        startGame(); 
    } else {
        alert('У вас недостатньо білетів для гри!');
    }
});
addTicketsEvery5Seconds();
updateTickets();