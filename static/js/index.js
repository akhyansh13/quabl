$(document).ready(function(){
	$(".footer").hide();

	var onehview = false;

	$(".addpostbtn").click(function(){
		var txt = '<p>' + $(".contextbox").val() + '</p>';
		$.get(('/addpost/'), {txt:txt}, function(data){
			window.location = '/context/' + data + '/';
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


	$(".contextbox").attr("placeholder", "Read something too complex to understand? Post it here!");

	$(".simnum").each(function(){
		var content = $(this).html();
		var id = String(content.split("-")[0]);
		var nquabls = String(content.split("-")[1]);
		var nques = String(content.split("-")[2]);

		if (nquabls == 1 && nques == 1) {
			$("#" + id).html("1 Quabl, 1 Question.");
		}
		else if (nquabls == 1) {
			$("#" + id).html("1 Quabl, " + nques + " Questions.");
		}
		else if (nques == 1) {
			$("#" + id).html(nquabls + " Quabls, 1 Question.");
		}
		else {
			$("#" + id).html(nquabls + " Quabls, " + nques + " Questions.");
		}

		/*if(parseInt(number)==0){
			$("#"+id).html("No Answers Yet.");
		}

		else if(parseInt(number)==1){
			$("#"+id).html("1 Answer.");
		}
		else{
			$("#"+id).html(number + " Answers.");
		}*/
	});

	$('.contextstats').each(function() {
		var context_id = $(this).attr('id');
		var $this = $(this);

		$('.context').each(function() {
			if ($(this).attr('data') == context_id) {
				var offset = $(this).offset();
				$this.offset({top:offset.top});
			}
		});
	})

	$(".folbtn").click(function(){		//AJAX request for follow/unfollow button.
		var post_id = $(this).attr('data');
		$.get(('/follow/'), {post_id:post_id});
	});

	$(".folbtn").click(function(){		//This function inverts between 'Unfollow' or 'Follow'
		var $this = $(this);
		var state = $this.attr("class").split(" ")[1];
		if(state == 'unfollowstate'){
				$this.html('Pin This Context');
				$this.removeClass('unfollowstate');
				$this.addClass('followstate');
			}
			else{
				$this.html('Unpin This Context');
				$this.removeClass('followstate');
				$this.addClass('unfollowstate');
			}
	});

	$(document).on("click",".highlight", function(){

		$this = $(this);

		$.when(simpler_cache($this.closest(".context"))).then(function(){

			highlight_parent = $this.closest(".context");
			var quabl_text = $this.data('text');
			var h_id = $this.data('id');
			$this.closest(".context").find(".highlight").not($this).remove();
			var simpler_html = $this.closest(".context").html();
			var h_html = $('<div>').append($this.clone()).html();
			var h_html_dummy = h_html.replace('class="highlight"', 'class="highlight_dummy"');
			var new_simpler_html = simpler_html.replace(h_html + quabl_text, '<span class="quabl_full">' + h_html_dummy + quabl_text + '</span>');
			$this.closest(".context").empty().append(new_simpler_html);

			$(".ques").each(function() {
				highlightid = $(this).attr('class').split('hid-')[1];
				if (highlightid == h_id) {
					$(this).show();
					//var offset = $this.closest(".context").offset();
					//$(this).offset({top: offset.top});
				}
			});

			var context_id = $this.closest(".context").attr('data');
			//$('#' + context_id).hide();
			$('.contextstats').hide();

			setTimeout(function(){
				onehview = true;
			},10);

		});

	});

	$(document).on("click", function(){
		if(onehview){
			highlight_parent.empty().append(simpler_html_cache);
			onehview = false;
			$('.ques').hide();
			$('.contextstats').show();
		}
	});
});

function simpler_cache(input){
	var cache_defer = $.Deferred();
	simpler_html_cache = input.html();
	setTimeout(function(){
		cache_defer.resolve();
	},10);
	return cache_defer;
}