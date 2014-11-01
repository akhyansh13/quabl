$(document).ready(function(){

	$('#dropdown-notifications').each(function(){
		$(this).attr('style', "max-width:450px; min-width:450px; width:450px; min-height:" + screen.height + "px; max-height:" + screen.height + "px; height:450" + screen.height + "px;");
	});


	$(document).keyup(function(){
		if (!$(".postbox").val()||!$(".topicbox").val()) {
	    	$(".addpostbtn").attr("disabled", "disabled");
		} 
		else {
	    $(".addpostbtn").removeAttr("disabled");
		}		
	});

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

	$(".folbtn").click(function(){		//AJAX request for follow/unfollow button.
		var post_id = $(this).attr('data');
		$.get(('/follow/'), {post_id:post_id});	
	});

	$(".folbtn").click(function(){		//This function inverts between 'Unfollow' or 'Follow'
		var $this = $(this);
		var state = $this.attr("class").split(" ")[1];
		if(state == 'unfollowstate'){
				$this.html('Follow');
				$this.removeClass('unfollowstate');
				$this.addClass('followstate');
			}
			else{
				$this.html('Unfollow');
				$this.removeClass('followstate');
				$this.addClass('unfollowstate');
			}
	});
});