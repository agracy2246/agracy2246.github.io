import Phaser from "phaser";
export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, teamColor) {
        var _a, _b, _c, _d;
        super(scene, x, y, texture);
        this._scene = scene;
        this._controls = {
            up: (_a = this._scene.input.keyboard) === null || _a === void 0 ? void 0 : _a.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: (_b = this._scene.input.keyboard) === null || _b === void 0 ? void 0 : _b.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: (_c = this._scene.input.keyboard) === null || _c === void 0 ? void 0 : _c.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: (_d = this._scene.input.keyboard) === null || _d === void 0 ? void 0 : _d.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        this.create();
    }
    create() {
        var _a;
        this._scene.add.existing(this);
        this._scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        (_a = this.body) === null || _a === void 0 ? void 0 : _a.setCircle(50, this.width / 2 - 50, this.height / 2 - 50);
    }
    update() {
        this.move();
    }
    move() {
        var _a, _b, _c, _d;
        let velocity = new Phaser.Math.Vector2();
        if ((_a = this._controls.left) === null || _a === void 0 ? void 0 : _a.isDown) {
            velocity.x -= 1;
        }
        if ((_b = this._controls.right) === null || _b === void 0 ? void 0 : _b.isDown) {
            velocity.x += 1;
        }
        if ((_c = this._controls.up) === null || _c === void 0 ? void 0 : _c.isDown) {
            velocity.y -= 1;
        }
        if ((_d = this._controls.down) === null || _d === void 0 ? void 0 : _d.isDown) {
            velocity.y += 1;
        }
        velocity.normalize().scale(160);
        this.setVelocity(velocity.x, velocity.y);
    }
    static preloadPlayerAssets(scene, name, teamColor) {
        // Preload assets
        switch (teamColor) {
            case 'red':
                console.log('red switch');
                break;
            case 'blue':
                console.log('blue');
                break;
            case 'green':
                console.log('green');
                break;
            case 'yellow':
                console.log('yellow');
                break;
            default:
                console.log('default');
                break;
        }
        //scene.load.image(name, filePath);
    }
}
//# sourceMappingURL=Player.js.map