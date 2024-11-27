//start off on mercator
$('#map2').hide();
$('#map2info').hide();
$('#map3').hide();

//mercator
$('#proj1').click(function(){
	$("#proj1").removeClass("btn-light");
	$("#proj1").addClass("btn-secondary");
	$("#proj2").removeClass("btn-secondary");
	$("#proj2").addClass("btn-light");
	$("#proj3").removeClass("btn-secondary");
	$("#proj3").addClass("btn-light");
	$('#map').show();
	$('#map2').hide();
	$('#map2info').hide();
	$('#map3').hide();
});

//Arctic
$('#proj2').click(function(){
	$("#proj1").addClass("btn-light");
	$("#proj1").removeClass("btn-secondary");
	$("#proj2").addClass("btn-secondary");
	$("#proj2").removeClass("btn-light");
	$("#proj3").removeClass("btn-secondary");
	$("#proj3").addClass("btn-light");
	$('#map').hide();
	$('#map2').show();
	$('#map2info').show();
	$('#map3').hide();
});

//Antarctic
$('#proj3').click(function(){
	$("#proj1").addClass("btn-light");
	$("#proj1").removeClass("btn-secondary");
	$("#proj2").removeClass("btn-secondary");
	$("#proj2").addClass("btn-light");
	$("#proj3").addClass("btn-secondary");
	$("#proj3").removeClass("btn-light");
	$('#map').hide();
	$('#map2').hide();
	$('#map2info').hide();
	$('#map3').show();
});