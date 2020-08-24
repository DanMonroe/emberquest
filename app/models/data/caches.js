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
        puzzleHint: ''
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
        puzzleHint: ''
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6X3',
        name: 'EmberQuest #3 - The Traphagen Meadow',
        description: '<p>What a pleasant meadow to hike through on a cool Spring day.  Too bad there are reports of various outlaws in the area to ruin your day. </p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '60a5931b6bdca21fab2949c7705cd801a7e7887995d757d98f8db6f4c74b0f21LmhwX+77/ORd0Tgrv7gocPWIl0FSsUpwoA8SObSlxUg=',
        puzzleHint: 'Gur Zrnqbjf',
        cacheHint: 'Fznyy ybpx-a-ybpx ba tebhaq.', // 'Small lock-n-lock on ground.',
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB0T',
        name: 'EmberQuest #4 - Impenatrable',
        description: '<p>The Southern Merfolk have created a seemingly impenetrable fortress in the Sea of Misdirection. Find a way inside to further your quest.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'c2af9a08cb6d7cdd4bdaa54c2c6b6579615e6f643982d45492ab06193b615b62Gtn78gu3mCb77lr1UNT2xfBXIYhf5t05ULZCOD+SG0I=',
        puzzleHint: ''
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6VK',
        name: 'EmberQuest #5 - Submariner',
        description: '<p>Hold your breath while traversing the hidden paradise of the Merfolk. Survive a rogue wave and you’ll soon have the chest in your hands.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'cdc8751dc1eaaade48c33a06942d789ca7890679435ea8cb6f2f178f493e7ac2LNTLp+hfZ6mETB5O3b/c2LqBVCMiLco3f9/h/aNzTIU=',
        puzzleHint: ''
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB1G',
        name: 'EmberQuest #6 - Haunted Cash',
        description: '<p>A questionable fire burned down a village and killed the corrupt chief. The villagers were surprised to find he had taken all their cash to his grave.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '3df7396f6125e393a9daab75608b225457948c8298c0fac42cc7d9deb1e567dd7ChJZXywkLLcaluiArKW11XVDzcr+KnnouYEJ4Uy7Ew=',
        puzzleHint: '',
        cacheHint: '',

      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6VC',
        name: 'EmberQuest #7 - Are we there Yeti?',
        description: '<p>A legendary beast allegedly lives in an icy cave somewhere in the Frostwood Mountains. A long journey awaits you.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '49499ef3957af8e0b38d9dcb2afb38aa5dba65789ad25d4e688d01eb2f0dbb05uNcT0ac5SOTC/AG6wOq7H8Nk1aNeGmsoPibeibs6kVo=',
        puzzleHint: '',


      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB1J',
        name: 'EmberQuest #8 - Bushwacking Relief',
        description: '<p>The forest is thick in this area.  Thankfully there is a break in the bush to rest your feet and mend your scratched forearms.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'c5143707a93a5bc1b1c716d9d1a069da98790b2c41a0c02dcbe5b5b0bced2e8549xjRhqwzRNL1XcBpdDye1b5NF+OMp3b0LOq6OqNiIA=',
        puzzleHint: 'N evire cbvagf gur jnl guebhtu gur sberfg sebz gur zrnqbj.'

      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6X0',
        name: 'EmberQuest #9 - Cabin by the Lake',
        description: '<p>Lost in the Meadow?  Maybe someone in that cabin by the lake can help.  I sure hope they are friendly.</p>',
        difficulty: 1.5,
        terrain: 2,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bcc9a8a64092bfb1ca9d49845dfcf1c3b0cb7313b94bf626aed9b2369902cab7Qi+jUiJZthlTnz+x7xGUr0R8naUTBxe3q7BHU5FMveM=',
        puzzleHint: '',


      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6VH',
        name: 'EmberQuest #10 - Did you see that?',
        description: '<p>Cruising around the sea it can be easy to miss small passageways in the rock. Be sure to pay attention to the coastline.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'ab69788b68fdde2db7f2615e48e96285645d2cc848ee7f8a2ec3e970566be1cbF02ITnLzPM0Os1NBxthSq166IYj8o+B6Q1F1Iv4NowU=',
        puzzleHint: '',


      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB1C',
        name: 'EmberQuest #11 - Beach to Nowhere?',
        description: '<p>That’s a long way to walk on a lonely beach. I hope it’s worth it in the end.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '4b1044243d319abc30676d3049cf6f4894e682669b5d1ff339733508580eecb2SyVGJDnaLq9WNw1qBXyWHL9k4sqRulYZF3mf0Rgz/vo=',
        puzzleHint: 'Abg nyy znmrf unir bayl bar raqvat.',


      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6WP',
        name: 'EmberQuest #12 - Ships and Bridges',
        description: '<p>Enjoy this game of Ships and Bridges where you guess which ships and/or bridges will reward you with the prize.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '3e7020c9b242fd794bb3ce659cdaa6bd97ee0efb2ae2c3d5c8d08641b7247fd5unFgmPhgqvv1c544etys9fjeiUZtVTcuaMNPy/g+xJU=',
        puzzleHint: '',


      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB0H',
        name: 'EmberQuest #13 - Desert Gold',
        description: '<p>Hidden deep within the desert, this keep hosts fine food, drink, and wealth. Unfortunately, the local residents won’t give up their gold easily.  </p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'c846ce3b34b2f0d2cb37dcc26593b3e43ce80e2e6470a657a8b020844b1f7b73/WqpjP8t7aB3XNxPNxsHiNQ4enzF6etrqUIxBGK3iA8=',
        puzzleHint: 'Pnfgyrf va gur fnaq'

      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6VN',
        name: 'EmberQuest #14 - Desert Dead End',
        description: '<p>You shouldn’t always trust online maps; sometimes they send you awry.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '31972210cd5e4233388b71a45db1ff3d42c3649d55d7ea4e4108a0f04d397131mz6CJj8ZqocwdxpEzq4SWXZWMIBTU0U4E4MCrMvIvKo=',
        puzzleHint: 'Vg jvyy gnxr sberire gb trg nyy gur fnaq bhg bs lbhe fubrf.',


      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6WQ',
        name: 'EmberQuest #15 - Subterranean',
        description: '<p>Below the surface of the Island of Death lies a lava filled cavern. A chest awaits those who are brave enough to explore. You may need a ride if you are not prepared for the heat.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'ae643d26346da66fa8998fe7aedc8490d092dc7c3d29ff683c596ed0447de51di2AzdigwHdQmS66xGFcrm+VYNPjuLMBCdWxFMAcN8nw=',
        puzzleHint: ''
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6WC',
        name: 'EmberQuest #16 - To the Skies!',
        description: '<p>If you are willing to try new adventures, then this is your chance!  Not many people get the opportunity to experience what you’ll need to reach this ‘T5’ cache.  </p>',
        difficulty: 2,
        terrain: 2.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'c831f92dbb8f76efd00f7032cd8c43f55f821ebb55070fb13319c1e4a2b1ade2Qx5ctVo0JCQGLT97tARwarZnEIXQuwRpEhzaN3k19hY=',
        puzzleHint: 'Vafvqr gur Uvtuynaqf',
        cacheHint: 'Hfr genvyurnq, gura fubeg 10 sbbg ohfujunpx gb TM. Pnpur vf n cersbez nobhg jnvfg yriry.', // 'Use trailhead, then short 10 foot bushwhack to GZ. Cache is a preform about waist level.',

      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XJ',
        name: 'EmberQuest #17 - Highland Cache',
        description: '<p>This is a nice easy cache in the Western mountains of the Highlands.  Even at this altitude, you can still hear the echoes of the nearby sea.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '505c3caa5b8811c2a2549c626739c3f5a58818c167c5b473388d88ad532bed1ckx++ozzpZNmG7hPX02rdTPX0Rc03ElBsOCcm1DPXDZA=',
        puzzleHint: '',


      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6X6',
        name: 'EmberQuest #18 - Brrr',
        description: '<p>You should have packed your jacket.  It gets cold high in the hills, especially with the fresh snowfall recently.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'a2b8690049db6acda585e6c3bb5384213c9b425d3dfb55578febae1143782852Sf0+Pg560LoZ3ZzC9hstY93J+zSkKeWXGNuDcftAIyA=',
        puzzleHint: 'Fgbar genvy va gur Rzonggyrq Pyvssf',
        cacheHint: '6 srrg bss genvy naq nobhg rlr yriry. Ovfba ghor oruvaq gerr.', // '6 feet off trail and about eye level. Bison tube behind tree.',

      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6X7',
        name: 'EmberQuest #19 - LPC',
        description: '<p>It’s everyone’s favorite type of hide, right? A LPC in the Woods!?</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '916868e09782a116c8db5f53ca2a3b7298954d8193c81190d40ff1c9580f02abX4T/b2njPuh3AdINLHd+r6FceNFDgT/vbztJ//Ub3vM=',
        puzzleHint: '',


      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XB',
        name: 'EmberQuest #20 - Autumn Retreat',
        description: '<p>The Royal Family often travel to this far away island retreat enjoying the fall colors along their journey.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'b0670c83a8bd5be0a2ee3a386f0e878cbe6c0965b0aacd4a4fd4f502cddd23d4vajcL3IhBj4KJsRGz8pQQr7NAPWthNNPLuOYP/YKtQ4=',
        puzzleHint: '',


      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XC',
        name: 'EmberQuest #21 - Unnatural Snowdrift',
        description: '<p>It appears someone tried to hide a chest but the snow they used has melted away revealing the treasure.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '58c2e7aca8b642bd34cd78289efbf78acf3fd84aba5a8d6cd3307189b24b8056dhmsls2GK9W1EZPeT3I3LDLi4DtonbeArFfK4f3twuU=',
        puzzleHint: 'Sne Abegurnfg',
        cacheHint: 'Ovfba ghor 7 srrg nobir tebhaq yriry.', // 'Bison tube 7 feet above ground level.',

      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XD',
        name: 'EmberQuest #22 - Perseverance',
        description: '<p>At the end of a very long journey, you shall be rewarded with jewels and treasure!</p>',
        difficulty: 1.5,
        terrain: 2,
        foundInstructions: 'Congrats.. now do this',
        coords: '3efccf064286c8d1c39e95513bf51d094fb3b4ff41ad04116c9575c4c1839dacCeZ6FpoF1PA5DW0vYckM7LL0JmuO0kRsP5TD16R/JuY=',
        puzzleHint: 'G5',


      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XE',
        name: 'EmberQuest #23 - Skull Island',
        description: '<p>Pirates have buried a treasure chest somewhere on their Skull Island. Get past the pirates and search the island to find the prize.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '34c718d832f0d4814fec9bda5969ddbe3714aee26e47ef7d38acd1b5a66df39f5LfRxnnvIkSEOP8Fcil2Brh8n49UH22akB8qp6ie3/w=',
        puzzleHint: '',


      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XF',
        name: 'EmberQuest #24 - Skull Brains',
        description: '<p>An old chest lies in the quagmire of the head of Skull Island. Put your waders on or those boots will be soaked.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'a191dee945dbf63d70a0d186d1bf5d775a438b54c23a901d5929f4a16b71c3255zkJ87o3p78bunXuzQhFmla0JDBAQI9JzPsBnLxI0ZI=',
        puzzleHint: '',


      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB0N',
        name: 'EmberQuest #25 - Castle Island',
        description: '<p>Welcome to the Castle’s private island in the North.  The huntsmen have taken care of all the wild animals on the island so no worries while you bask in the sun.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '90fdc28aa692d70f463ddcccb4caebf5c8796f28575e5ef168a9b52ac10c12b5vQrr0HtkQFXShCrtvae1AR56oLct1meH34pbDS97mmg=',
        puzzleHint: '',
        cacheHint: 'Haangheny cvyr bs fgvpxf.', // 'Unnatural pile of sticks.',

      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XK',
        name: 'EmberQuest #26 - Lost Ember Pyramid',
        description: '<p>Leave it to a geocacher to find the legendary lost Ember Pyramid!  Enter quietly as to not awaken the residents resting peacefully.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '970ee0d56736879747b74cbb34d937f0a8771e154929694cd047ffe6ca091fc4C/5NqckkJ9F8tVDZcU4Bcs/Gf55c/28b06MZoPy0J+A=',
        puzzleHint: 'Vs lbh jrer n Cunenbu, jurer jbhyq lbh uvqr n pnpur?'

      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XP',
        name: 'EmberQuest #27 - Cave of Arrrrgh',
        description: '<p>Named for the last utterance of anyone who ever saw it, the cave is home to an unknown inhabitant. But first, you must face its guardian beast!</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '6eaa5b44be4364532d820e2c9cd0339237c11ded4ee3473a60afdf739af937a4kiQNRDKJcNW7tc3NrvqFjo/lLfX1BWWkqReaq6ad2H0=',
        puzzleHint: 'N Ubyl Unaq Teranqr jba\'g uryc lbh guvf gvzr.',
        cacheHint: 'Wbua Serfujngre. Zngpufgvpx pbagnvare va fgbar jnyy oruvaq ybbfr ebpx.', //'John Freshwater. Matchstick container in stone wall behind loose rock.',

      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XQ',
        name: 'EmberQuest #28 - It\'s a Trap!',
        description: '<p>A residents of a small Dwarven hut in the Scarstone Mountains holds a secret.  Beware!</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'd2b3292b69c2fc08a1199d48bcfbb492c2d8378ed34875c347971e15528722d9wCfR9Ol1Bak692kDjiudUxGRmzT0FSfG0p7DuSgogM8=',
        puzzleHint: '',


      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XT',
        name: 'EmberQuest #29 - Top of the World',
        description: '<p>Through the blizzard at sea, you can barely make out a small island to the North.  Surely no person has stepped foot in that tundra!</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '4adcb36ea3feb75cb547ce726efedcd95e718a99c5a5c936c3af81819a3168abyxUq+bmXysGgzQdmThgBS8FdtsXe0RB9JrFS0xb9PaE=',
        puzzleHint: '',
        cacheHint: 'Wbua Orneq. Unatvat sebz gerr.', // 'John Beard. Hanging from tree.',

      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XW',
        name: 'EmberQuest #30 - Tight Quarters',
        description: '<p>Not much to look at but it provides a nice place to put your feet up after a long hike in the woods.</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '36e7a091c350b800c46c21b6cc9d64d239f67d51d31c0ae955bac6979958bdb8v50uEmWW2M4i3BLSLfkhaZsvWbS8Wjh35fDbi2l8dsE=',
        puzzleHint: '',


      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XZ',
        name: 'EmberQuest #31 - Enchanted Ember',
        description: '<p>Congratulations for reigniting the eternal flame!  The final treasure is yours to keep. Farewell adventurer!</p><p>After you have found all 31 chests in the game, EmberQuest will show you your game statistics.  It may be interesting for you to upload a screenshot of them to the cache page to compare with other adventurers.</p><p></p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '65da8082ad85cb7956590361aa2729c3b54820019937c1e75e6c6b93ca77e7e0b2Izkk4pR7pBXMLNNGbbpVqZ2+HggSeUJdPLtABo2jU=',
        puzzleHint: '',


      })
    );


    return caches;
  }
}
