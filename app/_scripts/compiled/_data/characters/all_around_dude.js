"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 *
 *	XL Platform Fighter/Characters/AllAroundDude
 *	XL Gaming/Declan Tyson
 *	v0.0.6
 *	10/09/2016
 *
 */

var AllAroundDude = function (_Character) {
    _inherits(AllAroundDude, _Character);

    function AllAroundDude(game, startPosY, startPosX) {
        _classCallCheck(this, AllAroundDude);

        var _this = _possibleConstructorReturn(this, (AllAroundDude.__proto__ || Object.getPrototypeOf(AllAroundDude)).call(this, game, startPosY, startPosX));

        var opts = {
            name: "All Around Dude",
            maxSpeed: 400,
            acceleration: 2,
            deceleration: 1,
            currentDir: 1,
            hurtboxes: [new Hurtbox(startPosY, startPosX, 15, 35)],
            turnDelay: 0.15,
            weight: 1,
            airSpeed: 300,
            jumpPower: 1,
            jumpHeight: 20,
            allowedJumps: 2,
            jumpThreshold: {
                up: 5,
                down: 15
            }
        };

        _get(AllAroundDude.prototype.__proto__ || Object.getPrototypeOf(AllAroundDude.prototype), "initialise", _this).call(_this, opts);
        return _this;
    }

    return AllAroundDude;
}(Character);
//# sourceMappingURL=all_around_dude.js.map