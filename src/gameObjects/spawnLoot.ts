// function spawnLoot() {
//     const _scene = new Entity('_scene')
//     engine.addEntity(_scene)
//     const transform = new Transform({
//     position: new Vector3(0, 0, 0),
//     rotation: new Quaternion(0, 0, 0, 1),
//     scale: new Vector3(1, 1, 1)
//     })
  
//     _scene.addComponentOrReplace(transform)
//     const fantasyChest = new Entity("fantasyChest");
//     engine.addEntity(fantasyChest);
//     fantasyChest.setParent(_scene);
//     const transform3 = new Transform({
//       position: new Vector3(6, 0.4, 6.5),
//       rotation: new Quaternion(0, 0, 0, 1),
//       scale: new Vector3(1, 1, 1)
//     });
//     fantasyChest.addComponentOrReplace(transform3);
  
//     const fantasyIronKey = new Entity("fantasyIronKey");
//     engine.addEntity(fantasyIronKey);
//     fantasyIronKey.setParent(_scene);
//     const transform4 = new Transform({
//       position: new Vector3(6, 0.4, 7.5),
//       rotation: new Quaternion(0, 0, 0, 1),
//       scale: new Vector3(1, 1, 1)
//     });
//     fantasyIronKey.addComponentOrReplace(transform4);
  
//     const scroll = new Entity("scroll");
//     engine.addEntity(scroll);
//     scroll.setParent(_scene);
//     const transform5 = new Transform({
//       position: new Vector3(6.5, 0.4, 6.5),
//       rotation: new Quaternion(0, 0, 0, 1),
//       scale: new Vector3(1, 1, 1)
//     });
//     scroll.addComponentOrReplace(transform5);
  
//     const oldIronSword = new Entity("oldIronSword");
//     engine.addEntity(oldIronSword);
//     //oldIronSword.setParent(baseScene);
//     const transform6 = new Transform({
//       position: new Vector3(6, 0.4, 6.5),
//       rotation: new Quaternion(
//         -7.781870092739773e-16,
//         0.7071068286895752,
//         -8.429368136830817e-8,
//         -0.7071068286895752
//       ),
//       scale: new Vector3(1.000008225440979, 1, 0.5000041127204895)
//     });
//     oldIronSword.addComponentOrReplace(transform6);
//     const gltfShape2 = new GLTFShape("models/Sword_02/Sword_02.glb");
//     gltfShape2.withCollisions = true;
//     gltfShape2.visible = true;
//     oldIronSword.addComponentOrReplace(gltfShape2);
  
//     const channelId = Math.random()
//       .toString(16)
//       .slice(2);
//     const channelBus = new MessageBus();
//     const inventory = createInventory(UICanvas, UIContainerStack, UIImage);
//     const options = { inventory };
  
//     const script1 = new Script1();
//     const script2 = new Script2();
//     const script3 = new Script3();
//     script1.init();
//     script2.init(options);
//     script3.init();
//     script1.spawn(
//       fantasyChest,
//       { onClickText: "Use the Key", onClick: [], onOpen: [], onClose: [] },
//       createChannel(channelId, fantasyChest, channelBus)
//     );
//     script2.spawn(
//       fantasyIronKey,
//       {
//         target: "fantasyChest",
//         respawns: true,
//         onEquip: [],
//         onUse: [{ entityName: "fantasyChest", actionId: "toggle", values: {} }]
//       },
//       createChannel(channelId, fantasyIronKey, channelBus)
//     );
//     script3.spawn(
//       scroll,
//       { "text": "You have received Scroll of Weak Fireball", "fontSize": 36 },
//       createChannel(channelId, scroll, channelBus)
//     );
  
//     // engine.addEntity(fantasyChest)
//     // engine.addEntity(fantasyIronKey)
//     // engine.addEntity(scroll)
//     // engine.addEntity(oldIronSword)
//   }