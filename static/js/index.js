$(document).ready(function(){

	window.clickonques = false;

	$(".question-area").each(function(){
			var nques = $(this).find(".ques").length;
			var nquabls = $(this).closest(".contqueswrapper").find('.highlight').length

			if(nquabls == 0){
				$(this).closest(".contqueswrapper").remove();
			}

			if (nquabls == 1) {
				if(nques == 1){
					$(this).find('.nums').html("1 Quabl, 1 Question.");
				}
				else{
					$(this).find('.nums').html("1 Quabl, " + nques + " Questions.");
				}
			}
			else {
				$(this).find('.nums').html(nquabls + " Quabls, " + nques + " Questions.");
			}
	});

	$(".contqueswrapper").each(function(){
		var offset = $(this).find(".context").offset();
		$(this).find(".question-area").offset({top:offset.top});
	});

	$(".footer").hide();

	var onehview = false;

	blink("#loaddot");
	setTimeout(function(){
		$("#loaddot").remove();
		$(".container").show();
		$(".header").show();
	},1000);

	$("#linksnav").click(function(){
		$("#linkcontainer").toggle();
	});

	$("#suttonlink").click(function(){
		window.location = '/sutton/';
	});
}); //document.ready closed.

function blink(selector){
	$(selector).fadeOut('slow', function(){
		$(this).fadeIn('slow', function(){
			blink(this);
		});
	});
}
