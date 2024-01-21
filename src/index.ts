import Phaser, { Scenes } from 'phaser';
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
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
        }
    },
    scene: [Splash,MainMenuScene,],
    callbacks: {
        postBoot: function (game) {
            game.registry.set('worldWidth', 1920);
            game.registry.set('worldHeight', 1080);
        }
    }
};

const game = new Phaser.Game(config);