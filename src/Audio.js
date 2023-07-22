var AudioContext = window.AudioContext || window.webkitAudioContext;
var scale = {
	'C0':16.35,
	'Cs0':17.32,
	'D0':18.35,
	'Ds0':19.45,
	'Ef0':19.45,
	'E0':20.60,
	'F0':21.83,
	'Fs0':23.12,
	'G0':24.50,
	'Gs0':25.96,
	'A0':27.50,
	'As0':29.14,
	'Bf0':29.14,
	'B0':30.87,
	'C1':32.70,
	'Cs1':34.65,
	'D1':36.71,
	'Ds1':38.89,
	'Ef1':38.89,
	'E1':41.20,
	'F1':43.65,
	'Fs1':46.25,
	'G1':49.00,
	'Gs1':51.91,
	'A1':55.00,
	'As1':58.27,
	'Bf1':58.27,
	'B1':61.74,
	'C2':65.41,
	'Cs2':69.30,
	'D2':73.42,
	'Ds2':77.78,
	'Ef2':77.78,
	'E2':82.41,
	'F2':87.31,
	'Fs2':92.50,
	'G2':98.00,
	'Gs2':103.83,
	'A2':110.00,
	'As2':116.54,
	'Bf2':116.54,
	'B2':123.47,
	'C3':130.81,
	'Cs3':138.59,
	'D3':146.83,
	'Ds3':155.56,
	'Ef3':155.56,
	'E3':164.81,
	'F3':174.61,
	'Fs3':185.00,
	'G3':196.00,
	'Gs3':207.65,
	'A3':220.00,
	'As3':233.08,
	'Bf3':233.08,
	'B3':246.94,
	'C4':261.63,
	'Cs4':277.18,
	'D4':293.66,
	'Ds4':311.13,
	'Ef4':311.13,
	'E4':329.63,
	'F4':349.23,
	'Fs4':369.99,
	'G4':392.00,
	'Gs4':415.30,
	'A4':440.00,
	'As4':466.16,
	'Bf4':466.16,
	'B4':493.88,
	'C5':523.25,
	'Cs5':554.37,
	'D5':587.33,
	'Ds5':622.25,
	'Ef5':622.25,
	'E5':659.25,
	'F5':698.46,
	'Fs5':739.99,
	'G5':783.99,
	'Gs5':830.61,
	'A5':880.00,
	'As5':932.33,
	'Bf5':932.33,
	'B5':987.77,
	'C6':1046.50,
	'Cs6':1108.73,
	'D6':1174.66,
	'Ds6':1244.51,
	'Ef6':1244.51,
	'E6':1318.51,
	'F6':1396.91,
	'Fs6':1479.98,
	'G6':1567.98,
	'Gs6':1661.22,
	'A6':1760.00,
	'As6':1864.66,
	'Bf6':1864.66,
	'B6':1975.53,
	'C7':2093.00,
	'Cs7':2217.46,
	'D7':2349.32,
	'Ds7':2489.02,
	'Ef7':2489.02,
	'E7':2637.02,
	'F7':2793.83,
	'Fs7':2959.96,
	'G7':3135.96,
	'Gs7':3322.44,
	'A7':3520.00,
	'As7':3729.31,
	'Bf7':3729.31,
	'B7':3951.07,
	'C8':4186.01,
	'Cs8':4434.92,
	'D8':4698.63,
	'Ds8':4978.03,
	'Ef8':4978.03,
	'E8':5274.04,
	'F8':5587.65,
	'Fs8':5919.91,
	'G8':6271.93,
	'Gs8':6644.88,
	'A8':7040.00,
	'As8':7458.62,
	'Bf8':7458.62,
	'B8':7902.13,
};


function InitAudio()
{
	Game.audio = new AudioContext(),
	Game.NumChannels = 4;
	Game.osc = [];
	Game.gain = [];
	Game.ReadContext = 0;

	Game.BackgroundMusic = [];

//for the damaged

	Game.BackgroundMusic[0] = [
			'Ds4',
			'B4',
			'G4',
			'B4',

			'Ds4',
			'B4',
			'G4',
			'B4',

			'Ds4',
			'B4',
			'G4',
			'B4',

			'Ds4',
			'B4',
			'G4',
			'B4',

			'C4',
			'A4',
			'F4',
			'A4',

			'C4',
			'A4',
			'F4',
			'A4',

			'C4',
			'A4',
			'F4',
			'A4',

			'C4',
			'A4',
			'F4',
			'A4',

			'C4',
			'A4',
			'E4',
			'A4',

			'D4',
			'A4',
			'F4',
			'A4',

			'D4',
			'A4',
			'F4',
			'A4',

			'D4',
			'As4',
			'F4',
			'A4',

			'D4',
			'As4',
			'F4',
			'A4',

			'C4',
			'G4',
			'C4',
			'G4',

			'B4',
			'F4',
			'B4',
			'F4',

			'A4',
			'F4',
			'A4',
			'F4',

			'G4',
			'F4',
			'G4',
			'D4',

			'E4',
			'C4',
			'A3',
			'C4',

			'-',
			'C4',
			'A3',
			'C4',

			'D4',
			'B3',
			'F3',
			'B3',

			'D4',
			'Bs3',
			'G3',
			'B3',

			'B3',
			'B3',
			'B3',
			'B3',
		];

	Game.BackgroundMusic[1] = [
		'',
		'',
		'',
		'',


		'',
		'',
		'',
		'',

		'',
		'',
		'',
		'',

		'',
		'',
		'',
		'',

		'',
		'',
		'',
		'',

		'',
		'',
		'',
		'',

		'',
		'',
		'',
		'',

		'',
		'',
		'',
		'',

		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',

		'',
		'',
		'',
		'',
		'',

		'G3',
		'G3',
		'G3',
		'G3',

		'F3',
		'F3',
		'F3',
		'F3',

		'E3',
		'E3',
		'E3',
		'E3',

		'D3',
		'D3',
		'D3',
		'D3',

		'E3',
		'E3',
		'E3',
		'E3',

		'E3',
		'E3',
		'E3',
		'E3',

		'D3',
		'D3',
		'D3',
		'D3',

		'D3',
		'D3',
		'D3',
		'D3',

		'D3',
		'D3',
		'D3',
		'D3',
	];



//2 + 2 = 4

	Game.BackgroundMusic[0] =
		'F3 F3 * * * * * '+
		'F3 F3 * * * * * '+

		'E3 E3 * * * * * '+
		'E3 E3 * * * * * '+

		'Ds3 Ds3 * * * * * '+
		'Ds3 Ds3 * * * * * '+

		'D3 D3 * * * * * '+
		'G3 G3 * * * * * '+

		'F3 F3 * * * * * '+
		'E3 E3 * * * * *'+
		'';
	Game.BackgroundMusic[0] = Game.BackgroundMusic[0].split(' ');
		Game.BackgroundMusic[1] =
		'Gs4 Gs4 F4 C4 F3 C4 F4 '+
		'Gs4 Gs4 F4 C4 F3 C4 F4 '+

		'G4 G4 F4 C4 E3 C4 F4 '+
		'G4 G4 F4 C4 E3 C4 F4 '+

		'A4 A4 F4 C4 Ds3 C4 F4 '+
		'A4 A4 F4 C4 Ds3 C4 F4 '+

		'A4 A4 F4 D4 D3 D4 F4 '+
		'As4 As4 G4 D4 A3 D4 G4 '+

		'As4 As4 F4 D4 F3 D4 F4 ' +
		'G4 G4 E4 C4 E3 C4 E4'+
		'';
		Game.BackgroundMusic[1] = Game.BackgroundMusic[1].split(' ');


/*
G Am Bm  C   D7   Ef F#07
C Dm Ef  F   G7   Am b07
I ii iii IV  V    vi V7
*/

/*
Game.BackgroundMusic[0] =
//'G4 C4 Fs4 * '+ //I - IV - V7
//'G4 C4 D4 * '+ //I - IV - V
//'G4 Ef4 C4 D4 '+ //I – vi – IV – V
//'G4 Ef4 Bf4 D4 '+ //I – vi – ii – V
//'G4 D4 Ef4 Bf4 C4 '//I – V – vi – iii – IV

'* C4 D4 G4 * Fs4 D4 G4 Fs4 C4 D4 Fs4'+
'';
Game.BackgroundMusic[0] = Game.BackgroundMusic[0].replace(/'  '/g, ' ').trim().split(' ');
*/
}

function StartAudioMusic()
{
	for(var i =0; i < Game.NumChannels; i++)
	{
		Game.osc[i] = Game.audio.createOscillator();
		Game.osc[i].frequency.value = 0;
		Game.gain[i] = Game.audio.createGain();
		Game.osc[i].connect(Game.gain[i]);
		Game.gain[i].connect(Game.audio.destination);
		Game.osc[i].start(0);
	}
	play();
	fps = 145;
	fps = 280;
	Game.MusicInterval = setInterval(play, 1 / ( fps / 60) * 1000);
}

function StopAudioMusic()
{
	clearInterval(Game.MusicInterval);
	Game.MusicInterval = false;
	for(var i =0; i < Game.NumChannels; i++)
	{
		Game.osc[i].stop(0);
	}
}


/*
		osc1.type="triangle";
		gain1.gain.value = 1;
		osc1.frequency.value = scale[song[0]]*Math.random();
		osc1.connect(gain1);
		gain1.connect(audio.destination);
		osc1.start(0);

		osc2.type="square";
		gain2.gain.value = 1;
		osc2.frequency.value = scale[song[0]]*Math.random();
		osc2.connect(gain2);
		gain2.connect(audio.destination);
		osc2.start(0);

		osc3.type="sawtooth";
		gain3.gain.value = 1;
		osc3.frequency.value = scale[song[0]]*Math.random();
		osc3.connect(gain3);
		gain3.connect(audio.destination);
		osc3.start(0);

		osc4.type="sine";
		gain4.gain.value = 1;
		osc4.frequency.value = scale[song[0]]*Math.random();
		osc4.connect(gain4);
		gain4.connect(audio.destination);
		//osc4.start(0);
*/

function play() {
	Game.osc[0].frequency.value = 0;
	var gains = [0.005, 0.005];
	if(Game.ReadContext >=0 )
	{
		for(var j = 0; j < Game.BackgroundMusic.length; j++)
		{
			var wavs = [ 'square', 'square'];

			var note = Game.BackgroundMusic[j][Game.ReadContext];
			if(note && scale[note]) {

					var freq = scale[note];
					Game.osc[j].type=wavs[j];
					Game.osc[j].frequency.value = freq;
					Game.gain[j].gain.value = gains[j];
			} else {
					var freq = 0.0;
					Game.osc[j].type=wavs[j];
					Game.osc[j].frequency.value = freq;
					Game.gain[j].gain.value = .0000;
			}
		}

	}
	Game.ReadContext += 1;
	if(Game.ReadContext >= Game.BackgroundMusic[0].length) {
		Game.ReadContext = 0;
	}
}
