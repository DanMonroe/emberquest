import Phaser from 'phaser';
import Chest from '../chest';
import Door from '../door';
import Projectiles from '../groups/projectiles';
import Projectile from "../groups/projectile";
import SignPost from "../signpost";
import config from 'emberquest/config/environment';

export class GameboardScene extends Phaser.Scene {

  ember = undefined;
  mapData = undefined;
  mapDisplayName = undefined;
  showMapDisplayName = true;
  lastSeenTiles = new Set();
  allSeenTiles = new Set();

  storedData = undefined;

  storedPlayerTile = undefined;
  storedPlayerAttrs = undefined;
  storedTransports = [];
  playerConfig = undefined;
  chests = {};
  transports = {};
  agents = {};
  deadAgents = new Set();
  doors = {};
  signs = {};
  sprites = {};
  spawnTile = {};

  projectiles = {};
  agentprojectiles = {};  // hard coded extra group for emberconf

  constructor() {
    super({
      key: 'gameboard',
      pack: {
        files: [ { type: 'image', key: 'wood_texture', url: '/images/wood_texture.png' } ]
      }
    });

    this.projectiles;
    this.agentprojectiles;
  }


  init(data){
    // console.log('gameboard init', data)
    this.mapname = data.map;
    this.mapDisplayName = data.mapData.mapDisplayName;
    this.showMapDisplayName = data.mapData.showMapDisplayName;
    this.mapData = data.mapData;
    this.storedData = data;
    this.storedPlayerTile = data.storedPlayerTile || data.mapData.spawnLocations.players[0];
    this.allSeenTiles = data.allSeenTiles ? new Set(data.allSeenTiles) : new Set();
    this.storedTransports = data.storedTransports || [];
    this.storedPlayerAttrs = data.storedPlayerAttrs || {};
    this.storedBoardedTransportId = data.boarded || 0;
    // this.deadAgents = data.sceneData ? data.sceneData[this.mapname] && data.sceneData[this.mapname].deadAgents ? new Set(data.sceneData[this.mapname].deadAgents) : new Set() : new Set();
    this.deadAgents = data.sceneData ? data.sceneData.deadAgents ? new Set(data.sceneData.deadAgents) : new Set() : new Set();

    this.lastSeenTiles = new Set();

    // save the tile where we first saw this scene.
    if (data.spawnTile && data.spawnTile) {
      this.spawnTile = {x: data.spawnTile.x, y: data.spawnTile.y, sF: data.storedPlayerAttrs.sF || 0, tF: data.storedPlayerAttrs.tF || 2};  // 2 LAND
    }
  }

  preload() {
    this.ember = this.game.ember;

    const loading = this.add.image(0, 0, 'wood_texture').setOrigin(0,0);
    loading.displayWidth = this.cameras.main.width;
    loading.scaleY = loading.scaleX;

    const mapTexture = this.textures.get(`map_${this.mapData.mapKey}`);
    if (mapTexture.key === undefined || mapTexture.key === '__MISSING') {
      this.load.image(`map_${this.mapData.mapKey}`, this.mapData.mapUrl);
    }
    // this.textures.remove('map');
    // this.load.image('map', this.mapData.mapUrl);

    this.ember.playerContainer = null;
  }

  create() {
    this.configureBoard();

    this.createInput();
    this.createBoard();
    this.createAudio();
    this.createGroups();
    this.createChests();
    this.createDoors();
    this.createSigns();
    this.createSprites();
    this.createGameManager();
    this.boardExperiments();
    this.ember.saveSceneData(this);

    this.ember.gameManager.loadingNewScene = false;
    this.ember.gameManager.pauseGame(false);
    // this.musicAudio.play();
  }

  boardExperiments() {
    // just a place to try new stuff out

    // ALT = tile log report
    // ALT / Shift = Heal
    // ALT / Command = teleport
    // Ctrl / Shift = generate teleport command

    // click end tileXY to get info in console
    this.board.on('tiledown',  (pointer, tileXY) => {
      // console.log('pointer.event', pointer.event)

      if (pointer.event.altKey) {
        this.consoleLogReport(tileXY);
      }

      if (pointer.event.ctrlKey && pointer.event.shiftKey) {
        this.ember.createTeleportCommand(this.mapname, tileXY);
      }


        // this.ember.epmModalContainerClass = 'victory';
      // this.ember.modals.open('victory-dialog', {
      // });

      // full heal:   TODO remove
      if (pointer.event.shiftKey && pointer.event.altKey) {
      // if (tileXY.x < 10 && tileXY.y === 0) {
        console.log('heal', this.player);
        this.player.health = this.player.baseHealth + this.player.armorHealth;
        this.player.power = this.player.basePower + this.player.powerFromInventory;
        // this.ember.gameManager.playSound({'key':'sword_miss'});
      // } else {
      //   this.ember.gameManager.playSound({'key':'pop'});
      }

      if (pointer.event.altKey && pointer.event.metaKey) {  // command alt
        console.log('teleport', this.player);
        this.game.ember.teleportInMap(this, this.ember.playerContainer, tileXY);
      }
    });
  }

  consoleLogReport(tileXY) {
    const clickedShape = this.board.tileXYToChessArray(tileXY.x, tileXY.y);
    // console.log(tileXY, allAttrs, clickedShape, this.ember.describePlayerFlags(this.player.container));

    clickedShape.forEach(tileObj => {
      const a = tileObj.agent;
      switch (tileObj.containerType) {
        case 'Agent':
            console.log('%c Agent Info', 'color: green; font-size: 16px; margin: 15px 0 0 0;')
            console.table([
              {
                texture: a.playerConfig.texture,
                level: a.level,
                'level range': a.playerConfig.levelRange,
                health: a.health,
                power: a.power,
                gold: a.goldAwarded,
                xp: a.experienceAwarded,
                'patrol': a.playerConfig.patrol.method,
                'Melee Attack': a.attackDamage,
                'Ranged Attack': a.rangedAttackDamage
              }
            ]);
            console.log(tileObj);
            console.log('');
          break;
        default:
          break;
      }
    });

    // Tile info
    const allAttrs = this.ember.map.getTileAttribute(this, tileXY);
    console.log(`%c Map: ${this.mapname.toUpperCase()} - Tile Info:`, 'color: yellow; font-size: 16px; margin: 15px 0 0 0;')

    console.table([
      {
        tile: `  'x': ${allAttrs.x}, 'y': ${allAttrs.y}  `,
        sightCost: allAttrs.sC,
        sightFlags: allAttrs.sF,
        speedCost: allAttrs.spdC,
        travelFlags: allAttrs.tF,
        w: allAttrs.w,
        special: allAttrs.spcl
      }
    ]);
    // console.log(allAttrs);
    console.log('');
    console.log(`%c${this.ember.describePlayerFlags(this.player.container)}`, 'color: purple; font-size: 16px; margin: 15px 0 0 0;')
    console.log('');

  }

  createGameManager() {
    // this has to be before game manager setup

    this.events.off('spawnPlayer').on('spawnPlayer', (playerObject) => {
      this.spawnPlayer(playerObject);
      this.addCollisions();
    });

    this.events.off('transportSpawned').on('transportSpawned', (transportObject) => {
      this.spawnTransport(transportObject);
    });

    this.events.off('agentSpawned').on('agentSpawned', (agentObject) => {
      this.spawnAgent(agentObject);
    });

    this.board.off('tiledown').on('tiledown',  async (pointer, tileXY) => {
      this.ember.gameManager.processClickedTile(tileXY, this.board.tileXYToChessArray(tileXY.x, tileXY.y), this.player.container);
    });

    if (config.game.pauseOnBlur) {

      this.game.events.off('blur').on('blur', () => {
        this.game.paused = true;
        this.game.ember.gameManager.gamePaused = true;
        this.game.ember.showPausedDialog();
      });

      this.game.events.off('focus').on('focus', () => {
        this.game.paused = false;
        this.game.ember.gameManager.gamePaused = false;
        this.game.ember.closePausedDialog();
      });
    }

    this.game.ember.gameManager.setup(this);
  }

  spawnPlayer(playerObject) {
    this.player = playerObject;

    // reload some power when they change scenes and are low on power
    if (this.ember.gameManager.loadingNewScene) {
      if (this.player.power < (this.player.maxPower / 2)) {
        this.player.power = Math.floor((this.player.maxPower / 2));
      }
    }
    // console.error('spawnPlayer', playerObject.playerConfig.playerX, playerObject.playerConfig.playerY)
    this.board.addChess(playerObject.container, playerObject.playerConfig.playerX, playerObject.playerConfig.playerY, this.ember.constants.TILEZ_PLAYER);

    playerObject.container.fov = this.rexBoard.add.fieldOfView(playerObject.container, playerObject.playerConfig);

    playerObject.container.rexChess.setBlocker();

    // make the camera follow the player
    this.cameras.main.startFollow(playerObject.container);

    if (this.storedBoardedTransportId > 0) {
      const transportToBoard = this.findTransportById(this.storedBoardedTransportId);
      // const transportToBoard = this.transports.getChildren().find(transport => transport.id === this.storedBoardedTransportId);
      // console.error('transportToBoard', transportToBoard)
      if (transportToBoard) {
        this.player.container.boardedTransport = transportToBoard;
      }
    }

    // update field of view
    let fieldOfViewTileXYArray = playerObject.container.fov.findFOV(playerObject.container.visiblePoints);
    this.ember.map.findAgentFieldOfView(playerObject.container, fieldOfViewTileXYArray);
  }

  createChests() {
    // console.log('create Chests.  mapdata', this.mapData)
    if (this.mapData.chests) {
      this.mapData.chests.forEach(chestObj => {
        new Chest(this, chestObj);
      });
    }
  }

  spawnAgent(agentObject) {
    // console.log('spawn', agentObject)
    const agentContainer = this.ember.createAgent(this, agentObject);

    agentContainer.setAlpha(0);
    this.agents.add(agentContainer);

    agentContainer.rexChess.setBlocker();

    agentContainer.setVisibility();

    // if (agentObject.objectConfig.patrol.tiles.length) {
    if (agentObject.objectConfig.patrol.method !== 'static') {
      agentContainer.transitionToPatrol();
    }
  }

  createDoors() {
    if (this.mapData.doors) {
      this.mapData.doors.forEach(doorObj => {
        // console.log('DoorObj', doorObj)
        if (doorObj.hideIfCacheFound && this.ember.cache.isCacheFound(doorObj.hideIfCacheFound)) {
          // don't add door
          return;
        }
        if (doorObj.hideIfRoyalEmberFound && this.storedData.storedPlayerAttrs && this.storedData.storedPlayerAttrs.re) {
          // don't add door
          return;
        }

        let door = new Door(this, 0, 0, doorObj.texture, 1, doorObj);
        door.setAlpha(0);

        this.doors.add(door);

        this.board.addChess(door, doorObj.x, doorObj.y, this.ember.constants.TILEZ_DOORS);
        if (doorObj.offsets && doorObj.offsets.img) {
          door.x += doorObj.offsets.img.x;
          door.y += doorObj.offsets.img.y;
        }

        door.rexChess.setBlocker();

      });
    }
  }

  createSigns() {
    if (this.mapData.signs) {
      this.mapData.signs.forEach(signObj => {
        // console.log('SignObj', signObj)

        if (signObj.hideIfCacheFound && this.ember.cache.isCacheFound(signObj.hideIfCacheFound)) {
          // don't add sign
          return;
        }

        let sign = new SignPost(this, 0, 0, signObj.texture, 1, signObj);
        sign.setAlpha(0);

        this.signs.add(sign);

        this.board.addChess(sign, signObj.x, signObj.y, this.ember.constants.TILEZ_SIGNS);

        sign.rexChess.setBlocker();

      });
    }
  }

  createSprites() {
    if (this.mapData.sprites) {
      this.mapData.sprites.forEach(spriteObj => {
        // console.log('spriteObj', spriteObj)
        if ((spriteObj.id === this.ember.constants.INVENTORY.ROYAL_EMBER_ID) && this.ember.inventory.hasRoyalEmber(this.storedPlayerAttrs.inventory)) {
          // already has the royal ember  - don't place
        } else {

          const sprite = this.add.sprite(0, 0, spriteObj.texture, spriteObj.firstFrame);
          if (spriteObj.offsets && spriteObj.offsets.img) {
            sprite.x += spriteObj.offsets.img.x;
            sprite.y += spriteObj.offsets.img.y;
          }
          sprite.setScale(spriteObj.scale);
          sprite.type = this.ember.constants.SHAPE_TYPE_SPRITE;

          if (spriteObj.name) {
            sprite.setName(spriteObj.name);
          }
          let frameNames;
          let animationConfig;
          spriteObj.animeframes.forEach(animation => {
            frameNames = this.anims.generateFrameNames(this.ember.constants.SPRITES_TEXTURE, {
              start: animation.start, end: animation.end, zeroPad: 0,
              prefix: spriteObj.prefix, suffix: '.png'
            });
            animationConfig = Object.assign({
              key: animation.key,
              frames: frameNames,
              frameRate: animation.rate,
              repeat: animation.repeat
            }, animation.config || {});

            this.anims.create(animationConfig);

            // this should set the correct frame to play on create based on if a cache has been found (map13, tent and sign)
            if (animation.cacheFoundProperties) {
              const cacheFound = this.ember.cache.isCacheFound(animation.cacheFoundProperties.cache);
              if (cacheFound) {
                if (animation.cacheFoundProperties.found) {
                  if (animation.cacheFoundProperties.found.playoncreate) {
                    animation.playoncreate = animation.cacheFoundProperties.found.playoncreate;
                  }
                }
                if (animation.cacheFoundProperties.found.properties) {
                    animation.cacheFoundProperties.found.properties.forEach(prop => {
                      sprite.setData(prop.key, prop.value);
                    });
                }
              } else {
                if (animation.cacheFoundProperties.notFound) {
                  if (animation.cacheFoundProperties.notFound.playoncreate) {
                    animation.playoncreate = animation.cacheFoundProperties.notFound.playoncreate;
                  }
                  if (animation.cacheFoundProperties.notFound.properties) {
                    animation.cacheFoundProperties.notFound.properties.forEach(prop => {
                      sprite.setData(prop.key, prop.value);
                    });
                  }
                }
              }
            }

            if (animation.playoncreate) {
              sprite.anims.play(animation.key);
            }
          });

          if (spriteObj.ignoreFOVUpdate) {
            sprite.setData('ignoreFOVUpdate', true);
          }
          if (spriteObj.specialActions) {
            sprite.setData('specialActions', spriteObj.specialActions);
          }
          if (spriteObj.clickable) {
            sprite.setData('clickable', true);
          }

          if (spriteObj.properties) {
            spriteObj.properties.forEach(prop => {
              sprite.setData(prop.key, prop.value);
            });
          }
          if (spriteObj.name === "brazier" && this.game.ember.placedBrazier) {
            sprite.setData('ignoreFOVUpdate', false);
          }
          sprite.setAlpha(spriteObj.initialAlpha || 0);

          this.sprites.add(sprite);

          this.board.addChess(sprite, spriteObj.x, spriteObj.y, this.ember.constants.TILEZ_SPRITES);

          if (!spriteObj.walkover) {
            sprite.rexChess.setBlocker();
          }

        }

      });
    }
  }

  spawnTransport(transportObj) {
    if (transportObj.isBoardedTransport) {
// console.log('isBoardedTransport', transportObj, this.storedPlayerTile)
      if (this.storedPlayerTile) {
        transportObj.objectConfig.x = this.storedPlayerTile.x;
        transportObj.objectConfig.y = this.storedPlayerTile.y;
      }
    } else {
      const storedTransport = this.ember.findTransportFromArrayById(this.storedTransports, transportObj.objectConfig.id);
      if (storedTransport && storedTransport.tile) {
        transportObj.objectConfig.x = storedTransport.tile.x;
        transportObj.objectConfig.y = storedTransport.tile.y;
      }
    }
    const transportContainer = this.ember.createTransport(this, transportObj);
    transportContainer.setAlpha(0);

    this.transports.add(transportContainer);
    if (transportObj.isBoardedTransport) {
      transportContainer.playAnimation(this.ember.constants.ANIMATION.KEY.MOVE);
    }
    transportContainer.setVisibility();
  }

  createAudio() {
    let soundEffects = this.sound.addAudioSprite('eq_audio', {
      mute: this.ember.gameManager.mutedSoundEffectsVolume,
      volume: this.ember.gameManager.soundEffectsVolume
    });
    let musicEffects = this.sound.addAudioSprite('eq_music', {
      mute: this.ember.gameManager.mutedMusicEffectsVolume,
      volume: this.ember.gameManager.musicEffectsVolume
    });
    this.ember.gameManager.soundEffects = soundEffects;
    this.ember.gameManager.musicEffects = musicEffects;
  }

  configureBoard() {
    this.cameras.main.zoom = this.ember.cameraMainZoom;

    this.map = this.add.image(0, 0, `map_${this.mapData.mapKey}`);
    // this.map = this.add.image(0, 0, 'map');
    this.map.setOrigin(0,0);

    // don't go out of the map
    this.physics.world.bounds.width = this.map.width;
    this.physics.world.bounds.height = this.map.height;

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
  }

  createBoard() {
    // const mapData = this.ember.getMapData();

    this.board = this.ember.map.createBoard(this, {
      grid: this.ember.map.getHexagonGrid(this),
      width: this.mapData.sceneTiles[0].length,
      height: this.mapData.sceneTiles.length,
      sceneTiles: this.mapData.sceneTiles,
      allSeenTiles: new Set(this.allSeenTiles),
      showHexInfo: this.ember.showHexInfo
    });
  }

  createGroups() {
    // create a chest group
    this.chests = this.physics.add.group();

    // create a transport group
    this.transports = this.physics.add.group();

    // create a doors group
    this.doors = this.physics.add.group();

    // create a signs group
    this.signs = this.physics.add.group();

    // create a sprites group
    this.sprites = this.physics.add.group();

    // create an agent group
    this.agents = this.physics.add.group();
    this.agents.runChildUpdate = true;

    // creating the projectiles
    //   key: 'bullet',
    this.projectiles = new Projectiles(this.physics.world, this, {
      frameQuantity: 3,
      key: 'missile',
      active: false,
      visible: false,
      classType: Projectile
    });
    this.agentprojectiles = new Projectiles(this.physics.world, this, {
      // frameQuantity: 3,
      key: this.ember.constants.SPRITES_TEXTURE,
      // key: 'ball',
      active: false,
      visible: false,
      // setScale: { x: 0.1},
      classType: Projectile
    });
  }

  createAnimation(animationConfig) {
// console.log('createAnimation', animationConfig)
    let frameNames = this.anims.generateFrameNames(this.ember.constants.SPRITES_TEXTURE,
      {
        start: animationConfig.start,
        end: animationConfig.end,
        zeroPad: 0,
        prefix: animationConfig.prefix,
        suffix: '.png'
      });
    let thisAnimationConfig = Object.assign({ key: animationConfig.key, frames: frameNames, frameRate: animationConfig.rate, repeat: animationConfig.repeat, yoyo: animationConfig.yoyo || false}, animationConfig || {});
    this.anims.create(thisAnimationConfig);
  }

  createInput() {
    // The Q W S A D E keys
    this.cursors = {...this.input.keyboard.addKeys('Q,W,S,A,D,E')};
  }

  addCollisions() {
    // check for collisions between the player and the tiled blocked layer
    // this.physics.add.collider(this.player, this.map.blockedLayer);

    // check for overlaps between player and chest game objects
    this.physics.add.overlap(this.player.container, this.chests, this.collectChest, null, this);

    // check for overlaps between player and transport game objects
    this.physics.add.overlap(this.player.container, this.transports, this.boardTransport, this.boardTransportProcessCallback, this);

    this.physics.add.overlap(this.projectiles, this.agents, this.projectiles.enemyCollision);
    this.physics.add.overlap(this.agentprojectiles, this.player.container, this.agentprojectiles.playerCollision);

    // check for collisions between the doors group and the player
    this.physics.add.overlap(this.player.container, this.doors, this.doorCollision, null, this);

    // check for overlaps between the player's weapon and monster game objects
    // this.physics.add.overlap(this.player.weapon, this.monsters, this.enemyOverlap, null, this);

  }

  findTransportById(transportId) {
    return this.transports.getChildren().find(transport => transport.id === transportId);
  }

  boardTransport(player, transport) {
    if (( ! player.boardedTransport) && ( ! player.embarkTransport)) {
      player.embarkTransport = true;
      player.transportToBoard = transport;
    }
  }

  boardTransportProcessCallback(player) {
    return (( ! player.boardedTransport) && ( ! player.embarkTransport));
  }

  collectChest(player, chest) {
    let test = false;
    if ( test || ! chest.emberObj.found) {
      // this.ember.gameManager.playSound(this.ember.constants.AUDIO.CHEST)
      chest.emberObj.playerFoundChest();
    }
  }

  doorCollision(/*player, door*/) {
  }

  getSpriteByName(name) {
    // console.log('this.sprites', this.sprites)
    let spriteToReturn = undefined;
    if (name) {
      this.sprites.getChildren().forEach(child => {
        if (child.name === name) {
          spriteToReturn = child;
        }
      });
    }
    return spriteToReturn;
  }

  update() {
    if (this.game.paused) {
      return;
    }
    // console.log('agents', this.agents)
    if (this.player) this.player.container.update(this.cursors);
    if (this.agents.children) {
      this.agents.getChildren().forEach(agentChild => {
        agentChild.update();
      });
    }
  }
}

