const constants = Object.freeze({


  // all values in FLAGS should be bits  1, 2, 4, 8, 16, etc
  FLAGS: {
    TRAVEL: {
      SEA: {value: 1, description: 'Travel by Sea'},
      LAND: {value: 2, description: 'Travel by Land'},
      AIR: {value: 4, description: 'Travel by Air'},
      IMPASSABLE: {value: 8, description: 'Impassable'}
    },
    SIGHT: {
      IMPASSABLE: {value: 1, description: 'Impassable'}
    },
    SPECIAL: {
      DOCK: {value: 1, description: 'Dock'},
      PORTAL: {value: 2, description: 'Portal'},
      DOOR: {value: 4, description: 'Door'},
      MESSAGE: {value: 8, description: 'Message'}
    }
  },

  SHOW_MESSAGE_WHEN: {
    DOOR_EXISTS: {value: 1, description: 'Show Only When Door Exists'}, // data: { door_id:1, tileXY: {x: 11, y: 4} }}
  },

  SPECIAL_ACTIONS: {
    REMOVE_DOOR: {value: 1, description: 'Remove Door'},  // data: { door_id:1, tileXY: {x: 11, y: 4} }
    REMOVE_SIGHT_COST: {value: 2, description: 'Remove Sight Cost'},     // data: { tileXY: {x: 11, y: 3} }
    PLAY_SOUND: {value: 3, description: 'Play Sound'}     // data: { sound: 'open_door_1' }
  }
})

export {constants};
