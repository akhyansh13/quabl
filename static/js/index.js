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

	$("#overview").click(function(){
		$("#afeed").hide();
		$("#ocont").show();
		$(this).css('border-botttom', '4px solid #FFA500');
	});

	$("#cfeed").click(function(){
		$("#afeed").show();
		$("#ocont").hide();
	});

	$(".viewcont").click(function(){
		window.location = '/sutton/' + $(this).closest(".afeedel").find(".activityques").data("parent");
	});

	$('.afeedel').each(function(){
		var afd = $(this);
		var aans = $(this).find('.activityans');
		if(!(aans.html())){
			var id = aans.data('ansid');
			$.get(('/ucheck/ans/'+ id), function(data){
				if(data=='y'){
					afd.find('.up a').html('Un-Upvote');
				}
				else{
					afd.find('.up a').html('Upvote');
				}
			});
		}
		else{
			var id = afd.find('.activityques').data('id');
			$.get(('/ucheck/ques/'+ id), function(data){
				if(data=='y'){
					afd.find('.up a').html('Un-Upvote');
				}
				else{
					afd.find('.up a').html('Upvote');
				}
			});
		}
	});

	$(document).on('click', '.up', function(){
		var $up = $(this);
		var aans = $(this).closest('.afeedel').find('.activityans');
		if(!(aans.html())){
		 var id = $(this).closest('.afeedel').find('.activityques').data('id');
		 $.get(('/upvote/ques/'+id), function(data){
			if(data == 'upvoted'){
				$up.html('<a href="javascript:;">Un-Upvote</a>');
				}
				else{
					$up.html('<a href="javascript:;">Upvote</a>');
				}
			});
		}
		else{
			var id = $(this).closest('.afeedel').find('.activityans').data('ansid');
			$.get(('/upvote/ans/'+id), function(data){
				if(data == 'upvoted'){
					$up.html('<a href="javascript:;">Un-Upvote</a>');
				}
				else{
					$up.html('<a href="javascript:;">Upvote</a>');
				}
			});
		}
	});

}); //document.ready closed.

function blink(selector){
	$(selector).fadeOut('slow', function(){
		$(this).fadeIn('slow', function(){
			blink(this);
		});
	});
}
