Game.renderCycle = 1;
Game.renderIncrement = 1;
Game.renderMaxCycle = 1;

const RENDER_EFFECTS = {
	TRAIL:1<<1,
	VELOCITY_TRAIL:1<<2,
}

function getRenderCycle()
{
	return Game.renderCycle/Game.renderMaxCycle;
}

function calculateRenderCycle()
{
	SetCamera();
	Game.renderCycle += Game.renderIncrement * Game.deltaTime/1000;
	if(Game.renderCycle <= 0 || Game.renderCycle >= Game.renderMaxCycle) {
		if(Game.renderCycle >= Game.renderMaxCycle)
		{
			Game.renderCycle = Game.renderMaxCycle - (Game.renderCycle-Game.renderMaxCycle);
		}
		else
		{
			Game.renderCycle *= -1;
		}
		Game.renderIncrement *= -1;
	}
}

function getRenderColor(piece)
{
	switch(piece)
	{
		case 'Player' : {return [0.0, 0.0, 1.0, 1.0];}break;
		case 'Door'   : {return [0.3,0.05,0.05, 1.0];}break;
		case 'Lock'   : {return [0.3, 0.3, 0.3, 1.0];}break;
		case 'Hole'   : {return [0.0, 0.0, 0.0, 1.0];}break;
		case 'Ice'    : {return [0.0, 0.7, 1.0,0.75];}break;
		case 'Slime'  : {return [0.0 ,1.0, 0.0, 0.5];}break;
		case 'Spring' : {return [0.0, 0.7, 0.0,0.75];}break;
		case 'HSpring': {return [0.0, 1.0, 1.0, 1.0];}break;
		case 'FireWheel' :
		case 'Lava'   :
		case 'Kill'   : {return [1.0, (.5 - parseFloat(.5 * getRenderCycle())), 0.0, 1.0];}break;
		case 'Shoot'  : {return [1.0, 1.0, 1.0, 1.0];}break;
		case 'Key'    : {return [1.0, 1.0, 1.0, 1.0];}break;
		case 'BG'     : {var ran = Math.random(); return [0.1 *ran+.01, 0.1*ran+.01, 0.1*ran+.01, 1.0];}break;

		case 'Ground' :
		default       :{return [0.5, 0.5, 0.5, 1.0];}break;

	}
}

function addRenderPiece(entity, piece_type, dimension, offset)
{
	if(typeof entity.pieces == 'undefined')
		entity.pieces = [];

	if(!offset)
		offset = [0,0];
	var piece = {
		buffer     : null,
		color      : piece_type,
		dimension  : dimension,
		offset     : offset,
	};

	if(Game.GL_ENABLED)
	{
		//createPieceBuffer(piece);
	}

	entity.pieces.push(piece);
	return piece;
}

function addVertsRenderPiece(entity, piece_type, verts, offset)
{
	if(typeof entity.pieces == 'undefined')
		entity.pieces = [];

	if(!offset)
		offset = [0,0];
	var piece = {
		buffer     : null,
		color      : piece_type,
		dimension  : [0,0],
		offset     : offset,
	};

	if(Game.GL_ENABLED)
	{
		piece.buffer = createVertexBuffer(verts, 2);
	}

	entity.pieces.push(piece);
	return piece;
}

function addRenderEffect(piece, effect)
{
	piece.effects |= effect;

	if(effect & (RENDER_EFFECTS.TRAIL | RENDER_EFFECTS.VELOCITY_TRAIL))
	{
		piece.trail = [];
		piece.trailTime = 1/60;
	}
}