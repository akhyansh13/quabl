$(document).ready(function(){
	$(".checkedhigh").hide();
	var count = parseInt($('.elevator').attr('id'));
	var current = parseInt($('.elevator').attr('data'));
	var urx = $('.elevator').attr('value');
	if (current > 0 && current < count - 1){
		$('#preid').html(current.toString());
		$('#nextid').html((count - current - 1).toString());
		$('.previous').attr('href', urx + (current - 1).toString());
		$('.next').attr('href', urx + (current + 1).toString());
	}
	else if (current == 0 && count == 1){
		$('#preid').html(current.toString());
		$('#nextid').html((count - current - 1).toString());
		$('.previous').removeAttr('href');
		$('.next').removeAttr('href');
		$('.previous').attr('style', "font-size:14pt; text-align:left; color:grey; text-decoration:none;");
		$('.next').attr('style', "font-size:14pt; text-align:left; float:right; color:grey; text-decoration:none;");
	}
	else if (current == 0){
		$('#preid').html(current.toString());
		$('#nextid').html((count - current - 1).toString());
		$('.previous').removeAttr('href');
		$('.previous').attr('style', "font-size:14pt; text-align:left; color:grey; text-decoration:none;");
		$('.next').attr('href', urx + (current + 1).toString());
	}
	else if (current == count - 1){
		$('#preid').html(current.toString());
		$('#nextid').html((count - current - 1).toString());
		$('.previous').attr('href', urx + (current - 1).toString());
		$('.next').removeAttr('href');
		$('.next').attr('style', "font-size:14pt; text-align:left; float:right; color:grey; text-decoration:none;");
	}
	
	$(".addsimp-toggle").click(function(){		//toggles simpler addition text area.
		$(this).parent().parent().parent().find(".simpler-textarea").toggle("slow");
	});
	
	$(".addsimp").click(function(){					//add simpler button code [AJAX].
		var simpler_id = $(this).attr('id');
		var post_id = $(this).attr("data");
		
		var simpler_textarea_id = 'simp'+ simpler_id;
		var simpler_text = CKEDITOR.instances[simpler_textarea_id].getData();
		$.get(('/makesimpler/'),{simpler_id:simpler_id, simpler_text:simpler_text, post_id:post_id,}, function(data){
			location.reload();
		});
	});
});