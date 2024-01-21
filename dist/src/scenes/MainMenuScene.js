import Phaser from 'phaser';
export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }
    preload() {
        // Load assets here
        this.load.image('myImage', './src/assets/biden.png');
    }
    create() {
        // Create game objects here
        this.add.image(Number(this.sys.game.config.width) / 2, Number(this.sys.game.config.height) / 2, 'myImage');
        if (this.input && this.input.keyboard) {
            let key = this.input.keyboard.addKey('SPACE');
            if (key) {
                key.on('down', () => {
                    this.scene.start('Splash');
                });
            }
        }
    }
    update() {
    }
}
//# sourceMappingURL=MainMenuScene.js.map