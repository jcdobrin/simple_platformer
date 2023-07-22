function RGB2HexColor(rgba)
{
	var hex =
		parseInt(rgba[0] * 255).toString(16).padStart(2,'0')+
		parseInt(rgba[1] * 255).toString(16).padStart(2,'0')+
		parseInt(rgba[2] * 255).toString(16).padStart(2,'0')
	;

	hex = '#'+hex;
	return hex

}

function renderFadeCanvas(alpha, context)
{
	Game.context.globalAlpha = alpha;
	Game.context.save();
	Game.context.beginPath();
	Game.context.fillStyle='#000';
	Game.context.rect(0,0, Game.width, Game.height);
	Game.context.fill();
	Game.context.closePath();
	Game.context.restore();
	Game.context.globalAlpha  = 1;
}

function drawSimpleSquare(pos, dim, context, offset)
{
	var x = pos[0] + offset[0];
	var y = pos[1] + offset[1];


	context.beginPath();
	context.rect(
		x*Game.MetersToPixels,
		y*Game.MetersToPixels,
		dim[0]*Game.MetersToPixels,
		dim[1]*Game.MetersToPixels);

	context.fill();
	//context.stroke();
	context.closePath();
}

function drawSquare(l,r,w,h, context)
{
	context.rect(
		l*Game.MetersToPixels,
		r*Game.MetersToPixels,
		w*Game.MetersToPixels,
		h*Game.MetersToPixels);
}


function lineFromPoints(context, p, scale)
{
	if(scale == undefined)
		scale = 1;
	context.moveTo(p[0][0]*scale, p[0][1]*scale);
	for(var i =1; i< p.length; i++)
	{
		context.lineTo(p[i][0]*scale, p[i][1]*scale);
	}
	context.stroke();
}

function createLineFromPoints(context, p0,p1)
{
	return [
		[p0[0], p0[1]],
		[p1[0], p1[1]],
	];
}

function renderEntity(entity, context)
{
	if(entity.alive || typeof entity.alive == 'undefined')
	{
		var pos_buff = [entity.position[0], entity.position[1]];
		var translate = add([50,25], multiply(Game.player.position, -1));
		translate = [0,0];
		if(Game.player.position[1] < 25)
		{
			translate[1] = 0;
		}
		entity.position = add(translate, entity.position);
		if(entity.pieces)
		{
			for(var pieceIndex in entity.pieces)
			{
				var piece = entity.pieces[pieceIndex];
				var rgba = getRenderColor(piece.color);
				context.strokeStyle=RGB2HexColor(rgba);
				context.fillStyle=RGB2HexColor(rgba);
				context.globalAlpha = rgba[3];

				drawSimpleSquare(entity.position, piece.dimension, context, piece.offset);
			}
		}


		entity.position = pos_buff;
	}
}