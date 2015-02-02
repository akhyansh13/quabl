$(document).ready(function(){

	$(".up").each(function(){
		var $up = $(this);
		var aans = $up.closest('.afeedel').find(".activityans");
		if(!(aans.html())){
			var id = $up.closest('.afeedel').find('.activityques').data('id');
			$.get(('/ucheck/ques/' + id), function(data){
				if(data == 'upvoted'){
					$up.empty().append('Un-Upvote');
				}
				else if(data=='unupvoted'){
					$up.empty().append('Upvote');
				}
			});
		}
		else{
			var id = $up.closest('.afeedel').find('.activityans').data('ansid');
			$.get(('/ucheck/ans/'+ id), function(data){
				if(data == 'upvoted'){
					$up.html('Un-Upvote');
				}
				else{
					$up.html('Upvote');
				}
			});
		}
	});

	$(document).on('click', '.up', function(){
		var $up = $(this);
		var aans = $(this).closest('.afeedel').find('.activityans');
		if(!(aans.html())){
			var id = $(this).closest('.afeedel').find('.activityques').data('id');
			$.get(('/upvote/ques/' + id), function(data){
				if(data == 'upvoted'){
					$up.empty().append('Un-Upvote');
				}
				else if(data=='unupvoted'){
					$up.empty().append('Upvote');
				}
			});
		}
		else{
			var id = $(this).closest('.afeedel').find('.activityans').data('ansid');
			$.get(('/upvote/ans/'+ id), function(data){
				if(data == 'upvoted'){
					$up.html('Un-Upvote');
				}
				else{
					$up.html('Upvote');
				}
			});
		}
		return false;
	});


	window.clickonques = false;

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

}); //document.ready closed.

function blink(selector){
	$(selector).fadeOut('slow', function(){
		$(this).fadeIn('slow', function(){
			blink(this);
		});
	});
}
