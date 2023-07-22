function initializeKey(pos)
{
	return {
		type:'Key',
		position:pos,
		width:0.5,
		height:0.5,
		alive:1,
	}
}

function drawKey(key, context)
{
	if(key.alive)
	{
		context.save();

		context.strokeStyle="#777";
		context.fillStyle="#777";

		context.beginPath();
		context.rect(
			(key.position[0]+key.width*1.9)*Game.MetersToPixels,
			(key.position[1]+key.height-key.height/4)*Game.MetersToPixels,
			.1*Game.MetersToPixels,
			-key.height*Game.MetersToPixels
		);

		context.rect(
			(key.position[0]+key.width*1.5)*Game.MetersToPixels,
			(key.position[1]+key.height-key.height/4)*Game.MetersToPixels,
			.1*Game.MetersToPixels,
			-key.height*Game.MetersToPixels
		);
		context.fill();
		//context.stroke();
		context.closePath();

		context.beginPath();
		context.rect(
			key.position[0]*Game.MetersToPixels,
			(key.position[1]+key.height/4)*Game.MetersToPixels,
			key.width*2*Game.MetersToPixels,
			key.height/2*Game.MetersToPixels
		);
		context.fill();
		//context.stroke();
		context.closePath();

		context.beginPath();

		context.fillStyle="#000";
		context.rect(
			key.position[0]*Game.MetersToPixels,
			key.position[1]*Game.MetersToPixels,
			key.width*Game.MetersToPixels,
			key.height*Game.MetersToPixels
		);
		context.fill();
		context.stroke();
		context.stroke();
		context.stroke();

		context.closePath();

		context.restore();
	}
}