function initializeDoor(pos, locks)
{
	return {
		type:'Door',
		position:pos,
		locks:locks,
		height:6,
		width:4,
	};
}

function drawLocks(door, context)
{
	var lockWidth = 0.8;
	var lockHeight = 1.0;
	var topOffset = -lockHeight-.1;
	var leftOffset = .1;
	context.save();
	for(var i=0; i < door.locks; i++)
	{

		context.beginPath();
		context.strokeStyle="#000";
		context.fillStyle="#777";
		context.rect(
			(door.position[0]+leftOffset)*Game.MetersToPixels,
			(door.position[1]+door.height+topOffset)*Game.MetersToPixels,
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
			(door.position[0]+leftOffset+(lockWidth/4))*Game.MetersToPixels,
			(door.position[1]+door.height+topOffset+(lockHeight/4))*Game.MetersToPixels,
			lockWidth/2*Game.MetersToPixels,
			lockHeight/2*Game.MetersToPixels
		);
		context.fill();
		context.rect(
			(door.position[0]+leftOffset+(lockWidth/3))*Game.MetersToPixels,
			(door.position[1]+door.height+topOffset+.1)*Game.MetersToPixels,
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
}

function drawDoor(door, context)
{
	context.save();
	context.beginPath();
	context.strokeStyle="#AAA";
	context.fillStyle="#AAA";
	context.rect(
		(door.position[0])*Game.MetersToPixels,
		(door.position[1])*Game.MetersToPixels,
		door.width*Game.MetersToPixels,
		door.height*Game.MetersToPixels);
	context.fill();
	context.closePath();

	for(var i =0; i < door.width; i+= .75)
	{
		context.beginPath();
		context.strokeStyle="#000";
		context.fillStyle="#777";
		context.rect(
			(door.position[0]+i)*Game.MetersToPixels,
			(door.position[1])*Game.MetersToPixels,
			0.25*Game.MetersToPixels,
			(door.height)*Game.MetersToPixels);
		context.fill();
		context.stroke();
		context.closePath();


	}

	for(var i =0; i < door.height; i+= 1.5)
	{
		context.beginPath();
		context.strokeStyle="#000";
		context.fillStyle="#777";
		context.rect(
			(door.position[0])*Game.MetersToPixels,
			(door.position[1]+i)*Game.MetersToPixels,
			door.width*Game.MetersToPixels,
			0.25*Game.MetersToPixels);
		context.fill();
		context.stroke();
		context.closePath();

	}

	context.beginPath();
	context.strokeStyle="#000";
	context.fillStyle="#777";
	context.rect(
		(door.position[0])*Game.MetersToPixels,
		(door.position[1]+door.height)*Game.MetersToPixels,
		door.width*Game.MetersToPixels,
		0.25*Game.MetersToPixels);
	context.fill();
	context.stroke();
	context.closePath();
	context.restore();
	drawLocks(door, context);
}