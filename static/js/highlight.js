$(document).ready(function(){

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