const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const nextCanvas = document.getElementById('next');
const nextCtx = nextCanvas.getContext('2d');

const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

ctx.scale(20, 20);
nextCtx.scale(20, 20);

// Game Constants
const COLS = 12;
const ROWS = 20;
const BLOCK_SIZE = 1; // Since we scaled the context

// Tetromino Colors
const COLORS = [
    null,
    '#FF0D72', // T - Magenta
    '#0DC2FF', // I - Cyan
    '#0DFF72', // S - Green
    '#F538FF', // Z - Purple (Actually Z receives Red usually, let's fix standard colors)
    '#FF8E0D', // L - Orange
    '#FFE138', // O - Yellow
    '#3877FF', // J - Blue
];

// Standard Tetris Colors adjustment if needed, but neon theme allows flexibility
// I=Cyan, J=Blue, L=Orange, O=Yellow, S=Green, T=Purple, Z=Red
const PIECES = [
    [ // T
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [ // I
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
    ],
    [ // S
        [0, 3, 3],
        [3, 3, 0],
        [0, 0, 0],
    ],
    [ // Z
        [4, 4, 0],
        [0, 4, 4],
        [0, 0, 0],
    ],
    [ // L
        [0, 5, 0],
        [0, 5, 0],
        [0, 5, 5],
    ],
    [ // O
        [6, 6],
        [6, 6],
    ],
    [ // J
        [0, 7, 0],
        [0, 7, 0],
        [7, 7, 0],
    ],
];

// Game State
let board = createMatrix(COLS, ROWS);
let player = {
    pos: { x: 0, y: 0 },
    matrix: null,
    score: 0,
    next: null,
};

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let isPaused = false;
let isGameOver = false;
let animationId = null;

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(type) {
    if (type === 'I') return PIECES[1];
    if (type === 'L') return PIECES[4];
    if (type === 'J') return PIECES[6];
    if (type === 'O') return PIECES[5];
    if (type === 'Z') return PIECES[3];
    if (type === 'S') return PIECES[2];
    if (type === 'T') return PIECES[0];
}

function getRandomPiece() {
    const pieces = 'ILJOTSZ';
    return createPiece(pieces[pieces.length * Math.random() | 0]);
}

function drawMatrix(matrix, offset, context = ctx) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = COLORS[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);

                // Add a slight bevel/border effect for better visibility
                context.lineWidth = 0.05;
                context.strokeStyle = 'rgba(0,0,0,0.5)';
                context.strokeRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(board, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.pos);
}

function drawNext() {
    nextCtx.fillStyle = '#1a1a23'; // Match sidebar bg
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);

    if (player.next) {
        // Center the piece in the next box
        const xOffset = (4 - player.next[0].length) / 2;
        const yOffset = (4 - player.next.length) / 2;
        drawMatrix(player.next, { x: xOffset, y: yOffset }, nextCtx);
    }
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                    matrix[y][x],
                    matrix[x][y],
                ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function playerDrop() {
    player.pos.y++;
    if (collide(board, player)) {
        player.pos.y--;
        merge(board, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

function playerHardDrop() {
    while (!collide(board, player)) {
        player.pos.y++;
    }
    player.pos.y--; // Back up one step
    merge(board, player);
    playerReset();
    arenaSweep();
    updateScore();
    dropCounter = 0;
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(board, player)) {
        player.pos.x -= dir;
    }
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(board, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function playerReset() {
    if (player.next === null) {
        player.next = getRandomPiece();
    }
    player.matrix = player.next;
    player.next = getRandomPiece();
    player.pos.y = 0;
    player.pos.x = (board[0].length / 2 | 0) -
        (player.matrix[0].length / 2 | 0);

    drawNext();

    if (collide(board, player)) {
        isGameOver = true;
        cancelAnimationFrame(animationId);
        // Show Game Over overlay or message
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#fff';
        ctx.font = '2px Arial'; // Scaled font size
        ctx.fillText('GAME', 3.5, 9);
        ctx.fillText('OVER', 3.5, 11);

        startBtn.textContent = 'RESTART';
    }
}

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = board.length - 1; y >= 0; --y) {
        for (let x = 0; x < board[y].length; ++x) {
            if (board[y][x] === 0) {
                continue outer;
            }
        }

        const row = board.splice(y, 1)[0].fill(0);
        board.unshift(row);
        ++y;

        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function updateScore() {
    scoreElement.innerText = player.score;
}

function update(time = 0) {
    if (isPaused || isGameOver) return;

    const deltaTime = time - lastTime;
    lastTime = time;

    // Prevent huge jumps (e.g. from tab switch or startup keying)
    if (deltaTime < 1000) {
        dropCounter += deltaTime;
    }

    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    animationId = requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
    if (isGameOver) return;

    if (event.code === 'KeyP') {
        if (isPaused) {
            isPaused = false;
            update();
            startBtn.innerText = 'PAUSE'; // Or Playing...
        } else {
            isPaused = true;
            cancelAnimationFrame(animationId);
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(0, 0, canvas.width / 20, canvas.height / 20); // Scaled

            // Draw Pause text manually because scaling might be tricky for pure text centering without helper
            startBtn.innerText = 'RESUME';
        }
        return;
    }

    if (isPaused) return;

    if (event.keyCode === 37) { // Left
        playerMove(-1);
    } else if (event.keyCode === 39) { // Right
        playerMove(1);
    } else if (event.keyCode === 40) { // Down
        playerDrop();
    } else if (event.keyCode === 81) { // Q (Rotate Left if want)
        playerRotate(-1);
    } else if (event.keyCode === 87 || event.keyCode === 38) { // W or Up
        playerRotate(1);
    } else if (event.code === 'Space') { // Hard Drop
        playerHardDrop();
    }
});

startBtn.addEventListener('click', () => {
    if (isGameOver) {
        board = createMatrix(COLS, ROWS);
        player.score = 0;
        updateScore();
        isGameOver = false;
        playerReset();
        startBtn.innerText = 'PAUSE';
        update();
    } else if (isPaused) {
        isPaused = false;
        update();
        startBtn.innerText = 'PAUSE';
    } else if (!animationId) {
        // First Start
        playerReset();
        lastTime = performance.now(); // Initialize timing
        dropCounter = 0;
        update(lastTime);
        startBtn.innerText = 'PAUSE';
    } else {
        // Pause
        isPaused = true;
        cancelAnimationFrame(animationId);
        startBtn.innerText = 'RESUME';
    }
});

// Initialize Score
updateScore();
