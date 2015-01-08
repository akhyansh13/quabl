$(document).ready(function(){

	$('.footer').hide();

	blink(".ansloaddot");

	window.numansdisp = 0;

	var scrolltop = 0;

	var answerno = 1;

	window.onehview = false;     //True if a highlight is expanded.

	var selectmode = false;			//False if nothings been selected and true otherwise.

	$(document).mouseup(function(){

		window.quabl_html = getSelectionHtml();

		if(getSelectionHtml() != ''){

			if($(window.getSelection().getRangeAt(0).commonAncestorContainer).closest('.answer').length != 0){

				highlight_parent = $(window.getSelection().getRangeAt(0).commonAncestorContainer).closest('.answer');

				window.conans = highlight_parent;

				$.when(simpler_cache($(window.getSelection().getRangeAt(0).commonAncestorContainer).closest('.answer'))).then(function(){

					$.when(hidehighlights()).then(function(){

						$.when(replaceanswer()).then(function(){

							$(".highlight").css('visibility', 'collapse');

							$("#quesboxwrapper").show();
							$("#contextquesbox").focus();

							window.onehview = true;
							$("body").addClass("noselect");

							$(".instruct").html('Enter the related question below.');

						});
					});
				});
			}
			selectmode = true;
		}
		else if(selectmode && getSelectionHtml()==''){
			selectmode = false;
			clearSelection();
		}
	});

	$('.askcontques').click(function(){

		$this = $(this);

		$("#quescrate").hide();

		$this.attr("disabled", "true");

		window.conans.css('visibility', 'hidden');

		window.conans.closest('.nthanswer').find('.aldwrapper').show();

		window.uriarr[4] = window.uriarr[4] + '/cques/' +  $("#contextquesbox").val().replace('?', 'xqmx') + '/highlight/' + window.highlight;

		$.get((window.uriarr[4]), function(data){

			$this.parent().find('textarea').val('');

			var resarr = data.split('<cqdelimit>');

			$(".answer").each(function(){

				var $answer = $(this);

				setTimeout(function(){
					window.conans.closest('.nthanswer').find('.aldwrapper').hide();
					$answer.css('visibility', 'visible');
					$("#quescrate").fadeIn('fast');
				}, 400);


				if($(this).data('id')==resarr[1]){

					$(this).empty().append(resarr[0]);
					$(".instruct").hide();
					$("#qinst").show();
					$("#quesboxwrapper").hide();
					$("#queswrapper").show();

					$answer.closest(".nthanswer").find('.relques').append('<div class="rques hid-' + resarr[3] + ' parent-'+ resarr[4] +'"><a href="/question/' + resarr[5] + '">' + resarr[2] + '</a>');

					$answer.find('.highlight').each(function(){
						if($(this).data('id')==resarr[3]){

							var $highlight = $(this);

							clickonhighlight($highlight, 'n');

						}
					});

				}
			});
		});
	});

	$(".askques").click(function(){

		$this = $(this);

		$this.attr('disabled', 'true');

		var newques = $("#quesbox").val();

		var uri = '/defined/' + String(window.highclicked) + '/' + newques.replace('?','xqmx');

		$.get((uri), function(data){
			$this.parent().find('textarea').val('');
			var resarr = data.split('<cqdelimit>');

			$(".answer").each(function(){
				if($(this).data('id')==resarr[0]){
					var $answer = $(this);
					$answer.closest(".nthanswer").find('.relques').append('<div class="rques hid-' + resarr[2] + ' parent-'+ resarr[3] +'"><a href="/question/' + resarr[4] + '">' + resarr[1] + '</a>');
					$("#quescrate").append('<div class="rques hid-' + resarr[2] + ' parent-'+ resarr[3] +'"><a href="/question/' + resarr[4] + '">' + resarr[1] + '</a>');
				}
			});
		});
	});

	$(".answer").each(function(){
		if ($(this).attr('class') != "context answer") {
			$(this).attr('id', String(answerno));
			answerno+=1;
		}
	});

	var curr_ans = 0;

	$(document).on("click",".highlight", function(){
		clickonhighlight($(this), 'y');
		$("#queswrapper").show();
	});

	$(document).on("click", function(){

		if(window.onehview){

			$("#quescrate").empty();

			$(".instruct").html('Select any text to add a question<br/> Or, click on a dot to view related question(s).')

			$(".instruct").show('fast');

			$("#qinst").hide();

			$("#quesboxwrapper").hide();

			$("#queswrapper").hide();

			$("body").removeClass("noselect");

			$(".highlight").css("visibility", "visible");

			highlight_parent.empty().append(simpler_html_cache);

			window.onehview = false;

			var conthigh = ' ';

			$(".highlight").each(function(){

				if($(this).data('id')==window.highclicked){

					if($(this).closest(".context").length !=0){

						$('.cques').show();

					}
				}
			});
		}
	});

	$("#quescrate").click(function(evt){
		evt.stopPropagation();
	});

	$("#contextquesbox").click(function(evt){
		evt.stopPropagation();
	});

	$("#quesbox").click(function(evt){
		evt.stopPropagation();
	});

	$(".askcontques").click(function(evt){
		evt.stopPropagation();
	});

	$(".askques").click(function(evt){
		evt.stopPropagation();
	});

	$(".addsimp").click(function(){					//add simpler button code [AJAX].

		var qid = $(this).attr('id');
		var answer_html = editor.getHTML();
		$('#empty').append(answer_html);
		$("#empty").find("*").not("b,u,i,a,img").each(function(){
			striptag_jq($(this));
		});
		var simpler_text = $("#empty").html();
		$("#empty").empty();
		$.get(('/makesimpler/'),{qid:qid, simpler_text:simpler_text,}, function(){
			uri = '/question/' + qid;
			window.location.href = uri;
		});
	});

	$(".answer").not(".context").each(function(){
		$answer = $(this);
		var id = $(this).data("id");
		var qclassselector = ".questionon-"+id;
		var newhtml = "";
		var i = 1;
		$(qclassselector).each(function(){
			newhtml = newhtml + $(this).html();
			$(this).remove();
		});
		$answer.closest(".nthanswer").find(".relques").append(newhtml);
	});

	$(".thumb").each(function(){
		var $t = $(this);
		var requrl = '/thumb/' + $t.data("username");
		$.get((requrl), function(data){
			$t.attr("src", data);
		});
	});

	$(document).keyup(function(){				//Code for the deactivation/activation of the Add Answer button.

		if (!($("#contextquesbox").val().trim())) {
			$(".askcontques").attr("disabled", "true");
		}
		else{
			$(".askcontques").removeAttr("disabled");
		}

		if (!($("#quesbox").val().trim())) {
			$(".askques").attr("disabled", "true");
		}
		else{
			$(".askques").removeAttr("disabled");
		}

	});

	blink("#loaddot");
	setTimeout(function(){
		$("#loaddot").remove();
		$(".container").show();
		$(".header").show();
		if(parseInt($("#anscounter").html())==0){
			$(".quilleditor").show();
			$(".nthanswer").hide();
			$("#anscounti").hide();
			$("#anscountf").show();
			$(this).hide();
			$("#bull").hide();
			$(".jumptotext").hide();
			$("#fixedpane").hide();
			$("#numjumwrapper").html("View 0 Answers");
			$("#upperwrapper").css("margin-bottom", "10px");
		}
	},1000);

	$(window).on("scroll", function(){
		var scrolltop = $(window).scrollTop();
		var cached_css = ' ';
		if($("#fixedpane").is(":visible")){
			if(scrolltop >= $(".nthanswer").offset().top){
				cached_css = $("#fixedpane").attr("style");
				$("#fixedpane").css({position: "fixed", top:90, left:"62%"});
				$("#fixedpane").css("width", "18%")
				$(".triangle").css({"left":"-21px"});
			}
			else{
				$("#fixedpane").attr("style", cached_css);
			}
		}
	});
}); //document.ready close.

function simpler_cache(input){
	var cache_defer = $.Deferred();
	simpler_html_cache = input.html();
	setTimeout(function(){
		cache_defer.resolve();
	},5);
	return cache_defer;
}

function getSelectionHtml() {
	var html = "";
	if (typeof window.getSelection != "undefined") {
		var sel = window.getSelection();
		if (sel.rangeCount) {
			var container = document.createElement("div");
			for (var i = 0, len = sel.rangeCount; i < len; ++i) {
				container.appendChild(sel.getRangeAt(i).cloneContents());
			}
			html = container.innerHTML;
		}
	} else if (typeof document.selection != "undefined") {
		if (document.selection.type == "Text") {
			html = document.selection.createRange().htmlText;
		}
	}
	return html;
}

function clearSelection() {
	if ( document.selection ) {
		document.selection.empty();
	} else if ( window.getSelection ) {
		window.getSelection().removeAllRanges();
	}
}

function clickonhighlight(highlight, emptyxqmx){				//The second argument specifies if the quescrate has to be vacated before appending new rques-es. 'y' for vacating, anything else bypasses the empty().

$this = highlight;

if(emptyxqmx=='y'){
	$("#quescrate").empty();
}

$(".instruct").hide('fast');
$("#qinst").show();

$("body").addClass("noselect");

window.highclicked = highlight.data("id");

$.when(simpler_cache($this.closest(".answer"))).then(function(){

	var h_id = $this.data('id');

	highlight.closest(".nthanswer").find(".rques").each(function() {
		highlightid = $(this).attr('class').split('hid-')[1].split(" ")[0];
		if (highlightid == h_id) {
			var rqueshtml = $("#rquesdump").append($(this).clone()).html();
			$("#quescrate").append(rqueshtml);
			$("#rquesdump").empty();
		}
	});

	$(".cques").each(function() {
		highlightid = $(this).attr('class').split('hid-')[1];
		if (highlightid != h_id){
			$(this).hide();
		}
	});

	highlight_parent = $this.closest(".answer");
	var quabl_text = decodeURIComponent($this.data('text'));
	highlight_parent.find(".highlight").not($this).remove();

	$(".answer").not(highlight_parent).each(function(){
		$(this).find(".highlight").each(function(){
			$(this).css('visibility', 'collapse');
		});
	});

	var simpler_html = $this.closest(".answer").html();
	var h_html = $('<div>').append($this.clone()).html();
	var h_html_dummy = h_html.replace('class="highlight"', 'class="highlight_dummy"')
	var new_simpler_html = simpler_html.replace(h_html + quabl_text, '<span class="quabl_full">' + h_html_dummy + quabl_text + '</span>');
	$this.closest(".answer").empty().append(new_simpler_html);



	$(".cques").each(function() {
		highlightid = $(this).attr('class').split('hid-')[1];
		if (highlightid == h_id){
			$(this).parent().show();
			$(this).show();
		}
	});

	setTimeout(function(){
		window.onehview = true;
	},10);

});
}

function ifallpositive(arr){		//Checks if all elements of an array are positive(Zero inclusive).
	var j = 0;
	while(j <= arr.length-1){
		if(arr[j]>=0){
			if(j==arr.length -1){
				return true;
			}
		}
		else{
			return false;
			break;
		}
		j += 1;
	}
}

function blink(selector){
	$(selector).fadeOut('slow', function(){
		$(this).fadeIn('slow', function(){
			blink(this);
		});
	});
}

function striptag_js(tag){
	var b = document.getElementsByTagName(tag);

	while(b.length) {
		var parent = b[ 0 ].parentNode;
		while( b[ 0 ].firstChild ) {
			parent.insertBefore(  b[ 0 ].firstChild, b[ 0 ] );
		}
		parent.removeChild( b[ 0 ] );
	}
}

function striptag_jq(element){
	element.contents().unwrap();
}

function replaceanswer(){

	var repdefer = $.Deferred();

	var final_span = " ";

	var simpler_id = $(window.getSelection().getRangeAt(0).commonAncestorContainer).closest('.answer').data("id");
	var post_id = $(window.getSelection().getRangeAt(0).commonAncestorContainer).closest('.answer').data("text");

	var selection = window.getSelection().getRangeAt(0);
	var selectedText = selection.extractContents();
	var highlight = String(selectedText.textContent);

	var highlight_arr = highlight.split("");
	var firstel = highlight_arr[0];
	var lastel = highlight_arr[highlight_arr.length-1];

	highlight = highlight.trim();

	var req_span = '<span class="curr_highlight" data-text="texthtmlgoeshere"></span>' + window.quabl_html;

	if(firstel==" "){				//Fixing the Quabl-spacing problem.
		final_span = '<span class="highlight-wrapper">&nbsp;' + req_span;
	}
	else{
		final_span = '<span class="highlight-wrapper">' + req_span;
	}
	if(lastel==" "){
		final_span = final_span + '<span id="blankspace">&nbsp;</span></span>';
	}
	else{
		final_span = final_span + '<span id="noblankspace"></span></span>';
	}

	var span = $(final_span);
	//The new highlight has class curr_highlight and the new checkbox has class curr_checkedhigh. They have related CSS.

	if(highlight.trim() != ''){
		selection.insertNode(span[0]);
	}

	if (selectedText.childNodes[1] != undefined){
		console.log(selectedText.childNodes[1]);
		$(selectedText.childNodes[1]).remove();
	}


	$("#ansdump").append($(window.getSelection().getRangeAt(0).commonAncestorContainer).closest('.answer').html());
	$("#ansdump").find(".curr_highlight").attr("data-id","idtobesetinview");
	$("#ansdump").find(".curr_highlight").removeClass("curr_highlight").addClass("highlight");
	$("#ansdump").find(".highlight").each(function(){
		$(this).show();
		$(this).removeAttr('style');
	});

	$("#highlightdump").append(window.quabl_html);
	$("#highlightdump").find(".highlight").remove();
	var qh = $("#highlightdump").html();

	var answer_part = $("#ansdump").html().replace("?", "xqmx");

	uri = '/define/'+ post_id + '/' + simpler_id +'/ans/'+ answer_part + '/quabl/' + qh;

	setTimeout(function(){
		repdefer.resolve();
		$("#ansdump").empty();
		$("#highlightdump").empty();
	}, 5);

	window.uriarr = [post_id, simpler_id, answer_part, qh, uri];

	if(highlight.trim() != '' ){
		window.highlight = highlight;
	}


	return repdefer;
}

function hidehighlights(){

	var hldefer = $.Deferred();

	$('.highlight').css('visibility', 'collapse');

	setTimeout(function(){
		hldefer.resolve();
	},5);

	return hldefer;
}
