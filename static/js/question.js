$(document).ready(function(){
	$('.footer').hide();
	var answerno = 1;
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
			$('.rques').hide();
			$('.cques').hide();
			$('#1').show();
			$('.shortquespane').show();
			var bottom = $('.shortquespane').height();
			$('.answer-area').attr('style', "float:left; width:70%; margin-top:" + String(bottom) + "px;");
			curr_ans+=1;
		}
		else{
			if (curr_ans < answerno - 1) {
				$('#' + String(curr_ans)).hide();
				$('#' + String(curr_ans + 1)).show();
				$('.rques').hide();	
				curr_ans+=1;
			}
		}
	});
	
	$('.prev').click(function() {
		if (curr_ans == 1) {
			$('#1').hide();
			$('.shortquespane').hide();
			$('.mainquespane').show();
			$('.jumptotext').show();
			$('.rques').show();
			curr_ans-=1;
		}
		else{
			if (curr_ans > 0) {
				$('#' + String(curr_ans)).hide();
				$('#' + String(curr_ans - 1)).show();
				$('.rques').hide();
				curr_ans-=1;
			}
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
			
			$(".rques").each(function() {
				highlightid = $(this).attr('class').split('hid-')[1];
				if (highlightid == h_id) $(this).show();
			});

			$(".cques").each(function() {
				highlightid = $(this).attr('class').split('hid-')[1];
				if (highlightid == h_id) $(this).show();
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
			$('.rques').hide();
			$('.cques').hide();
		}
	});
	
	$('.viewcontext').click(function(){
		var question = $(this).data('id');
		var context = $(this).data('text');
		
		if (question == -1) {
			$('.mainquespane').hide();
			$('.jumptotext').hide();
			$('.rques').hide();
			$('.cques').hide();
			$('.context').show();
		}
		else {
			uri = "/question/" + question;
			window.location.href = uri;
		}
		$('.next').hide();
		$('.prev').hide();
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