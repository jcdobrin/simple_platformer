//bullets
Levels.push({
	camera:{fixedVertical:true},
	entities:[
		{
			type:'Shoot',
			width:1,
			height:1,
			position:[99,1],
			speed:50,
			delay:1,
			timer:1,
			direction:[-1,0],
		},
		{
			type:'Shoot',
			width:1,
			height:1,
			position:[99,10],
			speed:50,
			delay:1,
			timer:.5,
			direction:[-1,0],
		}
	],
	floors:[
		{
			position:[0,0],
			width   :100,
			height  :1,
		},
		{
			position:[0,0],
			width   :1,
			height  :50,
		},
		{
			position:[99,0],
			width   :1,
			height  :50,
		},
		{
			position:[0,50],
			width   :100,
			height  :1,
		},
	],
	player:{
		position:[2,1],
	},
	keys  :[
		{
			position:[50, 1.5],
		}
	],
	door  :{
		position:[95, 1],
		locks   :1,
	},
});

//circle of fire
var fireCirle = [];
var angle = 0;
while(angle < 5.5)
{
	fireCirle.push({
			type:'FireWheel',
			length:2,
			offset:10,
			position:[50,13],
			angle:angle,
			speed:2,
			size:2.5,
		});
	angle+=.2;
}
fireCirle.push({
	type:'Floor',
	width:3,
	height:1,
	position:[49,12]
});

fireCirle.push({
	type:'Floor',
	width:3,
	height:1,
	position:[19,10]
});
Levels.push({
	camera:{fixedVertical:true},
	entities:fireCirle,
	floors:[
		{
			position:[0,0],
			width   :100,
			height  :1,
		},
		{
			position:[0,0],
			width   :1,
			height  :50,
		},
		{
			position:[99,0],
			width   :1,
			height  :50,
		},
		{
			position:[0,50],
			width   :100,
			height  :1,
		},
	],
	player:{
		position:[2,1],
	},
	keys  :[
		{
			position:[50.25, 13.5],
		}
	],
	door  :{
		position:[95, 1],
		locks   :1,
	},
});

//medium pinwheels with swamp and jump pads
Levels.push({
	camera:{fixedVertical:true},
	floors:[
		{
			position:[0,0],
			width   :100,
			height  :1,
		},
		{
			position:[0,0],
			width   :1,
			height  :50,
		},
		{
			position:[99,0],
			width   :1,
			height  :50,
		},
		{
			position:[0,50],
			width   :100,
			height  :1,
		},

		{
			position:[10,40],
			width   :19,
			height  :1,
		},

		{
			position:[30,40],
			width   :19,
			height  :1,
		},

		{
			position:[50,40],
			width   :19,
			height  :1,
		},

		{
			position:[70,40],
			width   :21,
			height  :1,
		},

		{
			position:[10,0],
			width   :1,
			height  :40.1,
		},


		{
			position:[20,0],
			width   :1,
			height  :30.1,
		},

		{
			position:[30,10],
			width   :1,
			height  :30.1,
		},

		{
			position:[40,0],
			width   :1,
			height  :30.1,
		},

		{
			position:[50,10],
			width   :1,
			height  :30.1,
		},

		{
			position:[60,0],
			width   :1,
			height  :30.1,
		},

		{
			position:[70,10],
			width   :1,
			height  :30.1,
		},

		{
			position:[80,0],
			width   :1,
			height  :30.1,
		},

		{
			position:[90,20],
			width   :1,
			height  :20.1,
		},


		{
			position:[95,0],
			width   :5,
			height  :5,
		},

		{
			position:[90,0],
			width   :11,
			height  :3,
		},

	],
	slimes:[
		{
			position:[10,41],
			width:81,
			height:1
		},
		{
			position:[29,0],
			width:1,
			height:41
		},
		{
			position:[49,0],
			width:1,
			height:41
		},
		{
			position:[69,0],
			width:1,
			height:41
		},
	],
	player:{
		position:[12,1]
	},
	keys  :[
		{position:[7,1.5]}
	],
	door  :{
		position:[1,1],
		locks   :1,
	},
	fireWheels:[
		{
			position:[20,40],
			length:15,
			speed:1,
			angle:0,
		},

		{
			position:[40,40],
			length:10,
			speed:1,
			angle:0,
		},

		{
			position:[40,20],
			length:10,
			speed:1,
			angle:0,
		},

		/*{
			position:[50,30],
			length:10,
			speed:-1,
			angle:0,
		},*/

		{
			position:[60,40],
			length:10,
			speed:1,
			angle:0,
		},

		{
			position:[60,20],
			length:10,
			speed:2,
			angle:0,
		},

		{
			position:[70,20],
			length:10,
			speed:-1.5,
			angle:0,
		},

		{
			position:[70,20],
			length:10,
			speed:-1.5,
			angle:Math.PI,
		},

		{
			position:[90,30],
			length:20,
			speed:-1,
			angle:Math.PI,
		},
	],
	lavas : [
		{
			position:[81,0],
			width:9,
			height:3,
		},
	],

	springs : [
		{
			position:[15,1],
			width:3,
			height:1,
		},

		{
			position:[35,1],
			width:3,
			height:1,
		},

		{
			position:[55,1],
			width:3,
			height:1,
		},

		{
			position:[75,1],
			width:3,
			height:1,
		},

		{
			position:[95,5],
			width:3,
			height:1,
		},
	],
});

//hard pinwheel level
Levels.push({
	camera:{fixedVertical:true},
	floors:[
		{
			position:[0,0],
			width   :100,
			height  :1,
		},
		{
			position:[0,0],
			width   :1,
			height  :50,
		},
		{
			position:[99,0],
			width   :1,
			height  :50,
		},
		{
			position:[0,50],
			width   :100,
			height  :1,
		},
//------
		{
			position:[37,10],
			width   :6,
			height  :1,
		},

		{
			position:[37,20],
			width   :6,
			height  :1,
		},

		{
			position:[37,30],
			width   :6,
			height  :1,
		},

		{
			position:[37,40],
			width   :6,
			height  :1,
		},

		{
			position:[37,50],
			width   :6,
			height  :1,
		},
//-----
		{
			position:[57,10],
			width   :6,
			height  :1,
		},

		{
			position:[57,20],
			width   :6,
			height  :1,
		},

		{
			position:[57,30],
			width   :6,
			height  :1,
		},

		{
			position:[57,40],
			width   :6,
			height  :1,
		},

		{
			position:[57,50],
			width   :6,
			height  :1,
		},
//-----
		{
			position:[47,15],
			width   :6,
			height  :1,
		},

		{
			position:[47,25],
			width   :6,
			height  :1,
		},

		{
			position:[47,35],
			width   :6,
			height  :1,
		},

		{
			position:[47,45],
			width   :6,
			height  :1,
		},

//-----
		{
			position:[27,15],
			width   :6,
			height  :1,
		},

		{
			position:[27,25],
			width   :6,
			height  :1,
		},

		{
			position:[27,35],
			width   :6,
			height  :1,
		},

		{
			position:[27,45],
			width   :6,
			height  :1,
		},

//-----
		{
			position:[67,15],
			width   :6,
			height  :1,
		},

		{
			position:[67,25],
			width   :6,
			height  :1,
		},

		{
			position:[67,35],
			width   :6,
			height  :1,
		},

		{
			position:[67,45],
			width   :6,
			height  :1,
		},
//-----
		{
			position:[17,30],
			width   :6,
			height  :1,
		},

		{
			position:[77,30],
			width   :6,
			height  :1,
		},
	],
	fireWheels:[
		{
			position:[49.5,30],
			length:30,
			speed:1,
		},

		{
			position:[49.5,30],
			length:30,
			speed:1,
			angle:Math.PI,
		},

		{
			position:[49.5,30],
			length:20,
			speed:1,
			angle:Math.PI/2,
		},

		{
			position:[49.5,30],
			length:20,
			speed:1,
			angle:-Math.PI/2,
		},
	],
	player:{
		position:[2,1],
	},
	keys  :[
		{
			position:[50, 16.5],
		},
		{
			position:[50, 36.5],
		},
		{
			position:[40, 21.5],
		},
		{
			position:[40, 31.5],
		},
		{
			position:[60, 21.5],
		},
		{
			position:[60, 31.5],
		},
	],
	door  :{
		position:[95, 1],
		locks   :6,
	},
})

//hard lava accend, door at top
Levels.push({
	camera:{fixedVertical:true},
	floors:[
		{
			position:[0,0],
			width   :100,
			height  :1,
		},
		{
			position:[0,0],
			width   :1,
			height  :50,
		},
		{
			position:[99,0],
			width   :1,
			height  :50,
		},
		{
			position:[0,50],
			width   :100,
			height  :1,
		},

		{
			position:[0,10],
			width   :90,
			height  :1,
		},

		{
			position:[10,20],
			width   :90,
			height  :1,
		},

		{
			position:[45,43],
			width   :8,
			height  :1,
		},

		{
			position:[90,30],
			width   :4,
			height  :1,
		},

		{
			position:[70,40],
			width   :4,
			height  :1,
		},

		{
			position:[9,44],
			width   :3,
			height  :1,
		},

		{
			position:[25,44],
			width   :4,
			height  :1,
		},
	],
	player:{
		position:[3,1],
	},
	keys  :[
		{
			position:[10, 45.5],

		},
		{
			position:[97, 38.5],
		},
	],
	door  :{
		position:[47, 44],
		locks   :2,
	},

	lavas :[
			{
				position:[1,29],
				width:75,
				height:6,
			},

			{
				position:[75,31],
				width:5,
				height:4,
			},
			{
				position:[11,19],
				width:88,
				height:1,
			},

			{
				position:[11,11],
				width:12,
				height:2,
			},

			{
				position:[51,11],
				width:10,
				height:2,
			},

			{
				position:[1,11],
				width:1,
				height:20,
			},

			{
				position:[98,1],
				width:1,
				height:19,
			},

			{
				position:[31,1],
				width:10,
				height:2,
			},

			{
				position:[33,1],
				width:6,
				height:4,
			},

			{
				position:[71,1],
				width:10,
				height:2,
			},

			{
				position:[73,1],
				width:6,
				height:4,
			},

			{
				position:[1,1],
				width:1,
				height:9,
			},

			{
				position:[1,9],
				width:22,
				height:1,
			},

			{
				position:[95,1],
				width:3,
				height:3,
			},

			{
				position:[90,21],
				width:9,
				height:9,
			},

			{
				position:[85,21],
				width:9,
				height:5,
			},

			{
				position:[51,9],
				width:10,
				height:1,
			},
	],


});

//hard lava pit jump with fire wheel
Levels.push({
	camera:{fixedVertical:true},
	floors:[
		{
			position:[0,0],
			width   :10,
			height  :10,
		},
		{
			position:[90,0],
			width   :10,
			height  :10,
		},
		{
			position:[0,0],
			width   :1,
			height  :50,
		},
		{
			position:[99,0],
			width   :1,
			height  :50,
		},
		{
			position:[0,50],
			width   :100,
			height  :1,
		},

		{
			position:[20,15],
			width   :3,
			height  :1,
		},


		{
			position:[33,25],
			width   :3,
			height  :1,
		},

		{
			position:[45,15],
			width   :3,
			height  :1,
		},

		{
			position:[70,0],
			width   :1,
			height  :30,
		},

		{
			position:[70,30],
			width   :1,
			height  :1,
		},

		{
			position:[80,20],
			width   :1,
			height  :1,
		},
	],
	fireWheels:[
		{
			position:[70,30],
			length:10,
			speed:1,
		},
	],
	lavas:[
		{
			position:[10,0],
			width:80,
			height:8
		}
	],
	player:{
		position:[1,10],
	},
	keys  :[
		{
			position:[55, 37.5],
		},
		{
			position:[46, 16.5],
		},
		{
			position:[70, 40.5],
		}
	],
	door  :{
		position:[95, 10],
		locks   :3,
	},
});

//lowering lava level
Levels.push({
	camera:{fixedVertical:true},
	entities:[
		{
			position:[0,44],
			width:10,
			height:1,
			type:'Floor',
		},
		{
			position:[15,40],
			width:1,
			height:1,
			type:'Floor',
		},
		{
			position:[25,35],
			width:1,
			height:1,
			type:'Floor',
		},
		{
			position:[35,30],
			width:1,
			height:1,
			type:'Floor',
		},
		{
			position:[45,25],
			width:1,
			height:1,
			type:'Floor',
		},
		{
			position:[55,30],
			width:1,
			height:1,
			type:'Floor',
		},
		{
			position:[65,35],
			width:1,
			height:1,
			type:'Floor',
		},
		{
			position:[75,40],
			width:1,
			height:1,
			type:'Floor',
		},
		{
			position:[80,43],
			width:20,
			height:1,
			type:'Floor',
		},
		{
			id:333,
			position:[10,0],
			width:70,
			height:45,
			type:'Lava',
		},
		{
			position:[10,0],
			width:1,
			height:45,
			type:'Floor',
		},
		{
			position:[80,0],
			width:1,
			height:43,
			type:'Floor',
		},
	],
	paths :[
		{
			nodes: [
				{position:[0,25]},
				{position:[0,0]},
			],
			loop:true,
			speed:5,
			width:1,
			height:1,
			attached:333,
		}
	],
	floors:[
		{
			position:[0,0],
			width   :100,
			height  :1,
		},
		{
			position:[0,0],
			width   :1,
			height  :50,
		},
		{
			position:[99,0],
			width   :1,
			height  :50,
		},
		{
			position:[0,50],
			width   :100,
			height  :1,
		},
	],
	player:{
		position:[2,45],
	},
	keys : [
		{
			position:[15.25, 41.5],
		},
		{
			position:[25.25, 36.5],
		},
		{
			position:[35.25, 31.5],
		},
		{
			position:[45.25, 26.5],
		},
		{
			position:[55.25, 31.5],
		},
		{
			position:[65.25, 36.5],
		},
	],
	door  :{
		position:[95, 44],
		locks   :6,
	},
});

//bullet hell
Levels.push({
	entities:[
		{
			type:'Shoot',
			width:1,
			height:1,
			position:[25,50],
			speed:40,
			delay:1,
			timer:1,
			direction:[1,-1],
		},
		{
			type:'Shoot',
			width:1,
			height:1,
			position:[0,50],
			speed:40,
			delay:1,
			timer:1,
			direction:[1,-1],
		},
		{
			type:'Shoot',
			width:1,
			height:1,
			position:[75,50],
			speed:40,
			delay:1,
			timer:1,
			direction:[-1,-1],
		},
		{
			type:'Shoot',
			width:1,
			height:1,
			position:[99,50],
			speed:40,
			delay:1,
			timer:1,
			direction:[-1,-1],
		},
		{
			type:'Shoot',
			width:1,
			height:1,
			position:[0,1],
			speed:40,
			delay:1,
			timer:1,
			direction:[1,0],
		},
		{
			type:'Shoot',
			width:1,
			height:1,
			position:[99,1],
			speed:40,
			delay:1,
			timer:1,
			direction:[-1,0],
		},
	],
	floors:[
		{
			position:[0,0],
			width   :100,
			height  :1,
		},
		{
			position:[50,25],
			width   :1.25,
			height  :1,
		},
		{
			position:[0,0],
			width   :1,
			height  :50,
		},
		{
			position:[99,0],
			width   :1,
			height  :50,
		},
		{
			position:[0,50],
			width   :100,
			height  :1,
		},
	],
	player:{
		position:[50,25],
	},
	keys  :[
		{
			position:[1.25, 1.5],
		},
		{
				position:[98.25, 1.5],
		}
	],
	door  :{
		position:[48, 1],
		locks   :2,
	},
});

//lava floor with bounces and bullets
Levels.push({
	entities:[
		{
			type:'Spring',
			position:[25,2],
			width:3,
			height:1,
		},
		{
			type:'Spring',
			position:[49,2],
			width:3,
			height:1,
		},
		{
			type:'Spring',
			position:[72,2],
			width:3,
			height:1,
		},

		{
			type:'Shoot',
			position:[35,25],
			width:1,
			height:1,
			delay:2,
			timer:0,
			speed:10,
			direction:[0,-1],
		},
		{
			type:'Shoot',
			position:[64,25],
			width:1,
			height:1,
			delay:2,
			timer:0,
			speed:10,
			direction:[0,-1],
		},
		{
			type:'Shoot',
			position:[35,0],
			width:1,
			height:1,
			delay:2,
			timer:0,
			speed:10,
			direction:[0,1],
		},
		{
			type:'Shoot',
			position:[64,0],
			width:1,
			height:1,
			delay:2,
			timer:0,
			speed:10,
			direction:[0,1],
		},
		{
			type:'Shoot',
			position:[64,25],
			width:3,
			height:.75,
			delay:1.5,
			timer:0,
			speed:10,
			direction:[1,0],
			collision:COLLISION.COLLIDES,
			draw:'Floor',
		},
		{
			type:'Lava',
			position:[-100,-10],
			width:400,
			height:12,
		},
		{
			type:'Lava',
			position:[25,24],
			width:50,
			height:1,
		},

		{
			type:'Lava',
			position:[-200,-10],
			width:100,
			height:200,
		},
		{
			type:'Lava',
			position:[200,-10],
			width:100,
			height:200,
		},

		{
			type:'Rotate',
			width:5,
			height:1,
			position:[-25,25],
			distanceFromOrigin:20,
			angle:0,
			offset:[0,0],
			speed:1,
		},
		{
			type:'Rotate',
			width:5,
			height:1,
			position:[-25,25],
			distanceFromOrigin:20,
			angle:Math.PI,
			offset:[0,0],
			speed:1,
		},
		{
			type:'Rotate',
			width:5,
			height:1,
			position:[-25,25],
			distanceFromOrigin:20,
			angle:Math.PI/2,
			offset:[0,0],
			speed:1,
		},
		{
			type:'Rotate',
			width:5,
			height:1,
			position:[-25,25],
			distanceFromOrigin:20,
			angle:Math.PI*3/2,
			offset:[0,0],
			speed:1,
		},


		{
			type:'Rotate',
			width:3,
			height:1,
			position:[-75,25],
			distanceFromOrigin:10,
			angle:0,
			offset:[0,0],
			speed:2,
		},
		{
			type:'Rotate',
			width:3,
			height:1,
			position:[-75,25],
			distanceFromOrigin:10,
			angle:Math.PI,
			offset:[0,0],
			speed:2,
		},

		{
			type:'Lava',
			position:[100,25],
			width:5,
			height:2,
		},

		{
			type:'Lava',
			position:[125,25],
			width:5,
			height:2,
		},

		{
			type:'Lava',
			position:[150,25],
			width:5,
			height:2,
		},

		{
			type:'Lava',
			position:[175,25],
			width:5,
			height:2,
		},

	],
	floors:[
		{
			position:[50,25],
			width   :1,
			height  :25,
		},
		{
			position:[25,25],
			width   :50,
			height  :1,
		},
		{
			position:[-25,50],
			width   :225,
			height  :1,
		},
	],
	player:{
		position:[45,26],
	},
	keys  :[
		{position:[55, 26.5]},
		{position:[-75,25]},
		{position:[185,51.5]},
		{position:[185,26.5]},
	],
	door  :{
		position:[45, 26],
		locks   :4,
	},
});


