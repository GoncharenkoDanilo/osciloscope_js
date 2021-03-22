function sleep(ms) 
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

function check()
{
	var checkbox1 = document.getElementById("checkbox1");
	var checkbox2 = document.getElementById("checkbox2");
	if (checkbox1.checked && checkbox2.checked)
		drawSignal();
	else if (!checkbox1.checked && checkbox2.checked)
		drawNoSignal();
}

function clearDisplayContext(display)
{
	display.clearRect(0,0,300,240);
	display.restore();
	net();
}

async function drawNoSignal()
{
	var x=0;
	var display=document.getElementById("display");
	var context=display.getContext("2d");
	var checkbox1 = document.getElementById("checkbox1");
	var checkbox2 = document.getElementById("checkbox2");

	while (x <= 300)
	{
		var width = document.getElementById("width").value;
		var color = document.getElementById("color").value;
		clearDisplayContext(context);
		context.beginPath();
        context.arc(x, 120, width, 0, Math.PI*2, false);
        context.closePath();
        context.fillStyle = color;
		context.fill();
        x++;

        await sleep(10);

        if (x == 300)
			x = 0;

		if (!checkbox1.checked && checkbox2.checked);
			else {clearDisplayContext(context); break;}
	}	
}

async function drawSignal()
{
	var checkbox1 = document.getElementById("checkbox1");
	var checkbox2 = document.getElementById("checkbox2");

	var x=0; var y;
	var x1 = 0;
	var display = document.getElementById("display");
	var context = display.getContext("2d");

	while (x <= 300)
	{
		var color = document.getElementById("color").value;
		var width = document.getElementById("width").value;
		var A = document.getElementById("amplitude").value;
		var f = document.getElementById("frequency").value;
		var Tp = document.querySelector('input[name="time"]:checked').value;
		var Tx = 300/(f*Tp);

		context.beginPath();
		y = 120-A*(x-x1)/Tx;
		context.moveTo(x,y);
		x++;

		if (x <= x1+Tx)
		{
			y = 120-A*(x-x1)/Tx;
			context.lineTo(x,y);
		}

		else
		{
			y = 120;
			context.lineTo(x,y);
			x1 += Tx;
		}

		context.strokeStyle=color;
		context.lineWidth=width;
		context.stroke();

		await sleep(10);

		if (x == 300)
		{
			x = 0;
			x1 = 0;
			clearDisplayContext(context);
		}

		if (checkbox1.checked && checkbox2.checked);
			else {clearDisplayContext(context); break;}
	}
}

function net()
{
	var x=0; var y=0;
	var canv=document.getElementById("display");
	var con=canv.getContext("2d");

	while(y <= 240)
	{
		con.beginPath();
		con.moveTo(0,y);
		con.lineTo(300,y);
		if(y == 120){con.lineWidth=2}else{con.lineWidth=1};
		con.strokeStyle="#ffffff";
		con.stroke();
		y+=30;
	}

	y=0; x=0;

	while(x<=300)
	{
		con.beginPath();
		con.moveTo(x,0);
		con.lineTo(x,240);
		if(x==150){con.lineWidth=2}else{con.lineWidth=1};
		con.strokeStyle="#ffffff";
		con.stroke();
		x+=30;
	}
} 

