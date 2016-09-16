/*
 *
 *	XL Platform Fighter/Game
 *	XL Gaming/Declan Tyson
 *	v0.0.32
 *	16/09/2016
 *
 */

class Game {
    constructor(element, width, height, fps) {
        this.canvas = document.getElementById(element);
        this.canvas.width = width;
        this.canvas.height = height;
        this.fps = fps;
        this.ctx = this.canvas.getContext("2d");
        this.currentKeys = [];
        this.keyChanged = false;
        this.startingStockCount = 4;
        this.visibleHitboxes = {};

        this.players = [];
    }

    gameOver() {
        setTimeout(function () {
            // TODO: Go to victory screen
            clearInterval(window.drawScene);
        }, 100);
    }
}

class Player {
    constructor(character, keys) {
        this.character = character;
        this.character.keyBindings = {
            left  : keys.left,
            jump  : keys.jump,
            right : keys.right,
            basicAttack : keys.basicAttack
        };
    }
}

class Scene {
    constructor(game, stage, players) {
        this.game = game;
        this.stage = stage;
        this.players = players;

        this.game.players = players;
        window.drawScene = setInterval(this.draw.bind(this), 1000 / this.game.fps);
    }

    draw() {
        var pre_canvas = document.createElement('canvas'),
            pre_ctx = pre_canvas.getContext('2d');
        pre_canvas.height = this.game.canvas.height;
        pre_canvas.width = this.game.canvas.width;

        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        this.drawStageFloors(pre_ctx);
        this.drawCharacters(pre_ctx);
        this.drawCharacterStocks(pre_ctx);
        for(var i = 0; i < this.players.length; i++) {
            this.characterActions(this.players[i].character);
            this.drawHitboxes(pre_ctx, this.players[i].character);
        }

        this.game.ctx.drawImage(pre_canvas, 0, 0);
    }

    drawStageFloors(pre_ctx) {
        for (var i = 0; i < this.stage.floors.length; i++) {
            var floor = this.stage.floors[i];

            pre_ctx.moveTo(floor.x, floor.y);
            pre_ctx.lineTo(floor.x + floor.width, floor.y);
            pre_ctx.stroke();
        }
    }

    drawCharacterStocks(pre_ctx) {
        for (var i = 0; i < this.players[0].character.stocks; i++) {
            var img = document.createElement('img');
            img.setAttribute("src", "/stock-icons/" + this.players[0].character.id + ".png");
            pre_ctx.drawImage(img, (32 + 40 * i), 32);
        }
    }

    drawCharacters(pre_ctx) {
        for (var i = 0; i < this.players.length; i++) {
            for (var h = 0; h < this.players[i].character.hurtboxes.length; h++) {
                var hurtbox = this.players[i].character.hurtboxes[h];
                pre_ctx.rect(hurtbox.x, hurtbox.y - hurtbox.height, hurtbox.width, hurtbox.height);
                pre_ctx.stroke();
            }
        }
    }

    characterActions(character) {
        character.drawActions(this.stage);
    }

    drawHitboxes(pre_ctx, character) {
        for (var h = 0; h < character.visibleHitboxes.length; h++) {
            var hitbox = character.visibleHitboxes[h];
            var baseHurtbox = character.hurtboxes[0];
            var baseX = baseHurtbox.x;
            if(character.currentDir == 1) {
                baseX += baseHurtbox.width;
            }

            hitbox.dir = character.currentDir;
            hitbox.calculatedX = baseX + (hitbox.xOffset * character.currentDir);

            pre_ctx.strokeStyle = "#FF0000";
            pre_ctx.rect(hitbox.calculatedX, baseHurtbox.y - hitbox.yOffset, hitbox.width, hitbox.height);
            pre_ctx.stroke();
            pre_ctx.strokeStyle = "#000000";
        }
    }
}

document.onkeydown = function (e) {
    if(!activeGame.currentKeys[e.keyCode]) {
        activeGame.keyChanged = true;
        activeGame.currentKeys[e.keyCode] = true;
    }
};

document.onkeyup = function (e) {
    activeGame.currentKeys[e.keyCode] = false;
};