function move(obj, deltaTime)
{
	obj.position[0] += obj.velocity[0]*deltaTime;
	obj.position[1] += obj.velocity[1]*deltaTime;

	if(Game.level.toroidal)
	{
		//handle torroid world
		if(obj.position[1] < 0)
		{
			obj.position[1] += Game.height*Game.PixelsToMeters;
		}
		else if(obj.position[1] > (Game.height )*Game.PixelsToMeters)
		{
			obj.position[1] -= Game.height*Game.PixelsToMeters;
		}

		if(obj.position[0] < 0)
		{
			obj.position[0] += Game.width*Game.PixelsToMeters;
		}
		else if(obj.position[0] > (Game.width)*Game.PixelsToMeters)
		{
			obj.position[0] -= Game.width*Game.PixelsToMeters;
		}
	}
}

function handlePlayerInputs(player, deltaTime)
{
	var playerDia = player.radius*2;
	var maxVel = Inputs.running ? 50 : 10;
	var MovingSpeed  = 100 * Inputs.amount;
	player.drag = [-player.velocity[0]*15, 0];


	var JumpingSpeed = jumpVel(12, 0.45);
	var redirectSpeed = player.velocity[0] * -0.25;
	var overwriteDrag = false;

	for(var entityIndex=0; entityIndex < Game.entities.length; entityIndex++)
	{
		if(!Game.entities[entityIndex])
				continue;
		if(Game.entities[entityIndex].type == 'Slime')
		{
			var slime = Game.entities[entityIndex];
			if(AABB(player.position,  playerDia, playerDia, slime.position, slime.width, slime.height))
			{
				player.drag = [-player.velocity[0]*30, -player.velocity[1]*30]
				overwriteDrag = true;
			}
		}
		if(Game.entities[entityIndex].alive && Game.entities[entityIndex].type == 'Ice')
		{
			var ice = Game.entities[entityIndex];
			var pos = [ice.position[0],ice.position[1]+.01];

			if(AABB(player.position,  playerDia, playerDia, pos, ice.width, ice.height))
			{
				player.drag = [-player.velocity[0]*.1, -player.velocity[1]*.1]
				redirectSpeed = 0;
			}
		}
	}


	if(Inputs.forward)
	{

		if(player.velocity[0] < 0)
		{
			player.velocity[0] += redirectSpeed;
		}

		if(!overwriteDrag)
		{
			//do nothing to moving speed
			player.drag = [0,0];
		}
	}

	else if(Inputs.back)
	{
		if(player.velocity[0] > 0)
		{
			player.velocity[0] += redirectSpeed;
		}

		MovingSpeed *= -1;
		if(!overwriteDrag)
		{
			//do nothing to moving speed
			player.drag = [0,0];
		}
	}

	else {
		MovingSpeed = 0;
		if(player.jump)
		{
			if(!overwriteDrag)
			{
				player.drag = [-player.velocity[0]*5, 0]
			}
		}
	}

	player.speed[0] = Math.cos(player.rotation) * MovingSpeed;
	player.speed[1] = Math.sin(player.rotation) * MovingSpeed;

	if(Inputs.jump && player.jump == 0)
	{
		player.speed[0] += Math.sin(player.rotation) * JumpingSpeed / (deltaTime);
		player.speed[1] += Math.cos(player.rotation) * JumpingSpeed / (deltaTime);
		player.jump = 1;
		PlaySound('jump', 0.2);
	}
}

function movePlayerNew(player, deltaTime)
{
	var JumpingSpeed = jumpVel(12, 0.45);
	//var gravity = Game.gravity;
	var gravity = jumpGravity(12, 0.45);
	if(player.jump && !Inputs.jump && player.velocity[1] >= 0)
	{
		gravity = jumpGravity(36, 0.45);
	}

	var playerDia = player.radius*2;
	var maxVel = Inputs.running ? 50 : 10;

	if(player.spring)
	{
		//debugger;
	}
	var drag = [player.drag[0], player.drag[1]];
	if(player.accelerated > 0) {
		drag[0] = 0;
		player.accelerated -= deltaTime;
	}

	player.velocity[0] +=  deltaTime * player.speed[0] +  deltaTime * player.drag[0];
	player.velocity[1] +=  deltaTime * player.speed[1] +  deltaTime * gravity + deltaTime * player.drag[1];

	if(player.accelerated <= 0) {
		if(player.velocity[0] > maxVel)
			player.velocity[0] = maxVel;
		if(player.velocity[0] < -maxVel)
			player.velocity[0] = -maxVel;
	}

	if(player.velocity[1] <-110)
	{
		player.velocity[1] = -100;
	}
	move(player, deltaTime);

	for(var entityIndex =0; entityIndex < Game.entities.length; ++entityIndex)
 	{
 		if(!Game.entities[entityIndex])
				continue;
 		if(Game.entities[entityIndex] == player)
 			continue;

 		//handle collisions
 		//for(let volumeIndex in Game.entities[entityIndex].volumes)
 		var volumeIndex = 0;
 		if(Game.entities[entityIndex].volumes)
 		{

 			if(Game.entities[entityIndex].volumes[volumeIndex].type & COLLISION.KILL)
 			{
 				if(AABB(player.position, player.volumes[0].dimension[0], player.volumes[0].dimension[1],
 						Game.entities[entityIndex].position,Game.entities[entityIndex].volumes[volumeIndex].dimension[0], Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))
 				{
 					Game.FadeOut = true;
 					Game.FadeTime = Game.MaxFadeTime;
 				}
 			}

 			if(Game.entities[entityIndex].volumes[volumeIndex].type & COLLISION.COLLIDES)
 			{
 				//handle side collision
 				if(RayCast(getPlayerRay(player), Game.entities[entityIndex].position, Game.entities[entityIndex].volumes[volumeIndex].dimension[0], Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))
 				{
 					if(player.velocity[0] > 0)
 					{
 						player.position[0] = Game.entities[entityIndex].position[0] - player.volumes[0].dimension[0];
 					}
 					else if(player.velocity[0] < 0)
 					{
 						player.position[0] = Game.entities[entityIndex].position[0] + Game.entities[entityIndex].volumes[volumeIndex].dimension[0];
 					}
 					player.velocity[0] = 0;
 				}

 				//ceiling collision
 				//var topPosition = [player.position[0], player.position[1]+player.volumes[0].dimension[1]-.2];
 				if(AABB([player.position[0], player.position[1]+player.volumes[0].dimension[1]-.2],  player.volumes[0].dimension[0], .2,
 						Game.entities[entityIndex].position,Game.entities[entityIndex].volumes[volumeIndex].dimension[0], Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))
 				{
 					player.position[1] = Game.entities[entityIndex].position[1]-player.volumes[0].dimension[1];
 					if (player.velocity[1] > 0)
 					{
 						player.velocity[1] = 0;
 					}
 				}

				//standing on collision
				if(AABB(player.position,   player.volumes[0].dimension[0],  player.volumes[0].dimension[1],
						Game.entities[entityIndex].position,Game.entities[entityIndex].volumes[volumeIndex].dimension[0], Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))
				{
					player.position[1] = Game.entities[entityIndex].position[1]+Game.entities[entityIndex].volumes[volumeIndex].dimension[1];
					if (player.velocity[1] < 0)
					{
						player.velocity[1] = 0;
						//if(Inputs.jump == false)
							player.jump = 0;
					}
				}

			}

			if(Game.entities[entityIndex].volumes[volumeIndex].type & COLLISION.VSPRING & COLLISION.NONE)
			{
				//handle side collision
				if(RayCast(getPlayerRay(player), Game.entities[entityIndex].position, Game.entities[entityIndex].volumes[volumeIndex].dimension[0], Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))
				{
					if(player.velocity[0] > 0)
					{
						player.position[0] = spring.position[0] - player.volumes[0].dimension[0];
					}
					else if(player.velocity[0] < 0)
					{
						player.position[0] = spring.position[0] +spring.width;
					}
					player.velocity[0] = 0;

				}

				//handle spring collision
				if(AABB(player.position, player.volumes[0].dimension[0], player.volumes[0].dimension[1],
											Game.entities[entityIndex].position,Game.entities[entityIndex].volumes[volumeIndex].dimension[0], Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))
					if(player.velocity[1] < 0 )
					{
						player.speed[1] = 0;//();

						player.velocity[1] = 2*JumpingSpeed;
						player.jump = 1;
					}
				}

			if(Game.entities[entityIndex].volumes[volumeIndex].type & COLLISION.HSPRING & COLLISION.NONE)
			{
				if(AABB(player.position, player.volumes[0].dimension[0], player.volumes[0].dimension[1],
											Game.entities[entityIndex].position,Game.entities[entityIndex].volumes[volumeIndex].dimension[0], Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))
				{
					player.speed[0] = 0;

					if(player.position[0] >= Game.entities[entityIndex].position[0])
						player.position[0] = Game.entities[entityIndex].position[0] + Game.entities[entityIndex].volumes[volumeIndex].dimension[0] + player.volumes[0].dimension[0];
					else
						player.position[0] = spring.position[0] - player.volumes[0].dimension[0];

					Inputs.forward = false;
					Inputs.back = false;

					player.velocity[0] = (player.velocity[0] < 0 ? 1 : -1) * 5 * JumpingSpeed;
					player.accelerated = 0.20;

				}
			}

			if(Game.entities[entityIndex].volumes[volumeIndex].type & COLLISION.INTERACT & COLLISION.NONE)
			{
				if(Game.entities[entityIndex].type == 'Key')
				{

					if(AABB(player.position, player.volumes[0].dimension[0], player.volumes[0].dimension[1],
											Game.entities[entityIndex].position,Game.entities[entityIndex].volumes[volumeIndex].dimension[0], Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))
					{
						player.keys++;
						Game.entities[entityIndex].alive = 0;
						Game.entities[entityIndex].volumes[volumeIndex].type = COLLISION.NONE;
					}
				}

				if(Game.entities[entityIndex].type == 'Door')
				{
					if(AABB(player.position, player.volumes[0].dimension[0], player.volumes[0].dimension[1],
											Game.entities[entityIndex].position,Game.entities[entityIndex].volumes[volumeIndex].dimension[0], Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))
					if(player.keys)
					{
						Game.door.locks -= player.keys;
						for(var keyCount = 0; keyCount < player.keys; keyCount++)
						{
							for(var lockIndex = Game.door.lockEntities.length-1; lockIndex>=0;lockIndex-- )
							{
								if(Game.door.lockEntities[lockIndex].alive)
								{
									Game.door.lockEntities[lockIndex].alive = false;
									break;
								}
							}
							player.keys--;
						}

						if(Game.door.locks <= 0)
						{
							//Game.LevelComplete = true;
							Game.FadeOut = true;
							Game.FadeTime = Game.MaxFadeTime;
							Game.IncrementLevel = true;
						}
					}
				}
			}
 		}
 	}

	player.trailTime -= deltaTime;
	if(player.trailTime < 0)
	{
		player.trailTime = 1/120;
		if(player.velocity[0] != 0 || player.velocity[1] != 0)
		{
			player.trail.push([player.position[0], player.position[1]]);
		}
		else
		{
			player.trail.push([-10000, -1000]);
		}
		if(player.trail.length > 15)
		{
			player.trail = player.trail.slice(-15);
		}
	}
}

function movePlayer(player, deltaTime)
{
	BEGIN_TIMED_FUNCTION()
	var JumpingSpeed = jumpVel(12, 0.45);
	//var gravity = Game.gravity;
	var gravity = jumpGravity(12, 0.45);
	if(player.jump && !Inputs.jump && player.velocity[1] >= 0)
	{
		gravity = jumpGravity(36, 0.45);
	}

	var playerDia = player.volumes[0].dimension[0];
	var maxVel = Inputs.running ? 50 : 10;

	if(player.spring)
	{
		//debugger;
	}
	var drag = [player.drag[0], player.drag[1]];
	if(player.accelerated > 0) {
		drag[0] = 0;
		player.accelerated -= deltaTime;
	}

	player.velocity[0] +=  deltaTime * player.speed[0] +  deltaTime * player.drag[0];
	player.velocity[1] +=  deltaTime * player.speed[1] +  deltaTime * gravity + deltaTime * player.drag[1];

	if(player.accelerated <= 0) {
		if(player.velocity[0] > maxVel)
			player.velocity[0] = maxVel;
		if(player.velocity[0] < -maxVel)
			player.velocity[0] = -maxVel;
	}

	if(player.velocity[1] <-110)
	{
		player.velocity[1] = -100;
	}
	move(player, deltaTime);

/*
	var hitVolume = {
		tMin:1.0
	};
	var distanceRemaining = 1.0;
*/
//	for(var itter = 0;itter < 4;itter++)
	{
		for(var entityIndex =0; entityIndex < Game.entities.length; ++entityIndex)
		{
			//better handling of removing entities
			if(!Game.entities[entityIndex])
			{
				continue;
			}
			if(player == Game.entities[entityIndex])
				continue;

			for(var playerVolumeIndex =0; playerVolumeIndex < player.volumes.length; playerVolumeIndex++)
			{
				if(Game.entities[entityIndex].volumes)
				for(var volumeIndex=0; volumeIndex < Game.entities[entityIndex].volumes.length; volumeIndex++)
				{
					var volumePosition = add(Game.entities[entityIndex].position,Game.entities[entityIndex].volumes[volumeIndex].offset);
					if((player.volumes[playerVolumeIndex].type & COLLISION.CAN_BE_HIT) && (Game.entities[entityIndex].volumes[volumeIndex].type & COLLISION.KILL))
					{
						var floor   = Game.entities[entityIndex];
						var floorPos    = add(floor.position,  Game.entities[entityIndex].volumes[volumeIndex].offset);
						var floorWidth  = Game.entities[entityIndex].volumes[volumeIndex].dimension[0];
						var floorHeight = Game.entities[entityIndex].volumes[volumeIndex].dimension[1];

						if(AABB(player.position,  player.volumes[playerVolumeIndex].dimension[0], player.volumes[playerVolumeIndex].dimension[1],
						floorPos, floorWidth, floorHeight))
						{
							Game.FadeOut = true;
							Game.FadeTime = Game.MaxFadeTime;
						}
					}

					if(player.volumes[playerVolumeIndex].type & COLLISION.COLLIDES)
					{
						if(Game.entities[entityIndex].volumes[volumeIndex].type & COLLISION.COLLIDES)
						{

							//handle left side collision
							if(AABB(player.position, player.volumes[playerVolumeIndex].dimension[0],  player.volumes[playerVolumeIndex].dimension[1],
								volumePosition,
								.1,
								Game.entities[entityIndex].volumes[volumeIndex].dimension[1]-.5))
							{
								player.position[0] = volumePosition[0] - player.volumes[playerVolumeIndex].dimension[0];
								player.velocity[0] = 0;

							}

							//handle right side collision
							if(AABB(player.position,   player.volumes[playerVolumeIndex].dimension[0],  player.volumes[playerVolumeIndex].dimension[1],
								add(volumePosition, [Game.entities[entityIndex].volumes[volumeIndex].dimension[0]-.1, 0]),
								.1,
								Game.entities[entityIndex].volumes[volumeIndex].dimension[1]-.5))
							{
								player.position[0] = volumePosition[0] + Game.entities[entityIndex].volumes[volumeIndex].dimension[0];
								player.velocity[0] = 0;
							}

							//ceiling collision
							//var topPosition = [player.position[0], player.position[1]+player.volumes[playerVolumeIndex].dimension[1]-.2];
							if((player.velocity[1] > 0) &&
								AABB([player.position[0],
									player.position[1]+player.volumes[playerVolumeIndex].dimension[1]-.2],
									player.volumes[playerVolumeIndex].dimension[0], .2,
									volumePosition,Game.entities[entityIndex].volumes[volumeIndex].dimension[0], Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))
									if(player.velocity[1] > 0 && AABB(player.position,   player.volumes[playerVolumeIndex].dimension[0],  player.volumes[playerVolumeIndex].dimension[1],
									volumePosition,Game.entities[entityIndex].volumes[volumeIndex].dimension[0], Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))

							{
								player.position[1] = volumePosition[1]-player.volumes[playerVolumeIndex].dimension[1];
								player.velocity[1] = 0;
							}

							//standing on collision
							if(player.velocity[1] <= 0 && AABB(player.position,   player.volumes[playerVolumeIndex].dimension[0],  player.volumes[playerVolumeIndex].dimension[1],
									volumePosition,Game.entities[entityIndex].volumes[volumeIndex].dimension[0], Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))
							{
								player.position[1] = volumePosition[1]+Game.entities[entityIndex].volumes[volumeIndex].dimension[1];
								if (player.velocity[1] < 0)
								{
									player.velocity[1] = 0;
									//if(Inputs.jump == false)
										player.jump = 0;
								}
							}

							/*
							var hit = MinkoskiSweep(
									player.position,
									multiply(player.velocity, deltaTime),
									player.volumes[playerVolumeIndex].dimension,
									volumePosition,
									[0,0],
									Game.entities[entityIndex].volumes[volumeIndex].dimension,
									hitVolume.tMin
									);
							if(hit)
							{
								if(hit.tMin < hitVolume.tMin)
								{
									hitVolume = hit;
								}
							}
							*/

						}

						if(Game.entities[entityIndex].volumes[volumeIndex].type & COLLISION.VSPRING)
						{
							var spring = Game.entities[entityIndex];
							var ray = getPlayerRay(player);

							if(Game.player.jump == 1)
							{
								if(AABB(player.position,   player.volumes[playerVolumeIndex].dimension[0],  player.volumes[playerVolumeIndex].dimension[1],
										volumePosition,Game.entities[entityIndex].volumes[volumeIndex].dimension[0], Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))
								{
									player.position[1] = volumePosition[1]+Game.entities[entityIndex].volumes[volumeIndex].dimension[1];

									player.speed[1] = 0;//();

									player.velocity[1] = 2*JumpingSpeed;
									player.jump = 1;
								}
							}
							else
							{
								if(AABB(player.position,   player.volumes[playerVolumeIndex].dimension[0],  player.volumes[playerVolumeIndex].dimension[1],
									volumePosition,
									.1,
									Game.entities[entityIndex].volumes[volumeIndex].dimension[1]-.5))
								{
									player.position[0] = volumePosition[0] - player.volumes[playerVolumeIndex].dimension[0];
									player.velocity[0] = 0;

								}

								//handle right side collision
								if(AABB(player.position,   player.volumes[playerVolumeIndex].dimension[0],  player.volumes[playerVolumeIndex].dimension[1],
									add(volumePosition, [Game.entities[entityIndex].volumes[volumeIndex].dimension[0]-.1, 0]),
									.1,
									Game.entities[entityIndex].volumes[volumeIndex].dimension[1]-.5))
								{
									player.position[0] = volumePosition[0] + Game.entities[entityIndex].volumes[volumeIndex].dimension[0];
									player.velocity[0] = 0;
								}

								//ceiling collision
								//var topPosition = [player.position[0], player.position[1]+player.volumes[playerVolumeIndex].dimension[1]-.2];
								if((player.velocity[1] > 0) && AABB([player.position[0], player.position[1]+player.volumes[playerVolumeIndex].dimension[1]-.2],  player.volumes[playerVolumeIndex].dimension[0], .2,
										volumePosition,Game.entities[entityIndex].volumes[volumeIndex].dimension[0], Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))
								{
									player.position[1] = volumePosition[1]-player.volumes[playerVolumeIndex].dimension[1];
									player.velocity[1] = 0;
								}

								//standing on collision
								if(AABB(player.position,   player.volumes[playerVolumeIndex].dimension[0],  player.volumes[playerVolumeIndex].dimension[1],
										volumePosition,Game.entities[entityIndex].volumes[volumeIndex].dimension[0], Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))
								{
									player.position[1] = volumePosition[1]+Game.entities[entityIndex].volumes[volumeIndex].dimension[1];

									player.speed[1] = 0;//();

									player.velocity[1] = 2*JumpingSpeed;
									player.jump = 1;
								}
							}
						}

						if(Game.entities[entityIndex].volumes[volumeIndex].type & COLLISION.HSPRING)
						{

							var spring = Game.entities[entityIndex];

							if(AABB(player.position,  playerDia, playerDia, spring.position, Game.entities[entityIndex].volumes[volumeIndex].dimension[0],Game.entities[entityIndex].volumes[volumeIndex].dimension[1]))
							{
									player.speed[0] = 0;

									if(player.position[0] >= spring.position[0])
										player.position[0] = spring.position[0] + spring.width + playerDia;
									else
										player.position[0] = spring.position[0]-playerDia;

									Inputs.forward = false;
									Inputs.back = false;

									player.velocity[0] = (player.velocity[0] < 0 ? 1 : -1) * 5 * JumpingSpeed;
									player.accelerated = 0.20;

							}
						}

						if(Game.entities[entityIndex].volumes[volumeIndex].type & COLLISION.INTERACT)
						{
							if(Game.entities[entityIndex].type == 'Key')
							{
								var key = Game.entities[entityIndex];
								if(key.alive && AABB(player.position,  playerDia, playerDia, key.position, key.width*2, key.height))
								{
									player.keys++;
									key.alive = 0;
								}
							}

							if(Game.entities[entityIndex].type == 'Door')
							{
								if(AABB(player.position,  playerDia, playerDia, Game.door.position, Game.door.width, Game.door.height))
								{
									if(player.keys)
									{
										Game.door.locks -= player.keys;
										for(var i = 0; i < player.keys; i++)
										{
											for(var j = Game.door.lockEntities.length-1; j>=0;j-- )
											{
												var entity = Game.door.lockEntities[j];
												if(entity.alive)
												{
													entity.alive = false;
													break;
												}
											}

										}
										player.keys=0;
										if(Game.door.locks <= 0)
										{
											//Game.LevelComplete = true;
											Game.FadeOut = true;
											Game.FadeTime = Game.MaxFadeTime;
											Game.IncrementLevel = true;
										}
									}
								}
							}
						}
					}
				}
			}
		}

/*
		player.position[0] += player.velocity[0]*deltaTime*hitVolume.tMin;
		player.position[1] += player.velocity[1]*deltaTime*hitVolume.tMin;
		distanceRemaining -= hitVolume.tMin;
		if(hitVolume.tMin < 1.0 && hitVolume.normal)
		{

			var inn = inner(player.velocity, hitVolume.normal);
			var mul = multiply(hitVolume.normal, inn);
			var sub = subtract(player.velocity, mul);
			player.velocity = sub;
			if(hitVolume.normal[1] == 1)
				player.jump = 0;
		}
		hitVolume.tMin = distanceRemaining;
*/
	}


	//if(player.velocity[0] >-.2 && player.velocity[0] <.2)
	{
		//player.velocity[0] = 0;
	}



	player.trailTime -= deltaTime;
	if(player.trailTime < 0)
	{
		player.trailTime = 1/120;
		if(player.velocity[0] != 0 || player.velocity[1] != 0)
		{
			player.trail.push([player.position[0], player.position[1]]);
		}
		else
		{
			player.trail.push([-10000, -1000]);
		}
		if(player.trail.length > 15)
		{
			player.trail = player.trail.slice(-15);
		}
	}

	END_TIMED_FUNCTION()
}

function moveAndUpdate(Game)
{
	BEGIN_TIMED_FUNCTION()
	var iterator = 4;
	var deltaTime = Game.deltaTime/1000;
	var deltaTimeInc = deltaTime/iterator;
	for(var iteratorIndex = 0; iteratorIndex< iterator; iteratorIndex++)
	{
		for(var entityIndex=0; entityIndex < Game.entities.length; ++entityIndex)
		{
			if(!Game.entities[entityIndex])
				continue;
			switch(Game.entities[entityIndex].type)
			{
				case 'Shoot' : {
					BEGIN_TIMED_BLOCK('Shoot Entity');
					Game.entities[entityIndex].timer -= deltaTimeInc;
					if(Game.entities[entityIndex].timer < 0) {
						Game.entities[entityIndex].timer = Game.entities[entityIndex].delay - Game.entities[entityIndex].timer;
						addBullet(Game.entities[entityIndex]);
					}
					END_TIMED_BLOCK('Shoot Entity');
				} break;

				case 'Rotate' : {
					BEGIN_TIMED_BLOCK('Rotate Entity');
					Game.entities[entityIndex].angle += Game.entities[entityIndex].speed * deltaTimeInc;
					var x = Math.sin(Game.entities[entityIndex].angle);
					var y = Math.cos(Game.entities[entityIndex].angle);

					if(Game.entities[entityIndex].pieces)
					for(var pieceIndex=0;pieceIndex < Game.entities[entityIndex].pieces.length; pieceIndex++)
					{
						var offset = multiply([x,y],  Game.entities[entityIndex].pieces[pieceIndex].distanceFromOrigin);
						//shift the offset by one half the size, so that we are moving about the center instead of the corner
						offset = add(offset, multiply(Game.entities[entityIndex].pieces[pieceIndex].dimension, -0.5));
						Game.entities[entityIndex].pieces[pieceIndex].offset = offset;
					}

					if(Game.entities[entityIndex].volumes)
					for(var volumeIndex=0;volumeIndex < Game.entities[entityIndex].volumes.length; volumeIndex++)
					{
						var offset1 = multiply([x,y],  Game.entities[entityIndex].volumes[volumeIndex].distanceFromOrigin);
						var offset = add(offset1, multiply(Game.entities[entityIndex].volumes[volumeIndex].dimension, -0.5));
						var diff = subtract(offset, Game.entities[entityIndex].volumes[volumeIndex].offset);
						Game.entities[entityIndex].volumes[volumeIndex].offset = offset;

						//hack code for updating player position and trails
						if(Game.entities[entityIndex].volumes[volumeIndex].type & COLLISION.COLLIDES)
						{
							if(AABB(add(Game.entities[entityIndex].position, Game.entities[entityIndex].volumes[volumeIndex].offset),
									Game.entities[entityIndex].volumes[volumeIndex].dimension[0],
									Game.entities[entityIndex].volumes[volumeIndex].dimension[1]+.2,
									Game.player.position,
									Game.player.volumes[0].dimension[0],
									Game.player.volumes[0].dimension[1]))
							{
								Game.player.position[0] += diff[0];
								Game.player.position[1] += diff[1];
								for(var k in Game.player.pieces[0].trail)
								{
									Game.player.pieces[0].trail[k][0] += diff[0];
									Game.player.pieces[0].trail[k][1] += diff[1];
								}
							}
						}
					}
					END_TIMED_BLOCK('Rotate Entity');
				} break;

				case 'Ice' : {
					if(Game.entities[entityIndex].alive)
					{
						Game.entities[entityIndex].life -= deltaTimeInc;
						if(Game.entities[entityIndex].life <= 0)
						{
							Game.entities[entityIndex].life = 0;
							Game.entities[entityIndex].alive = false;
							for(var i in Game.entities[entityIndex].volumes)
							{
								Game.entities[entityIndex].volumes[i].type = COLLISION.NONE;
							}
						}
						for(var pieceIndex in Game.entities[entityIndex].pieces)
						{
							Game.entities[entityIndex].pieces[pieceIndex].dimension[1] = Game.entities[entityIndex].maxHeight * (
								Game.entities[entityIndex].life/10);
							//createPieceBuffer(Game.entities[entityIndex].pieces[pieceIndex]);
						}
						for(var volumeIndex in Game.entities[entityIndex].volumes)
						{
							Game.entities[entityIndex].volumes[volumeIndex].dimension[1] = Game.entities[entityIndex].maxHeight * (
								Game.entities[entityIndex].life/10);
							createCollisionVolumeBuffer(Game.entities[entityIndex].volumes[volumeIndex]);
						}
					}
				}break;
				case 'Bullet' : {
					if(Game.entities[entityIndex].position[0] < -200 - Game.entities[entityIndex].width ||
					   Game.entities[entityIndex].position[0] > 200 ||
					   Game.entities[entityIndex].position[1] < -200 - Game.entities[entityIndex].height ||
					   Game.entities[entityIndex].position[1] > 200)
					{
						delete Game.entities[entityIndex];
						continue;
					}

					//acceleration
					/*
					if(!Game.entities[entityIndex].acceleration)
						Game.entities[entityIndex].acceleration = 0.0;
					Game.entities[entityIndex].acceleration += 100.0 * deltaTimeInc;
					Game.entities[entityIndex].speed +=  Game.entities[entityIndex].acceleration * deltaTimeInc;
					*/

					var diff = [
						Game.entities[entityIndex].speed * Game.entities[entityIndex].direction[0] * deltaTimeInc,
						Game.entities[entityIndex].speed * Game.entities[entityIndex].direction[1] * deltaTimeInc
					];
					Game.entities[entityIndex].position[0] += diff[0];
					Game.entities[entityIndex].position[1] += diff[1];

					//hack code for updating player position and trails
					var volumeIndex = 0;
					if(Game.entities[entityIndex].volumes[volumeIndex].type & COLLISION.COLLIDES && AABB(add(Game.entities[entityIndex].position, Game.entities[entityIndex].volumes[volumeIndex].offset),
							Game.entities[entityIndex].volumes[volumeIndex].dimension[0],
							Game.entities[entityIndex].volumes[volumeIndex].dimension[1]+.2,
							Game.player.position,
							Game.player.volumes[0].dimension[0],
							Game.player.volumes[0].dimension[1]))
					{
						Game.player.position[0] += diff[0];
						Game.player.position[1] += diff[1];
						for(var k in Game.player.pieces[0].trail)
						{
							Game.player.pieces[0].trail[k][0] += diff[0];
							Game.player.pieces[0].trail[k][1] += diff[1];
						}
					}

				} break;
				case 'Player': {
					if(iteratorIndex==0)
					{
						handlePlayerInputs(Game.entities[entityIndex], deltaTime);
					}

					movePlayer(Game.entities[entityIndex], deltaTimeInc);
					Game.keySpan.innerHTML   = Game.entities[entityIndex].keys;
				} break;

				case 'Path': {
					BEGIN_TIMED_BLOCK('Path Entity');
					var xDiff = (Game.entities[entityIndex].end_position[0] - Game.entities[entityIndex].start_position[0]);
					var yDiff = (Game.entities[entityIndex].end_position[1] - Game.entities[entityIndex].start_position[1]);
					var angle = Math.atan2(yDiff, xDiff);
					var x = Math.cos(angle);
					var y = Math.sin(angle);
					Game.entities[entityIndex].position[0] += (Game.entities[entityIndex].speed * deltaTimeInc) * x;
					Game.entities[entityIndex].position[1] += (Game.entities[entityIndex].speed * deltaTimeInc) * y;

					if(Game.entities[entityIndex].attached)
					{
						for(var attachedIndex in Game.entities)
						{
							if(Game.entities[attachedIndex].id == Game.entities[entityIndex].attached)
							{
								Game.entities[attachedIndex].position[0] += (Game.entities[entityIndex].speed * deltaTimeInc) * x;
								Game.entities[attachedIndex].position[1] += (Game.entities[entityIndex].speed * deltaTimeInc) * y;

								//hack code for updating player position and trails
								if(AABB(Game.entities[attachedIndex].position, Game.entities[attachedIndex].width,Game.entities[attachedIndex].height+.1,
									Game.player.position, Game.player.volumes[0].dimension[0],Game.player.volumes[0].dimension[1]))
								{
									Game.player.position[0] += (Game.entities[entityIndex].speed * deltaTimeInc) * x;
									Game.player.position[1] += (Game.entities[entityIndex].speed * deltaTimeInc) * y;
									for(var k in Game.player.pieces[0].trail)
									{
										Game.player.pieces[0].trail[k][0] += (Game.entities[entityIndex].speed * deltaTimeInc) * x;
										Game.player.pieces[0].trail[k][1] += (Game.entities[entityIndex].speed * deltaTimeInc) * y;
									}
								}
							}
						}
					}

					if(AABB(Game.entities[entityIndex].position, .1, .1, Game.entities[entityIndex].end_position, .1, .1))
					{
						Game.entities[entityIndex].position = [Game.entities[entityIndex].end_position[0],Game.entities[entityIndex].end_position[1]];
						Game.entities[entityIndex].current_node = getNextNodeIndex(Game.entities[entityIndex]);
						Game.entities[entityIndex].start_position = Game.entities[entityIndex].end_position;
						Game.entities[entityIndex].end_position   = getNextNode(Game.entities[entityIndex]).position;
					}
					END_TIMED_BLOCK('Path Entity');
				} break;
			};

			if(Game.entities[entityIndex].pieces)
			for(var pieceIndex=0;pieceIndex < Game.entities[entityIndex].pieces.length; pieceIndex++)
			{


				BEGIN_TIMED_BLOCK('Update Render Effect');
				if(Game.entities[entityIndex].pieces[pieceIndex].effects && Game.entities[entityIndex].pieces[pieceIndex].effects & (RENDER_EFFECTS.TRAIL | RENDER_EFFECTS.VELOCITY_TRAIL))
				{
					Game.entities[entityIndex].pieces[pieceIndex].trailTime -= deltaTimeInc;
					if(Game.entities[entityIndex].pieces[pieceIndex].trailTime < 0)
					{
						Game.entities[entityIndex].pieces[pieceIndex].trailTime = 1/120;
						if(Game.entities[entityIndex].pieces[pieceIndex].effects & RENDER_EFFECTS.VELOCITY_TRAIL)
						{
							if(Game.entities[entityIndex].velocity[0] != 0 || Game.entities[entityIndex].velocity[1] != 0)
							{
								Game.entities[entityIndex].pieces[pieceIndex].trail.push([Game.entities[entityIndex].position[0], Game.entities[entityIndex].position[1]]);
							}
							else
							{
								Game.entities[entityIndex].pieces[pieceIndex].trail.push([-10000, -1000]);
							}
						}
						else
						{
							Game.entities[entityIndex].pieces[pieceIndex].trail.push([Game.entities[entityIndex].position[0], Game.entities[entityIndex].position[1]]);
						}

						if(Game.entities[entityIndex].pieces[pieceIndex].trail.length > 15)
						{
							Game.entities[entityIndex].pieces[pieceIndex].trail = Game.entities[entityIndex].pieces[pieceIndex].trail.slice(-15);
						}
					}
				}
				END_TIMED_BLOCK('Update Render Effect');

			}

		}

	}
	END_TIMED_FUNCTION()
}

function addBullet(entity) {
	var bullet = {
		type:'Bullet',
		width:entity.width,
		height:entity.height,
		position:[entity.position[0], entity.position[1]],
		speed:entity.speed,
		direction:[entity.direction[0], entity.direction[1]]
	};
	var collision_type = entity.collision || COLLISION.KILL|COLLISION.CAN_BE_HIT
	var draw = entity.draw || 'Kill';
	addRenderPiece(bullet, draw, [entity.width, entity.height]);
	//addRenderEffect(bullet.pieces[0], RENDER_EFFECTS.TRAIL);
	addCollisionVolume(bullet, entity.width, entity.height, collision_type);

	Game.entities.push(bullet);

	if(draw == 'Kill')
	{
		PlaySound('shoot', 0.2);
	}
}