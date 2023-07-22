function lineIntersection(p0, p1, p2, p3)
{
	var x, y, s, t;
	var x1 = p0[0];
	var y1 = p0[1];

	var x2 = p1[0];
	var y2 = p1[1];

	var A1 = y2 - y1;
	var B1 = x1 - x2;
	var C1 = A1*x1 + B1*y1;


	var x3 = p2[0];
	var y3 = p2[1];

	var x4 = p3[0];
	var y4 = p3[1];



	var A2 = y4 - y3;
	var B2 = x3 - x4;
	var C2 = A2*x3 + B2*y3;



	var determinant = A1 * B2 - A2 * B1;

	if(determinant == 0)
	{

	}
	else
	{
		x = ((B2 * C1) - B1 * C2) / determinant;
		y = ((A1 * C2) - (A2 * C1)) / determinant;
	}
	if(x <= Math.max(x1,x2) && x >= Math.min(x1,x2)
		&& x <= Math.max(x3,x4) && x >= Math.min(x3,x4))
	{
		if(y <= Math.max(y1,y2) && y >= Math.min(y1,y2)
			&& y <= Math.max(y3,y4) && y >= Math.min(y3,y4))
		{
			return 1;
		}
	}
	return 0;

	var s1 = [B1, A1];
	var s2 = [B2, A2];

	var det = (B1 * A2 - B2 * A1);
	if(det == 0)
	{
		return 0;
	}

	if(det != 0)
	{
		s = ( B1 * (y1 - y3) - A1 * (x1 - x3)) / det;
		t = ( B2 * (y1 - y3) - A2 * (x1 - x3)) / det;
	}

	if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
	{
		//if (i_x != NULL)
		//	*i_x = p0_x + (t * s1_x);
		//if (i_y != NULL)
		//	*i_y = p0_y + (t * s1_y);
		return 1;
	}

	return 0;
}

function distanceCollision(pos1, radius1, pos2, radius2)
{
	var distanceX = pos1[0] - pos2[0];
	var distanceY = pos1[1] - pos2[1];

	var distanceSq = Math.pow(distanceX,2) + Math.pow(distanceY,2);

	var radiusSq = Math.pow( (radius1 + radius2), 2);
	if(distanceSq <= radiusSq)
	{
		return true;
	}

	return false;
}

function AABB(pos1, w1, h1, pos2, w2, h2)
{
	if(
		pos1[0]    < pos2[0] + w2 &&
		pos1[0]+w1 > pos2[0]      &&

		pos1[1]    < pos2[1] + h2 &&
		pos1[1]+h1 > pos2[1]
	)
		return true;
	return false;
}

function MinkoskiSweep(pos1, vel1, dim1, pos2, vel2, dim2, tMin)
{
	var minkoskiDiameter =  add(dim1 , dim2);

	var P1Delta = add(pos1, multiply(dim1, 0.5));
	var P2Delta = add(pos2, multiply(dim2, 0.5));

	var MinCorner = add(P2Delta , multiply(minkoskiDiameter , -0.5));
	var MaxCorner = add(P2Delta , multiply(minkoskiDiameter ,  0.5));
	var Rel = subtract(add(P1Delta, vel1), add(pos2, vel2));
	var Walls = [{
					X     :MinCorner[0],
					RelX  :Rel[0],
					RelY  :Rel[1],
					DeltaX:P1Delta[0],
					DeltaY:P1Delta[1],
					MinY  :MinCorner[1],
					MaxY  :MaxCorner[1],
					Normal:[-1,0]
				},{
					X     :MaxCorner[0],
					RelX  :Rel[0],
					RelY  :Rel[1],
					DeltaX:P1Delta[0],
					DeltaY:P1Delta[1],
					MinY  :MinCorner[1],
					MaxY  :MaxCorner[1],
					Normal:[1,0]
				},{
					X     :MinCorner[1],
					RelX  :Rel[1],
					RelY  :Rel[0],
					DeltaX:P1Delta[1],
					DeltaY:P1Delta[0],
					MinY  :MinCorner[0],
					MaxY  :MaxCorner[0],
					Normal:[0,-1]
				},{
					X     :MaxCorner[1],
					RelX  :Rel[1],
					RelY  :Rel[0],
					DeltaX:P1Delta[1],
					DeltaY:P1Delta[0],
					MinY  :MinCorner[0],
					MaxY  :MaxCorner[0],
					Normal:[0,1]
				}];

	var tMinTest = tMin;
	var Hit = false;
	var TestWallNormal = false;
	for(var WallIndex = 0;WallIndex<Walls.length;++WallIndex)
	{
		var Wall = Walls[WallIndex];
		if(Wall.DeltaX != 0.0)
		{
			//calculate how long it would take to intercept the line segment
			var tResult = (Wall.X - Wall.RelX) / (Wall.DeltaX);

			//calculate the position that we intersect in the wall
			var Y = Wall.RelY + tResult * Wall.DeltaY;

			if(tMinTest > tResult && tResult >= 0)
			{
				var tEpsilon = 0.1;
				if((Y >= Wall.MinY && Y <= Wall.MaxY))
				{
					tMinTest = Math.max(0.0, tResult-tEpsilon);
					TestWallNormal = Wall.Normal;
					Hit = true;
				}
			}
		}
	}

	if(Hit)
	{
		return {
			tMin:tMinTest,
			normal:TestWallNormal
		}
	}

	return false;
}

function PointInsideBox(pos, dim, point)
{
	var x = point[0];
	var y = point[1];

	if(x < pos[0] || x > pos[0]+dim[0] ||
	   y < pos[1] || y > pos[1]+dim[1])
	{
		return false;
	}
	return true;
}

function RayCast(ray, pos, w, h)
{
	return AABB(
		ray[0],
		ray[1][0] - ray[0][0],
		ray[1][1] - ray[0][1],
		pos,
		w,
		h
	);
}

const COLLISION = {
	NONE:0,
	CAN_BE_HIT:1<<1,
	KILL      :1<<2,
	COLLIDES  :1<<3,
	INTERACT  :1<<4,
	HSPRING   :1<<5,
	VSPRING   :1<<6,
	SLIDE     :1<<7,
};

function addCollisionVolumeByEntity(entity)
{
	switch(entity.type)
	{
		case 'Lava':{
			addCollisionVolume(entity, entity.width, entity.height, COLLISION.KILL);
		}break;
		case 'HSpring':{
			addCollisionVolume(entity, entity.width, entity.height, COLLISION.HSPRING);
		}break;
		case 'Spring':{
			addCollisionVolume(entity, entity.width, entity.height, COLLISION.VSPRING);
		}break;
		default:
		{
			addCollisionVolume(entity, entity.width, entity.height, COLLISION.COLLIDES);
		}break;
	}
}

function addCollisionVolume(entity, w, h, type)
{
	if(typeof entity.volumes == 'undefined')
	{
		entity.volumes = [];
	}
	var volume = {
		dimension: [w,h],
		type: type,
		offset:[0,0]
	};

	createCollisionVolumeBuffer(volume)

	entity.volumes.push(volume);

	return volume;
}