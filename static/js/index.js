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
	});

	$("#cfeed").click(function(){
		$("#afeed").show();
		$("#ocont").hide();
	});

	$(".viewcont").click(function(){
		window.location = '/sutton/' + $(this).closest(".afeedel").find(".activityques").data("parent");
	});

	$(".coursenav").not('#linksnav').click(function(){
		$(".coursenav").not(this).css('border-bottom', 'none');
		$(this).css('border-bottom', '4px solid #FFA500');
	});

	setTimeout(function(){
		$.get(('/lastseen/'));
	}, 1000);

	$(".activityques a").click(function(){
		window.location = '/question/' + $(this).closest(".activityques").data("id");
	});

	$.when(openquabls()).then(function(){
		$(".highlight_dummy").each(function(){
			var otop = $(this).offset().top;
			$(this).closest(".afeedel").find(".floatques").offset({top:otop-5});
		});
	});
}); //document.ready closed.

function blink(selector){
	$(selector).fadeOut('slow', function(){
		$(this).fadeIn('slow', function(){
			blink(this);
		});
	});
}

function openquabls(){
	var defer = $.Deferred();
	$(".context").each(function(){
		var hp = $(this).closest(".afeedel").find('.floatques').data('hp');
		$(this).find(".highlight").each(function(){
			if($(this).data('id')!=hp){
				$(this).hide();
			}
			else{
				$this = $(this);
				var quabl_text = $this.find('.html').html();
				var simpler_html = $this.closest(".context").html();
				var h_html = $('<div>').append($this.clone()).html();
				var h_html_dummy = h_html.replace('class="highlight"', 'class="highlight_dummy"')
				var new_simpler_html = simpler_html.replace(h_html + quabl_text, '<span class="quabl_full">' + h_html_dummy + quabl_text + '</span>').replace('class="highlight"', '');
				$this.closest(".context").empty().append(new_simpler_html);
			}
		});
	});
	setTimeout(function(){
		defer.resolve();
	},1000);

	return defer;
}
