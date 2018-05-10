//Frodo starting from top-left corner

function Frodo() {
    this.x = 0;
    this.y =0;
    this.direction = 'right';
}

//Random position of ring

function Ring() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

//Constructor Game : includes Frodo, Ring, board and score

function Game() {
    this.board = document.getElementById('board').querySelectorAll('div');
    this.frodo = new Frodo();
    this.ring = new Ring();
    this.idSetInterval = '';

    this.index = function (x,y) {
        return x+ (y*10);
    };

    this.showFrodo = function () {
        self.hideVisibleFrodo(); //hiding previous Frodo
        this.board[this.index(this.frodo.x, this.frodo.y)].classList.add('frodo');
    };


    this.showRing = function () {
       this.board[this.index(this.ring.x,this.ring.y)].classList.add('ring');
    };

    var self = this;

    this.moveFrodo = function () {

        if (self.frodo.direction === 'right') {
            self.frodo.x = self.frodo.x +1;
        } else if (self.frodo.direction === 'left') {
            self.frodo.x = self.frodo.x - 1;
        }if (self.frodo.direction === 'up') {
            self.frodo.y = self.frodo.y-1;
        }else if (self.frodo.direction === 'down') {
            self.frodo.y = self.frodo.y+1;
        }

        self.gameOver();
        self.checkRingCollision();
        self.showFrodo();

    };

    this.startGame = function () {
        this.idSetInterval = setInterval( self.moveFrodo, 250 );
    };

    this.hideVisibleFrodo = function () {
        var elm =document.querySelector('div.frodo');
        if (elm) {elm.classList.remove('frodo');}
    };

    this.turnFrodo = function (event) {
        switch (event.which) {
            case 37:
                this.frodo.direction = 'left';
                break;
            case 38:
                this.frodo.direction = 'up';
                break;
            case 39:
                this.frodo.direction = 'right';
                break;
            case 40:
                this.frodo.direction = 'down';
                break;
        }

    };
    
    this.checkRingCollision = function () {
        if ((self.frodo.x === self.ring.x) && (self.frodo.y===self.ring.y)) {
            this.board[this.index(self.ring.x,self.ring.y)].classList.remove('ring');
            document.getElementById('score').querySelector('strong').innerText++;
            this.ring = new Ring();
            self.showRing();
        }
    };

   this.gameOver = function () {

        if(this.frodo.x < 0 || this.frodo.x > 9 || this.frodo.y < 0 || this.frodo.y > 9) {
            clearInterval(this.startGame.idSetInterval);
            self.hideVisibleFrodo();
            document.querySelector('#board').classList.add('invisible');
            document.querySelector('#score').classList.add('invisible');

            var endGameScreen = document.createElement('section');
            var finalScoreMsg = document.createElement('div');
            var newGameMsg = document.createElement('span');
            var score = document.getElementById('score').querySelector('strong').innerText;

            if (Number(score)=== 1){
                finalScoreMsg.innerText = 'This time Frodo gathered  '+ score +  ' Ring of Power';
            }else{
                finalScoreMsg.innerText = 'This time Frodo gathered  '+ score +  ' Rings of Power';
            }



            newGameMsg.innerText = 'Hit F5 to try again!';

            endGameScreen.innerHTML = '<p>GAME OVER</p>';
            endGameScreen.classList.add('pre');
            endGameScreen.appendChild(finalScoreMsg);
            endGameScreen.appendChild(newGameMsg);

            var body = document.querySelector('body');
            body.appendChild(endGameScreen);

        }
    };

}

var game = new Game();
game.showFrodo();
game.showRing();
game.startGame();

document.addEventListener('keydown', function (event) {
   game.turnFrodo(event);
});
