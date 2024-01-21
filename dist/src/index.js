import Phaser from 'phaser';
import MainMenuScene from './scenes/MainMenuScene';
import Splash from './scenes/Game';
import { getShipImages } from './Player/ShipManager';
function preload() {
    let ships = getShipImages();
    for (const team in ships) {
        if (ships.hasOwnProperty(team)) {
            const teamImages = ships[team];
            for (const orientation in teamImages) {
                if (teamImages.hasOwnProperty(orientation)) {
                    const imagePath = teamImages[orientation];
                    this.load.image(imagePath, imagePath); // Using imagePath as the key
                }
            }
        }
    }
}
function create() {
}
function update() {
}
const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    fps: {
        target: 240,
        forceSetTimeOut: true,
    },
    physics: {
        default: 'arcade',
        arcade: {}
    },
    scene: [Splash, MainMenuScene,],
    callbacks: {
        postBoot: function (game) {
            game.registry.set('worldWidth', 1920);
            game.registry.set('worldHeight', 1080);
        }
    }
};
const game = new Phaser.Game(config);
//# sourceMappingURL=index.js.map