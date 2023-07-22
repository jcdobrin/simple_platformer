function initializeLevel(Game, levelNumber)
{
	if(!Levels[levelNumber])
		return;
	Game.level = Levels[levelNumber];
	Game.LevelComplete = false;
	Game.entities = [];
	Game.camera.settings = Game.level.camera || {};


	if(!Game.BackgroundBuffer)
	{

		backgroundVerticies = [];
		var verts = [];
		var colors = [];
		var width = 1;
		var height = .5;
		for(var i = -200; i < 200 ; i+= 1)
		{
			var offsetX = i*(width+.1);

			for(var j = 0; j < 200 ; j+= 1)
			{
				var offsetY = j*(height+.1);
				if(j % 2)
					offsetX += width/2;
				else
					offsetX -= width/2;


				var verticies = (OpenGLSquareTriangle([offsetX, offsetY], width, height));
				var color = getRenderColor('BG');
				for(var q=0;q<verticies.length;q+=2)
				{

					backgroundVerticies.push(verticies[q]);
					backgroundVerticies.push(verticies[q+1]);

					backgroundVerticies.push(color[0]);
					backgroundVerticies.push(color[1]);
					backgroundVerticies.push(color[2]);
					backgroundVerticies.push(color[3]);

					backgroundVerticies.push(0);
					backgroundVerticies.push(0);
					backgroundVerticies.push(1.15);

				}
			}
		}
		Game.BackgroundBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, Game.BackgroundBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(backgroundVerticies), gl.STATIC_DRAW);
		Game.BackgroundBuffer.numItems = backgroundVerticies.length / 9;
	}


	Game.door = initializeDoor([Levels[levelNumber].door.position[0],Levels[levelNumber].door.position[1]], Levels[levelNumber].door.locks);
	addRenderPiece(Game.door, 'Door', [Game.door.width, Game.door.height]);
	addCollisionVolume(Game.door, Game.door.width, Game.door.height, COLLISION.INTERACT);
	Game.entities.push(Game.door);
	Game.door.lockEntities = [];
	var offsetX = 0.25;
	var offsetY = Game.door.height - 1.5;
	var count = 0;
	for(var i=0; i < Game.door.locks; i++, count++)
	{
		var p = [Game.door.position[0], Game.door.position[1]];
		var lock = {
			position:p,
			alive:true,
		};

		addRenderPiece(lock, 'Lock', [0.75,1], [offsetX, offsetY]);

		addRenderPiece(lock, 'Hole', [ 0.3, .75], [offsetX+.2, offsetY+.1]);
		Game.door.lockEntities.push(lock);
		Game.entities.push(lock);
		offsetX += 1.0;
		if(count == 2)
		{
			offsetX = 0.25;
			offsetY -= 1.25;
		}

	}

	for(var i in Levels[levelNumber].floors)
	{
		var entity = Levels[levelNumber].floors[i];
		entity = initializeSquare(entity.position, entity.width, entity.height, 'Floor', entity.id);
		addRenderPiece(entity, 'Floor', [entity.width, entity.height]);
		addCollisionVolume(entity, entity.width, entity.height, COLLISION.COLLIDES);
		Game.entities.push(entity);
	}

	for(var i in Levels[levelNumber].paths)
	{
		var entity = initializePath(Levels[levelNumber].paths[i]);

		Game.entities.push(entity);
		if(Game.debug)
		{
			addRenderPiece(entity, 'Key', [1, 1]);
			var null_entity = initializeNullEntity();
			for(var i in entity.nodes)
			{
				addRenderPiece(null_entity, 'Key', [1, 1], entity.nodes[i].position);
			}
			Game.entities.push(null_entity);
		}


	}

	for(var i in Levels[levelNumber].lavas)
	{
		var entity = Levels[levelNumber].lavas[i];
		entity = initializeSquare(entity.position, entity.width, entity.height, 'Lava');
		addRenderPiece(entity, 'Kill', [entity.width, entity.height]);
		addCollisionVolume(entity, entity.width, entity.height, COLLISION.KILL);
		Game.entities.push(entity);
	}

	for(var i in Levels[levelNumber].fireWheels)
	{
		var entity = initializeFireWheel(Levels[levelNumber].fireWheels[i]);
		var piece = addRenderPiece(entity, 'Key', [1, 1]);
		piece.distanceFromOrigin=0;
		Game.entities.push(entity);

	}

	for(var i in Levels[levelNumber].keys)
	{
		var entity = Levels[levelNumber].keys[i];
		entity = initializeKey(entity.position);
		addRenderPiece(entity, 'Key', [entity.width, entity.height]);
		addCollisionVolume(entity, entity.width, entity.height, COLLISION.INTERACT);
		Game.entities.push(entity);
	}

	for(var i in Levels[levelNumber].springs)
	{
		var entity = Levels[levelNumber].springs[i];
		entity = initializeSquare(entity.position, entity.width, entity.height, 'Spring');
		addRenderPiece(entity, 'Spring', [entity.width, entity.height]);
		addCollisionVolume(entity, entity.width, entity.height, COLLISION.VSPRING);
		Game.entities.push(entity);
	}

	for(var i in Levels[levelNumber].ices)
	{
		var entity = Levels[levelNumber].ices[i];
		entity = initializeSquare(entity.position, entity.width, entity.height, 'Ice');
		addRenderPiece(entity, 'Ice', [entity.width, entity.height]);
		addCollisionVolume(entity, entity.width, entity.height, COLLISION.COLLIDES|COLLISION.SLIDE);
		entity.life = 10;
		entity.alive = true;
		entity.maxHeight = entity.height;
		Game.entities.push(entity);
	}

	for(var i in Levels[levelNumber].entities)
	{
		var entity = JSON.parse(JSON.stringify(Levels[levelNumber].entities[i]));
		if(entity.type == 'FireWheel')
		{
			var entity = initializeFireWheel(entity);
			var piece = addCollisionVolume(entity, 1,1,COLLISION.NONE);
			piece.distanceFromOrigin=0;
		}
		else if(entity.type == 'Rotate')
		{
			var piece = addRenderPiece(entity, entity.type, [entity.width, entity.height]);
				piece.distanceFromOrigin = entity.distanceFromOrigin;
			var volume = addCollisionVolume(entity, entity.width, entity.height, COLLISION.COLLIDES);
				volume.distanceFromOrigin = entity.distanceFromOrigin;
		}
		else
		{
			addRenderPiece(entity, entity.type, [entity.width, entity.height]);
			addCollisionVolumeByEntity(entity);
		}
		Game.entities.push(entity);
	}


	Game.player = initializePlayer( [Levels[levelNumber].player.position[0], Levels[levelNumber].player.position[1]]);
	addRenderPiece(Game.player, 'Player', [Game.player.radius*2, Game.player.radius*2]);
	addRenderEffect(Game.player.pieces[0], RENDER_EFFECTS.VELOCITY_TRAIL);
	addCollisionVolume(Game.player, Game.player.radius*2, Game.player.radius*2, COLLISION.COLLIDES);
	addCollisionVolume(Game.player, Game.player.radius*2, Game.player.radius*2, COLLISION.CAN_BE_HIT);

	Game.player.accelerated = 0;


	Game.entities.push(Game.player);

	for(var i in Levels[levelNumber].slimes)
	{
		var entity = Levels[levelNumber].slimes[i];
		entity = initializeSquare(entity.position, entity.width, entity.height, 'Slime');
		addRenderPiece(entity, 'Slime', [entity.width, entity.height]);
		addCollisionVolume(entity, entity.width, entity.height, COLLISION.INTERACT);
		Game.entities.push(entity);
	}
}

var Levels = [];
	/*{
		floors:[
			{
				position:[0,0],
				width   :100,
				height  :1,
			},
			{
				position:[0,0],
				width   :1,
				height  :50,
			},
			{
				position:[99,0],
				width   :1,
				height  :50,
			},
			{
				position:[0,50],
				width   :100,
				height  :1,
			},
		],
		player:{
			position:[]
		},
		keys  :0,
		door  :{
			position:[],
			locks   :0,
		},
		lavas:[
			{
				position:[0,0],
				width:0,
				height:0
			}
		],
		fireWheels:[
			{
				position:[0,0],
				length:0,
				speed:0,
				angle:0,
			},
		],
	},*/








