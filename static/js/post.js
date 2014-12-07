$(document).ready(function(){

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
		if ((typeof $(this).attr('value')) === "undefined"){
			$reqsimp = $(this);
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
			var req_span = '<span class="curr_highlight" id="'+simpler_id+'" data="'+post_id+'">' + highlight +'</span>'
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

			$(".curr_checkedhigh").hide(); //Fixes the anomaly where the checkbox appears after pressing Ask.

			if (selectedText.childNodes[1] != undefined){
				console.log(selectedText.childNodes[1]);
				$(selectedText.childNodes[1]).remove();
			}
	
			clearSelection();

			var old_simpler = String($reqsimp.parent().parent().find('.simpler-html').find('.q-text').html()).split('?').join('xqmx');
			/*if (old_simpler == 'undefined') {
				old_simpler = String($reqsimp.parent().parent().find('.simpler-html').find('.q-text').html()).split('?').join('xqmx');
			}*///the question part of the simpler which won't have the highlight
			var new_simpler = String($reqsimp.parent().parent().find('.simpler-html').find('.answer').html()).split('?').join('xqmx');		//the answer part of the highlight which will have the highlight
			if (old_simpler == '') uri = '/define/'+ $(this).attr('data') + '/' + simpler_id +'/newxhex/'+ new_simpler +'/oldxhex/empty/';
			else uri = '/define/'+ $(this).attr('data') + '/' + simpler_id +'/newxhex/'+ new_simpler +'/oldxhex/' + old_simpler + '/';
			window.location.href = uri;
		}
		else{
			var simpler_id = $(this).attr('id');
			var post_id = $(this).attr('data');
			var highlights = $(this).attr('value');
			uri = '/defined/'+ post_id + '/' + simpler_id +'/'+ highlights +'/0/';
			window.location.href = uri;
		}
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

function clearSelection() {
    if ( document.selection ) {
        document.selection.empty();
    } else if ( window.getSelection ) {
        window.getSelection().removeAllRanges();
    }
}

function isTextSelected(input){
   var startPos = input.selectionStart;
   var endPos = input.selectionEnd;
   var doc = document.selection;

   if(doc && doc.createRange().text.length != 0){
      return true;
   }else if (!doc && input.value.substring(startPos,endPos).length != 0){
      return true;
   }
   return false;
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

