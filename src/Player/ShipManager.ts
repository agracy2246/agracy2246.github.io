import { TeamColors } from './TeamColorsEnum';

const BASE_URL = 'src/assets/ships/'
const RED = `${BASE_URL}${TeamColors.RED}/`;
const BLUE = `${BASE_URL}${TeamColors.BLUE}/`;
const GREEN = `${BASE_URL}${TeamColors.GREEN}/`;
const YELLOW = `${BASE_URL}${TeamColors.YELLOW}/`;


type ShipImages = {
    still: string;
    left: string;
    right: string;
    up: string;
    down: string;
    upRight: string;
    upLeft: string;
    downRight: string;
    downLeft: string;
}

type Team = {
    color: typeof TeamColors;
}

type Ships = {
    [key in TeamColors]: ShipImages;
}

// Populate Ships object with the correct images
const ships: Ships = {
    [TeamColors.RED] : {
        still: RED + 'still.png',
        left: RED + 'left.png',
        right: RED + 'right.png',
        up: RED + 'up.png',
        down: RED + 'down.png',
        upRight: RED + 'upRight.png',
        upLeft: RED + 'upLeft.png',
        downRight: RED + 'downRight.png',
        downLeft: RED + 'downLeft.png'        
    },
    [TeamColors.BLUE]: {
        still: 'blueShip',
        left: 'blueShipLeft',
        right: 'blueShipRight',
        up: 'blueShipUp',
        down: 'blueShipDown',
        upRight: 'blueShipUpRight',
        upLeft: 'blueShipUpLeft',
        downRight: 'blueShipDownRight',
        downLeft: 'blueShipDownLeft'
    },
    [TeamColors.GREEN]: {
        still: 'greenShip',
        left: 'greenShipLeft',
        right: 'greenShipRight',
        up: 'greenShipUp',
        down: 'greenShipDown',
        upRight: 'greenShipUpRight',
        upLeft: 'greenShipUpLeft',
        downRight: 'greenShipDownRight',
        downLeft: 'greenShipDownLeft'
    },
    [TeamColors.YELLOW]: {
        still: 'yellowShip',
        left: 'yellowShipLeft',
        right: 'yellowShipRight',
        up: 'yellowShipUp',
        down: 'yellowShipDown',
        upRight: 'yellowShipUpRight',
        upLeft: 'yellowShipUpLeft',
        downRight: 'yellowShipDownRight',
        downLeft: 'yellowShipDownLeft'
    }
}
export function getShipImages(): Ships {
    return ships;
}
