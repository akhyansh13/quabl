$(document).ready(function(){

	$('.footer').hide();

	var lastscrolltop = 0;

	window.quabltext = $("#contextsimpler").data("text");
	window.quablid = $("#contextsimpler").data("id");
	window.quablable = $("#contextsimpler"); //Keeps track of the only visible answer.

	var answerno = 1;

	window.onehview = false;

	var selectmode = false;

	$(document).mouseup(function(){
		if(getSelectionHtml() != ''){
			$(".highlight").hide('fast');
			selectmode = true;
			markSelection();
		}
		else if(selectmode && getSelectionHtml()==''){
			selectmode = false;
			clearSelection();
			$(".highlight").show('fast');
			$(".reqsimp").hide();
		}
	});

	$(".answer").each(function(){
		if ($(this).attr('class') != "context answer") {
			$(this).attr('id', String(answerno));
			answerno+=1;
		}
	});

	var curr_ans = 0;
	$('.next').click(function() {
		if (curr_ans == 0) {
			$('.mainquespane').hide();
			$('.jumptotext').hide();
			$('.rques').parent().hide();
			$('.cques').parent().hide();
			$('#1').parent().show();
			//$('.shortquespane').show();
			//var bottom = $('.mainquespane').height();
			//$('.answer-area').attr('style', "float:left; width:70%; font-size:12pt; margin-top:" + String(bottom) + "px;");
			curr_ans+=1;
		}
		else{
			if (curr_ans < answerno - 1) {
				$('#' + String(curr_ans)).parent().hide();
				$('#' + String(curr_ans + 1)).parent().show();
				$('.rques').parent().hide();
				curr_ans+=1;
			}
		}
	});

	$('.prev').click(function() {
		if (curr_ans == 1) {
			$('#1').parent().hide();
			//$('.shortquespane').hide();
			$('.mainquespane').show();
			$('.jumptotext').show();
			$('.rques').parent().show();
			curr_ans-=1;
		}
		else{
			if (curr_ans > 0) {
				$('#' + String(curr_ans)).parent().hide();
				$('#' + String(curr_ans - 1)).parent().show();
				$('.rques').parent().hide();
				curr_ans-=1;
			}
		}
	});

	$(document).on("click",".highlight", function(){
		clickonhighlight($(this));
	});

	$(document).on("click", function(){
		if(window.onehview){
			highlight_parent.empty().append(simpler_html_cache);
			window.onehview = false;
			$('.rques').parent().hide();
			$('.cques').parent().hide();
		}
	});

	$(document).on("click", ".viewcontext", function(){
		$('.mainques').hide();
		$(this).hide();
		$("#upperwrapper").hide();
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
			$('.rques').parent().hide();
			$('.cques').parent().hide();
			$('.context').parent().show();
			clickonhighlight(hreq);
			window.quablid = $("#contextsimpler").data("id");
			window.quabltext = $("#contextsimpler").data("text");
			window.quablable = $("#contextsimpler")
		}
		else {
			uri = "/question/" + question;
			window.location.href = uri;
		}
		$('.next').hide();
		$('.prev').hide();
	});

	$(".addsimp").click(function(){					//add simpler button code [AJAX].
		//var simpler_id = $(this).attr('id');
		//var post_id = $(this).attr("data");
		//var backsimplerid = $(this).attr('value');
		//var simpler_textarea_id = 'simp'+ simpler_id;
		var qid = $(this).attr('id');
		var simpler_text = editor.getHTML();
		$.get(('/makesimpler/'),{qid:qid, simpler_text:simpler_text,}, function(){
			uri = '/question/' + qid;
				window.location.href = uri;
		});
	});

	$(document).on('click', '.reqsimp', function(){
			$reqsimp = $(this);
			var quabl_html = getSelectionHtml();
			var final_span = " ";
			var simpler_id = window.quablid;
			var post_id = window.quabltext;
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
			selection.insertNode(span[0]);

			if (selectedText.childNodes[1] != undefined){
				console.log(selectedText.childNodes[1]);
				$(selectedText.childNodes[1]).remove();
			}

			clearSelection();

			var answer_part = String(window.quablable.html()).split('?').join('xqmx');		//the answer part of the highlight which will have the highlight

			uri = '/define/'+ post_id + '/' + simpler_id +'/ans/'+ answer_part + '/quabl/' + quabl_html + '/';

			window.location = uri;
	});

	$(document).on('scroll', function(){				//The Scroll.
			var scrolltop = document.scrollTop();
			if(scrolltop == 100){
				$(".lowerinstruct").show();
			}
			//if(scrolltop > lastscrolltop && scrolltop > 10){
				//$(".quilleditor").hide();
			//}

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

	$.when(simpler_cache($this.closest(".answer"))).then(function(){

		highlight_parent = $this.closest(".answer");
		var quabl_text = $this.data('text');
		var h_id = $this.data('id');
		$this.closest(".answer").find(".highlight").not($this).remove();
		var simpler_html = $this.closest(".answer").html();
		var h_html = $('<div>').append($this.clone()).html();
		var h_html_dummy = h_html.replace('class="highlight"', 'class="highlight_dummy"');
		var new_simpler_html = simpler_html.replace(h_html + quabl_text, '<span class="quabl_full">' + h_html_dummy + quabl_text + '</span>');
		$this.closest(".answer").empty().append(new_simpler_html);

		$(".rques").each(function() {
			highlightid = $(this).attr('class').split('hid-')[1];
			if (highlightid == h_id) $(this).parent().show();
		});

		$(".cques").each(function() {
			highlightid = $(this).attr('class').split('hid-')[1];
			if (highlightid == h_id) $(this).parent().show();
		});

		setTimeout(function(){
			window.onehview = true;
		},10);

	});
}

function markSelection() {
    var markerTextChar = "\ufeff";
    var markerTextCharEntity = "&#xfeff;";

    var markerEl, markerId = "sel_" + new Date().getTime() + "_" + Math.random().toString().substr(2);

    var selectionEl;

    var sel, range;

        if (document.selection && document.selection.createRange) {
            // Clone the TextRange and collapse
            range = document.selection.createRange().duplicate();
            range.collapse(false);

            // Create the marker element containing a single invisible character by creating literal HTML and insert it
            range.pasteHTML('<span id="' + markerId + '" style="position: relative;">' + markerTextCharEntity + '</span>');
            markerEl = document.getElementById(markerId);
        } else if (window.getSelection) {
            sel = window.getSelection();

            if (sel.getRangeAt) {
                range = sel.getRangeAt(0).cloneRange();
            } else {
                // Older WebKit doesn't have getRangeAt
                range.setStart(sel.anchorNode, sel.anchorOffset);
                range.setEnd(sel.focusNode, sel.focusOffset);

                // Handle the case when the selection was selected backwards (from the end to the start in the
                // document)
                if (range.collapsed !== sel.isCollapsed) {
                    range.setStart(sel.focusNode, sel.focusOffset);
                    range.setEnd(sel.anchorNode, sel.anchorOffset);
                }
            }

            range.collapse(false);

            // Create the marker element containing a single invisible character using DOM methods and insert it
            markerEl = document.createElement("span");
            markerEl.id = markerId;
            markerEl.appendChild( document.createTextNode(markerTextChar) );
            range.insertNode(markerEl);
        }

        if (markerEl) {
            // Lazily create element to be placed next to the selection
            if (!selectionEl) {
                selectionEl = document.createElement("button");
                selectionEl.className = "btn btn-default reqsimp";
                selectionEl.innerHTML = "Quabl This.";
                selectionEl.style.position = "absolute";

                document.body.appendChild(selectionEl);
            }

        var obj = markerEl;
        var left = 0, top = 0;
        do {
            left += obj.offsetLeft;
            top += obj.offsetTop;
        } while (obj = obj.offsetParent);

            selectionEl.style.left = left + "px";
            selectionEl.style.top = top + "px";

            markerEl.parentNode.removeChild(markerEl);
        }
}
