$(document).ready(function(){

	window.clickonques = false;

	$(".question-area").each(function(){
			var nques = $(this).find(".ques").length;
			var nquabls = $(this).closest(".contqueswrapper").find('.highlight').length

			if (nquabls == 1) {
				if(nques == 1){
					$(this).find('.nums').html("1 Quabl, 1 Question.");
				}
				else{
					$(this).find('.nums').html("1 Quabl, " + nques + " Questions.");
				}
			}
			else {
				$(this).find('.nums').html(nquabls + " Quabls, " + nques + " Questions.");
			}
	});

	$(".contqueswrapper").each(function(){
		var offset = $(this).find(".context-area").offset();
		$(this).find(".question-area").offset({top:offset.top+30});
	});

	$(".footer").hide();

	var onehview = false;

	$(".addpostbtn").click(function(){
		var answer_html = editor.getHTML();
		$('#empty').append(answer_html);
		$("#empty").find("*").not("b,u,i,a,img").each(function(){
			striptag_jq($(this));
		});
		var txt = $("#empty").html();
		$("#empty").empty();
		$.get(('/addpost/'), {txt:txt}, function(data){
			window.location = '/context/' + data + '/';
		});
	});

	$('#dropdown-notifications').each(function(){
		$(this).attr('style', "max-width:450px; min-width:450px; width:450px; min-height:" + screen.height + "px; max-height:" + screen.height + "px; height:450" + screen.height + "px;");
	});


	$(document).keyup(function(){				//Controls the deactivation/activation of the Add Answer button.
		if (!(editor.getText().trim())) {
			$(".addpostbtn").attr("disabled", "true");
		}
		else{
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
			var quabl_text = $this.find('.html').html();
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
					$(this).parent().find('.contextstats').hide();
					//var offset = $this.closest(".context").offset();
					//$(this).offset({top: offset.top});
				}
			});

			var context_id = $this.closest(".context").attr('data');
			//$('#' + context_id).hide();
			//$('.contextstats').hide();

			setTimeout(function(){
				onehview = true;
			},10);

		});

	});

	$('body').on('click', function(){
		$.when(checkifques()).then(function(){
			if(onehview && !window.clickonques){
				highlight_parent.empty().append(simpler_html_cache);
				onehview = false;
				$('.ques').hide();
				$('.contextstats').show();
			}
		});
	});

	blink("#loaddot");
	setTimeout(function(){
		$("#loaddot").remove();
		$(".container").show();
		$(".header").show();
	},1000);


}); //document.ready closed.

function simpler_cache(input){
	var cache_defer = $.Deferred();
	simpler_html_cache = input.html();
	setTimeout(function(){
		cache_defer.resolve();
	},10);
	return cache_defer;
}

function checkifques(){
	var oqd = $.Deferred();
	$(".ques").click(function(){
		window.clickonques = true;
	});
	setTimeout(function(){
		oqd.resolve();
	},5);
}

function blink(selector){
	$(selector).fadeOut('slow', function(){
		$(this).fadeIn('slow', function(){
			blink(this);
		});
	});
}

function placeholder(phstring){
	$(".ql-line").remove();
	$("#ql-editor-1").append('<div class="ql-line" id="ql-line-1" style="color:#C0C0C0;">'+ phstring + '</div>')
}

function striptag_jq(element){
	element.contents().unwrap();
}
