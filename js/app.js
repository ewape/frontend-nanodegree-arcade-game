

var allEnemies;
var cell = {
    width: 101,
    height: 83,
    grid: {
        x: 5,
        y: 6
    },
    offset: 25
};

// Enemies our player must avoid
var Enemy = function(i) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.index = i + 1;
    this.height = 3;
    this.speedRange = [2, 5];
    this.x = Math.floor((Math.random() * cell.grid.x)) * cell.width;
    this.y = (this.index * cell.height) - cell.offset;

    this.setCurrentCell();
    this.setSpeed();   

};

Enemy.prototype.setCurrentCell = function() {
    this.currentCell = [Math.round(this.x / cell.width), Math.round((this.y -  cell.offset) / cell.height)+1];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (dt !== undefined) {
        this.x += (this.speed * dt);
    }

    if (this.x > cell.width * cell.grid.x) {
        this.resetPosition();
    }

    this.setCurrentCell();
    this.checkCollision();
    
};

Enemy.prototype.checkCollision = function() {
    if (this.currentCell[0] === player.currentCell[0] && this.currentCell[1] === player.currentCell[1]) {
        startGame();
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.resetPosition = function() {
    this.x = -cell.width; 
    this.y = (Math.floor((Math.random() * this.height) +1) * cell.height) - cell.offset;
    this.setSpeed();  
};

Enemy.prototype.setSpeed = function() {
    this.speed = Math.floor((Math.random() * this.speedRange[1]) + this.speedRange[0]) *100;
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.victory = 0;
    this.reset();
    this.setCurrentCell();
     document.querySelector('.victory').innerHTML = this.victory;
};

Player.prototype.setCurrentCell = function() {
    this.currentCell = [Math.round(this.x / cell.width), Math.round(this.y / cell.height)];
    if (this.currentCell[1] === 0) {
        console.log('Won the game!');
        this.victory++;
        document.querySelector('.victory').innerHTML = this.victory;
        console.log('Won the game ' + this.victory + ' times!' );
        startGame();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Player.prototype.update = function() {
    this.setCurrentCell();
};

Player.prototype.reset = function() {
    this.x = cell.width * 2;
    this.y = (cell.height * cell.grid.y) - cell.height - cell.offset;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    
    switch(direction) {
        case 'left':
            if (this.x > 0) {
                this.x-=cell.width;
            }
            break;
        case 'right':
            if (this.x < (cell.width * cell.grid.x) - cell.width) {
                this.x+=cell.width;
            }
            break;
        case 'up':
            if (this.y >= 0) {
                this.y-= cell.height;
            }
            break;
        case 'down':
            if (this.y < (cell.height * cell.grid.y) - cell.height - cell.offset) {
                this.y+= cell.height;
            }
            break;
        default:
        console.log('Wrong direction!');
    }

};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


function addEnemy(i) {
    allEnemies.push(new Enemy(i));
}

function startGame() {
    player.reset();
    allEnemies = [];
    for (var i = 0; i < 3; i++) {
        addEnemy(i);
    }
}

var player = new Player();
startGame();