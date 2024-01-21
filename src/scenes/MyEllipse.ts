import Phaser from 'phaser';


type ellipseConfig = {
    lineStyle: {
        width: number;
        color: number;
    },
    fillColor: number;
};

type MovementKeysConfig = {
    LEFT: number;
    RIGHT: number;
    UP: number;
    DOWN: number;
};

export default class MyEllipse extends Phaser.GameObjects.Ellipse {
    private _config: Object;
    private _left: Phaser.Input.Keyboard.Key | undefined;
    private _right: Phaser.Input.Keyboard.Key | undefined;
    private _up: Phaser.Input.Keyboard.Key | undefined;
    private _down: Phaser.Input.Keyboard.Key | undefined;
    
    private _movementKeys: MovementKeysConfig;

    private _radius: number;
    private _gfx: Phaser.GameObjects.Graphics;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        radius: number,
        graphics: Phaser.GameObjects.Graphics,
        config: ellipseConfig = { lineStyle: { width: 1, color: 0x00F1A1 }, fillColor: 0x0000FF },
        movementKeys: MovementKeysConfig = {
            LEFT: Phaser.Input.Keyboard.KeyCodes.A,
            RIGHT: Phaser.Input.Keyboard.KeyCodes.D,
            UP: Phaser.Input.Keyboard.KeyCodes.W,
            DOWN: Phaser.Input.Keyboard.KeyCodes.S    
        }
    ) {
        super(scene, x, y, radius, radius, config.fillColor);
        this._gfx = graphics;
        this._config = config as { lineStyle: { width: number, color: number }, fillColor: number }; // Update the type of _config                
        this._gfx = scene.add.graphics(this._config);
        this._movementKeys = movementKeys;
        this._radius = radius;
        
        if (this.scene) {
            this._left = this.scene.input.keyboard?.addKey(this._movementKeys.LEFT);
            this._right = this.scene.input.keyboard?.addKey(this._movementKeys.RIGHT);
            this._up = this.scene.input.keyboard?.addKey(this._movementKeys.UP);
            this._down = this.scene.input.keyboard?.addKey(this._movementKeys.DOWN);
        }
        this.createPhysicsBody();
    }

    getPoints(quantity: number) {
        let geomEllipse = new Phaser.Geom.Ellipse(this.x, this.y, this.width, this.height);
        return Phaser.Geom.Ellipse.GetPoints(geomEllipse, quantity);
    }

    update() {

        if (this._left?.isDown) {
            this.x -= 1;
        }
        if (this._right?.isDown) {
            this.x += 1;
        }
        if (this._up?.isDown) {
            this.y -= 1;
        }
        if (this._down?.isDown) {
            this.y += 1;
        }
        
        this._gfx.clear()
        this._gfx.fillStyle(this.fillColor, 1)
        this._gfx.strokeEllipseShape(this as unknown as Phaser.Geom.Ellipse);
        this._gfx.fillEllipseShape(this as unknown as Phaser.Geom.Ellipse);
        
    }
    createPhysicsBody() {
        // Enable physics for the ellipse
        this.scene.physics.world.enable(this);
        // We need to half the radius because an ellipse's width and height are twice its radius (diameter)
        (this.body as Phaser.Physics.Arcade.Body).setCircle(this._radius / 2);
        (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
        (this.body as Phaser.Physics.Arcade.Body).setBounce(1);
    }
}