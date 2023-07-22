var SoundEffects = {
   jump     : 'sounds/jump.mp3',
   shoot    : 'sounds/shoot.mp3',
};

var EffectsQueue = [];
function PlaySound(sound, volume)
{
	EffectsQueue.push({file:SoundEffects[sound], volume:volume});
}


function PlaySoundFromQueue(item)
{
	var audio = new Audio(item.file);
	audio.volume = item.volume;
	audio.playbackRate = 2.0;
	audio.play();
}

function PlayQueue()
{
	for(var i in EffectsQueue)
	{
		PlaySoundFromQueue(EffectsQueue[i]);
	}

	EffectsQueue = [];
}