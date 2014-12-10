$(document).ready(function(){

	var onehview = false;
	var selectmode = false;
	var highlight_parent = ' ';

	$(document).mouseup(function(){
		if(getSelectionHtml() != ''){
			$(".highlight").hide('slow');
			selectmode = true;
		}
		else if(selectmode && getSelectionHtml()==''){
			selectmode = false;
			$(".highlight").show('slow');
		}
	});

	$(document).on("click",".highlight", function(){

		$this = $(this);

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
			
			$(".q-sidebar").each(function() {
				highlightid = $(this).attr('class').split('hid-')[1];
				if (highlightid == h_id) $(this).show();
				
				$('.addques').attr('data', h_id);
				$('.addques').show();
			});

			setTimeout(function(){
				onehview = true;
			},10);

		});

	});

	$(document).on("click", function(){
				if(onehview){
					highlight_parent.empty().append(simpler_html_cache);
					onehview = false;
					$('.q-sidebar').hide();
					$('.addques').hide();
					$('.addques').removeAttr('data');
				}
			});

	var contsimpid = getcontsimpid();

	$('#'+contsimpid).find(".author").hide();

	$('#dropdown-notifications').each(function(){
		$(this).attr('style', "max-width:450px; min-width:450px; width:450px; min-height:" + screen.height + "px; max-height:" + screen.height + "px; height:450" + screen.height + "px;");
	});

	$(".ques").each(function(){				//Iterates through the questions, finds answers to those questions and assigns the class 'ans-<question-id>' to those answers.
		var $this = $(this);
		var thisid = $(this).attr("data");
		var addclass = "ans-" + thisid;

		$(".q-text").each(function(){
			if($(this).text()==$this.text()){
				$(this).parent().closest(".jumbotron").addClass(addclass);
			}
		});

		var answers = $(this).parent().find(".ansnum").html();		//Converts the answers into links.
		var thishtml = $(this).html();
		if (answers != '0 Answers') {
			$(this).html('<a href="javascript:;">' + thishtml + '</a>');
		}
	});

	$(".ques").click(function(){
		if ($(this).parent().find(".ansnum").html() != "0 Answers") {
			var thisid = $(this).attr("data");
			var thisclass = ".ans-" + thisid;
			$('.level-wrapper').hide();
			$('.q-sidebar').hide();
			$(thisclass).each(function(){
				$(this).parent().parent().show();
				$(this).show();
				var offset = $(this).offset();

				var jumboid = $(this).attr("id");
				$('.q-' + jumboid).show();
				$('.q-' + jumboid).offset({top:(offset.top + 50)});
			});

			window.scrollTo(0,0);
		}
	});

	$(".reqsimp").click(function(){
			$reqsimp = $(this);
			var quabl_html = getSelectionHtml();
			var final_span = " ";
			var simpler_id = $(this).attr('id');
			var post_id = $(".addsimp").attr('data');
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

			var question_part = String($reqsimp.parent().parent().find('.simpler-html').find('.q-text').html()).split('?').join('xqmx');
			/*if (old_simpler == 'undefined') {
				old_simpler = String($reqsimp.parent().parent().find('.simpler-html').find('.q-text').html()).split('?').join('xqmx');
			}*///the question part of the simpler which won't have the highlight
			var answer_part = String($reqsimp.parent().parent().find('.simpler-html').find('.answer').html()).split('?').join('xqmx');		//the answer part of the highlight which will have the highlight
			if (question_part == '') uri = '/define/'+ $(this).attr('data') + '/' + simpler_id +'/ans/'+ answer_part +'/ques/empty/quabl/' + quabl_html + '/';
			else uri = '/define/'+ $(this).attr('data') + '/' + simpler_id +'/ans/'+ answer_part +'/ques/' + question_part + '/quabl/' + quabl_html + '/';
			window.location = uri;
	});

	$(".ansnum").each(function(){
		var cstr = ".ans-" + $(this).attr('data');
		var num = String($(cstr).length);
		if(num==1){
			var linktxt = num + " Answer";
		}
		else{
			var linktxt = num + " Answers";
		}

		$(this).html(linktxt);

	});

	$(".ques-add").click(function(){			//JS for the Addition button.
		var uri = $(this).attr('data');
		window.location.href = uri;
	});

	$(".jumbotron").not("#Post").each(function(){		//Finds answers without any questions asked out of them.
		$this = $(this);
		var jumid = $(this).attr("id");
		var qclass = ".q-" + jumid;
		if(!($(qclass)[0])){
			$this.addClass("noqs");
		}
	});

	/*if(parseInt(toscrollto)!=-1){
		var toscrollto_id = "#" + toscrollto;
		$("#Post").removeClass("nthlevel");
		$(toscrollto_id).addClass("nthlevel");
		if($(toscrollto_id).hasClass("level-1")){
			next_btn(toscrollto);
		}
		else{
			var parent_list = $(toscrollto_id).attr("data");
			var parent_arr = parent_list.split("parent");
			var i = 1;
			while(i<parent_arr.length){
				var iter_id = parent_arr[parent_arr.length-i].split(" ")[0];
				next_btn(iter_id);
				i = i + 1;
			}
		}
	}*/
}); //window.onload function finished.

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

function getcontsimpid(){
	var contsimpid = ' ';

	$(".jumbotron").each(function(){
		if($(this).attr("data") == 'contextsimpler'){
			contsimpid = $(this).attr("id");
		}
	});

	return contsimpid;
}

function simpler_cache(input){
	var cache_defer = $.Deferred();
	simpler_html_cache = input.html();
	setTimeout(function(){
		cache_defer.resolve();
	},10);
	return cache_defer;
}
