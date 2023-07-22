function OpenGLSquare(pos, width, height)
{
	 return [
		pos[0]+width, pos[1],
		pos[0], pos[1],
		pos[0]+width, pos[1]+height,

		pos[0], pos[1]+height

	];
}

function OpenGLSquareTriangle(pos, width, height)
{
	 return [
		pos[0], pos[1],
		pos[0]+width, pos[1],
		pos[0]+width, pos[1]+height,


		pos[0], pos[1],
		pos[0], pos[1]+height,
		pos[0]+width, pos[1]+height,

	];
}

function OpenGLSquareLine(pos, width, height)
{
	 return [
		pos[0], pos[1],
		pos[0]+width, pos[1],
		pos[0]+width, pos[1]+height,
		pos[0], pos[1]+height

	];
}

function initOpenGL()
{
	gl.viewport(0, 0, Game.canvas.width, Game.canvas.height);
	gl.clearColor(0, 0, 0, 1);
	gl.clear((gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT));

	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
//	gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
	//gl.blendFunc(gl.DST_ALPHA, gl.SRC_ALPHA);

	//gl.depthFunc(gl.LEQUAL);
	gl.enable(gl.BLEND);

	gl.disable(gl.DEPTH_TEST);


	var v = document.getElementById("vertex").firstChild.nodeValue;
	var vs = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vs, v);
	gl.compileShader(vs);

	var f = document.getElementById("fragment").firstChild.nodeValue;
	var fs = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fs, f);
	gl.compileShader(fs);

	Game.programBase = gl.createProgram();
	Game.programBase.title = 'Base';
	gl.attachShader(Game.programBase, vs);
	gl.attachShader(Game.programBase, fs);
	gl.linkProgram(Game.programBase);

	if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
	console.log(gl.getShaderInfoLog(vs));

	if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
	console.log(gl.getShaderInfoLog(fs));

	if (!gl.getProgramParameter(Game.programBase, gl.LINK_STATUS))
	console.log(gl.getProgramInfoLog(Game.programBase));

	gl.useProgram(Game.programBase);


	v = document.getElementById("vertexUV").firstChild.nodeValue;
	vs = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vs, v);
	gl.compileShader(vs);

	f = document.getElementById("fragmentUV").firstChild.nodeValue;
	fs = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fs, f);
	gl.compileShader(fs);

	Game.programUV = gl.createProgram();
	Game.programUV.title = 'UV';
	gl.attachShader(Game.programUV, vs);
	gl.attachShader(Game.programUV, fs);
	gl.linkProgram(Game.programUV);

	if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
	console.log(gl.getShaderInfoLog(vs));

	if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
	console.log(gl.getShaderInfoLog(fs));

	if (!gl.getProgramParameter(Game.programUV, gl.LINK_STATUS))
	console.log(gl.getProgramInfoLog(Game.programUV));

	Game.program = Game.programBase;
}

function renderFadeOpenGl(alpha, context)
{
	var verts = OpenGLSquare([0,0], Game.width, Game.height);
	var color = [0.0,0.0,0.0,alpha];
	var buffer = [];
	for(var i =0;i<verts.length;i+=2)
	{
		buffer = buffer.concat(verts[i], verts[i+1],color, [Game.camera.translate[0]*-1, Game.camera.translate[1]*-1, 1]);
	}

	gl.enable(gl.BLEND);
	OpenGlBufferRenderRaw(buffer, Game.FadeBuffer, 4, gl.TRIANGLE_STRIP);
	gl.disable(gl.BLEND);
}

function createVertexBuffer(verts, itemSize)
{
	var vbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
	var vertices = new Float32Array(verts);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	return {
		vbuffer : vbuffer,
		itemSize : itemSize,
		numItems : verts.length/itemSize
	};
}

function createPieceBuffer(piece)
{
	var verts = OpenGLSquare([0,0], piece.dimension[0], piece.dimension[1]);
	piece.buffer = createVertexBuffer(verts, 2);
}

function createCollisionVolumeBuffer(volume)
{
	var verts = OpenGLSquareLine([0,0], volume.dimension[0], volume.dimension[1]);
	volume.buffer = createVertexBuffer(verts, 2);
}

function OpenGlBufferRenderTriangleStrip(buffer, color, position)
{
	OpenGlBufferRender(buffer, color, position, gl.TRIANGLE_STRIP);
}

function OpenGlBufferRenderTriangle(buffer, color, position)
{
	OpenGlBufferRender(buffer, color, position, gl.TRIANGLES);
}


function OpenGlBufferRenderLine(buffer, color, position)
{
	OpenGlBufferRender(buffer, color, position, gl.LINE_LOOP);
}

function OpenGlBufferRender(buffer, color, position, mode)
{
	var a = 16/Game.camera.scale;
	var b = 9/Game.camera.scale;

	var matrix =[
		 b, 0, 0, 0,
		 0, a, 0, 0,
		 0, 0, 1, 0,
		-1,-1, 0, 1,
	];


	if(color.vbuffer)
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, color.vbuffer);
		Game.program.aColor = gl.getAttribLocation(Game.program, "aColor");
		gl.enableVertexAttribArray(Game.program.aColor);
		gl.vertexAttribPointer(Game.program.aColor, 4, gl.FLOAT, false, 0, 0);

		gl.uniform1i(gl.getUniformLocation(Game.program, "useVColor"), true);
		Game.program.uColor = gl.getUniformLocation(Game.program, "uColor");
		gl.uniform4fv(program.uColor, new Float32Array([0.0,0.0,0.0,1.0]));
	}
	else
	{
		Game.program.uColor = gl.getUniformLocation(Game.program, "uColor");
		gl.uniform4fv(Game.program.uColor, new Float32Array(color));

		gl.uniform1i(gl.getUniformLocation(Game.program, "useVColor"), false);
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vbuffer);
	Game.program.pMatrix = gl.getUniformLocation(Game.program, "pMatrix");
	gl.uniformMatrix4fv(program.pMatrix, false, matrix);

	Game.program.entityPosition = gl.getUniformLocation(Game.program, "entityPosition");
	gl.uniform2fv(program.entityPosition, position);


	Game.program.aVertexPosition = gl.getAttribLocation(Game.program, "aVertexPosition");
	gl.enableVertexAttribArray(Game.program.aVertexPosition);
	gl.vertexAttribPointer(Game.program.aVertexPosition, buffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.drawArrays(mode, 0, buffer.numItems);
}

function OpenGlBufferRenderRaw(buffer, vbuffer, numItems, mode)
{
	var bytes=4;
	var a = 16/Game.camera.scale;
	var b = 9/Game.camera.scale;

	var matrix =[
		 b, 0, 0, 0,
		 0, a, 0, 0,
		 0, 0, 1, 0,
		-1,-1, 0, 1,
	];

		/*
		buffer = [
			0,0, 1,0,0,1, 0,0,
			1,0, 1,0,0,1, 0,0,
			1,1, 1,0,0,1, 0,0,
		];
		*/

		gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(buffer), gl.STATIC_DRAW);

		Game.program.aColor = gl.getAttribLocation(Game.program, "aColor");
		Game.program.aVertexPosition = gl.getAttribLocation(Game.program, "aVertexPosition");
		Game.program.aEntityPosition = gl.getAttribLocation(Game.program, "aEntityPosition");

		gl.enableVertexAttribArray(Game.program.aColor);
		gl.enableVertexAttribArray(Game.program.aVertexPosition);
		gl.enableVertexAttribArray(Game.program.aEntityPosition);

		gl.vertexAttribPointer(Game.program.aVertexPosition, 2, gl.FLOAT, false, 9*bytes, 0);
		gl.vertexAttribPointer(Game.program.aColor         , 4, gl.FLOAT, false, 9*bytes, 2*bytes);
		gl.vertexAttribPointer(Game.program.aEntityPosition, 3, gl.FLOAT, false, 9*bytes, 6*bytes);

		Game.program.pMatrix = gl.getUniformLocation(Game.program, "pMatrix");
		Game.program.pCamera = gl.getUniformLocation(Game.program, "pCamera");

		gl.uniformMatrix4fv(Game.program.pMatrix, false, matrix);
		gl.uniform2fv(Game.program.pCamera, new Float32Array(Game.camera.translate));

		for(var i=0;i<numItems;i+=4)
		{
			gl.drawArrays(mode, i, 4);
		}
}

function OpenGlBufferRenderRawUV(buffer, vbuffer, numItems, mode)
{
	var bytes=4;
	var a = 16/Game.camera.scale;
	var b = 9/Game.camera.scale;

	var matrix =[
		 b, 0, 0, 0,
		 0, a, 0, 0,
		 0, 0, 1, 0,
		-1,-1, 0, 1,
	];

		/*
		buffer = [
			0,0, 1,0,0,1, 0,0,
			1,0, 1,0,0,1, 0,0,
			1,1, 1,0,0,1, 0,0,
		];
		*/

		gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(buffer), gl.STATIC_DRAW);

		Game.program.aColor = gl.getAttribLocation(Game.program, "aColor");
		Game.program.aVertexPosition = gl.getAttribLocation(Game.program, "aVertexPosition");
		Game.program.aUVPosition = gl.getAttribLocation(Game.program, "aUVPosition");
		Game.program.aEntityPosition = gl.getAttribLocation(Game.program, "aEntityPosition");

		gl.enableVertexAttribArray(Game.program.aColor);
		gl.enableVertexAttribArray(Game.program.aVertexPosition);
		gl.enableVertexAttribArray(Game.program.aUVPosition);
		gl.enableVertexAttribArray(Game.program.aEntityPosition);

		gl.vertexAttribPointer(Game.program.aVertexPosition, 2, gl.FLOAT, false, 11*bytes, 0);
		gl.vertexAttribPointer(Game.program.aUVPosition,     2, gl.FLOAT, false, 11*bytes, 2*bytes);
		gl.vertexAttribPointer(Game.program.aColor         , 4, gl.FLOAT, false, 11*bytes, 4*bytes);
		gl.vertexAttribPointer(Game.program.aEntityPosition, 3, gl.FLOAT, false, 11*bytes, 8*bytes);

		Game.program.pMatrix = gl.getUniformLocation(Game.program, "pMatrix");
		Game.program.pCamera = gl.getUniformLocation(Game.program, "pCamera");

		gl.uniformMatrix4fv(Game.program.pMatrix, false, matrix);
		gl.uniform2fv(Game.program.pCamera, new Float32Array(Game.camera.translate));

		for(var i=0;i<numItems;i+=4)
		{
			gl.drawArrays(mode, i, 4);
		}
}

function OpenGlBufferRenderPreBind(vbuffer, numItems, mode)
{
	var bytes=4;
	var a = 16/Game.camera.scale;
	var b = 9/Game.camera.scale;

	var matrix =[
		 b, 0, 0, 0,
		 0, a, 0, 0,
		 0, 0, 1, 0,
		-1,-1, 0, 1,
	];

	gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
	Game.program.aColor = gl.getAttribLocation(Game.program, "aColor");
	Game.program.aVertexPosition = gl.getAttribLocation(Game.program, "aVertexPosition");
	Game.program.aEntityPosition = gl.getAttribLocation(Game.program, "aEntityPosition");

	gl.enableVertexAttribArray(Game.program.aColor);
	gl.enableVertexAttribArray(Game.program.aVertexPosition);
	gl.enableVertexAttribArray(Game.program.aEntityPosition);

	gl.vertexAttribPointer(Game.program.aVertexPosition, 2, gl.FLOAT, false, 9*bytes, 0);
	gl.vertexAttribPointer(Game.program.aColor         , 4, gl.FLOAT, false, 9*bytes, 2*bytes);
	gl.vertexAttribPointer(Game.program.aEntityPosition, 3, gl.FLOAT, false, 9*bytes, 6*bytes);

	Game.program.pMatrix = gl.getUniformLocation(Game.program, "pMatrix");
	Game.program.pCamera = gl.getUniformLocation(Game.program, "pCamera");

	gl.uniformMatrix4fv(Game.program.pMatrix, false, matrix);
	gl.uniform2fv(Game.program.pCamera, new Float32Array(Game.camera.translate));

	//for(var i=0;i<numItems;i+=4)
	//{
		gl.drawArrays(mode, 0, numItems);
	//}
}

function OpenGlRenderEffects(entity, piece, color)
{
	if(piece.effects && piece.effects & (RENDER_EFFECTS.TRAIL | RENDER_EFFECTS.VELOCITY_TRAIL))
	{
		for(var i=piece.trail.length-1; i>=0; i--)
		{
			var position = add(piece.trail[i], Game.camera.translate);
			color[3] = i/piece.trail.length;
			OpenGlBufferRenderTriangleStrip(piece.buffer, color, position );
		}
	}
}



function renderEntityOpenGL(entity, context)
{
	BEGIN_TIMED_FUNCTION();
	if(entity && (entity.alive || typeof entity.alive == 'undefined'))
	{
		if(entity.pieces)
		{
			for(var pieceIndex=0; pieceIndex < entity.pieces.length; pieceIndex++)
			{
				var piece = entity.pieces[pieceIndex];
				var color = piece.staticColor || getRenderColor(piece.color);

				gl.enable(gl.BLEND);
				if(piece.triangle)
				{
					OpenGlBufferRenderTriangle(piece.buffer, piece.colorBuffer, add(Game.camera.translate, add(entity.position, piece.offset)) );
				}
				else
					OpenGlBufferRenderTriangleStrip(piece.buffer, color, add(Game.camera.translate, add(entity.position, piece.offset)) );
				OpenGlRenderEffects(entity,piece, color);
				gl.disable(gl.BLEND);
			}
		}
	}
	END_TIMED_FUNCTION();
}

function OpenGlBufferEffects(piece, entity, verticies, color, buffer)
{
	if(piece.effects && piece.effects & (RENDER_EFFECTS.TRAIL | RENDER_EFFECTS.VELOCITY_TRAIL))
	{
		for(var i=piece.trail.length-1; i>=0; i--)
		{
			color[3] = i/piece.trail.length;

			for(var vertIndex=0; vertIndex<verticies.length; vertIndex+=2 )
			{
				buffer.push(verticies[vertIndex]);
				buffer.push(verticies[vertIndex+1]);
				buffer.push(color[0]);
				buffer.push(color[1]);
				buffer.push(color[2]);
				buffer.push(color[3]);
				buffer.push(piece.trail[i][0]);
				buffer.push(piece.trail[i][1]);
				buffer.push(1);
			}
		}
	}
}

function bufferEntityOpenGL(entity, buffer)
{
	BEGIN_TIMED_FUNCTION();
	if(entity && (entity.alive || typeof entity.alive == 'undefined'))
	{
		if(entity.pieces)
		{
			for(var pieceIndex=0; pieceIndex < entity.pieces.length; pieceIndex++)
			{
				var piece = entity.pieces[pieceIndex];
				var color = piece.staticColor || getRenderColor(piece.color);
				var verticies = OpenGLSquare(piece.offset, piece.dimension[0], piece.dimension[1]);
				for(var vertIndex=0; vertIndex<verticies.length; vertIndex+=2 )
				{
					buffer.push(verticies[vertIndex]);
					buffer.push(verticies[vertIndex+1]);
					buffer.push(color[0]);
					buffer.push(color[1]);
					buffer.push(color[2]);
					buffer.push(color[3]);
					buffer.push(entity.position[0]);
					buffer.push(entity.position[1]);
					buffer.push(1);
				}
				OpenGlBufferEffects(piece, entity, verticies, color, buffer);
			}
		}
	}
	END_TIMED_FUNCTION();
}

function renderEntityDebugOpenGL(entity, context)
{
	BEGIN_TIMED_FUNCTION();
	if(entity.alive || typeof entity.alive == 'undefined')
	{
		if(entity.volumes)
		{
			for(var i=0;i<entity.volumes.length;i++)
			{
				OpenGlBufferRenderLine(entity.volumes[i].buffer, [1.0,1.0,0.0,1.0], add(Game.camera.translate, add(entity.position, entity.volumes[i].offset)));
			}
		}
	}
	END_TIMED_FUNCTION();
}
