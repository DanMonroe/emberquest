import Route from '@ember/routing/route';
// import { inject as service } from '@ember/service';

export default class PlayRoute extends Route {
  // @service game;
  // @service modals;


  model(params) {
    return {
      overrideMap: {
          map: params.map,
          x: params.x,
          y: params.y
        },
        debug: {
          phaserDebug: params.debug,
          level: params.level,
          gold: params.gold
        }
      }
    }
  //
  // async beforeModel(transition) {
  //   await this.loadSettingsData();
  //
  //   if (!this.game.gameManager.cookieConfirm) {
  //     const result = await this.showDialog('gameMessages', 'cookie-confirm-dialog');
  //     console.log('result', result)
  //     transition.abort();
  //
  //   }
  // }
  //
  // async loadSettingsData() {
  //   console.log('route loading settings');
  //   const settingsData = await this.game.loadGameData('settings') || {};
  //   if (settingsData) {
  //     this.game.gameManager.mutedSoundEffectsVolume = settingsData.mutedSoundEffectsVolume || false;
  //     this.game.gameManager.mutedMusicEffectsVolume = settingsData.mutedMusicEffectsVolume || false;
  //     this.game.gameManager.soundEffectsVolume = settingsData.soundEffectsVolume || 1;
  //     this.game.gameManager.musicEffectsVolume = settingsData.musicEffectsVolume || 1;
  //     this.game.gameManager.cookieConfirm = settingsData.cookieConfirm || false;
  //   }
  // }
  //
  // async showDialog(epmModalContainerClass, dialogComponent, options) {
  //   // this.game.gameManager.pauseGame(true);
  //   this.game.epmModalContainerClass = epmModalContainerClass;
  //   let modalResult = await this.modals.open(dialogComponent, options);
  //   // this.game.gameManager.pauseGame(false);
  //   return modalResult;
  // }
  //
}
