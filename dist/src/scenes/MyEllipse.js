import Phaser from 'phaser';
export default class MyEllipse extends Phaser.GameObjects.Ellipse {
    constructor(scene, x, y, radius, graphics, config = { lineStyle: { width: 1, color: 0x00F1A1 }, fillColor: 0x0000FF }, movementKeys = {
        LEFT: Phaser.Input.Keyboard.KeyCodes.A,
        RIGHT: Phaser.Input.Keyboard.KeyCodes.D,
        UP: Phaser.Input.Keyboard.KeyCodes.W,
        DOWN: Phaser.Input.Keyboard.KeyCodes.S
    }) {
        var _a, _b, _c, _d;
        super(scene, x, y, radius, radius, config.fillColor);
        this._gfx = graphics;
        this._config = config; // Update the type of _config                
        this._gfx = scene.add.graphics(this._config);
        this._movementKeys = movementKeys;
        this._radius = radius;
        if (this.scene) {
            this._left = (_a = this.scene.input.keyboard) === null || _a === void 0 ? void 0 : _a.addKey(this._movementKeys.LEFT);
            this._right = (_b = this.scene.input.keyboard) === null || _b === void 0 ? void 0 : _b.addKey(this._movementKeys.RIGHT);
            this._up = (_c = this.scene.input.keyboard) === null || _c === void 0 ? void 0 : _c.addKey(this._movementKeys.UP);
            this._down = (_d = this.scene.input.keyboard) === null || _d === void 0 ? void 0 : _d.addKey(this._movementKeys.DOWN);
        }
        this.createPhysicsBody();
    }
    getPoints(quantity) {
        let geomEllipse = new Phaser.Geom.Ellipse(this.x, this.y, this.width, this.height);
        return Phaser.Geom.Ellipse.GetPoints(geomEllipse, quantity);
    }
    update() {
        var _a, _b, _c, _d;
        if ((_a = this._left) === null || _a === void 0 ? void 0 : _a.isDown) {
            this.x -= 1;
        }
        if ((_b = this._right) === null || _b === void 0 ? void 0 : _b.isDown) {
            this.x += 1;
        }
        if ((_c = this._up) === null || _c === void 0 ? void 0 : _c.isDown) {
            this.y -= 1;
        }
        if ((_d = this._down) === null || _d === void 0 ? void 0 : _d.isDown) {
            this.y += 1;
        }
        this._gfx.clear();
        this._gfx.fillStyle(this.fillColor, 1);
        this._gfx.strokeEllipseShape(this);
        this._gfx.fillEllipseShape(this);
    }
    createPhysicsBody() {
        // Enable physics for the ellipse
        this.scene.physics.world.enable(this);
        // We need to half the radius because an ellipse's width and height are twice its radius (diameter)
        this.body.setCircle(this._radius / 2);
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(1);
    }
}
//# sourceMappingURL=MyEllipse.js.map