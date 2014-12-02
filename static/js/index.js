$(document).ready(function(){

	$(".addpostbtn").click(function(){
		var txt = '<p>' + $(".contextbox").val() + '</p>';
		$.get(('/addpost/'), {txt:txt}, function(data){
			window.location = '/simpler/' + data + '/';
		});
	});

	$('#dropdown-notifications').each(function(){
		$(this).attr('style', "max-width:450px; min-width:450px; width:450px; min-height:" + screen.height + "px; max-height:" + screen.height + "px; height:450" + screen.height + "px;");
	});


	$(document).keyup(function(){
		if (!$(".contextbox").val()) {
	    	$(".addpostbtn").attr("disabled", "disabled");
		} 
		else {
	    $(".addpostbtn").removeAttr("disabled");
		}		
	});

	$(".postlink").each(function(){
		var height = $(this).height();
		$(this).parent().find(".posttopic").height(height-20);
	});

	//$(".topicname").attr("style","position: relative; top: 30%; font-size:16pt; color:#777;");

	/*$(".hidtopic").each(function(){
		var topic = $(this).html();
		$(this).parent().parent().find(".topicname").html('<i>' + topic + '</i><span style="font-size:12pt;">&nbsp;TOPIC</span>');	
	});
	$(".hidtopic2").each(function(){
		var topic = $(this).html();
		$(this).parent().parent().find(".topicname").html(topic);	
	});*/


	$(".contextbox").attr("placeholder", "Post something adequately complex here.");

	//$(".simnum").each(function(){
	//	var content = $(this).html();
	//	var id = String(content.split("-")[0]);
	//	var number = String(content.split("-")[1]);

	//	if(parseInt(number)==0){
	//		$("#"+id).html("No Answers Yet.");			
	//	}

	//	else if(parseInt(number)==1){
	//		$("#"+id).html("1 Answer.");
	//	}
	//	else{
	//		$("#"+id).html(number + " Answers.");
	//	}
	//});

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