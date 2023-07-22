var gp;
var Inputs = {
				forward:false,
				back:false,
				jump:false,
				running:true,
				shoot:false,
				restart:false,
				hyper:false,
				start:-1,
				skipLevel:0,
			};

function handleInputs()
{
	if(Inputs.start > 0)
	{
		if(Inputs.skipTraining)
		{
			Game.CurrentLevel = 13;
			initializeLevel(Game, Game.CurrentLevel)
		}
		Inputs.start = 0;
		Game.time = 0;
		Game.started = 1;
		InitAudio();
		StartAudioMusic();
		GameLoop();
		document.getElementById('instructions').remove();
		document.getElementById('header').style.display = 'block';
	}


	if(Inputs.restart)
	{
		resetGame();
		Inputs.restart = false;
	}
	if(Inputs.skipLevel && Game.started == 1) {
		Inputs.skipLevel = 0;
		setLevel(++Game.CurrentLevel);
	}
}

function initInputs()
{
	window.addEventListener("gamepadconnected", function(e) {
		gp = navigator.getGamepads()[e.gamepad.index];
		  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
			e.gamepad.index, e.gamepad.id,
			e.gamepad.buttons.length, e.gamepad.axes.length);
		});

		window.addEventListener("gamepaddisconnected", function(e) {
		  console.log("Gamepad disconnected from index %d: %s",
			e.gamepad.index, e.gamepad.id);
		});

	document.addEventListener("keydown", function(event) {
		Inputs.amount = 1.0;
		switch(event.key)
		{
			case 'Shift':
			{
				Inputs.running = true;
			} break;
			case 'w':
			case 'W':
			{
				Inputs.jump = true;
			} break;

			case 'ArrowRight':
			case 'd':
			case 'D':
			{
				Inputs.forward = true;
			} break;

			case 'ArrowLeft':
			case 'a':
			case 'A':
			{
				Inputs.back = true;
			} break;

			case ' ':
			{

				Inputs.jump = true;
			} break;

			case 'm':
			case 'M':
			{
				if(Game.MusicInterval)
				{
					StopAudioMusic();
				}
				else
				{
					StartAudioMusic();
				}
			} break;

			case 'p':
			case 'P':
			{
				if(Inputs.start < 0)
				{
					Inputs.start = 1;
					Inputs.skipTraining = true;
					handleInputs();
				} else {
					setPaused();
				}
			} break;
			case 'Enter':
			{
				if(Inputs.start < 0)
				{
					Inputs.start = 1;
					handleInputs();
				}
				else
					Inputs.restart = true;
			} break;

			case 'f':
			{

			} break;


		}
	});

	document.addEventListener("keyup", function(event) {
		switch(event.key)
		{
			case 'Shift':
			{
				Inputs.running = true;
			} break;

			case 'w':
			case 'W':
			{
				Inputs.jump = false;
			} break;

			case 'ArrowRight':
			case 'd':
			case 'D':
			{
				Inputs.forward = false;
			} break;

			case 'ArrowLeft':
			case 'a':
			case 'A':
			{
				Inputs.back = false;
			} break;

			case ' ':
			{
				Inputs.jump = false;
			} break;

			case 'Enter':
			{
				Inputs.restart = false;
			} break;

			case 'f':
			{

			} break;

			case 'n':
			case 'N':
			{
				Inputs.skipLevel = true;
			} break;
		}
	});
}