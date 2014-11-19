$(document).ready(function(){

	$('#dropdown-notifications').each(function(){
		$(this).attr('style', "max-width:450px; min-width:450px; width:450px; min-height:" + screen.height + "px; max-height:" + screen.height + "px; height:450" + screen.height + "px;");
	});

	bindvisibility($("#Post"), $("#instruct"));

	var toscrollto = $("#scrolltoid").text();

	$('.jumbotron').not(".level-1").not('#Post').hide();

	$('.checkedhigh').hide();
	$('.checkedhigh').removeAttr('checked');

	$(".level-1").parent().find(".next").show();

	$(".jumbotron").not("#Post").each(function(){		//Takes care of the bracketed number.
		id = $(this).attr('id');
		c = 0;
		$('.'+id).each(function(){
			c+=1;
		});
		$(this).parent().find('.next').find('#num-child').html(String(c))
	});
	
	$("num_answers").each(function(){
		var ques_class = $(this).parent().find(".q-sidebar").attr('class');
		var highlight = "<i>" + ques_class.split('h-')[1] + "</i>";									//get the highlight in format
		var question = ques_class.html().split("<p>").join('<p style="font-size:12pt;">');			//get the qestion in format
		n = 0;																						//counter of number of answered simplers
		var curr_jumbotron = [];																	//list to store te simplers with answers
		$(document).find('.jumbotron').each(function(){
			if ($(this).find(".question").html() == highlight + question && $(this).find('.answer').html() != ''){			//compare the questions and answer should be non empty
				n += 1;
				curr_jumbotron.push($(this).attr(id));																//store the simpler in list for future use
			}
		});
		$(this).html(highlight + question + String(n));																//show the number of answers available
	});

	$(".addsimp-toggle-post").click(function(){		//toggles simpler addition text area.
		$(this).parent().parent().parent().find(".simpler-textarea").toggle();
	});
	
	$(".addsimp-toggle").click(function(){		//toggles simpler addition text area.

	$(this).parent().parent().parent().find(".simpler-textarea").toggle();
	});

	$(".ques").each(function(){
		var $this = $(this);
		var thisid = $(this).attr("data");
		var addclass = "ans-" + thisid;
		$(".q-text").each(function(){
			if($(this).text()==$this.text()){
				$(this).parent().closest(".jumbotron").addClass(addclass);
			}
		})
	});

	$(".addsimp").click(function(){					//add simpler button code [AJAX].
		var simpler_id = $(this).attr('id');
		var post_id = $(this).attr("data");
		var simpler_textarea_id = 'level1-textarea';
		var simpler_text = editor.getHTML();
			$.get(('/makesimpler/'),{simpler_id:simpler_id, simpler_text:simpler_text, post_id:post_id,}, function(data){
				location.reload();
			});
	});
					
	$(".reqsimp").click(function(){
		if ((typeof $(this).attr('value')) === "undefined"){
			$reqsimp = $(this);						
			var simpler_id = $(this).attr('id');
			var post_id = $(".addsimp").attr('data');
			var selection = window.getSelection().getRangeAt(0);
			var selectedText = selection.extractContents();
			var highlight = String(selectedText.textContent);
			//var span = $("<high>" + highlight + "<high>");
			var span = $("<span class='curr_highlight' id='"+simpler_id+"' data='"+post_id+"'>" + highlight +"<input type='checkbox' class='curr_checkedhigh' value='"+highlight.replace(" ","_")+"' name='highlight'/></span>");
			//The new highlight has class curr_highlight and the new checkbox has class curr_checkedhigh. They have related CSS.
			selection.insertNode(span[0]);

			$(".curr_checkedhigh").hide(); //Fixes the anomaly where the checkbox appears after pressing Ask.

			if (selectedText.childNodes[1] != undefined){
				console.log(selectedText.childNodes[1]);
				$(selectedText.childNodes[1]).remove();
			}
	
			clearSelection();
			var old_simpler = String($reqsimp.parent().parent().find('.simpler-html').find('.question').html()).split('?').join('xqmx');	//the question part of the simpler which won't have the highlight
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
	
	$(".checkedhigh").on("change", function(){
		var aHrefVals = [];
		 
		$('.checkedhigh').filter(":checked").each(function() {
			aHrefVals.push($(this).val());
		});
		if (aHrefVals.length != 0) {
			var highlight = aHrefVals.join("xhex");
			$(this).parents(".simpler-wrapper").find(".reqsimp").attr('value', highlight);
			$(this).parents(".simpler-wrapper").find(".reqsimp").attr('class', "btn btn-default reqsimp");
		}
		else {			
			$(this).parents(".simpler-wrapper").find(".reqsimp").removeAttr('value');
			$(this).parents(".simpler-wrapper").find(".reqsimp").attr('class', "btn btn-default reqsimp");
		}
	});

	$(".next").click(function(){	

		window.scrollTo(0,0);
		next_btn($(this).parent().find(".jumbotron").attr("id"));

	});
	
	$(".previous").click(function(){

		window.scrollTo(0, 0);
		
		var $this = $(this).parent(); 
		var $t = $this.parent().find(".jumbotron"); 
		var parent_id = $this.parent().find(".jumbotron").attr("class").split(' ')[1];
		var curr_jumbotron_parent = "#"+ parent_id;
		var curr_jumbotron_parent_class = "."+ parent_id;
		var curr_jumbotron_id = "#" + $this.parent().find(".jumbotron").attr("id");
		var curr_jumbotron_class = "." + $this.parent().find(".jumbotron").attr("id");
		var this_level = $this.parent().find(".jumbotron").attr("class");
		var level = this_level.split("level-");
		level = parseInt(level[(level.length-1)]);
		var curr_level_string = String(level)       //Stores the current level.
		var parent_question_class = ".q-" + parent_id;

		$(".nthlevel").each(function(){
			$(this).removeClass("nthlevel");
		});

		$this.hide();

		if(level==1){   
			$("#Post").addClass("nthlevel");                    
			$("#Post").parent().show();
			$("#Post").show();
			$(curr_jumbotron_class).parent().hide();
			$(".checkedhigh, .btngrp").hide();
			$(".level-1").each(function(){
				$(this).show();						//Checkout the padding between leve-1-1 and level1-2 after pressing previous.
				$(this).parent().show();
				$(this).removeAttr('style');
				$(this).parent().removeAttr('style');
				$(this).parent().find('.next').show();
			});
			$(".q-sidebar").hide();
		}

		else{
			$(curr_jumbotron_parent).addClass("nthlevel");
			$(".jumbotron").hide();
					$(curr_jumbotron_parent).show();
					$(curr_jumbotron_parent).parent().show();
					$(curr_jumbotron_parent).removeAttr("style");
					$(curr_jumbotron_parent).parent().attr("style", "padding-bottom:20px;");
					$(curr_jumbotron_parent).parent().attr("style", "padding-bottom:80px;");
					$(curr_jumbotron_id).removeAttr("style");
					$(curr_jumbotron_id).parent().removeAttr("style");
					$(curr_jumbotron_parent_class).show();
					$(".next").hide();
					$(curr_jumbotron_parent_class).each(function(){
						$(this).parent().show();
						$(this).parent().find(".next").show();
					});
					$(curr_jumbotron_parent).parent().find(".previous").show();
			$(curr_jumbotron_parent).parent().find(".checkedhigh, .btngrp").show();
			$(curr_jumbotron_parent_class).parent().find(".checkedhigh, .btngrp").hide();
			$(".q-sidebar").hide();
			$(parent_question_class).show();
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

		$(this).html("<a href = 'javascript:;'>" + linktxt + "</a>");

	});

	$(".ansnum").click(function(){
		$this = $(this);
		var cstr = "ans-" + $(this).attr('data');
		$(".jumbotron .q-text").each(function(){
			if(!($(this).closest(".jumbotron").hasClass(cstr))){
				if($(this).closest(".jumbotron").is(":visible")){
					$(this).closest(".jumbotron").hide();
					$(this).closest(".jumbotron").addClass("currhid");
					$(this).closest(".jumbotron").parent().hide();
					$(this).closest(".jumbotron").parent().parent().removeAttr("style");
				}	
			}
		});
		$(".ansnum").each(function(){
			$(this).parent().hide();
			$this.parent().show();
			$(this).parent().parent().find(".qprev").show();
			$(this).hide();
		});	
	});

	$(".qprev").click(function(){
		$(".currhid").parent().show();
		$(".currhid").show(function(){
			$(".currhid").removeClass("currhid");
		});
		$(this).hide();
		$(this).parent().find(".ansnum").show();
		var id = $(".nthlevel").attr("id");
		$(".q-"+id).each(function(){
			$(this).show();
			$(this).find(".ansnum").show();
			$(this).find(".qprev").hide();
		});
		$(".q-"+id).find(".qprev").hide();
	});

	$(".ques-add").click(function(){
		var uri = $(this).attr('data');
		window.location.href = uri;
	});

	$(".jumbotron").not("#Post").each(function(){
		$this = $(this);
		var jumid = $(this).attr("id");
		var qclass = ".q-" + jumid;
		if(!($(qclass)[0])){
			$this.addClass("noqs");
		}
	});

	$(document).click(function(){
		$(".noqs").each(function(){
			if($(this).hasClass("nthlevel")){
				$("#instruct-rest").show();
			}
			else{
				$("#instruct-rest").hide();
			}
		});
	});

	if(parseInt(toscrollto)!=-1){
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
	}
	if($("#Post").is(":visible")){
		$("#instruct").show();
	} 
	else{
		$("#instruct").hide();
	}
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

function bindvisibility(input1, input2){
	$(document).click(function(){
		if(input1.is(":visible")){
			input2.show();
		} 
		else{
			input2.hide();
		}
	});
}

function next_btn(module_id){
	var $this = $("#"+module_id).parent().find(".next");
	var $t = $this.parent().find(".jumbotron");
	var this_level = $t.attr("class");				//Gets the current level.
	var level = this_level.split("level-");
	level = parseInt(level[(level.length-1)]);
	curr_level_string = String(level)
	var curr_jumbotron = "#" + $this.parent().find('.jumbotron').attr("id");
	var curr_jumbotron_class = "." + $this.parent().find('.jumbotron').attr("id");
	var this_id = parseInt($this.parent().find('.jumbotron').attr('id'));
	var question_class = ".q-" + String(this_id);

	$(".nthlevel").each(function(){
		$(this).removeClass("nthlevel");
	});

	$(curr_jumbotron).addClass("nthlevel"); 

	$(".q-sidebar").hide();
	$(question_class).show();
	$this.parent().find(".next").hide();
	$this.parent().find(".btngrp").show();
	$this.parent().find(".checkedhigh").show();

	if(level==1){

		$("#Post").parent().hide();
		$("#Post").hide();

		$(".level-1").each(function(){

			curr_id = parseInt($(this).attr('id'));

			if(curr_id != this_id){
				$(this).parent().hide();
				$(this).hide();
			}

			else{
				$(this).parent().removeAttr("style");
				$(this).parent().parent().attr("style","padding-bottom:80px;");
				$(curr_jumbotron_class).each(function(){
						$j = $(this);
						$j.show();		
						$j.parent().show(function(){
							$j.parent().find(".next").show();
					});
				});		
			}
		});
	}

	else{
		var level_class = ".level-" + curr_level_string;
		var par_level = ".level-" + String(level-1);
		var parent_id = "#" + $this.parent().find(".jumbotron").attr("class").split(' ')[1];

		$(par_level).each(function(){
			$(this).parent().parent().removeAttr("style");
			$(this).parent().hide();
			$(this).hide();
		});

		$(level_class).each(function(){

			curr_id = parseInt($(this).attr('id'));

			if(curr_id != this_id){
				$(this).parent().hide();
				$(this).hide();
			}

			else{
				$(this).parent().removeAttr("style");
				$(this).parent().parent().attr("style","padding-bottom:80px;");
				$(curr_jumbotron_class).each(function(){
					$j = $(this);
					$j.parent().show(function(){
						$j.show();		
						$j.parent().find(".next").show();
					});
				});		
			}
		});
	}
}