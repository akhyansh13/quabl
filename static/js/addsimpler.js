$(document).ready(function(){

	$('.dropdown-menu').each(function(){
		$(this).attr('style', "max-width:450px; min-width:450px; width:450px; min-height:" + screen.height + "px; max-height:" + screen.height + "px; height:450" + screen.height + "px;");
	});

	$(".addsimp").click(function(){					//add simpler button code [AJAX].
		var simpler_id = $(this).attr('id');
		var post_id = $(this).attr("data");
		var backsimplerid = $(this).attr('value');
		var simpler_textarea_id = 'simp'+ simpler_id;
		var simpler_text = editor.getHTML();
		$.get(('/makesimpler/'),{simpler_id:simpler_id, simpler_text:simpler_text, post_id:post_id,}, function(){
			uri = '/request/addsimpler/postid:' + post_id + ';simplerid:'  + backsimplerid + ';/';
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