/* 
* Author: Kamyar Karimi 
* Describtion: This web app simulates CPU Scheduling algorithms
*				such as Round Robin, FCFS and SJN/SJF
* Date: 9/03/2020
 */


//user input default object constructor
function Input(processName, arrTime, cpuCycle) {
	this.processName = processName;
	//parseInt is needed in order for the input value to be treated as an integer, 
	// otherwise String.
	this.arrTime= parseInt(arrTime); 
	this.cpuCycle= parseInt(cpuCycle);
	this.ta = 0;
	this.ft = 0;
	this.st = 0;
}

//result output default object constructor
function Output(startTime, finishTime, taTime){
	this.startTime = parseInt(startTime);
	this.finishTime = parseInt(finishTime);
	this.taTime = parseInt(taTime);
}

var container = []; //array to store the input objects
var result = []; //array to store the output objects

//sort the objects by Arrival time
//for FCFS algorithm
function compareF(a, b){
	return a.arrTime - b.arrTime;
}

//Sort the objects by cpy cycle
//for SJN algorithm
function compareS(a, b){
	return a.cpuCycle - b.cpuCycle;
}

function sjn(){

	container.sort(compareS);

	//this for loop goes through ever user input and generates
	//data for table
	for(var i =0; i < container.length; i++)
	{
		var ft = container[i].arrTime + container[i].cpuCycle;

		//first object needs to be different since there are 
		//no precedent objects to be compared to
		if(i == 0) 
			result.push(new Output(container[i].arrTime, ft, ft - container[i].arrTime));

		//calculations for the generated data
		else
		{
			var ft2 = result[i - 1].finishTime + container[i].cpuCycle
			result.push(new Output(result[i - 1].finishTime, 
				result[i - 1].finishTime + container[i].cpuCycle, 
				ft2 - container[i].arrTime));
		}

		//jQuery method is simpler to use for the table to generate data
		$("tbody").append("<tr>" + "<td>" + container[i].processName +
						 "</td>" +
						 "<td>" + result[i].startTime+
						 "</td>" +
						 "<td>" + result[i].finishTime +
						 "</td>"+
						 "<td>" + result[i].taTime +
						 "</td>" + "</tr>");
	}
}


function fcfs(){

	container.sort(compareF);

	//this for loop goes through ever user input and generates
	//data for table
	for(var i =0; i < container.length; i++)
	{
		var ft = container[i].arrTime + container[i].cpuCycle;
		//first object needs to be different since there are 
		//no precedent objects to be compared to
		if(i == 0)
			result.push(new Output(container[i].arrTime, ft, ft - container[i].arrTime));

		else
		{
			var ft2 = result[i - 1].finishTime + container[i].cpuCycle
			result.push(new Output(result[i - 1].finishTime, 
				result[i - 1].finishTime + container[i].cpuCycle, 
				ft2 - container[i].arrTime));
		}


		$("tbody").append("<tr>" + "<td>" + container[i].processName +
						 "</td>" +
						 "<td>" + result[i].startTime+
						 "</td>" +
						 "<td>" + result[i].finishTime +
						 "</td>"+
						 "<td>" + result[i].taTime +
						 "</td>" + "</tr>");
	}
	
}

function roundRobin(){
	var qt = parseInt($("#quantum").val()); //time quantum

	container.sort(compareF);
	var temp = [];

	var done = false;

	while(temp.length != container.length)
	{
		for(var i =0; i < container.length; i++)
		{
			if((container[i].cpuCycle <= qt) && (i == 0) 
				&& (!temp.includes(container[i])))
			{
				console.log("first")
				container[i].st = container[i].arrTime;
				container[i].ft += container[i].st + container[i].cpuCycle;
				container[i].ta += container[i].ft - container[i].arrTime;
				temp.push(container[i]);
			}

			else if((container[i].cpuCycle <= qt) 
				&& (temp.length != 0)
				&& (!temp.includes(container[i])))
			{
				container[i].st = temp[i - 1].ft;
				container[i].ft += container[i].st + container[i].cpuCycle;
				container[i].ta += container[i].ft - container[i].arrTime;
				temp.push(container[i]);
			}

			else if(container[i].cpuCycle > qt)
			{
				container[i].cpuCycle -= qt;
				container[i].ta += qt;
				container[i].ft += qt;
			}
			
		}
	}

	temp.sort(compareF);

	console.log(temp)

	for(var j = 0; j < container.length; j++)
	{
		console.log(temp[j])
		$("tbody").append("<tr>" + "<td>" + container[j].processName +
						 "</td>" +
						 "<td>" + temp[j].st+
						 "</td>" +
						 "<td>" + temp[j].ft +
						 "</td>"+
						 "<td>" + temp[j].ta +
						 "</td>" + "</tr>");
	}
}


$(document).ready(function(){
	//this function restores the input data and creates an input object
	//in order to push it into the container array.
	$("#sb").click(function(){
		var pn = $("#pn").val();
		var at = $("#at").val();
		var cpu = $("#cpu").val();

		container.push(new Input(pn, at, cpu));

	});

	//resets the form inputs so the user can append a new input object
	$("#add").click(function(){
		$("#pn").val("");
		$("#at").val('');
		$("#cpu").val('');
	});

	$("#tog1").click(function(){
		$("table").fadeIn();
	});

	$("#tog2").click(function(){
		$("table").fadeIn();
	});

	$("#tog3").click(function(){
		$("table").fadeIn();
	});

	$(".form-check-input").click(function(){
		if(this.checked)
			$("#quantum").prop('disabled', false);
		else
			$("#quantum").prop('disabled', true);
	})
});