function getNextNodeIndex(path)
{
	var nodeIndex = path.current_node;
	if(path.speed > 0)
	{
		if(path.current_node+1 == path.nodes.length )
		{
			if(path.loop)
			{
				nodeIndex = 0;
			}
			else
			{
				nodeIndex = path.current_node-1;
			}
		}
		else
		{
			nodeIndex = path.current_node+1;
		}
	}
	else
	{
		if(path.current_node-1 < 0)
		{
			if(path.loop)
			{
				nodeIndex = path.nodes.length-1;
			}
			else
			{
				nodeIndex = path.current_node+1;
			}
		}
		else
		{
			nodeIndex = path.current_node-1;
		}
	}

	return nodeIndex;
}

function getNextNode(path)
{
	return path.nodes[getNextNodeIndex(path)];
}

function initializeNullEntity(entity)
{
	return {
		type : 'None',
		position : [0,0],
	};
}

function initializePath(path)
{
	path.type='Path';
	path.current_node = 0;
	path.speed = (path.speed || 1);

	path.start_position = path.nodes[path.current_node].position,
	path.position       = [path.start_position[0], path.start_position[1]];
	var next = getNextNodeIndex(path);
	path.end_position   = getNextNode(path).position;
	path.loop = path.loop || false;

	return path;
}

function initializeSquare(pos, width, height, type, id)
{
	return {
		type : type,
		position : pos,
		width : width,
		height : height,
		cycle : 1,
		maxCycle: 1,
		inc : -1,
		id : (id || 0),
	};
}

function initializeFireWheel(fireWheel)
{
	var size = fireWheel.size||1;
	var offset = (fireWheel.offset || 0);
	var entity = {
		type : 'Rotate',
		position:add(fireWheel.position, [.5,.5]),
		length:(fireWheel.length || 2),
		angle :(fireWheel.angle  || 0),
		speed :(fireWheel.speed  || 0),

	};

	for(var i = 1; i < fireWheel.length; i++)
	{
		var piece = addRenderPiece(entity, 'Kill', [size,size]);
		var volume = addCollisionVolume(entity, size, size, COLLISION.KILL);

		piece.distanceFromOrigin = size*i+offset;
		volume.distanceFromOrigin = size*i+offset;

	}

	return entity;

	return {
		type : 'FireWheel',
		position:fireWheel.position,
		length:(fireWheel.length || 2),
		angle :(fireWheel.angle  || 0),
		speed :(fireWheel.speed  || 0),
		offset:(fireWheel.offset || 0),
	};
}

function initializeSpring(spring)
{
	return {
		type:'Spring',
		position:spring.position,
		width:5,
		height:1,
	};
}

function drawSquare(l,r,w,h, context)
{
	context.rect(
		l*Game.MetersToPixels,
		r*Game.MetersToPixels,
		w*Game.MetersToPixels,
		h*Game.MetersToPixels);
}

function drawSpring(spring, context)
{
	context.save();

	context.beginPath();
	context.strokeStyle="#AAA";
	context.fillStyle="#0F0";
	context.lineWidth=2;



	drawSquare(spring.position[0]+spring.width/4,
				spring.position[1],
				spring.width/2,
				spring.height,
				context);
	context.fill();

	context.stroke();
	context.closePath();
	context.beginPath();
	drawSquare(spring.position[0],
				spring.position[1]+spring.height-0.5,
				spring.width,
				spring.height,
				context);
	context.fill();
	context.stroke();

	context.closePath();
	context.restore();
}

function drawFloor(floor, context)
{
	context.save();
	context.beginPath();
	context.strokeStyle="#AAA";
	context.fillStyle="#AAA";
	drawSimpleSquare(floor, context);
	context.fill();
	context.closePath();
	context.restore();
}

function drawLava(floor, context)
{
	floor.cycle += floor.inc * Game.deltaTime/1000;
	if(floor.cycle < 0 && floor.inc < 0)
	{
		floor.cycle = 0;
		floor.inc = 1;
	}

	if(floor.cycle > floor.maxCycle && floor.inc > 0)
	{
		floor.cycle = floor.maxCycle;
		floor.inc = -1;
	}

	var color = 96 - parseInt(96 * floor.cycle/floor.maxCycle);
	context.save();
	context.beginPath();

	context.strokeStyle="#FF"+color.toString(16).padStart(2, '0')+"00";
	context.fillStyle="#FF"+color.toString(16).padStart(2, '0')+"00";
	drawSimpleSquare(floor, context);
	context.fill();
	context.closePath();
	context.restore();
}

function drawSlime(slime, context)
{
	context.save();
	context.beginPath();
	context.strokeStyle="#0C0";
	context.fillStyle="#0C0";
	drawSimpleSquare(slime, context);
	context.globalAlpha = 0.75;
	context.fill();
	context.stroke();
	context.closePath();
	context.globalAlpha = 1.0;
	context.restore();
}

function drawFireWheel(fireWheel, context)
{
	context.save();
	context.beginPath();
	context.strokeStyle="#333";
	context.fillStyle="#333";
	drawSquare(fireWheel.position[0],fireWheel.position[1],1,1, context);
	context.fill();
	context.closePath();


	context.beginPath();
	context.strokeStyle="#FFAA00";
	context.fillStyle="#FFAA00";
	var x = Math.sin(fireWheel.angle);
	var y = Math.cos(fireWheel.angle);

	for(var i =1; i < fireWheel.length; i++)
	{
		drawSquare((fireWheel.position[0]+x*i),(fireWheel.position[1]+y*i),1,1, context);
		context.fill();
	}
	context.closePath();
	context.restore();
}