$(document).ready(function(){

	$(".checkedhigh").hide();

	$(".addsimp-toggle").click(function(){		//toggles simpler addition text area.
		$(this).parent().parent().parent().find(".simpler-textarea").toggle("slow");
	});

	$(".addsimp").click(function(){					//add simpler button code [AJAX].
		var simpler_id = $(this).attr('id');
		var post_id = $(this).attr("data");
		var backsimplerid = $(this).attr('value');
		var simpler_textarea_id = 'simp'+ simpler_id;
		var simpler_text = CKEDITOR.instances[simpler_textarea_id].getData();
		$.get(('/makesimpler/'),{simpler_id:simpler_id, simpler_text:simpler_text, post_id:post_id,}, function(){
			uri = '/request/back_to_post/postid:' + post_id + ';simplerid:'  + backsimplerid + ';/';
    		window.location.href = uri;
		});
	});
	
	$('.back').click(function(){
		var postid = $(this).attr('data');
		var simplerid = $(this).attr('id');
		uri = "/request/back_to_post/postid:" + postid + ";simplerid:"  + simplerid + ";/";
		window.location.href = uri;
	});
});