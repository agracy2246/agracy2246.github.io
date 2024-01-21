import Phaser from 'phaser';
export default class Splash extends Phaser.Scene {
    constructor() {
        super('Splash');
        this.sceneName = 'Splash';
    }
    preload() {
        // Preload assets
        this.load.image('ball', 'src/assets/ball.png');
    }
    create() {
        // Create and add a button to the top right of the scene that toggles debug mode
        const debugButton = this.add.text(Number(this.sys.game.config.width) - 100, 0, 'Debug', { color: '#0F0' });
        debugButton.setInteractive();
        debugButton.on('pointerdown', () => {
            this.physics.world.debugGraphic.visible = !this.physics.world.debugGraphic.visible;
        });
        this.graphics = this.add.graphics();
        this.physics.world.createDebugGraphic();
        // make the ball collide with edge of the screen
        this.physics.world.setBoundsCollision(true, true, true, true);
        const startX = Number(this.sys.game.config.width) / 2;
        const startY = Number(this.sys.game.config.height) / 2;
        this.ball = this.physics.add.sprite(startX, startY, 'ball');
    }
    update() {
    }
}
//# sourceMappingURL=Splash.js.map