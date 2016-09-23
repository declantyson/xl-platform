'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 *
 *	XL Platform Fighter/Game
 *	XL Gaming/Declan Tyson
 *	v0.0.43
 *	23/09/2016
 *
 */

var Game = function () {
    function Game(element, width, height, fps) {
        _classCallCheck(this, Game);

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

    _createClass(Game, [{
        key: 'gameOver',
        value: function gameOver() {
            setTimeout(function () {
                // TODO: Go to victory screen
                clearInterval(window.drawScene);
            }, 100);
        }
    }]);

    return Game;
}();

var Player = function Player(character, keys) {
    _classCallCheck(this, Player);

    this.character = character;
    this.character.keyBindings = {
        left: keys.left,
        jump: keys.jump,
        right: keys.right,
        basicAttack: keys.basicAttack
    };
};

var Scene = function () {
    function Scene(game, stage, players) {
        _classCallCheck(this, Scene);

        this.game = game;
        this.stage = stage;
        this.players = players;

        this.game.players = players;
        window.drawScene = setInterval(this.draw.bind(this), 1000 / this.game.fps);
    }

    _createClass(Scene, [{
        key: 'draw',
        value: function draw() {
            var pre_canvas = document.createElement('canvas'),
                pre_ctx = pre_canvas.getContext('2d');
            pre_canvas.height = this.game.canvas.height;
            pre_canvas.width = this.game.canvas.width;

            this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

            this.drawStageFloors(pre_ctx);
            this.drawCharacters(pre_ctx);
            this.drawCharacterDamage(pre_ctx);
            this.drawCharacterStocks(pre_ctx);
            for (var i = 0; i < this.players.length; i++) {
                this.characterActions(this.players[i].character);
                this.drawHitboxes(pre_ctx, this.players[i].character);
            }

            this.game.ctx.drawImage(pre_canvas, 0, 0);
        }
    }, {
        key: 'drawStageFloors',
        value: function drawStageFloors(pre_ctx) {
            for (var i = 0; i < this.stage.floors.length; i++) {
                var floor = this.stage.floors[i];

                pre_ctx.moveTo(floor.x, floor.y);
                pre_ctx.lineTo(floor.x + floor.width, floor.y);
                pre_ctx.stroke();
            }
        }
    }, {
        key: 'drawCharacterDamage',
        value: function drawCharacterDamage(pre_ctx) {
            pre_ctx.font = "Helvetica Neue Light 20px";
            for (var p = 0; p < this.players.length; p++) {
                pre_ctx.fillText(this.players[p].character.damage + "%", p * 200 + 32, 90);
            }
        }
    }, {
        key: 'drawCharacterStocks',
        value: function drawCharacterStocks(pre_ctx) {
            for (var p = 0; p < this.players.length; p++) {
                for (var i = 0; i < this.players[p].character.stocks; i++) {
                    var img = document.createElement('img');
                    img.setAttribute("src", "/stock-icons/" + this.players[p].character.id + ".png");
                    pre_ctx.drawImage(img, p * 200 + 32 + 40 * i, 32);
                }
            }
        }
    }, {
        key: 'drawCharacters',
        value: function drawCharacters(pre_ctx) {
            for (var i = 0; i < this.players.length; i++) {
                for (var h = 0; h < this.players[i].character.hurtboxes.length; h++) {
                    var hurtbox = this.players[i].character.hurtboxes[h];
                    pre_ctx.rect(hurtbox.x, hurtbox.y - hurtbox.height, hurtbox.width, hurtbox.height);
                    pre_ctx.stroke();
                }
            }
        }
    }, {
        key: 'characterActions',
        value: function characterActions(character) {
            character.drawActions(this.stage);
        }
    }, {
        key: 'drawHitboxes',
        value: function drawHitboxes(pre_ctx, character) {
            for (var h = 0; h < character.visibleHitboxes.length; h++) {
                var hitbox = character.visibleHitboxes[h];
                hitbox.currentFrame++;
                if (hitbox.currentFrame >= hitbox.startFrame && hitbox.currentFrame <= hitbox.endFrame) {
                    hitbox.active = true;
                } else if (hitbox.currentFrame > hitbox.endFrame) {
                    hitbox.active = false;
                }

                if (!hitbox.active) continue;

                var baseHurtbox = character.hurtboxes[0];
                var baseX = baseHurtbox.x;
                if (character.currentDir == 1) {
                    baseX += baseHurtbox.width;
                }

                hitbox.dir = character.currentDir;
                hitbox.calculatedX = baseX + hitbox.xOffset * character.currentDir;

                pre_ctx.strokeStyle = "#FF0000";
                pre_ctx.rect(hitbox.calculatedX, baseHurtbox.y - hitbox.yOffset, hitbox.width, hitbox.height);
                pre_ctx.stroke();
                pre_ctx.strokeStyle = "#000000";
            }
        }
    }]);

    return Scene;
}();

document.onkeydown = function (e) {
    if (!activeGame.currentKeys[e.keyCode]) {
        activeGame.keyChanged = true;
        activeGame.currentKeys[e.keyCode] = true;
    }
};

document.onkeyup = function (e) {
    activeGame.currentKeys[e.keyCode] = false;
};
//# sourceMappingURL=game.js.map
