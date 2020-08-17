import BasePhaserAgentContainer from "../base-phaser-agent-container";
import {tracked} from '@glimmer/tracking';

export default class PlayerContainer extends BasePhaserAgentContainer {

  @tracked boardedTransport;
  @tracked config;

  constructor(scene, config, agent) {

    config.showPowerBar = true;

    super(scene, config);

    this.config = config;
    this.scene = scene;
    this.board = scene.board;
    this.ember = this.scene.game.ember;
    this.containerType = this.scene.game.ember.constants.SHAPE_TYPE_PLAYER;

    this.id = config.id;

    this.isPlayer = true;
    this.showPowerBar = true;
    this.damageColor = "#ff7700";
    this.damageFont = "22px Arial";

    this.agent = agent;

    this.showPowerBar = true;

    this.cachedHealthPercentage = 0;

    this.setupSprite();

    // set a size on the container
    this.setSize(config.textureSize.width, config.textureSize.height);

    // enable physics
    this.scene.physics.world.enable(this);

    // collide with world bounds
    //
    // Setting this to true prevents the player from completing
    // a move to the outer edges of the map (causing endless loop)
    // and then they get stuck and can't move away from the edge.
    //
    // this.body.setCollideWorldBounds(true);

    // add the player container to our existing scene
    // this.scene.add.existing(this);

    // have the camera follow the player
    this.scene.cameras.main.startFollow(this);


    // create the player
    // this.player = new PlayerPhaserAgent(this.scene, config);
    // this.add(this.player);

    // this.setDepth(this.ember.constants.TILEZ_PLAYER);

    // this.phaserplayerSprite = this.player;

    if (config.debug.override.speed) {
      config.speed = +config.debug.override.speed;
    }

    this.moveToObject = this.scene.rexBoard.add.moveTo(this, {
      speed: config.speed, // 400 default
      occupiedTest: true,
      blockerTest: true
    });

    this.moveToObject.on('complete', this.moveToComplete);

    this.moveToObject.moveableTestCallback = (curTile, targetTile, pathFinder) => {

// TODO  Take this out or the player can move anywhere
// return true;

      if (this.moveToObject.isRunning) {
        return false;
      }
      if (this.agent.power <= 1) {
        if (!this.ember.gameManager.noMovePowerWarned) {
          this.ember.gameManager.messages.addMessage('nomovepower', this.ember.gameManager.intl.t('messages.nomovepower'));
          pathFinder.scene.game.ember.showInfoDialog(this.ember.gameManager.intl.t('messages.nomovepower'));
          this.ember.gameManager.noMovePowerWarned = true;
          this.ember.saveSettingsData();
        }

        return false;
      }

      // inherit speed from transport
      if(this.boardedTransport){
        this.moveToObject.setSpeed(this.boardedTransport.config.speed);
      }
      const allattrs = this.ember.map.getTileAttribute(pathFinder.scene, targetTile);
      let canMove = this.ember.playerHasAbilityFlag(pathFinder.scene.player.container, this.ember.constants.FLAG_TYPE_TRAVEL, allattrs.tF);

      // canMove will also be false if trying to move from sea to land or air to land
      if (!canMove) {

        // is there a sea transport at targetTile
        if (this.ember.map.tileIsDock(pathFinder.scene, curTile)) {
          canMove = this.ember.map.targetTileHasTransport(pathFinder.scene, targetTile);

        // is there an air transport at targetTile
        } else if (this.ember.map.tileIsNest(pathFinder.scene, targetTile)) {
          const targetTileHasTransport = this.ember.map.targetTileHasTransport(pathFinder.scene, targetTile);
          const currentTileIsGreatTree = this.ember.map.tileIsGreatTree(pathFinder.scene, curTile);
          canMove = targetTileHasTransport && currentTileIsGreatTree;

        } else if (this.boardedTransport) {
          // already on board a transport.. is target tile a dock?

          // boardedTransport is air transport and currentTile is nest, and target tile is tree, let move
          if (this.ember.map.tileIsNest(pathFinder.scene, curTile)) {
            const targetTileIsGreatTree = this.ember.map.tileIsGreatTree(pathFinder.scene, targetTile);
            if (targetTileIsGreatTree && this.boardedTransport.agent.playerConfig.transferAtNest) {
              this.disembarkTransport = true;
              canMove = true;
            }
          } else {
            const targetTileIsDock = this.ember.map.tileIsDock(pathFinder.scene, targetTile);

            if (targetTileIsDock && this.boardedTransport.agent.playerConfig.transferAtDock) {
              this.disembarkTransport = true;
              canMove = true;
            }
          }

        }
      } else if ( ! this.boardedTransport) {  // don't adjust speed/power when on a transport

        // console.log('speed', this.agent.moveSpeed(config.speed * allattrs.spdC), config.speed, allattrs.spdC, (allattrs.spdC/2), this.agent.moveSpeedAdj)
        // this.moveToObject.setSpeed((config.speed * allattrs.spdC) * this.agent.moveSpeed);

        // this.moveToObject.setSpeed(100);
        this.moveToObject.setSpeed(this.agent.moveSpeed(config.speed * allattrs.spdC));

        // this.agent.power -= (allattrs.spdC/2);
        // this.agent.power -= allattrs.spdC;
        this.agent.power -= (2 - allattrs.spdC);

        // if (this.power <= 2) {
        //   console.log('No power to move!')
        //   canMove = false;
        // }
      } else if (this.ember.map.tileIsNest(pathFinder.scene, curTile)) {  // Disembark Gryphon?  can move and they are on a transport and on a nest
        const targetTileIsGreatTree = this.ember.map.tileIsGreatTree(pathFinder.scene, targetTile);

        if (targetTileIsGreatTree && this.boardedTransport.agent.playerConfig.transferAtNest) {
          this.disembarkTransport = true;
        }
      }

      return canMove;

    };

    // add behaviors
    this.pathFinder = this.scene.rexBoard.add.pathFinder(this, {
      occupiedTest: true,
      pathMode: 'A*',
      blockerTest: true,
      costCallback: (curTile, targetTile, pathFinder) => {
        // pathFinder.gameObject is 'this'  i.e., this Player object
        const travelFlags = this.ember.map.getTileAttribute(pathFinder.chessData.board.scene, targetTile, 'tF');
        // console.error('pathFinder costCallback', curTile, targetTile, pathFinder, travelFlags);


        return travelFlags ? 100 : 0;
        // return travelFlags ? fov.BLOCKER : 0;
        // return (board.tileXYZToChess(tileXY.x, tileXY.y, 0)) ? fov.BLOCKER : 0;
      },

    });

    this.sightRange = config.sightRange;   // this is sight/movement Range
    this.movingPoints = config.movingPoints;   // this is sight/movement Range
    this.visiblePoints = config.visiblePoints;   // this is sight/movement Range

    this.setData('attrs', config.flagAttributes);

    this.ember.playerContainer = this;

    this.createHealthBar();
    this.reloadHealth.perform();
    this.reloadPower.perform();
  }

  setupSprite() {

    let spriteConfig = {
      animeframes: {
        rest: {yoyo: true, key: 'avatar-rest', playoncreate: true, prefix: 'avatar/avatar_s', start: 1, end: 2, rate: 4, repeat: -1},
        north: {yoyo: true, key: 'avatar-north', prefix: 'avatar/avatar_n', start: 1, end: 3, rate: 6, repeat: 1},
        south: {yoyo: true, key: 'avatar-south', prefix: 'avatar/avatar_s', start: 1, end: 3, rate: 6, repeat: 1},
        east: {yoyo: true, key: 'avatar-east', prefix: 'avatar/avatar_e', start: 1, end: 3, rate: 6, repeat: 1},
        west: {yoyo: true, key: 'avatar-west', prefix: 'avatar/avatar_e', start: 1, end: 3, rate: 6, repeat: 1},
        attack: {yoyo: true, key: 'avatar-attack', prefix: 'avatar/avatar_attack', start: 1, end: 4, rate: 16, repeat: 0}
      },
      textureSize: {width: 42, height: 42},
      firstFrame: 'avatar/avatar_s1.png',
      offsets: {
        img: {x: 10, y: 0}
      },
      scale: .3,
    }

    this.spriteConfig = spriteConfig;



    const playerSprite = this.scene.add.sprite(0, 0, this.ember.constants.SPRITES_TEXTURE);
    if (this.spriteConfig.offsets.img) {
      playerSprite.x += this.spriteConfig.offsets.img.x;
      playerSprite.y += this.spriteConfig.offsets.img.y;

      this.spriteConfig.originalX = playerSprite.x;
      this.spriteConfig.originalY = playerSprite.y;
    }

    playerSprite.setScale(this.spriteConfig.scale);

    this.add(playerSprite);

    this.phaserAgentSprite = playerSprite;

    this.setDepth(this.ember.constants.TILEZ_PLAYER);

    if (this.spriteConfig.animeframes) {
      if (this.spriteConfig.animeframes.rest) {
        this.scene.createAnimation(this.spriteConfig.animeframes.rest);
      }
      if (this.spriteConfig.animeframes.attack) {
        this.scene.createAnimation(this.spriteConfig.animeframes.attack);
      }
      if (this.spriteConfig.animeframes.north) {
        this.scene.createAnimation(this.spriteConfig.animeframes.north);
      }
      if (this.spriteConfig.animeframes.south) {
        this.scene.createAnimation(this.spriteConfig.animeframes.south);
      }
      if (this.spriteConfig.animeframes.east) {
        this.scene.createAnimation(this.spriteConfig.animeframes.east);
      }
      if (this.spriteConfig.animeframes.west) {
        this.scene.createAnimation(this.spriteConfig.animeframes.west);
      }
    }

    // start playing the rest animation
    this.playAnimation(this.ember.constants.ANIMATION.KEY.REST);
  }

  stopAnimation() {
    this.phaserAgentSprite.anims.stop();
  }

  lastAnimationKey = '';

  playAnimation(key) {
    try {
      switch (key) {
        case this.ember.constants.ANIMATION.KEY.REST:
          // start playing the rest animation
          if (this.spriteConfig.animeframes.rest) {
            this.phaserAgentSprite.setX(this.spriteConfig.originalX);
            this.phaserAgentSprite.setFlipX(false);
            // this.stopAnimation();
            this.lastAnimationKey = this.spriteConfig.animeframes.rest.key;
            this.phaserAgentSprite.anims.play(this.spriteConfig.animeframes.rest.key);
          }
          break;
        case this.ember.constants.ANIMATION.KEY.ATTACK:
          if (this.spriteConfig.animeframes.attack) {
            this.phaserAgentSprite.setX(this.spriteConfig.originalX);
            this.phaserAgentSprite.setFlipX(false);
            // this.stopAnimation();
            this.lastAnimationKey = this.spriteConfig.animeframes.attack.key + 'east';
            this.phaserAgentSprite.anims.play(this.spriteConfig.animeframes.attack.key);
          }
          break;
        case this.ember.constants.ANIMATION.KEY.WESTATTACK:
          if (this.spriteConfig.animeframes.attack) {
            // this.stopAnimation();
            this.phaserAgentSprite.setX(-this.spriteConfig.offsets.img.x);
            this.phaserAgentSprite.setFlipX(true);
            this.lastAnimationKey = this.spriteConfig.animeframes.attack.key + 'west';
            this.phaserAgentSprite.anims.play(this.spriteConfig.animeframes.attack.key);
          }
          break;
        case this.ember.constants.ANIMATION.KEY.NORTH:
          if (this.spriteConfig.animeframes.north && (this.lastAnimationKey !== 'avatar-north' || !this.phaserAgentSprite.anims.isPlaying)) {
            this.phaserAgentSprite.setX(this.spriteConfig.originalX);
            this.phaserAgentSprite.setFlipX(false);
            // this.stopAnimation();
            this.lastAnimationKey = this.spriteConfig.animeframes.north.key;
            this.phaserAgentSprite.anims.play(this.spriteConfig.animeframes.north.key);
          }
          break;
        case this.ember.constants.ANIMATION.KEY.SOUTH:
          if (this.spriteConfig.animeframes.south && (this.lastAnimationKey !== 'avatar-south' || !this.phaserAgentSprite.anims.isPlaying)) {
            this.phaserAgentSprite.setX(this.spriteConfig.originalX);
            this.phaserAgentSprite.setFlipX(false);
            // this.stopAnimation();
            this.lastAnimationKey = this.spriteConfig.animeframes.south.key;
            this.phaserAgentSprite.anims.play(this.spriteConfig.animeframes.south.key);
          }
          break;
        case this.ember.constants.ANIMATION.KEY.EAST:
          if (this.spriteConfig.animeframes.east && (this.lastAnimationKey !== 'avatar-east' || !this.phaserAgentSprite.anims.isPlaying)) {
            this.phaserAgentSprite.setX(this.spriteConfig.originalX);
            this.phaserAgentSprite.setFlipX(false);
            this.lastAnimationKey = this.spriteConfig.animeframes.east.key;
            this.phaserAgentSprite.anims.play(this.spriteConfig.animeframes.east.key);
          }
          break;
        case this.ember.constants.ANIMATION.KEY.WEST:
          if (this.spriteConfig.animeframes.west && (this.lastAnimationKey !== 'avatar-west' || !this.phaserAgentSprite.anims.isPlaying)) {
            // this.stopAnimation();
            this.phaserAgentSprite.setX(-this.spriteConfig.offsets.img.x);
            this.phaserAgentSprite.setFlipX(true);
            this.lastAnimationKey = this.spriteConfig.animeframes.west.key;
            this.phaserAgentSprite.anims.play(this.spriteConfig.animeframes.west.key);
          }
          break;
        default:
          break;
      }
    } catch (e) {
      switch (key) {
        case this.ember.constants.ANIMATION.KEY.REST:
          console.error('Exception playing rest animation.', this.spriteConfig.animeframes.rest.key, e);
          break;
        case this.ember.constants.ANIMATION.KEY.ATTACK:
          console.error('Exception playing attack animation.', this.spriteConfig.animeframes.attack.key, e);
          break;
        case this.ember.constants.ANIMATION.KEY.NORTH:
          console.error('Exception playing north animation.', this.spriteConfig.animeframes.north.key, e);
          break;
        case this.ember.constants.ANIMATION.KEY.SOUTH:
          console.error('Exception playing south animation.', this.spriteConfig.animeframes.south.key, e);
          break;
        case this.ember.constants.ANIMATION.KEY.EAST:
          console.error('Exception playing easy animation.', this.spriteConfig.animeframes.east.key, e);
          break;
        case this.ember.constants.ANIMATION.KEY.WEST:
          console.error('Exception playing west animation.', this.spriteConfig.animeframes.west.key, e);
          break;
        default:
          console.error('Exception playing unknown player animation.', key, e);
          break;
      }
    }
  }

  update(cursors) {
    if (!this.ember.gameManager.gamePaused) {
      this.moveTo(cursors);
      this.baseUpdate();
    }
  }


  moveTo(cursors) {

    if (!this.moveToObject.isRunning) {

      if (cursors.D.isDown) {
        this.playAnimation(this.ember.constants.ANIMATION.KEY.EAST);
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.SE);
        if (this.boardedTransport && !this.disembarkTransport) {
          this.boardedTransport.moveToObject.moveToward(this.ember.constants.DIRECTIONS.SE);
        }
      } else if (cursors.S.isDown) {
        this.playAnimation(this.ember.constants.ANIMATION.KEY.SOUTH);
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.S);
        if (this.boardedTransport && !this.disembarkTransport) {
          this.boardedTransport.moveToObject.moveToward(this.ember.constants.DIRECTIONS.S);
        }
      } else if (cursors.A.isDown) {
        this.playAnimation(this.ember.constants.ANIMATION.KEY.WEST);
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.SW);
        if (this.boardedTransport && !this.disembarkTransport) {
          this.boardedTransport.moveToObject.moveToward(this.ember.constants.DIRECTIONS.SW);
        }
      } else if (cursors.Q.isDown) {
        this.playAnimation(this.ember.constants.ANIMATION.KEY.WEST);
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.NW);
        if (this.boardedTransport && !this.disembarkTransport) {
          this.boardedTransport.moveToObject.moveToward(this.ember.constants.DIRECTIONS.NW);
        }
      } else if (cursors.W.isDown) {
        this.playAnimation(this.ember.constants.ANIMATION.KEY.NORTH);
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.N);
        if (this.boardedTransport && !this.disembarkTransport) {
          this.boardedTransport.moveToObject.moveToward(this.ember.constants.DIRECTIONS.N);
        }
      } else if (cursors.E.isDown) {
        this.playAnimation(this.ember.constants.ANIMATION.KEY.EAST);
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.NE);
        if (this.boardedTransport && !this.disembarkTransport) {
          this.boardedTransport.moveToObject.moveToward(this.ember.constants.DIRECTIONS.NE);
        }
      }
    }
  }

  moveToComplete(playerContainer, moveTo) {
    // console.log('player moveToComplete', playerContainer.agent.playerConfig.texture);
    moveTo.scene.game.ember.saveSceneData(moveTo.scene);
    let fieldOfViewTileXYArray = playerContainer.fov.findFOV(playerContainer.visiblePoints);
    moveTo.scene.game.ember.map.findAgentFieldOfView(playerContainer, fieldOfViewTileXYArray);
    moveTo.scene.game.ember.processPlayerMove(playerContainer, moveTo, fieldOfViewTileXYArray);
  }

}
