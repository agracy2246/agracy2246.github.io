import Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {

    private _scene!: Phaser.Scene;
    private _isSpriteSheet: boolean;

    private _controls: {
        up: Phaser.Input.Keyboard.Key | undefined,
        down: Phaser.Input.Keyboard.Key | undefined,
        left: Phaser.Input.Keyboard.Key | undefined,
        right: Phaser.Input.Keyboard.Key | undefined
    };


    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, isSpriteSheet: boolean = false) {
        super(scene, x, y, texture);
        this._scene = scene;

        this._controls = {
            up: this._scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this._scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this._scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this._scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };

        this._isSpriteSheet = isSpriteSheet;

        this.create();
    }

    create(): void {
        this._scene.add.existing(this);
        this._scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        this.body?.setCircle(50, this.width / 2 - 50, this.height / 2 - 50) 
    }

    update(): void {
        this.move();
    }
    
    
    move(): void {
        let velocity = new Phaser.Math.Vector2();
        if (this._controls.left?.isDown) {
            velocity.x -= 1;
        } if (this._controls.right?.isDown) {         
            velocity.x += 1;
        } if (this._controls.up?.isDown) {
            velocity.y -= 1;
        } if (this._controls.down?.isDown) {
            velocity.y += 1;
        }

        velocity.normalize().scale(160);
        this.setVelocity(velocity.x, velocity.y)
    }
    
    static preload(scene: Phaser.Scene, name: string ,filePath: string): void {
        // Preload assets
        scene.load.image(name, filePath);
    }
}