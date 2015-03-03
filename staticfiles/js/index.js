$(document).ready(function(){

	$(".jimp").click(function(){
		$.get(('/enotif/jimp'), function(data){
			$("#enotifset").html('Settings have been updated.');
		});
	});

	$(".all").click(function(){
		$.get(('/enotif/all'), function(data){
			$("#enotifset").html('Your settings have been updated.');
		});
	});

	$("img").each(function(){
		$(this).attr("src", $(this).data('original'));
	});

	$(".up").each(function(){
		var $up = $(this);
		var aans = $up.closest('.afeedel').find(".activityans");
		if(!(aans.html())){
			var id = $up.closest('.afeedel').find('.activityques').data('id');
			$.get(('/ucheck/ques/' + id), function(data){
				if(data == 'upvoted'){
					$up.empty().append('Upvoted Question');
					$up.css('opacity', '0.5');
				}
				else if(data=='unupvoted'){
					$up.empty().append('Upvote Question');
					$up.css('opacity', '1');
				}
			});
		}
		else{
			var id = $up.closest('.afeedel').find('.activityans').data('ansid');
			var upnum = parseInt($up.closest(".upnumup").find('.upnum').html());
			$.get(('/ucheck/ans/'+ id), function(data){
				if(data == 'upvoted'){
					if(upnum == 1){
						$up.html('Upvoted Answer (1 Upvote)');
					}
					else{
						$up.html('Upvoted Answer ('+ upnum +' Upvotes)');
					}
					$up.css('opacity', '0.5');

				}
				else{
					if(upnum == 1){
						$up.html('Upvote Answer (1 Upvote)');
					}
					else{
						$up.html('Upvote Answer ('+ upnum +' Upvotes)');
					}
					$up.css('opacity', '1');

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
					$up.empty().append('Upvoted Question');
					$up.css('opacity', '0.5');
				}
				else if(data=='unupvoted'){
					$up.empty().append('Upvote Question');
					$up.css('opacity', '1');
				}
			});
		}
		else{
			var id = $(this).closest('.afeedel').find('.activityans').data('ansid');
			var upnum =	parseInt($up.closest(".upnumup").find('.upnum').html());

			$.get(('/upvote/ans/'+ id), function(data){
				if(data == 'upvoted'){
					$up.css('opacity', '0.5');
					$up.closest('.upnumup').find('.upnum').html(upnum+1);
					if(parseInt($up.closest('.upnumup').find('.upnum').html())==1){
						$up.html('Upvoted Answer (1 Upvote)');
					}
					else{
						$up.html('Upvoted Answer ('+ $up.closest('.upnumup').find('.upnum').html() +' Upvotes)');
					}
				}
				else{
					$up.css('opacity', '1');
					$up.closest('.upnumup').find('.upnum').html(upnum-1);
					if(parseInt($up.closest('.upnumup').find('.upnum').html())==1){
						$up.html('Upvote Answer (1 Upvote)');
					}
					else{
						$up.html('Upvote Answer ('+ $up.closest('.upnumup').find('.upnum').html() +' Upvotes)');
					}
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
		$("#linkspage").hide();
		$("#ocont").show();
	});

	$("#cfeed").click(function(){
		$("#afeed").show();
		$("#ocont").hide();
		$("#linkspage").hide();
	});

	$("#linksnav").click(function(){
		$("#afeed").hide();
		$("#ocont").hide();
		$("#linkspage").show();
		$("#contentind").hide("fast");
	});

	$(".viewcont").click(function(){
		if(parseInt($(this).data('coef'))>=1){
			window.location = '/question/' + $(this).data("q");
		}
		else{
			var id = parseInt($(this).closest(".afeedel").find(".activityques").data("parent"));
			if(id<1134){
				window.location = '/sutton/' + id;
			}
			else if(id >= 1134 && id <= 1466){
				window.location = '/sutton1/' + id;
			}
			else if(id >= 1469 && id <= 1826){
				window.location = '/sutton2/' + id;
			}
		}
	});

	$(".coursenav").click(function(){
		$(".coursenav").not(this).css('border-bottom', 'none');
		$(this).css('border-bottom', '4px solid #FFA500');
	});

	setTimeout(function(){
		$.get(('/lastseen/'));
	}, 1000);

	$(".activityques").click(function(){
		window.location = '/question/' + $(this).data("id");
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
