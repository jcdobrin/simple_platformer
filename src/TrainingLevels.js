//basic key grab
Levels.push({
	camera:{fixedCenter:true},
	floors:[
		{
			position:[0,0],
			width   :100,
			height  :1,
		},
		/*{
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
		},*/
	],
	player:{
		position:[2,2],
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

//basic jump level
Levels.push({
		camera:{fixedCenter:true},
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
				position:[75,0],
				width   :2,
				height  :12,
			},
		],
		player:{
			position:[2,1],
		},
		keys  :[
			{
				position:[25, 1.5],
			},
			{
				position:[75, 12.5],
			}
		],
		door  :{
			position:[95, 1],
			locks   :2,
		},
	});

//spinning block
Levels.push({
	camera:{fixedCenter:true},
	entities:[
		{
			type:'Rotate',
			width:5,
			height:5,
			position:[50,25],
			distanceFromOrigin:20,
			angle:1,
			offset:[0,0],
			speed:1,
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
			position:[50, 48.5],
		}
	],
	door  :{
		position:[95, 1],
		locks   :1,
	},
});

//vertical split room level
Levels.push({
	toroidal:true,
	camera:{fixedCenter:true},
	floors:[
		{
			position:[0,0],
			width   :50,
			height  :1,
		},
		{
			position:[60,0],
			width   :40,
			height  :1,
		},
		{
			position:[0,0],
			width   :1,
			height  :50,
		},
		{
			position:[50,25],
			width   :11,
			height  :1,
		},
		{
			position:[99,0],
			width   :1,
			height  :50,
		},
		{
			position:[50,25],
			width   :1,
			height  :50,
		},
		{
			position:[60,0],
			width   :1,
			height  :25,
		},
		{
			position:[0,50],
			width   :51,
			height  :1,
		},

		{
			id:1,
			position:[10,-50],
			width   :10,
			height  :50,
		},
	],
	player:{
		position:[2,1],
	},
	keys  :[
		{
			position:[25, 1.5],
		},
		{
			position:[75, 12.5],
		}
	],
	door  :{
		position:[95, 1],
		locks   :2,
	},
});

//horizontal split room level
Levels.push({
	toroidal:true,
	camera:{fixedCenter:true},
	floors:[
		{
			position:[0,0],
			width   :100,
			height  :1,
		},
		{
			position:[50,0],
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
			position:[55, 1.5],
		}
	],
	door  :{
		position:[35, 1],
		locks   :1,
	},
});

//moving pillon room level
Levels.push({
	camera:{fixedCenter:true},
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
			id:1,
			position:[10,-40],
			width   :10,
			height  :50,
		},
	],
	player:{
		position:[2,1],
	},
	keys  :[
		{
			position:[30, 40],
		}
	],
	door  :{
		position:[95, 1],
		locks   :1,
	},
	paths :[
		{
			nodes: [
				{position:[10,10]},
				{position:[10,30]},
				{position:[80,30]},
				{position:[80,10]},
			],
			loop:true,
			speed:20,
			width:1,
			height:1,
			attached:1,
		}
	],
});

//bounce pad training level
Levels.push({
	camera:{fixedCenter:true},
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
			position:[50,0],
			width   :2,
			height  :40,
		},
	],
	springs : [
		{
			position:[25,1],
			width:3,
			height:1,
		},
	],
	player:{
		position:[10,1],
	},
	keys  :[
		{
			position:[55, 1.5],
		}
	],
	door  :{
		position:[95, 1],
		locks   :1,
	},
});

//stacked platform training level
Levels.push({
	camera:{fixedCenter:true},
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
			position:[70,10],
			width   :10,
			height  :1,
		},

		{
			position:[70,20],
			width   :10,
			height  :1,
		},

		{
			position:[70,30],
			width   :10,
			height  :1,
		},
	],
	player:{
		position:[2,1],
	},
	keys  :[
		{
			position:[25, 1.5],
		},
		{
			position:[75, 35.5],
		}
	],
	door  :{
		position:[95, 1],
		locks   :2,
	},
});

//fire pit training level
Levels.push({
	camera:{fixedCenter:true},
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
			position:[20,10],
			width   :10,
			height  :1,
		},
		{
			position:[45,12],
			width   :10,
			height  :1,
		},

		{
			position:[70,10],
			width   :10,
			height  :1,
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
			position:[50, 14.5],
		}
	],
	door  :{
		position:[95, 10],
		locks   :1,
	},
});

//spinning fire wheel training level
Levels.push({
		camera:{fixedCenter:true},
		floors:[
			{
				position:[0,0],
				width   :100,
				height  :1,
			},
			{
				position:[-1,0],
				width   :1,
				height  :51,
			},
			{
				position:[99,0],
				width   :1,
				height  :50,
			},
			{
				position:[0,99],
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
				position:[0,30],
				width   :90,
				height  :1,
			},
			{
				position:[10,40],
				width   :90,
				height  :1,
			},

			{
				position:[0,43],
				width   :4,
				height  :1,
			},

		],
		/*lavas:[
			{
				position:[10,0],
				width:80,
				height:8
			}
		],*/

		fireWheels:[
			{
				position:[10,20],
				length:10,
				speed:4,
			},

			{
				position:[90,30],
				length:10,
				speed:-5,
				angle:Math.PI,
			},

			{
				position:[50,20],
				length:10,
				speed:5,

			},

			{
				position:[10,40],
				length:10,
				speed:4,
				angle: -Math.PI/2,
			},

//----------------------------------------
/*

			{
				position:[20,40],
				length:10,
				speed:1,
				angle: -Math.PI/3,
			},
			{
				position:[30,40],
				length:10,
				speed:1,
				angle: -Math.PI/4,
			},
			{
				position:[40,40],
				length:10,
				speed:1,
				angle: -Math.PI/5,
			},
			{
				position:[50,40],
				length:10,
				speed:1,
				angle: -Math.PI/6,
			},
			{
				position:[60,40],
				length:10,
				speed:1,
				angle: -Math.PI/7,
			},
			{
				position:[70,40],
				length:10,
				speed:1,
				angle: -Math.PI/8,
			},
			{
				position:[80,40],
				length:10,
				speed:1,
				angle: 0,
			},
			{
				position:[90,40],
				length:10,
				speed:1,
				angle: Math.PI/8,
			},
		*/
		],
		player:{
			position:[1,1],
		},
		keys  :[
			{
				position:[95, 42.5],
			}
		],
		door  :{
			position:[0, 44],
			locks   :1,
		},
	});

//swamp training level
Levels.push({
	camera:{fixedCenter:true},
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
	slimes:[{
		position:[1,1],
		width   :98,
		height  :0.75,
	}],
	player:{
		position:[2,1],
	},
	keys  :[
		{
			position:[50, 3.5],
		}
	],
	door  :{
		position:[95, 1],
		locks   :1,
	},
});

//ice training level
Levels.push({
		camera:{fixedCenter:true},
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
		ices:[
			{
				position:[0,1],
				width   :100,
				height  :1,
			},
		],

		player:{
			position:[1,2],
		},
		keys  :[
			{
				position:[50, 2.5],
			}
		],
		door  :{
			position:[95, 1],
			locks   :1,
		},
	});

//ice with lava pit training level
Levels.push({
	camera:{fixedCenter:true},
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
	],
	keys  :[
		{
			position:[50, 11.5],
		}
	],
	ices:[
		{
			position:[10,8],
			width   :80,
			height  :5,
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

	door  :{
		position:[95, 10],
		locks   :1,
	},
});

//jump ice with lava pit training level
Levels.push({
	camera:{fixedCenter:true},
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
	],

	ices:[
		{
			position:[20,15],
			width   :10,
			height  :1,
		},
		{
			position:[45,15],
			width   :10,
			height  :1,
		},



		{
			position:[60,22.5],
			width   :10,
			height  :1,
		},

		{
			position:[20,30],
			width   :10,
			height  :1,
		},
		{
			position:[45,30],
			width   :10,
			height  :1,
		},

		{
			position:[1,35],
			width   :10,
			height  :1,
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
			position:[5, 36.5],
		}
	],
	door  :{
		position:[95, 10],
		locks   :1,
	},
});

//harder side bounce training level
Levels.push({
	camera:{fixedCenter:true},
	entities:[
		{
			position:[0,40],
			width:10,
			height:10,
			type:'Floor',
		},
		{
			position:[10,40],
			width:1,
			height:10,
			type:'HSpring',
		},
		{
			position:[10,1],
			width:5,
			height:2,
			type:'Spring',
		},
		{
			position:[20,0],
			width:40,
			height:41,
			type:'Lava',
		},
		{
			position:[18,0],
			width:2,
			height:41,
			type:'Floor',
		},
		{
			position:[60,0],
			width:2,
			height:41,
			type:'Floor',
		},
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
			position:[70, 1.5],
		}
	],
	door  :{
		position:[95, 1],
		locks   :1,
	},
});

