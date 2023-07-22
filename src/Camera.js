Game.camera = {
	translate:[0,0],
	rotate:0,
	scale:450
};


function SetCamera()
{
	var translate = add([50,25], multiply(Game.player.position, -1));
	if(Game.player.position[1] < 25)
	{
		translate[1] = 0;
	}
	Game.camera.translate = translate;
	if(Game.camera.settings.fixedCenter)
		Game.camera.translate = [0,0];
	if(Game.camera.settings.fixedVertical)
		Game.camera.translate[1] = 0;
}