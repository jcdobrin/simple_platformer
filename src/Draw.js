function lineFromPoints(context, p, scale)
{
	if(scale == undefined)
		scale = 1;
	context.moveTo(p[0][0]*scale, p[0][1]*scale);
	for(var i =1; i< p.length; i++)
	{
		context.lineTo(p[i][0]*scale, p[i][1]*scale);
	}
	context.stroke();
}

function createLineFromPoints(context, p0,p1)
{
	return [
		[p0[0], p0[1]],
		[p1[0], p1[1]],
	];
}