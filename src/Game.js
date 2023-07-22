var Game = {};
var gl = false;
var DEBUG = true;


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
	if(Game.context)
	{
		Game.GL_ENABLED = true;
		Game.ItemBuffer = gl.createBuffer();

		Game.FadeBuffer = gl.createBuffer();


		initOpenGL();
		Game.camera.tileBackgroundX = 258.5;
		Game.camera.tileBackgroundY = 142;

		Game.fb = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, Game.fb);
		Game.texture = gl.createTexture();
  		gl.bindTexture(gl.TEXTURE_2D, Game.texture);
		gl.texImage2D(
						gl.TEXTURE_2D, //GLenum target,
						0,//GLint level,
						gl.RGBA,//GLint internalFormat,
						Game.canvas.width/2,//GLsizei width,
						Game.canvas.height/2,//GLsizei height,
						0,//GLint border,
						gl.RGBA,//GLenum format,
						gl.UNSIGNED_BYTE,//GLenum type,
						null //const GLvoid * data
					);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, Game.texture, 0);
		Game.canvas.setAttribute('style', 'width:'+Game.canvas.width+'px;height:'+Game.canvas.height+';px');


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


	//Game.FadeOut = true;
	//Game.FadeTime = .1;
	initializeLevel(Game, Game.CurrentLevel);

	initInputs();

	Game.lastTime = performance.now();//Date.now();
}

function EndGame() {
	StopAudioMusic();
	var div = document.createElement('div');
	div.id = 'end';
	div.innerHTML = '<center><BR><BR>Thanks For Playing.<BR>This game is currently under development.<BR> Subscribe to Wrong Prize Games to follow it\'s progress.<BR>Completion Time: '+(Game.time/1000)+'<center>';
	div.setAttribute('style','z-index:100;position:absolute;top:0px;width:100%;height:100%;background-color:#DDD;');
	document.body.appendChild(div);
}

function resetGame()
{
	initializeLevel(Game, Game.CurrentLevel);
}

function renderFade(alpha, context)
{
	if(Game.GL_ENABLED)
	{
		renderFadeOpenGl(alpha, context);
	}
	else
	{
		renderFadeCanvas(alpha, context);
	}
}

function draw()
{
	BEGIN_TIMED_FUNCTION();
	if(Game.GL_ENABLED)
	{
		drawGL();
	}
	else
	{
		drawCanvas();
	}
	END_TIMED_FUNCTION();
}

function drawCanvas()
{
	Game.context.save();
	//clear all contents
	Game.context.clearRect(0,0,Game.width, Game.height);

	Game.context.translate(0, Game.height);

	Game.context.scale(1, -1);

	for(var entityIndex=0; entityIndex < Game.entities.length; entityIndex++)
	{
		renderEntity(Game.entities[entityIndex], Game.context);
	}

	Game.context.restore();
}


function drawGL()
{

	var gl = Game.context;
	gl.bindFramebuffer(gl.FRAMEBUFFER, Game.fb);
	gl.clearColor(
		Game.BackgroundRGBA[0],
		Game.BackgroundRGBA[1],
		Game.BackgroundRGBA[2],
		Game.BackgroundRGBA[3]
	);
	Game.program = Game.programBase;
	gl.useProgram(Game.program);
	gl.viewport(0, 0, Game.canvas.width/2, Game.canvas.height/2);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	var buffer = [];
	for(var entityIndex=0; entityIndex < Game.entities.length; entityIndex++)
	{
		//renderEntityOpenGL(Game.entities[entityIndex], Game.context);
		bufferEntityOpenGL(Game.entities[entityIndex], buffer);
		console.assert(buffer.length % 9 === 0);
	}
	gl.enable(gl.BLEND);

	var backup  = [Game.camera.translate[0], Game.camera.translate[1]];
//	for(var j =0;j<0;j++)
//	{
//		for(var i =-1;i<1;i++)
//		{
			Game.camera.translate[0] = backup[0] + (0 * Game.camera.tileBackgroundX);
			Game.camera.translate[1] = backup[1] + (0 * Game.camera.tileBackgroundY);
			OpenGlBufferRenderPreBind(Game.BackgroundBuffer, Game.BackgroundBuffer.numItems, gl.TRIANGLES);
//		}
//	}

	Game.camera.translate = backup;
	OpenGlBufferRenderRaw(buffer, Game.ItemBuffer, buffer.length/9, gl.TRIANGLE_STRIP);


	gl.disable(gl.BLEND);
	if(Game.debug)
	{
		for(var entityIndex=0; entityIndex < Game.entities.length; entityIndex++)
		{
		//	renderEntityDebugOpenGL(Game.entities[entityIndex], Game.context);
		}
	}

	Game.program = Game.programUV;
	gl.viewport(0, 0, Game.canvas.width, Game.canvas.height);
	gl.useProgram(Game.programUV);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	var verts = OpenGLSquare([0,0], Game.canvas.width * Game.PixelsToMeters, Game.canvas.height * Game.PixelsToMeters);
	var color = [1.0,0.0,0.0,1.0];
	var uv = [  1.0,0.0,
				0.0,0.0,
				1.0,1.0,
				0.0,1.0];
	var buffer = [];
	for(var i =0;i<verts.length;i+=2)
	{
		buffer = buffer.concat(verts[i], verts[i+1], uv[i], uv[i+1], color, [Game.camera.translate[0]*-1, Game.camera.translate[1]*-1, 1]);
	}

	gl.disable(gl.BLEND);
	gl.bindTexture(gl.TEXTURE_2D, Game.texture);
	OpenGlBufferRenderRawUV(buffer, Game.FadeBuffer, 4, gl.TRIANGLE_STRIP);
	gl.enable(gl.BLEND);

	gl.bindTexture(gl.TEXTURE_2D, null);
	Game.program = Game.programBase;
}

function GameLoop()
{

	Game.debug_events = [];

	Game.currentTime = performance.now();//Date.now();
	Game.deltaTime = (Game.currentTime - Game.lastTime) * Game.debugRunningSpeed;
	BEGIN_TIMED_FUNCTION();

	if(Game.paused)
	{
		Game.lastTime = Game.currentTime;
		requestAnimationFrame(GameLoop);
		return;
	}

	if(Game.CurrentLevel >= Levels.length) {
		EndGame();
		return;
	}
	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
	gp = gamepads[0];
	if(gp)
	{
		if(gp.buttons[2].pressed)
		{
			Inputs.jump = true;
		}
		else
		{
			Inputs.jump = false;
		}

		if(gp.buttons[14].pressed)
		{
			Inputs.back = true;
			Inputs.amount = 1;
		}
		else
		{
			Inputs.back = false;
		}

		if(gp.buttons[15].pressed)
		{
			Inputs.forward = true;
			Inputs.amount = 1;
		}
		else
		{
			Inputs.forward = false;
		}
		if( gp.axes[0] > .5)
		{
			Inputs.forward = true;
			Inputs.amount = (gp.axes[0]*2)-1;
		}

		if( gp.axes[0] < -.5)
		{
			Inputs.back = true;
			Inputs.amount = -1*((gp.axes[0]*2)+1);
		}
	}


	if(Game.deltaTime > 34)
	{
		//console.log('Timestep to big');
		//Game.lastTime = Game.currentTime;
		//do nothing, too big of a time step
		//requestAnimationFrame(GameLoop);
		//return;
		Game.deltaTime = 34;
	}

	if(Game.FadeOut)
	{
		Game.FadeTime -= Game.deltaTime/1000;
		var alpha = 1.0 - Game.FadeTime / Game.MaxFadeTime;

		draw();
		renderFade(alpha, Game.context);

		if(Game.FadeTime <=0)
		{
			Game.LevelComplete = true;
			Game.FadeOut =false;
		}
	}
	else if(Game.LevelComplete)
	{
		if(Game.IncrementLevel)
		{
			Game.IncrementLevel = false;
			Game.CurrentLevel++;
		}
		initializeLevel(Game, Game.CurrentLevel);
		Game.FadeIn = true;
		Game.FadeTime = Game.MaxFadeTime;
		Game.LevelComplete = false;
	}
	else if(Game.FadeIn)
	{
		Game.FadeTime -= Game.deltaTime/1000;
		var alpha = Game.FadeTime / Game.MaxFadeTime;

		draw();
		renderFade(alpha, Game.context);

		if(Game.FadeTime <=0.1)
		{
			Game.FadeIn = false;
		}
	}
	else
	{
		handleInputs();
		calculateRenderCycle();
		moveAndUpdate(Game);
		draw();
		Game.time += Game.deltaTime;
		Game.timerSpan.innerHTML = parseInt(Game.time/10)/100;
	}
	END_TIMED_FUNCTION();

	DrawDebugEvents();
	Game.lastTime = Game.currentTime;
	Game.roomSpan.innerHTML = (Game.CurrentLevel+1);

	PlayQueue();

	requestAnimationFrame(GameLoop);
}

function setPaused()
{
	 if(Game.paused) {
	 	Game.paused = false;
		StartAudioMusic();
	 } else {
	 	Game.paused = true;
	 	StopAudioMusic();
	 }
}

function setLevel(level)
{
	Game.CurrentLevel = level;
	initializeLevel(Game, Game.CurrentLevel);
}

function DEBUGGER(type, name)
{
	Game.debug_events.push({
		name:name,
		time:performance.now(),
		type:type,
	});
}



if(DEBUG)
{

	function DrawDebugEvents()
	{
		var timed_events = {};
		var stack = [];
		for(var i =0; i < Game.debug_events.length; i++)
		{
			if(Game.debug_events[i].type == 'BEGIN_BLOCK')
			{
				stack.push(Game.debug_events[i]);
			}
			else if(Game.debug_events[i].type == 'END_BLOCK')
			{
				var d = stack.pop();
				if(timed_events[d.name] == undefined)
					timed_events[d.name] = {time:0, count:0};
				timed_events[d.name].time += Game.debug_events[i].time - d.time;
				timed_events[d.name].count++;
			}
		}
		Game.debugSpan.innerHTML = 'DEBUGGER:<BR>';
		for(var eventName in timed_events)
		{
			Game.debugSpan.innerHTML = eventName+': ('+timed_events[eventName].count+') :'+timed_events[eventName].time.toFixed(4)+'<BR>'+Game.debugSpan.innerHTML ;
		}
	}

	function BEGIN_TIMED_FUNCTION()
	{
		DEBUGGER('BEGIN_BLOCK', BEGIN_TIMED_FUNCTION.caller.name);
	}

	function END_TIMED_FUNCTION()
	{
		DEBUGGER('END_BLOCK', END_TIMED_FUNCTION.caller.name);
	}

	function BEGIN_TIMED_BLOCK(block)
	{
		DEBUGGER('BEGIN_BLOCK', block);
	}
	function END_TIMED_BLOCK(block)
	{
		DEBUGGER('END_BLOCK', block);
	}
}
else {
	function DrawDebugEvents(){Game.debugSpan.setAttribute('style','display:none;')}
	function BEGIN_TIMED_FUNCTION(){}
	function END_TIMED_FUNCTION(){}
	function BEGIN_TIMED_BLOCK(block){}
	function END_TIMED_BLOCK(block){}
}
