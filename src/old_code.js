//old opengl render code
/*switch(entity.type)
	{
		case 'Player': {
			var color = [0.0, 0.0, 1.0, 1.0];
			if(entity.velocity[0] > 0.1 ||
				entity.velocity[0] < -0.1 ||
				entity.velocity[1] < -0.1 ||
				entity.velocity[1] > 0.1
			)
			{
				for(var i=entity.trail.length-1; i>=0; i--)
				{
					var position = entity.trail[i];
					color[3] = i/entity.trail.length;
					OpenGlBufferRender(entity.buffers[0], color, add(translate,position));
				}
			}
			//gl.disable(gl.BLEND);
			color[3] = 1.0;
			OpenGLEntity(entity, color, context);



		} break;

		case 'Door'  :{
			function a_sum(a,b)
			{
				var c = [];
				for(var i in a)
				{
					c[i] = a[i]+b[i];
				}

				return c;
			}
			OpenGLEntity(entity, [0.3,0.05,0.05, 1.0], context);
			var lcolor = [0.3, 0.3, 0.3, 1.0];
			var hcolor = [0.0,0.0,0.0,1.0];
			var lock = {};
			var hole = {};
			createEntityBuffer(lock, 0.75, 1);
			createEntityBuffer(hole, 0.3, .75);

			var offsetX = 0.25;
			var offsetY = entity.height - 1.5;
			var count = 0;
			for(var i=0; i < entity.locks; i++, count++)
			{
				var p = [entity.position[0] + offsetX, entity.position[1] + offsetY];
				OpenGlBufferRender(lock.buffers[0], lcolor, p);
				OpenGlBufferRender(hole.buffers[0], hcolor, a_sum(p, [.2,.1]));
				offsetX += 1.0;
				if(count == 2)
				{
					offsetX = 0.25;
					offsetY -= 1.25;
				}

			}

		} break;

		case 'Floor' :{
			OpenGLEntity(entity, [0.5,0.5,0.5,1.0], context);
		} break;

		case 'Lava'  :{
			entity.cycle += entity.inc * Game.deltaTime/1000;
			if(entity.cycle < 0 && entity.inc < 0)
			{
				entity.cycle = 0;
				entity.inc = 1;
			}

			if(entity.cycle > entity.maxCycle && entity.inc > 0)
			{
				entity.cycle = entity.maxCycle;
				entity.inc = -1;
			}

			var color = .5 - parseFloat(.5 * entity.cycle/entity.maxCycle);
			color = [1.0, color, 0.0, 1.0];
			OpenGLEntity(entity, color, context);
		} break;
		case 'Bullet': {
			if(!entity.buffers)
				createEntityBuffer(entity, entity.width, entity.height);
			OpenGLEntity(entity, [1.0,0.6,0.3, 1.0], context);
		}break;
		case 'Shoot': {
			OpenGLEntity(entity, [0.3,0.3,0.3,1.0], context);
		}break;
		case 'HSpring': {
			OpenGLEntity(entity, [0.0,1.0,1.0,1.0], context);
		}break
		case 'Spring':{
			OpenGLEntity(entity, [0.0,1.0,0.0,1.0], context);
		} break;
		case 'Slime' :{
			OpenGLEntity(entity, [0.0,0.7,0.0, .75], context);
		} break;
		case 'Ice' :{
			if(entity.alive)
			{
				entity.buffers=[];
				createEntityBuffer(entity, entity.width, entity.height);
				//gl.enable(gl.BLEND);
				OpenGLEntity(entity, [0.0,0.7,1.0, 0.75], context);
				//gl.disable(gl.BLEND);

				entity.life -= Game.deltaTime/1000;
				entity.height = entity.maxHeight * entity.life/10;
				if(entity.life <= 0)
					entity.alive = false;
			}
		} break;
		case 'Key'   :{
			if(entity.alive)
				OpenGLEntity(entity, [1.0,1.0,1.0, 1.0], context);
		} break;
		case 'FireWheel': {

			//OpenGLEntity(entity, [1.0,1.0,1.0, 1.0], context);
			var x = Math.sin(entity.angle);
			var y = Math.cos(entity.angle);
			var offsetX = entity.offset*Math.sin(entity.angle);
			var offsetY = entity.offset*Math.cos(entity.angle);


			for(var i =1; i < entity.length; i++)
			{
				var pos = [entity.position[0]+x*i+offsetX, entity.position[1]+y*i+offsetY];
				OpenGlBufferRender(entity.buffers[0], [1.0,0.6,0.3, 1.0], pos);
			}
		} break;

		case 'Path': {
			//OpenGLEntity(entity, [1.0,1.0,1.0, 1.0], context);
			for(var i in entity.nodes)
			{
				//OpenGlBufferRender(entity.buffers[0], [1.0,0.6,0.0, 1.0], entity.nodes[i].position);
			}
		} break;
	}
	*/

//old canvas render code
{
	switch(entity.type) {
		case 'Player':{
			context.save();
			context.strokeStyle="#0000FF";
			context.fillStyle="#0000FF";

			for(var i in entity.trail)
			{
				var position = entity.trail[i];
				context.globalAlpha = i/entity.trail.length;
				context.beginPath();
				context.rect(position[0] * Game.MetersToPixels,
							 position[1] * Game.MetersToPixels,
							(entity.radius+entity.radius) * Game.MetersToPixels,
							(entity.radius+entity.radius) * Game.MetersToPixels
							);
				context.stroke();
				context.fill();
				context.closePath();
			}
			context.globalAlpha = 1.0;
			context.beginPath();

			context.rect(entity.position[0] * Game.MetersToPixels,
						 entity.position[1] * Game.MetersToPixels,
						(entity.radius+entity.radius) * Game.MetersToPixels,
						(entity.radius+entity.radius) * Game.MetersToPixels
						);
			context.stroke();
			context.fill();
			context.closePath();
		/*
			context.beginPath();
				context.strokeStyle="#FF0000";
				lineFromPoints(context, getPlayerRay(entity), Game.MetersToPixels);
			context.closePath();


			var entityPos = [entity.position[0], entity.position[1]];
			var entityDia = entity.radius*2;
			context.beginPath();
				context.strokeStyle="#FF0000";
				context.rect(entityPos[0]*Game.MetersToPixels, entityPos[1]*Game.MetersToPixels, (entityDia-0)*Game.MetersToPixels, (entityDia-.2)*Game.MetersToPixels);
				context.stroke();
			context.closePath();

			context.beginPath();
				context.strokeStyle="#00FF00";
				context.rect(
					entityPos[0]*Game.MetersToPixels,
					(entityPos[1]+entityDia-.2)*Game.MetersToPixels,
					(entityDia-0)*Game.MetersToPixels,
					(.2)*Game.MetersToPixels);
				context.stroke();
			context.closePath();

		*/
			context.restore();
				} break;
		case 'Door'  :{
			context.save();
			context.beginPath();
			context.strokeStyle="#AAA";
			context.fillStyle="#AAA";
			context.rect(
				(entity.position[0])*Game.MetersToPixels,
				(entity.position[1])*Game.MetersToPixels,
				entity.width*Game.MetersToPixels,
				entity.height*Game.MetersToPixels);
			context.fill();
			context.closePath();

			for(var i =0; i < entity.width; i+= .75)
			{
				context.beginPath();
				context.strokeStyle="#000";
				context.fillStyle="#777";
				context.rect(
					(entity.position[0]+i)*Game.MetersToPixels,
					(entity.position[1])*Game.MetersToPixels,
					0.25*Game.MetersToPixels,
					(entity.height)*Game.MetersToPixels);
				context.fill();
				context.stroke();
				context.closePath();


			}

			for(var i =0; i < entity.height; i+= 1.5)
			{
				context.beginPath();
				context.strokeStyle="#000";
				context.fillStyle="#777";
				context.rect(
					(entity.position[0])*Game.MetersToPixels,
					(entity.position[1]+i)*Game.MetersToPixels,
					entity.width*Game.MetersToPixels,
					0.25*Game.MetersToPixels);
				context.fill();
				context.stroke();
				context.closePath();

			}

			context.beginPath();
			context.strokeStyle="#000";
			context.fillStyle="#777";
			context.rect(
				(entity.position[0])*Game.MetersToPixels,
				(entity.position[1]+entity.height)*Game.MetersToPixels,
				entity.width*Game.MetersToPixels,
				0.25*Game.MetersToPixels);
			context.fill();
			context.stroke();
			context.closePath();
			context.restore();

			//draw locks
			var lockWidth = 0.8;
			var lockHeight = 1.0;
			var topOffset = -lockHeight-.1;
			var leftOffset = .1;
			context.save();
			for(var i=0; i < entity.locks; i++)
			{
				context.beginPath();
				context.strokeStyle="#000";
				context.fillStyle="#777";
				context.rect(
					(entity.position[0]+leftOffset)*Game.MetersToPixels,
					(entity.position[1]+entity.height+topOffset)*Game.MetersToPixels,
					lockWidth*Game.MetersToPixels,
					lockHeight*Game.MetersToPixels
				);
				context.fill();
				context.stroke();
				context.closePath();

				context.beginPath();
				context.strokeStyle="#000";
				context.fillStyle="#000";
				context.rect(
					(entity.position[0]+leftOffset+(lockWidth/4))*Game.MetersToPixels,
					(entity.position[1]+entity.height+topOffset+(lockHeight/4))*Game.MetersToPixels,
					lockWidth/2 *Game.MetersToPixels,
					lockHeight/2*Game.MetersToPixels
				);
				context.fill();
				context.rect(
					(entity.position[0]+leftOffset+(lockWidth/3))*Game.MetersToPixels,
					(entity.position[1]+entity.height+topOffset+.1)*Game.MetersToPixels,
					lockWidth/4*Game.MetersToPixels,
					lockHeight/4*Game.MetersToPixels
				);
				context.fill();
				context.closePath();

				leftOffset += lockWidth+.2
				if((i+1) % 3 == 0)
				{
					leftOffset = .1;
					topOffset -= lockHeight*1.5;
				}
			}
			context.restore();



		} break;
		case 'Floor' :{
			context.save();
			context.beginPath();
			context.strokeStyle="#AAA";
			context.fillStyle="#AAA";
			drawSimpleSquare(entity, context);
			context.fill();
			context.closePath();
			context.restore();
		} break;
		case 'Lava'  :{
			entity.cycle += entity.inc * Game.deltaTime/1000;
			if(entity.cycle < 0 && entity.inc < 0)
			{
				entity.cycle = 0;
				entity.inc = 1;
			}

			if(entity.cycle > entity.maxCycle && entity.inc > 0)
			{
				entity.cycle = entity.maxCycle;
				entity.inc = -1;
			}

			var color = 96 - parseInt(96 * entity.cycle/entity.maxCycle);
			context.save();
			context.beginPath();

			context.strokeStyle="#FF"+color.toString(16).padStart(2, '0')+"00";
			context.fillStyle="#FF"+color.toString(16).padStart(2, '0')+"00";
			drawSimpleSquare(entity, context);
			context.fill();
			context.closePath();
			context.restore();
		} break;
		case 'Spring':{
			context.save();
			context.beginPath();
			context.strokeStyle="#AAA";
			context.fillStyle="#0F0";
			context.lineWidth=2;

			drawSquare( entity.position[0]+entity.width/4,
						entity.position[1],
						entity.width/2,
						entity.height,
						context);
			context.fill();

			context.stroke();
			context.closePath();
			context.beginPath();
			drawSquare(entity.position[0],
						entity.position[1]+entity.height-0.5,
						entity.width,
						entity.height,
						context);
			context.fill();
			context.stroke();

			context.closePath();
			context.restore();
		} break;
		case 'Slime' :{
			context.save();
			context.beginPath();
			context.strokeStyle="#0C0";
			context.fillStyle="#0C0";
			drawSimpleSquare(entity, context);
			context.globalAlpha = 0.75;
			context.fill();
			context.stroke();
			context.closePath();
			context.globalAlpha = 1.0;
			context.restore();
		} break;
		case 'Ice' :{
			if(entity.alive)
			{
				context.save();
				context.beginPath();
				context.strokeStyle="#03A";
				context.fillStyle="#0CF";
				context.globalAlpha = 0.75;
				drawSimpleSquare(entity, context);
				context.fill();
				context.stroke();
				context.closePath();
				context.restore();
				context.globalAlpha = 1.00;


				entity.life -= Game.deltaTime/1000;
				entity.height = entity.maxHeight * entity.life/10;
				if(entity.life <= 0)
					entity.alive = false;
			}
		} break;
		case 'Key'   :{
			if(entity.alive)
			{
				context.save();

				context.strokeStyle="#777";
				context.fillStyle="#777";

				context.beginPath();
				context.rect(
					(entity.position[0]+entity.width*1.9)*Game.MetersToPixels,
					(entity.position[1]+entity.height-entity.height/4)*Game.MetersToPixels,
					.1*Game.MetersToPixels,
					-entity.height*Game.MetersToPixels
				);

				context.rect(
					(entity.position[0]+entity.width*1.5)*Game.MetersToPixels,
					(entity.position[1]+entity.height-entity.height/4)*Game.MetersToPixels,
					.1*Game.MetersToPixels,
					-entity.height*Game.MetersToPixels
				);
				context.fill();
				//context.stroke();
				context.closePath();

				context.beginPath();
				context.rect(
					entity.position[0]*Game.MetersToPixels,
					(entity.position[1]+entity.height/4)*Game.MetersToPixels,
					entity.width*2*Game.MetersToPixels,
					entity.height/2*Game.MetersToPixels
				);
				context.fill();
				//context.stroke();
				context.closePath();

				context.beginPath();

				context.fillStyle="#000";
				context.rect(
					entity.position[0]*Game.MetersToPixels,
					entity.position[1]*Game.MetersToPixels,
					entity.width*Game.MetersToPixels,
					entity.height*Game.MetersToPixels
				);
				context.fill();
				context.stroke();
				context.stroke();
				context.stroke();

				context.closePath();

				context.restore();
			}
		} break;
		case 'FireWheel': {
			context.save();
			context.beginPath();
			context.strokeStyle="#333";
			context.fillStyle="#333";
			drawSquare(entity.position[0],entity.position[1],1,1, context);
			context.fill();
			context.closePath();


			context.beginPath();
			context.strokeStyle="#FFAA00";
			context.fillStyle="#FFAA00";
			var x = Math.sin(entity.angle);
			var y = Math.cos(entity.angle);

			for(var i =1; i < entity.length; i++)
			{
				drawSquare((entity.position[0]+x*i),(entity.position[1]+y*i),1,1, context);
				context.fill();
			}
			context.closePath();
			context.restore();
		} break;
	}
}



function movePlayer(player, deltaTime)
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

	for(var j in Game.entities)
	{
		if(Game.entities[j].type == 'Lava' || Game.entities[j].type == 'Bullet')
		{
			var floor   = Game.entities[j];
			floorPos    = [floor.position[0],
						   floor.position[1]];
			floorWidth  = floor.width;
			floorHeight = floor.height;

			if(AABB(player.position,  playerDia, playerDia, floorPos, floorWidth, floorHeight))
			{
				Game.FadeOut = true;
				Game.FadeTime = Game.MaxFadeTime;
			}
		}

		if(Game.entities[j].type == 'FireWheel')
		{
			var fireWheel = Game.entities[j];
			var x = Math.sin(fireWheel.angle);
			var y = Math.cos(fireWheel.angle);
			var offsetX = fireWheel.offset*Math.sin(fireWheel.angle);
			var offsetY = fireWheel.offset*Math.cos(fireWheel.angle);
			for(var i =1; i < fireWheel.length; i++)
			{
				var pos = [(fireWheel.position[0]+x*i)+offsetX, (fireWheel.position[1]+y*i)+offsetY];
				if(AABB(player.position,  playerDia, playerDia, pos, fireWheel.width||1, fireWheel.height||1))
				{
					Game.FadeOut = true;
					Game.FadeTime = Game.MaxFadeTime;
				}
			}
			fireWheel.angle += fireWheel.speed * deltaTime;
		}

		if(Game.entities[j].type == 'Floor' || (Game.entities[j].alive && Game.entities[j].type == 'Ice'))
		{
			var floor   = Game.entities[j];
			floorPos    = [floor.position[0],
						   floor.position[1]];
			floorWidth  = floor.width;
			floorHeight = floor.height;
			var ray = getPlayerRay(player);

			if(RayCast(ray, floorPos, floorWidth, floorHeight))
			{
				if(player.velocity[0] > 0)
				{
					player.position[0] = floorPos[0] - playerDia;
				}
				else if(player.velocity[0] < 0)
				{
					player.position[0] = floorPos[0] + floorWidth;
				}
				player.velocity[0] = 0;

			}

			var topPosition = [player.position[0], player.position[1]+playerDia-.2];
			if(AABB(topPosition,  playerDia, .2, floorPos, floorWidth, floorHeight))
			{
				player.position[1] = floorPos[1]-playerDia;
				if (player.velocity[1] > 0)
				{
					player.velocity[1] = 0;
				}
			}

			if(AABB(player.position,  playerDia, playerDia, floorPos, floorWidth, floorHeight))
			{
				player.position[1] = floorPos[1]+floorHeight;
				if (player.velocity[1] < 0)
				{
					player.velocity[1] = 0;
					//if(Inputs.jump == false)
						player.jump = 0;
				}
			}
		}

		if(Game.entities[j].type == 'Spring')
		{

			var spring = Game.entities[j];

			var ray = getPlayerRay(player);

			if(RayCast(ray, spring.position, spring.width, spring.height))
			{
				if(player.velocity[0] > 0)
				{
					player.position[0] = spring.position[0] - playerDia;
				}
				else if(player.velocity[0] < 0)
				{
					player.position[0] = spring.position[0] +spring.width;
				}
				player.velocity[0] = 0;

			}

			if(AABB(player.position,  playerDia, playerDia, spring.position, spring.width,spring.height))
			{
				if(player.velocity[1] < 0 )
				{
					player.speed[1] = 0;//();

					player.velocity[1] = 2*JumpingSpeed;
					player.jump = 1;
				}
			}
		}

		if(Game.entities[j].type == 'HSpring')
		{

			var spring = Game.entities[j];

			var ray = getPlayerRay(player);

			if(AABB(player.position,  playerDia, playerDia, spring.position, spring.width,spring.height))
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

		if(Game.entities[j].type == 'Key')
		{
			var key = Game.entities[j];
			if(key.alive && AABB(player.position,  playerDia, playerDia, key.position, key.width*2, key.height))
			{
				player.keys++;
				key.alive = 0;
			}
		}
	}



	if(AABB(player.position,  playerDia, playerDia, Game.door.position, Game.door.width, Game.door.height))
	{
		if(player.keys)
		{
			Game.door.locks -= player.keys;
			for(var i = 0; i < player.keys; i++)
			{
				for(var j = Game.door.lockEntities.length-1; j>=0;j-- )
				{
					let entity = Game.door.lockEntities[j];
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

	//if(player.velocity[0] >-.2 && player.velocity[0] <.2)
	{
		//player.velocity[0] = 0;
	}

	if(player.velocity[1] <-110)
	{
		player.velocity[1] = -100;
	}

	move(player, deltaTime);

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