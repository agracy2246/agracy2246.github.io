import Phaser from "phaser";
import { TeamColors } from "./TeamColorsEnum";


export class Player extends Phaser.Physics.Arcade.Sprite {
    private _scene!: Phaser.Scene;

    private _controls: {
        up: Phaser.Input.Keyboard.Key | undefined,
        down: Phaser.Input.Keyboard.Key | undefined,
        left: Phaser.Input.Keyboard.Key | undefined,
        right: Phaser.Input.Keyboard.Key | undefined
    };


    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, teamColor: TeamColors) {
        super(scene, x, y, texture);
        this._scene = scene;
        this._controls = {
            up: this._scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this._scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this._scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this._scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };

        

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

        velocity.normalize().scale(60);
        this.setVelocity(velocity.x, velocity.y)
    }
    
    static preloadPlayerAssets(scene: Phaser.Scene, name: string, teamColor: string): void {
        // Preload assets
        switch (teamColor) {
            case 'red':
                console.log('red switch')
                break;
            case 'blue':
                console.log('blue')
                break;
            case 'green':
                console.log('green')
                break;
            case 'yellow':
                console.log('yellow')
                break;
            default:
                console.log('default')
                break;
        }
        //scene.load.image(name, filePath);
    }
}