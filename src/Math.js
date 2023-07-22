function normalize(v)
{
	var temp = [0,0];
	var mag = Math.sqrt((v[0]*v[0]) + (v[1]*v[1]));
	temp[0] = v[0] / mag;
	temp[1] = v[1] / mag;
	return temp;
}

function inner(p0, p1)
{
	return p0[0]*p1[0] + p0[1]*p1[1];
}

function translatePoint(p, x, y)
{
	return [
		p[0] + x,
		p[1] + y,
	];
}

function subtractVal(p0, s)
{
	return [
		p0[0] - s,
		p0[1] - s
	];
}

function subtract(p0,p1)
{
	return [
		p0[0] - p1[0],
		p0[1] - p1[1]
	];
}

function add(p0,p1)
{
	return [
		p0[0] + p1[0],
		p0[1] + p1[1]
	];
}

function multiply(p0,s)
{
	return [
		p0[0] * s,
		p0[1] * s
	];
}

function hadamard(p0, p1)
{
	return [
		p0[0] * p1[0],
		p0[1] * p1[1]
	];
}

function normalVector(p)
{
	return [
		-p[1],
		p[0]
	];
}

function rotatePoint(p, angle)
{
	return [
		p[0] * Math.cos(angle) + p[1] * Math.sin(angle),
		p[1] * Math.cos(angle) - p[0] * Math.sin(angle)
	];
}