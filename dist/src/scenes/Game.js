import Phaser from 'phaser';
import { Player } from '../Player/Player';
import { TeamColors } from '../Player/TeamColorsEnum';
export default class Splash extends Phaser.Scene {
    constructor(sceneName) {
        super(sceneName);
        this.sceneName = 'Splash';
        this.index = 8;
    }
    init() {
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
        this.ship.setScale(.5, .5);
        this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);
        this.cameras.main.setZoom(1.5);
        this.cameras.main.startFollow(this.ship, true);
        this.graphics = this.add.graphics();
        // Create a new scene for the UI
        this.debugUIScene = this.scene.add('debug-ui', new UIScene('debug-ui', this.sceneName, this), true);
    }
    update(time, delta) {
        var _a, _b, _c, _d;
        this.graphics.clear();
        // Poll if left or right arrow is pressed one time and increment or decrement this.index
        const leftKey = (_b = (_a = this.input) === null || _a === void 0 ? void 0 : _a.keyboard) === null || _b === void 0 ? void 0 : _b.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        const rightKey = (_d = (_c = this.input) === null || _c === void 0 ? void 0 : _c.keyboard) === null || _d === void 0 ? void 0 : _d.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        if (Phaser.Input.Keyboard.JustDown(leftKey)) {
            this.index--;
        }
        else if (Phaser.Input.Keyboard.JustDown(rightKey)) {
            this.index++;
        }
        this.add.sprite(240, 150, 'ships', 0).setScale(1);
        // Update your game objects here
        this.ship.update();
        this.debugUIScene.update();
        // Update your game objects here
    }
}
// In the UIScene class
class UIScene extends Phaser.Scene {
    constructor(thisSceneName, parentSceneName, parentScene) {
        super(thisSceneName);
        this._debugGraphicsVisible = true;
        this._isSceneVisible = true;
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
    update() {
        var _a;
        // this._fpsText?.setText(`FPS: ${Math.round(this.game.loop.actualFps)}`);
        // F1 is the key combo to enable the debug mode scene
        if ((_a = this.input.keyboard) === null || _a === void 0 ? void 0 : _a.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F1), 1000)) {
            this._handleSceneVisibility();
        }
    }
    _toggleDebugGraphicsVisible(visible) {
        this._debugGraphicsVisible = visible;
        this._debugGraphics.visible = this._debugGraphicsVisible;
    }
    _disableDebugGraphicsVisible() {
        this._debugGraphicsVisible = false;
        this._toggleDebugGraphicsVisible(this._debugGraphicsVisible);
    }
    _enableDebugGraphicsVisible() {
        this._debugGraphicsVisible = true;
        this._toggleDebugGraphicsVisible(this._debugGraphicsVisible);
    }
    _handleSceneVisibility() {
        // Is the scene visible? If so, hide it, if not, show it
        this._isSceneVisible = !this._isSceneVisible;
        this.scene.setVisible(this._isSceneVisible);
        // If the scene is visible, hide the debug graphics
        if (!this._isSceneVisible) {
            this._disableDebugGraphicsVisible();
            // Disable click events on the scene
            this.input.enabled = false;
        }
        else {
            this._enableDebugGraphicsVisible();
            // Enable click events on the scene
            this.input.enabled = true;
        }
    }
}
//# sourceMappingURL=Game.js.map