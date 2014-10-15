$(document).ready(function(){

	var color = 1;
	$(".posttopic").each(function(){
		if (color%3==1){
			$(this).css("background-color","LightYellow");
		}
		else if (color%3==2){
			$(this).css("background-color","LightGreen");
		}
		else{
			$(this).css("background-color","Orange");			
		}
		color = color + 1;
	});

	$(".posttopic").css("font-size","16pt");

	$(".posttopic").css("color","#777");

	$(".postlink").each(function(){
		var height = $(this).height();
		$(this).parent().find(".posttopic").height(height-20);
	});

	$(".topicname").attr("style","position: relative; top: 30%;");

	$(".hidtopic").each(function(){
		var topic = $(this).html();
		$(this).parent().parent().find(".topicname").html(topic);	
	});

	var postbw = $(".postbox").width();

	$(".topicbox").width(postbw*0.35);

	var addpostbtnh = $(".addpostbtn").height();

	$(".topicbox").height(addpostbtnh);

	$(".topicbox").attr("placeholder", "Topic here.");
	$(".postbox").attr("placeholder", "Got a question or anything else that you had trouble understanding?");
	
	$(".addpostbtn").attr("disabled", "disabled");
	$(".postbox, .topicbox").click(function(){
		$(".addpostbtn").removeAttr("disabled");
	});

	$(".simnum").each(function(){
		var content = $(this).html();
		var id = String(content.split("-")[0]);
		var number = String(content.split("-")[1]);
		if(parseInt(number)==1){
			$("#"+id).html(number + " Simpler | ");
		}
		else{
			$("#"+id).html(number + " Simplers | ");
		}
	});

});