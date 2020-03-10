function Input(processName, arrTime, cpuCycle) {
	this.processName = processName;
	this.arrTime= parseInt(arrTime);
	this.cpuCycle= parseInt(cpuCycle);
}

function Output(startTime, finishTime, taTime){
	this.startTime = parseInt(startTime);
	this.finishTime = parseInt(finishTime);
	this.taTime = parseInt(taTime);
}

var container = [];
var result = [];

//sort the objects by Arrival time
//for FCFS algorithm
function compareF(a, b){
	return a.arrTime - b.arrTime;
}

function compareS(a, b){
	return a.cpuCycle - b.cpuCycle;
}

function sjn(){

	container.sort(compareS);

	for(var i =0; i < container.length; i++)
	{
		var ft = container[i].arrTime + container[i].cpuCycle;
		if(i == 0)
		{
			result.push(new Output(container[i].arrTime, ft, ft - container[i].arrTime));
		}

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


function fcfs(){

	container.sort(compareF);

	for(var i =0; i < container.length; i++)
	{
		var ft = container[i].arrTime + container[i].cpuCycle;
		if(i == 0)
		{
			result.push(new Output(container[i].arrTime, ft, ft - container[i].arrTime));
		}

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
	alert("yo")
}


$(document).ready(function(){
	$("#sb").click(function(){
		var pn = $("#pn").val();
		var at = $("#at").val();
		var cpu = $("#cpu").val();

		container.push(new Input(pn, at, cpu));

	});

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