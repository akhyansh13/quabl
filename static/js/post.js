$(document).ready(function(){

	$(document).click(function(){
		if($("#Post").is(":visible")){
			$("#instruct").show();
		} 
		else{
			$("#instruct").hide();
		}
	});

	$(".q-sidebar").hide();		//Not hiding the parent class.

	$(".header").css("padding-right", "10%");
	$(".header").css("padding-left", "10%");

	$('.jumbotron').not(".level-1").not('#Post').hide();

	$('.checkedhigh').hide();
	$('.checkedhigh').removeAttr('checked');

	$(".next").hide(function(){
		$(".level-1").parent().find(".next").show();
	});

	$(".jumbotron").not("#Post").each(function(){		//Takes care of the bracketed number.
		id = $(this).attr('id');
		c = 0;
		$('.'+id).each(function(){
			c+=1;
		});
		$(this).parent().find('.next').find('#num-child').html(String(c))
	});

	$(".addsimp-toggle-post").click(function(){		//toggles simpler addition text area.
		$(this).parent().parent().parent().find(".simpler-textarea").toggle();
	});
	
	$(".addsimp-toggle").click(function(){		//toggles simpler addition text area.

	$(this).parent().parent().parent().find(".simpler-textarea").toggle();
	});

	$(".addsimp").click(function(){					//add simpler button code [AJAX].
		var simpler_id = $(this).attr('id');
		var post_id = $(this).attr("data");
		
		if(simpler_id == 'level1-simp'){			//handles level1 simplers.

		var simpler_textarea_id = 'level1-textarea';
		var simpler_text = CKEDITOR.instances[simpler_textarea_id].getData();
			$.get(('/makesimpler/'),{simpler_id:simpler_id, simpler_text:simpler_text, post_id:post_id,}, function(data){
				location.reload();
			});
		}
		else{											//handles simplers of level greater than or equal to 2.											
			var simpler_textarea_id = 'simp'+ simpler_id;
			var simpler_text = CKEDITOR.instances[simpler_textarea_id].getData();
			$.get(('/makesimpler/'),{simpler_id:simpler_id, simpler_text:simpler_text, post_id:post_id,}, function(data){
				location.reload();
			});
		}
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
			var span = $("<span class='curr_highlight' id='"+simpler_id+"' data='"+post_id+"'>" + highlight +"&nbsp<input type='checkbox' class='curr_checkedhigh' value='"+highlight.replace(" ","_")+"' name='highlight'/></span>");
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
			if (old_simpler == ' ') uri = '/define/'+ $(this).attr('data') + '/' + simpler_id +'/newxhex/'+ new_simpler +'/oldxhex/empty/';
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
			var simpler_id = $(this).parent().attr('id');
			var post_id = $(this).parent().attr('data');
			uri = '/highlight/' + post_id + '/' + simpler_id + '/' + highlight + '/' + '0/';
			
			$(this).parents(".simpler-wrapper").find(".addness").removeAttr('disabled');
			$(this).parents(".simpler-wrapper").find(".addhigh").attr('href', uri);
			$(this).parents(".simpler-wrapper").find(".addness").attr('class', "btn btn-success addness");
			$(this).parents(".simpler-wrapper").find(".reqsimp").attr('value', highlight);
			$(this).parents(".simpler-wrapper").find(".reqsimp").attr('class', "btn btn-primary reqsimp");
		}
		else {			
			$(this).parents(".simpler-wrapper").find(".addness").attr('disabled', "disabled");
			$(this).parents(".simpler-wrapper").find(".addhigh").removeAttr('href');
			$(this).parents(".simpler-wrapper").find(".addness").attr('class', "btn btn-default addness");
			$(this).parents(".simpler-wrapper").find(".reqsimp").removeAttr('value');
			$(this).parents(".simpler-wrapper").find(".reqsimp").attr('class', "btn btn-default reqsimp");
		}
	});

	$(".next").click(function(){	

		window.scrollTo(0,0);

		var $this = $(this);
		var $t = $this.parent().find(".jumbotron");
		var this_level = $t.attr("class");				//Gets the current level.
		var level = this_level.split("level-");
		level = parseInt(level[(level.length-1)]);
		curr_level_string = String(level)
		var curr_jumbotron = "#" + $this.parent().find('.jumbotron').attr("id");
		var curr_jumbotron_class = "." + $this.parent().find('.jumbotron').attr("id");
		var this_id = parseInt($this.parent().find('.jumbotron').attr('id'));
		var question_class = ".q-" + String(this_id);

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
					$(this).parent().hide(function(){
						$(this).hide();
					});
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

		else{
			var level_class = ".level-" + curr_level_string;
			var par_level = ".level-" + String(level-1);
			var parent_id = "#" + $this.parent().find(".jumbotron").attr("class").split(' ')[1];

			$(par_level).each(function(){
				$(this).parent().parent().removeAttr("style");
				$(this).parent().hide(function(){
					$(this).hide();
				});
			});

			$(level_class).each(function(){

				curr_id = parseInt($(this).attr('id'));

				if(curr_id != this_id){
					$(this).parent().hide(function(){
					$(this).hide();
					});
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

		$this.hide();

		if(level==1){                       
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
			$(".jumbotron").hide(function(){
					$(curr_jumbotron_parent).parent().show(function(){
					$(curr_jumbotron_parent).show();
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
				});
			});
			$(curr_jumbotron_parent).parent().find(".checkedhigh, .btngrp").show();
			$(curr_jumbotron_parent_class).parent().find(".checkedhigh, .btngrp").hide();
			$(".q-sidebar").hide();
			$(parent_question_class).show();
		}
	});

	$(".jumbotron .q-text").each(function(){
		$qt = $(this);
		$(".ques").each(function(){
			if($qt.html()==$(this).html()){
				$qt.closest(".jumbotron").addClass("ans-"+$(this).attr("data"));
			}
		});
	});


	$(".ansnum").each(function(){
		var cstr = ".ans-" + $(this).attr('data');
		var num = String($(cstr).length);
		if(num==1){
			var linktxt = num + " Simpler";
		}
		else{
			var linktxt = num + " Simplers";
		}

		$(this).html("<a href = 'javascript:;'>" + linktxt + "</a>");

	});

	$(".jumbotron").not("#Post").each(function(){
		$this = $(this);
		var counter = 1;
		var string_id = $(this).attr("id");
		var question_class = "q-" + string_id;
		$("." + question_class).each(function(){
			if(counter == 1){
				$cached = $(this);
				$cached.html("<p>" + $cached.html() + "</p>");
			}
			else{
				$cached.html($cached.html()+ "<p>" + $(this).html() + "</p>");
				$(this).remove();
			}
			counter += 1;
		});
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
		$(".currhid").parent().show(function(){
			$(".currhid").show(function(){
				$(".currhid").removeClass("currhid");
			});
		});
		$(this).hide();
		$(this).parent().find(".ansnum").show();
	});

	$(".ques-add").click(function(){
		var uri = $(this).attr('data');
		window.location.href = uri;
	});
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