import Phaser from 'phaser';

import { Player } from '../Player/Player';
import { TeamColors } from '../Player/TeamColorsEnum';

export default class Splash extends Phaser.Scene {
    sceneName = 'Splash';
    spritesheet: any;
    private ship!: Player;
    private graphics!: Phaser.GameObjects.Graphics;
    private debugUIScene!: UIScene;
    private worldWidth!: number;
    private worldHeight!: number;
    index: number = 8;
    constructor(sceneName: string) {
        super(sceneName);
    }

    init() {
        //     let ships = getShipImages();
        // for (const team in ships) {
        //     if (ships.hasOwnProperty(team)) {
        //         const teamImages = ships[team];
        //         for (const orientation in teamImages) {
        //             if (teamImages.hasOwnProperty(orientation)) {
        //                 const imagePath = teamImages[orientation];
        //                 this.load.image(imagePath, imagePath); // Using imagePath as the key
        //             }
        //         }
        //     }
        // }
    }

    preload() {
        Player.preloadPlayerAssets(this, 'ship', 'red');

        this.load.image('bg', 'src/assets/white.png');
    }

    create() {
        this.worldWidth = this.game.registry.get('worldWidth');
        this.worldHeight = this.game.registry.get('worldHeight');
        // Calculate the extended dimensions for the TileSprite
        const extendedWidth = this.worldWidth * 5;
        const extendedHeight = this.worldHeight * 6;
        // Create and add a background to the scene and make it tile or repeat

        let bg = this.add.tileSprite(0, 0, extendedWidth, extendedHeight, 'bg').setOrigin(0, 0);
        // set the size of the world bounds to the size of the screen
        this.physics.world.setBounds(0, 0, this.worldWidth, this.worldHeight);

        // Create and add a ball to the scene
        // this.player = new Ball(this, 400, 300, 'ball', 1, this.graphics);

        this.ship = new Player(this, 300, 450, 'ship', TeamColors.RED);

        this.ship.setScale(.5, .5)

        this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);
        this.cameras.main.setZoom(1.5);
        this.cameras.main.startFollow(this.ship, true);

        this.graphics = this.add.graphics();

        // Create a new scene for the UI
        this.debugUIScene = this.scene.add('debug-ui', new UIScene('debug-ui', this.sceneName, this), true) as UIScene;

    }

    update(time: number, delta: number) {
        this.graphics.clear();
        // Poll if left or right arrow is pressed one time and increment or decrement this.index
        const leftKey = this.input?.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        const rightKey = this.input?.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        if (Phaser.Input.Keyboard.JustDown(leftKey!)) {
            this.index--;
        } else if (Phaser.Input.Keyboard.JustDown(rightKey!)) {
            this.index++;
        }

        this.add.sprite(240, 150, 'ships', 0).setScale(1);
        // Update your game objects here
        this.ship.update();
        this.debugUIScene.update();
        // Update your game objects here
    }
}

interface Movable {
    speed: number;
    move(direction: string): void;
}

// In the UIScene class
class UIScene extends Phaser.Scene {
    private _thisSceneName: string;
    private _debugGraphics: Phaser.GameObjects.Graphics;
    private _debugGraphicsVisible: boolean = true;
    private _isSceneVisible: boolean = true;
    private _fpsText: Phaser.GameObjects.Text | null;

    constructor(thisSceneName: string, parentSceneName: string, parentScene: Phaser.Scene) {
        super(thisSceneName);
        this._thisSceneName = thisSceneName;
        this._debugGraphics = parentScene.physics.world.createDebugGraphic();
        this._debugGraphics.visible = this._debugGraphicsVisible;
        this._fpsText = null;
    }

    init() {
        console.info(`initialized scene: ${this._thisSceneName}`);
    }
    create() {
        const sceneTitle = this.add.text(0, 0, this._thisSceneName, { color: '#0F0', fontSize: '32px', backgroundColor: '#000' });
        const debugButton = this.add.text(Number(this.sys.game.config.width) - 250, 0, 'Toggle Debug', { color: '#0F0', fontSize: '24px', backgroundColor: '#000' });
        this._fpsText = this.add.text(Number(this.sys.game.config.width) - 250, 50, 'FPS: ', { color: '#0F0', fontSize: '24px', backgroundColor: '#000' });
        // Access the current FPS
        let fps = this.game.loop.actualFps;


        // Optionally, you can log it or use it for other purposes
        console.log("Current FPS: " + Math.round(fps));
        debugButton.setInteractive();
        debugButton.on('pointerdown', () => {
            this._debugGraphics.visible = !this._debugGraphics.visible;
        });
    }

    update(): void {
        // this._fpsText?.setText(`FPS: ${Math.round(this.game.loop.actualFps)}`);
        // F1 is the key combo to enable the debug mode scene
        if (this.input.keyboard?.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F1), 1000)) {
            this._handleSceneVisibility();
        }
    }

    _toggleDebugGraphicsVisible(visible: boolean): void {
        this._debugGraphicsVisible = visible;
        this._debugGraphics.visible = this._debugGraphicsVisible;
    }

    _disableDebugGraphicsVisible(): void {
        this._debugGraphicsVisible = false;
        this._toggleDebugGraphicsVisible(this._debugGraphicsVisible);
    }
    _enableDebugGraphicsVisible(): void {
        this._debugGraphicsVisible = true;
        this._toggleDebugGraphicsVisible(this._debugGraphicsVisible);
    }

    private _handleSceneVisibility(): void {
        // Is the scene visible? If so, hide it, if not, show it
        this._isSceneVisible = !this._isSceneVisible;

        this.scene.setVisible(this._isSceneVisible);
        // If the scene is visible, hide the debug graphics
        if (!this._isSceneVisible) {
            this._disableDebugGraphicsVisible();
            // Disable click events on the scene
            this.input.enabled = false;
        } else {
            this._enableDebugGraphicsVisible();
            // Enable click events on the scene
            this.input.enabled = true;
        }
    }
}