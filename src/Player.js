
function initializePlayer(pos)
{
	return {
		type : 'Player',
		position : pos,
		velocity : [0,0],
		speed    : [0,0],
		rotation : 0 * Math.PI / 180,
		radius   : .6,
		jump     : 0,
		keys     : 0,
		trail    : [],
		trailTime : 0.1,
		//isDead   : false,
		//state : RocketStates.alive,
	}
}

function getPlayerRay(player)
{
	var ray = [[player.position[0]+player.radius, player.position[1]+player.radius/2]];
	if(player.velocity[0] > 0)
	{
		ray[1] = [ray[0][0] + player.radius+(3*Game.PixelsToMeters), ray[0][1]];
	}
	else
	{
		ray[1] = ray[0];
		ray[0] = [ray[1][0] - player.radius-(3*Game.PixelsToMeters), ray[1][1]];
	}
	return ray;
}

function drawPlayer(player, context)
{
	context.save();
	context.strokeStyle="#0000FF";
	context.fillStyle="#0000FF";

	for(var trailIndex = 0; trailIndex < player.trail.length; trailIndex++)
	{
		var position = player.trail[trailIndex];
		context.globalAlpha = trailIndex/player.trail.length;
		context.beginPath();
		context.rect(position[0] * Game.MetersToPixels,
					 position[1] * Game.MetersToPixels,
					(player.radius+player.radius) * Game.MetersToPixels,
					(player.radius+player.radius) * Game.MetersToPixels
					);
		context.stroke();
		context.fill();
		context.closePath();
	}
	context.globalAlpha = 1.0;
	context.beginPath();
	/*context.arc((player.position[0]+player.radius) * Game.MetersToPixels,
				(player.position[1]+player.radius) * Game.MetersToPixels,
				player.radius * Game.MetersToPixels,
				0,
				2*Math.PI);
	*/

	context.rect(player.position[0] * Game.MetersToPixels,
				player.position[1] * Game.MetersToPixels,
				(player.radius+player.radius) * Game.MetersToPixels,
				(player.radius+player.radius) * Game.MetersToPixels
				);
	context.stroke();
	context.fill();
	context.closePath();
/*
	context.beginPath();
		context.strokeStyle="#FF0000";
		lineFromPoints(context, getPlayerRay(player), Game.MetersToPixels);
	context.closePath();


	var playerPos = [player.position[0], player.position[1]];
	var playerDia = player.radius*2;
	context.beginPath();
		context.strokeStyle="#FF0000";
		context.rect(playerPos[0]*Game.MetersToPixels, playerPos[1]*Game.MetersToPixels, (playerDia-0)*Game.MetersToPixels, (playerDia-.2)*Game.MetersToPixels);
		context.stroke();
	context.closePath();

	context.beginPath();
		context.strokeStyle="#00FF00";
		context.rect(
			playerPos[0]*Game.MetersToPixels,
			(playerPos[1]+playerDia-.2)*Game.MetersToPixels,
			(playerDia-0)*Game.MetersToPixels,
			(.2)*Game.MetersToPixels);
		context.stroke();
	context.closePath();

*/
	context.restore();
}

function jumpVel(height, time)
{
	var velocity = (2 * height) / time;
	return velocity;
}

function jumpGravity(height, time)
{
	var gravity = -2 * height / (time*time);
	return gravity;
}

function jumpHeight(gravity, time)
{

	var height = gravity*(time*time) / -2;
	return height;
}


