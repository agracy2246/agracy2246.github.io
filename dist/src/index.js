import Phaser from 'phaser';
import MainMenuScene from './scenes/MainMenuScene';
import Splash from './scenes/Splash';
let image;
function preload() {
}
function create() {
}
function update() {
    // Update your game objects here
}
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 980 }
        }
    },
    scene: [Splash, MainMenuScene,]
};
const game = new Phaser.Game(config);
//# sourceMappingURL=index.js.map