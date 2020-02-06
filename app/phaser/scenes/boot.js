import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {

  ember = undefined;

  constructor() {
    super({
      key: 'Boot'
    });
  }

  // preload() {
  //   this.ember = this.game.emberGame;
  // }

  create() {

    this.game.emberGame.loadGameData("gameboard")
        .then(gameboardData => {
          console.log('gameboardData', gameboardData)
          this.scene.start('gameboard', {
              'storedPlayerTile': gameboardData.playerTile,
              'allSeenTiles': gameboardData.seenTiles,
            }
          );
        });
    // this.game.emberGame.loadGameData("playerTile")
    //     .then(storedPlayerTile => {
    //
    //       this.scene.start('gameboard', {
    //           'storedPlayerTile': storedPlayerTile
    //         }
    //       );
    //     });
  }

}
