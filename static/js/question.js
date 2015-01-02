$(document).ready(function(){

	$('.footer').hide();

	window.numansdisp = 0;

	var answer_arr = [0];

	var scrolltop = 0;

	var answerno = 1;

	window.onehview = false;

	var selectmode = false;

	window.highclick = false;

	$(document).mouseup(function(){
		window.quabl_html = getSelectionHtml();
		if(getSelectionHtml() != ''){
			if($('.highlight')[0]){								//This if-else takes care of the context.html also.
			$(".highlight").hide('fast', function(){
				if($(window.getSelection().focusNode.parentNode).closest('.answer').length != 0){
					$.when(replaceanswer()).then(function(){
						$("#quesboxwrapper").show();
						$("#contextquesbox").focus();
					});
				}
			});
			selectmode = true;
			}
			else{
				if($(window.getSelection().focusNode.parentNode).closest('.answer').length != 0){

				}
			}
		}
		else if(selectmode && getSelectionHtml()==''){
			selectmode = false;
			$(".highlight").show('fast');
			$(".reqsimp").hide();
			clearSelection();
		}
	});

	$('.askcontques').click(function(){
		window.uriarr[4] = window.uriarr[4] + '/cques/' +  $("#contextquesbox").val().replace('?', 'xqmx') + '/highlight/' + window.highlight;
		$.get((window.uriarr[4]), function(data){
			location.reload();
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
		clickonhighlight($(this));
	});

	$(document).on("click", function(){

		$.when(ifclickonhighlight()).then(function(){

			if(!(window.highclick)){

				if(window.onehview){

					$("#fixedpane .rques").remove();
					$(".instruct").show();

					highlight_parent.empty().append(simpler_html_cache);

					$(".highlight").css("visibility", "visible");

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
			}
		});

	});

	$(document).on("click", ".viewcontext", function(){
		$('.mainques').hide();
		$("#fixedpane").hide();
		$(this).hide();
		$("#upperwrapper").hide();
		$(".nthanswer").hide();
	  var hid = $(".mainques").data("hid");
		var question = $(this).data('id');
		var context = $(this).data('text');

		$(".quilleditor").hide();

		var hreq;

		$(".highlight").each(function(){
			if($(this).data("id")==hid){
				hreq = $(this);
			}
		});

		if (question == -1) {
			$('.mainquespane').hide();
			$('.jumptotext').hide();
			$('.rques').hide();
			$('.context').parent().show();
			clickonhighlight(hreq);
		}
		else {
			uri = "/question/" + question;
			window.location.href = uri;
		}
	});

	$(".addsimp").click(function(){					//add simpler button code [AJAX].
		//var simpler_id = $(this).attr('id');
		//var post_id = $(this).attr("data");
		//var backsimplerid = $(this).attr('value');
		//var simpler_textarea_id = 'simp'+ simpler_id;
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

	$(".showquill").click(function(){
		$(".quilleditor").show();
		$(".nthanswer").hide();
		$("#anscounti").hide();
		$("#anscountf").show();
		$(this).hide();
		$("#bull").hide();
		$(".jumptotext").hide();
		$("#fixedpane").hide();
		$("#upperwrapper").css("margin-bottom", "10px");
	});

	$("#anscountf").click(function(){
		$(".nthanswer").show();
		$("#anscounti").show();
		$("#anscountf").hide();
		$(".quilleditor").hide();
		$(".showquill").show();
		$("#bull").show();
		$(".jumptotext").show();
		$("#fixedpane").show();
		$("#upperwrapper").css("margin-bottom", "40px");
	})

	$('.ql-btn').not('.ql-image').click(function(){		//Color and style retention when B, I or U active.

		if(getSelectionHtml() == ''){

			if($(this).hasClass('clicked')){
				$(this).removeClass('clicked');
			}
			else{
				$(this).addClass('clicked');
			}
			if($(this).hasClass('ql-bold')){
				if($(this).hasClass("cbold")){
					$(this).removeClass("cbold");
					$(this).html("B");
				}
				else{
					$(this).addClass("cbold");
					$(this).html("<b>B</b>");
				}
			}
			if($(this).hasClass('ql-italic')){
				if($(this).hasClass("cita")){
					$(this).removeClass("cita");
					$(this).html("I");
				}
				else{
					$(this).addClass("cita");
					$(this).html("<i>I</i>");
				}
			}
			if($(this).hasClass('ql-underline')){
				if($(this).hasClass("cund")){
					$(this).removeClass("cund");
					$(this).html("U");
				}
				else{
					$(this).addClass("cund");
					$(this).html("<u>U</u>");
				}
			}
		}
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

	$(document).keyup(function(){				//Controls the deactivation/activation of the Add Answer button.
		if (!(editor.getText().trim())) {
			$(".addsimp").attr("disabled", "true");
		}
		else{
			$(".addsimp").removeAttr("disabled");
		}
	});

	blink("#loaddot");
	setTimeout(function(){
		$("#loaddot").remove();
		$(".container").show();
		$(".header").show();
		$(".answer").each(function(){
			answer_arr.push($(this).data("id") + "<-- Answer starts after this. -->" + $("#empty").append($(this).clone()).html());
			$("#empty").empty();
		});
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
			if(scrolltop >= $(".nthanswer").offset().top-40){
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
	},10);
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

function clickonhighlight(highlight){

	$this = highlight;

	$("#fixedpane .rques").remove();

	window.highclicked = highlight.data("id");

	$(".instruct").hide();

	$.when(simpler_cache($this.closest(".answer"))).then(function(){

		var h_id = $this.data('id');

		highlight.closest(".nthanswer").find(".rques").each(function() {
			highlightid = $(this).attr('class').split('hid-')[1].split(" ")[0];
			if (highlightid == h_id) {
				var rqueshtml = $("#rquesdump").append($(this).clone()).html();
				$("#fixedpane").append(rqueshtml);
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
		var quabl_text = $this.data('text');
		$(".highlight").not($this).css("visibility", "collapse");
		var simpler_html = $this.closest(".answer").html();
		var h_html = $('<div>').append($this.clone()).html();
		var h_html_dummy = h_html.replace('class="highlight"', 'class="highlight_dummy"').replace("none", ' ');
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

function ifclickonhighlight(){
	window.highclick = false;
	var clickdefer = $.Deferred();
	$(document).on('click', '.rques', function(){
		window.highclick = true;
	});
	$(document).on('click', '.highlight', function(){
		window.highclick = true;
	});
	setTimeout(function(){
		clickdefer.resolve();
	},5);
	return clickdefer;
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
	var simpler_id = $(window.getSelection().focusNode.parentNode).closest('.answer').data("id");
	var post_id = $(window.getSelection().focusNode.parentNode).closest('.answer').data("text");
	var selection = window.getSelection().getRangeAt(0);
	var selectedText = selection.extractContents();
	var highlight = String(selectedText.textContent);
	var highlight_arr = highlight.split("");
	var firstel = highlight_arr[0];
	var lastel = highlight_arr[highlight_arr.length-1];
	highlight = highlight.trim();
	trimmed_highlight_arr = highlight.split("");
	var req_span = '<span class="quabl"><span class="curr_highlight" data-text="'+ highlight +'"></span>' + highlight + '</span>';
	if(firstel==" "){				//Fixing the Quabl-spacing problem.
		final_span = '<span class="highlight-wrapper">&nbsp;' + req_span;
	}
	else{
		final_span = '<span class="highlight-wrapper">' + req_span;
	}
	if(lastel==" "){
		final_span = final_span + '<span id="blankspace"></span></span>';
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

	var answer_part = $(window.getSelection().focusNode.parentNode).closest('.answer').html().split('?').join('xqmx');		//the answer part of the highlight which will have the highlight

	uri = '/define/'+ post_id + '/' + simpler_id +'/ans/'+ answer_part + '/quabl/' + window.quabl_html + '/';

	setTimeout(function(){
		repdefer.resolve();
	}, 5);

	window.uriarr = [post_id, simpler_id, answer_part, window.quabl_html, uri];

	if(highlight.trim() != '' ){
		window.highlight = highlight;
	}


	return repdefer;
}
