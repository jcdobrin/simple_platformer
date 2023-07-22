target_verts = [
	-1,0,
	1,0,
	0,1,
	0,-1,

];
target_buffer = false;



const BUILDER_EDIT_TYPE = {
	NONE       :0,
	MOVE       :1<<1,
	SIZE_LEFT  :1<<2,
	SIZE_RIGHT :1<<3,
	SIZE_UP    :1<<4,
	SIZE_DOWN  :1<<5,
};

Builder = {
	edit_type : BUILDER_EDIT_TYPE.NONE,
	MouseScreenP:[0,0],
	MouseP:[0,0],
	LastMouseP:[0,0],
	MouseDiff:[0,0],
};
Levels[0] = {};

Game.entities = [];

function selectEntity(x,y)
{
	Game.selectedEntity
}

function initGame() {


	Game.MaxFadeTime = 0.25;
	Game.width = document.getElementById('body').clientWidth;
	Game.height = document.getElementById('body').clientHeight;
	Game.timerSpan =  document.getElementById('timer');
	Game.keySpan =  document.getElementById('keys');
	Game.roomSpan =  document.getElementById('room');
	Game.debugSpan = document.getElementById('debug');
	Game.time = 0;
	Game.gravity = 9.8;
	Game.lastTime = performance.now();
	Game.paused = false;
	Game.started = false;
	Game.BackgroundRGBA = [0.0, 0.0, 0.0, 1.0];

	var calHeight = Game.width * 9 / 16;
	if(calHeight > Game.height)
	{
		Game.width = Game.height * 16 / 9
	}
	else
	{
		Game.height = calHeight;
	}

	Game.entities = [];

	Game.MetersToPixels = Game.width/100;
	Game.PixelsToMeters = 1/Game.MetersToPixels;

	Game.timerSpan.parentNode.setAttribute('style','z-index:10;position:absolute;color:#FFF;top:'+(1.5*Game.MetersToPixels)+'px;font-size:'+(2*Game.MetersToPixels)+'px');
	Game.keySpan.parentNode.setAttribute('style','z-index:10;position:absolute;color:#FFF;top:'+(1.5*Game.MetersToPixels)+'px;font-size:'+(2*Game.MetersToPixels)+'px;left:'+(30.5*Game.MetersToPixels)+'px;');
	Game.roomSpan.parentNode.setAttribute('style','z-index:10;position:absolute;color:#FFF;top:'+(1.5*Game.MetersToPixels)+'px;font-size:'+(2*Game.MetersToPixels)+'px;left:'+(80.5*Game.MetersToPixels)+'px;');

	Game.deltaTime = 0;

	Game.CurrentLevel = 0;

	Game.debugRunningSpeed=1;
	Game.debug = DEBUG;


	Game.canvas = document.getElementById("canvas");
	Game.canvas.setAttribute('width', Game.width);
	Game.canvas.setAttribute('height', Game.height);

	Game.context = canvas.getContext("experimental-webgl", {
		premultipliedAlpha: true,
		preserveDrawingBuffer: true});

	gl = Game.context;
	target_buffer = createVertexBuffer(target_verts, 2);
	if(Game.context)
	{
		Game.GL_ENABLED = true;
		initOpenGL();
	}
	else
	{
		var p = Game.canvas.parentNode;
		Game.canvas.parentNode.removeChild(Game.canvas);
		Game.canvas = document.createElement('canvas');
		Game.canvas.setAttribute('id', 'canvas');
		Game.canvas.setAttribute('width', Game.width);
		Game.canvas.setAttribute('height', Game.height)
		Game.canvas.setAttribute('style', 'background-color:'+RGB2HexColor(Game.BackgroundRGBA)+';');
		p.appendChild(Game.canvas);
		Game.context = Game.canvas.getContext("2d");
		Game.GL_ENABLED = false;
	}

	initInputs();
}

Builder.camera ={position : [0,0]};
Builder.activePiece = false;
Builder.activeVolume = false;

function Builder_SizeRightSelect(entity, piece, MouseP)
{
	var pos = add(entity.position,piece.offset);
	pos[0] += piece.dimension[0] - 1;

	var dim = [2, piece.dimension[1]];
	return PointInsideBox(pos, dim, MouseP);
}

function Builder_SizeLeftSelect(entity, piece, MouseP)
{
	var pos = add(entity.position,piece.offset);
	pos[0] -= 1;

	var dim = [2, piece.dimension[1]];
	return PointInsideBox(pos, dim, MouseP);
}

function Builder_SizeUpSelect(entity, piece, MouseP)
{
	var pos = add(entity.position,piece.offset);
	pos[1] += piece.dimension[1] - 0.5;

	var dim = [piece.dimension[0], 1];
	return PointInsideBox(pos, dim, MouseP);
}

function Builder_SizeDownSelect(entity, piece, MouseP)
{
	var pos = add(entity.position,piece.offset);
	pos[1] -= 0.5;

	var dim = [piece.dimension[0], 1];
	return PointInsideBox(pos, dim, MouseP);
}



//handle gamera controls
GamePlay_SetCamera = SetCamera;
function Builder_SetCamera()
{
	Game.camera.translate = Builder.camera.position;
}


GamePlay_renderEntityOpenGL = renderEntityOpenGL;
function Builder_renderEntityOpenGL(entity, context)
{
	GamePlay_renderEntityOpenGL(entity, context);
	OpenGlBufferRender(target_buffer, [1,1,1,1], add(Game.camera.translate, entity.position), gl.LINES);
}

function drawGL()
{
	var gl = Game.context;
	gl.clearColor(
		Game.BackgroundRGBA[0],
		Game.BackgroundRGBA[1],
		Game.BackgroundRGBA[2],
		Game.BackgroundRGBA[3]
	);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	for(var i in Game.entities)
	{
		renderEntityOpenGL(Game.entities[i], Game.context);

	}

	if(Game.debug)
	{
		for(var i in Game.entities)
		{
			renderEntityDebugOpenGL(Game.entities[i], Game.context);
		}
	}

	IncrementalMouse(Builder.MouseScreenP[0], Builder.MouseScreenP[1]);
	OpenGlBufferRender(target_buffer, [1,1,0,1], add(Game.camera.translate, Builder.MouseP) , gl.LINES);
}


GamePlay_handleInputs = handleInputs;
function Builder_handleInputs()
{
	if(Inputs.forward)
		Builder.camera.position[0]-=Game.deltaTime/1000 * 10;
	if(Inputs.back)
		Builder.camera.position[0]+=Game.deltaTime/1000 * 10;


	if(Inputs.up)
		Builder.camera.position[1]-=Game.deltaTime/1000 * 10;
	if(Inputs.down)
	{
		Builder.camera.position[1]+=Game.deltaTime/1000 * 10;
	}

	if(Inputs.mousemove)
	{
		var event = Inputs.mousemove;
		Inputs.mousemove = false;

		var x = event.clientX / Game.canvas.width * 100;
		var y = (Game.canvas.height - event.clientY)/ Game.canvas.height * 56.5;
		Builder.MouseScreenP = [x,y];
		IncrementalMouse(x,y);

		if(Builder.edit_type & BUILDER_EDIT_TYPE.MOVE)
		{
			if(Builder.activePiece)
			{
				Builder.activePiece.offset = add(Builder.activePiece.offset, Builder.MousePDiff );
			}

			if(Builder.activeVolume)
			{
				Builder.activeVolume.offset = add(Builder.activeVolume.offset, Builder.MousePDiff);
			}
		}

		if(Builder.edit_type & BUILDER_EDIT_TYPE.SIZE_RIGHT)
		{
			if(Builder.activePiece)
			{
				Builder.activePiece.dimension[0] = add(Builder.activePiece.dimension, Builder.MousePDiff)[0];
				//createPieceBuffer(Builder.activePiece);
			}

			if(Builder.activeVolume)
			{
				Builder.activeVolume.dimension[0] = add(Builder.activeVolume.dimension, Builder.MousePDiff)[0];
				createCollisionVolumeBuffer(Builder.activeVolume);
			}
		}

		if(Builder.edit_type & BUILDER_EDIT_TYPE.SIZE_LEFT)
		{
			var diff = -Builder.MousePDiff[0];
			if(Builder.activePiece)
			{
				Builder.activePiece.dimension[0] +=diff;
				Builder.activePiece.offset[0] -= diff
				//createPieceBuffer(Builder.activePiece);
			}

			if(Builder.activeVolume)
			{

				Builder.activeVolume.dimension[0] +=diff;
				Builder.activeVolume.offset[0] -= diff
				createCollisionVolumeBuffer(Builder.activeVolume);
			}
		}

		if(Builder.edit_type & BUILDER_EDIT_TYPE.SIZE_UP)
		{
			if(Builder.activePiece)
			{
				Builder.activePiece.dimension[1] = add(Builder.activePiece.dimension, Builder.MousePDiff)[1];
				//createPieceBuffer(Builder.activePiece);
			}

			if(Builder.activeVolume)
			{
				Builder.activeVolume.dimension[1] = add(Builder.activeVolume.dimension, Builder.MousePDiff)[1];
				createCollisionVolumeBuffer(Builder.activeVolume);
			}
		}

		if(Builder.edit_type & BUILDER_EDIT_TYPE.SIZE_DOWN)
		{
			var diff = -Builder.MousePDiff[1];
			if(Builder.activePiece)
			{
				Builder.activePiece.dimension[1] +=diff;
				Builder.activePiece.offset[1] -= diff
				//createPieceBuffer(Builder.activePiece);
			}

			if(Builder.activeVolume)
			{

				Builder.activeVolume.dimension[1] +=diff;
				Builder.activeVolume.offset[1] -= diff
				createCollisionVolumeBuffer(Builder.activeVolume);
			}
		}
	}

	if(Inputs.mousedown)
	{
		var event = Inputs.mousedown;
		Inputs.mousedown = false;

		var x = event.clientX / Game.canvas.width * 100;
		var y = (Game.canvas.height - event.clientY)/ Game.canvas.height * 56.5;
		Builder.MouseScreenP = [x,y];
		IncrementalMouse(x,y);

		if(event.shiftKey)
		{
			for(var i in Game.entities)
			{
				for(var j in (Game.entities[i].pieces))
				{
					if(PointInsideBox(add(Game.entities[i].position, Game.entities[i].pieces[j].offset), Game.entities[i].pieces[j].dimension, Builder.MouseP))
					{
						Game.entities[i].pieces.splice(j,1);
					}
				}

				for(var j in (Game.entities[i].volumes))
				{
					if(PointInsideBox(add(Game.entities[i].position,Game.entities[i].volumes[j].offset) , Game.entities[i].volumes[j].dimension, Builder.MouseP))
					{
						Game.entities[i].volumes.splice(j,1);
					}
				}
				if(!Game.entities[i].pieces.length && !Game.entities[i].volumes.length)
				{
					Game.entities.splice(i,1);
				}
			}
		}
		else
		{
			no_entity_found = true;
			Builder.activePiece = false;
			Builder.activeVolume = false;
			for(var i in Game.entities)
			{
				for(var j in (Game.entities[i].pieces))
				{
					if(Builder_SizeRightSelect(Game.entities[i], Game.entities[i].pieces[j], Builder.MouseP))
					{
						no_entity_found = false;
						Builder.activePiece = Game.entities[i].pieces[j];
						Builder.edit_type = BUILDER_EDIT_TYPE.SIZE_RIGHT;
						break;
					}

					if(Builder_SizeLeftSelect(Game.entities[i], Game.entities[i].pieces[j], Builder.MouseP))
					{
						no_entity_found = false;
						Builder.activePiece = Game.entities[i].pieces[j];
						Builder.edit_type = BUILDER_EDIT_TYPE.SIZE_LEFT;
						break;
					}

					if(Builder_SizeUpSelect(Game.entities[i], Game.entities[i].pieces[j], Builder.MouseP))
					{
						no_entity_found = false;
						Builder.activePiece = Game.entities[i].pieces[j];
						Builder.edit_type = BUILDER_EDIT_TYPE.SIZE_UP;
						break;
					}

					if(Builder_SizeDownSelect(Game.entities[i], Game.entities[i].pieces[j], Builder.MouseP))
					{
						no_entity_found = false;
						Builder.activePiece = Game.entities[i].pieces[j];
						Builder.edit_type = BUILDER_EDIT_TYPE.SIZE_DOWN;
						break;
					}
					if(PointInsideBox(add(Game.entities[i].position, Game.entities[i].pieces[j].offset), Game.entities[i].pieces[j].dimension, Builder.MouseP))
					{
						no_entity_found = false;
						Builder.activePiece = Game.entities[i].pieces[j];
						Builder.edit_type = BUILDER_EDIT_TYPE.MOVE;
						break;
					}
				}

				for(var j in (Game.entities[i].volumes))
				{
					if(Builder_SizeRightSelect(Game.entities[i], Game.entities[i].volumes[j], Builder.MouseP))
					{
						no_entity_found = false;
						Builder.activeVolume = Game.entities[i].volumes[j];
						Builder.edit_type = BUILDER_EDIT_TYPE.SIZE_RIGHT;
						break;
					}

					if(Builder_SizeLeftSelect(Game.entities[i], Game.entities[i].volumes[j], Builder.MouseP))
					{
						no_entity_found = false;
						Builder.activeVolume = Game.entities[i].volumes[j];
						Builder.edit_type = BUILDER_EDIT_TYPE.SIZE_LEFT;
						break;
					}

					if(Builder_SizeUpSelect(Game.entities[i], Game.entities[i].volumes[j], Builder.MouseP))
					{
						no_entity_found = false;
						Builder.activeVolume = Game.entities[i].volumes[j];
						Builder.edit_type = BUILDER_EDIT_TYPE.SIZE_UP;
						break;
					}

					if(Builder_SizeDownSelect(Game.entities[i], Game.entities[i].volumes[j], Builder.MouseP))
					{
						no_entity_found = false;
						Builder.activeVolume = Game.entities[i].volumes[j];
						Builder.edit_type = BUILDER_EDIT_TYPE.SIZE_DOWN;
						break;
					}
					if(PointInsideBox(add(Game.entities[i].position,Game.entities[i].volumes[j].offset) , Game.entities[i].volumes[j].dimension, Builder.MouseP))
					{
						no_entity_found = false;
						Builder.activeVolume = Game.entities[i].volumes[j];
						Builder.edit_type = BUILDER_EDIT_TYPE.MOVE;
						break;
					}
				}
			}

			if(no_entity_found)
			{
				var entity = {
					position:[
						RoundToForth(Builder.MouseP[0]),
						RoundToForth(Builder.MouseP[1])
					],
					width:1,
					height:1,
				};
				entity = initializeSquare(entity.position, entity.width, entity.height, 'Floor', entity.id);
				Builder.activePiece = addRenderPiece(entity, 'Floor', [entity.width, entity.height]);
				Builder.activeVolume = addCollisionVolume(entity, entity.width, entity.height, COLLISION.COLLIDES);
				Game.entities.push(entity);
			}
		}
	}

	if(Inputs.mouseup)
	{
		var event = Inputs.mouseup;
		Inputs.mouseup=false;
		Builder.edit_type = BUILDER_EDIT_TYPE.NONE;

		//Builder.activePiece.offset = RoundToForthArray(Builder.activePiece.offset);
		Builder.activePiece.dimension = RoundToForthArray(Builder.activePiece.dimension);

//		Builder.activeVolume.offset = RoundToForthArray(Builder.activeVolume.offset);
		Builder.activeVolume.dimension = RoundToForthArray(Builder.activeVolume.dimension);

		createCollisionVolumeBuffer(Builder.activeVolume);
		//createPieceBuffer(Builder.activePiece);
	}
}

function IncrementalMouse(x,y)
{
	Builder.LastMouseP = Builder.MouseP||[x,y];
	Builder.MouseP = multiply(subtract([x,y], Builder.camera.position) , (Game.camera.scale / 450));
	Builder.MousePDiff = subtract(Builder.MouseP, Builder.LastMouseP);
}

function RoundToForthArray(arr)
{
	var result = [];
	for(i in arr)
	{
		result[i] = RoundToForth(arr[i]);
	}

	return result;
}

function RoundToForth(number)
{
	return Math.floor(number) + ToForth(number);
}

function ToForth(decimal)
{

	var a = Math.abs(Math.round((decimal*100)%100));
	console.log(a, decimal);
	var mult = a < 0 ? -1 : 1;
	if(a <= 24)
		return 0.00;
	if(a <= 49)
		return mult*0.25;
	if(a <= 74)
		return mult*0.50;
	if(a <= 100)
		return mult*0.75;
}

handleInputs = Builder_handleInputs;
SetCamera = Builder_SetCamera;
renderEntityOpenGL = Builder_renderEntityOpenGL;
