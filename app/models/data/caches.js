import { Cache } from 'emberquest/objects/models/cache';
// import { constants } from 'emberquest/services/constants';

export class Caches {
  get data() {
    let caches = [];

    caches.push(
      new Cache({
        gccode: 'GC8QAYM',
        name: 'EmberQuest #1 - Castle Storeroom',
        description: '<p>Luckily, this chest was hidden in the castle storeroom when the Enchanted Ember was stolen and it survived the heist.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '38d555bd3183047e6e4ce8abbf9830219d119c5396648d66a193a7ed5f3ad976oY1MkWU9W4ShBNOy9NWl8zBNz+iM62qlN59qA8+hOGI=',
        parking: ''
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6V9',
        found: false,
        name: 'EmberQuest #2 - Ogre Covered Bridge',
        description: '<p>A young opportunistic ogre has taken up residency near the bridge North of the castle.  He is blocking the path and looking for a fight!  Be sure to check your inventory and equip a weapon to make it a fair fight.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '9d902e449f00586b32ea9153bab4ec6e94a1932e4364f364c999522fb3731233IpP0rLCqjm1xHCG4ECBV+NAcvsmk+kSQRG5AUHhrb/M=',
        parking: ''
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6X3',
        name: 'EmberQuest #3',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '60a5931b6bdca21fab2949c7705cd801a7e7887995d757d98f8db6f4c74b0f21LmhwX+77/ORd0Tgrv7gocPWIl0FSsUpwoA8SObSlxUg=',
        parking: ''
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB0T',
        name: 'EmberQuest #4',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '',
        parking: ''
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6VK',
        name: 'EmberQuest #5',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '57505916be56ad08aa5339f96b68e97d96542a3daadd498b9ae393c86e31f39bzlA33vpNUJo1ok2HsfgxbRubQu4Xx75/cunBS9ZjIYo=',
        parking: ''
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB1G',
        name: 'EmberQuest #6',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '3df7396f6125e393a9daab75608b225457948c8298c0fac42cc7d9deb1e567dd7ChJZXywkLLcaluiArKW11XVDzcr+KnnouYEJ4Uy7Ew=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6VC',
        name: 'EmberQuest #7',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '49499ef3957af8e0b38d9dcb2afb38aa5dba65789ad25d4e688d01eb2f0dbb05uNcT0ac5SOTC/AG6wOq7H8Nk1aNeGmsoPibeibs6kVo=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB1J',
        name: 'EmberQuest #8',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'c5143707a93a5bc1b1c716d9d1a069da98790b2c41a0c02dcbe5b5b0bced2e8549xjRhqwzRNL1XcBpdDye1b5NF+OMp3b0LOq6OqNiIA=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6X0',
        name: 'EmberQuest #9',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bcc9a8a64092bfb1ca9d49845dfcf1c3b0cb7313b94bf626aed9b2369902cab7Qi+jUiJZthlTnz+x7xGUr0R8naUTBxe3q7BHU5FMveM=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6VH',
        name: 'EmberQuest #10',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'b5cf277e9c87bfe6386b925f63b7389d41eda021391e1ade9290780843af4b48OhFXpqiPLDjoBMDOkpKw1SDxPtyFwRslhPE6vkuqRWQ=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB1C',
        name: 'EmberQuest #11',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '4b1044243d319abc30676d3049cf6f4894e682669b5d1ff339733508580eecb2SyVGJDnaLq9WNw1qBXyWHL9k4sqRulYZF3mf0Rgz/vo=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6WP',
        name: 'EmberQuest #12',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB0H',
        name: 'EmberQuest #13',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6VN',
        name: 'EmberQuest #14',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '31972210cd5e4233388b71a45db1ff3d42c3649d55d7ea4e4108a0f04d397131mz6CJj8ZqocwdxpEzq4SWXZWMIBTU0U4E4MCrMvIvKo=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6WQ',
        name: 'EmberQuest #15',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'a0960d0398de791fbe4f9102994e0ba767bb8f26cfe493e0bc8d66afb05ba170QHrC7D0ndsu2OHzWe3JIpS9bZvvdHrA4/EKwN/OIsX0=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6WC',
        name: 'EmberQuest #16',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'c831f92dbb8f76efd00f7032cd8c43f55f821ebb55070fb13319c1e4a2b1ade2Qx5ctVo0JCQGLT97tARwarZnEIXQuwRpEhzaN3k19hY=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XJ',
        name: 'EmberQuest #17',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '505c3caa5b8811c2a2549c626739c3f5a58818c167c5b473388d88ad532bed1ckx++ozzpZNmG7hPX02rdTPX0Rc03ElBsOCcm1DPXDZA=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6X6',
        name: 'EmberQuest #18',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'a2b8690049db6acda585e6c3bb5384213c9b425d3dfb55578febae1143782852Sf0+Pg560LoZ3ZzC9hstY93J+zSkKeWXGNuDcftAIyA=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6X7',
        name: 'EmberQuest #19',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '916868e09782a116c8db5f53ca2a3b7298954d8193c81190d40ff1c9580f02abX4T/b2njPuh3AdINLHd+r6FceNFDgT/vbztJ//Ub3vM=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XB',
        name: 'EmberQuest #20',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'b0670c83a8bd5be0a2ee3a386f0e878cbe6c0965b0aacd4a4fd4f502cddd23d4vajcL3IhBj4KJsRGz8pQQr7NAPWthNNPLuOYP/YKtQ4=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XC',
        name: 'EmberQuest #21',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '58c2e7aca8b642bd34cd78289efbf78acf3fd84aba5a8d6cd3307189b24b8056dhmsls2GK9W1EZPeT3I3LDLi4DtonbeArFfK4f3twuU=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XD',
        name: 'EmberQuest #22',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '3efccf064286c8d1c39e95513bf51d094fb3b4ff41ad04116c9575c4c1839dacCeZ6FpoF1PA5DW0vYckM7LL0JmuO0kRsP5TD16R/JuY=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XE',
        name: 'EmberQuest #23',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '34c718d832f0d4814fec9bda5969ddbe3714aee26e47ef7d38acd1b5a66df39f5LfRxnnvIkSEOP8Fcil2Brh8n49UH22akB8qp6ie3/w=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XF',
        name: 'EmberQuest #24',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'a191dee945dbf63d70a0d186d1bf5d775a438b54c23a901d5929f4a16b71c3255zkJ87o3p78bunXuzQhFmla0JDBAQI9JzPsBnLxI0ZI=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB0N',
        name: 'EmberQuest #25',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '4bdd49b352ce4b6a4d7c9a3f35bc4fbe65b10a952f2044042fc2978766e8201erNkajuUlrzOEzLeJcyylGO6KLbNKeC+z8cREz45p/M4=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XK',
        name: 'EmberQuest #26',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '970ee0d56736879747b74cbb34d937f0a8771e154929694cd047ffe6ca091fc4C/5NqckkJ9F8tVDZcU4Bcs/Gf55c/28b06MZoPy0J+A=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XP',
        name: 'EmberQuest #27',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '6eaa5b44be4364532d820e2c9cd0339237c11ded4ee3473a60afdf739af937a4kiQNRDKJcNW7tc3NrvqFjo/lLfX1BWWkqReaq6ad2H0=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XQ',
        name: 'EmberQuest #28',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'd2b3292b69c2fc08a1199d48bcfbb492c2d8378ed34875c347971e15528722d9wCfR9Ol1Bak692kDjiudUxGRmzT0FSfG0p7DuSgogM8=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XT',
        name: 'EmberQuest #29',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '4adcb36ea3feb75cb547ce726efedcd95e718a99c5a5c936c3af81819a3168abyxUq+bmXysGgzQdmThgBS8FdtsXe0RB9JrFS0xb9PaE=',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XW',
        name: 'EmberQuest #30',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XZ',
        name: 'EmberQuest #31 - Enchanted Ember',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '',
        parking: '',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );


    return caches;
  }
}
