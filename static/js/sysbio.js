$(document).ready(function(){
  $(document).mouseup(function(){
    window.quabl_html = getSelectionHtml();

    if(getSelectionHtml() != ''){

      if($(window.getSelection().getRangeAt(0).commonAncestorContainer).closest('.t').length != 0){

        highlight_parent = $(window.getSelection().getRangeAt(0).commonAncestorContainer).closest('.t');

        window.conans = highlight_parent;

        $.when(simpler_cache($(window.getSelection().getRangeAt(0).commonAncestorContainer).closest('.t'))).then(function(){

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
    }  });
});

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

function replaceanswer(){

  var repdefer = $.Deferred();

  var final_span = " ";

  var simpler_id = $(window.getSelection().getRangeAt(0).commonAncestorContainer).closest('.t').attr("class");

  var selection = window.getSelection().getRangeAt(0);
  var selectedText = selection.extractContents();
  var highlight = String(selectedText.textContent);

  var highlight_arr = highlight.split("");
  var firstel = highlight_arr[0];
  var lastel = highlight_arr[highlight_arr.length-1];

  highlight = highlight.trim();

  var req_span = '<span class="curr_highlight"><span class="html">texthtmlgoeshere</span></span>' + window.quabl_html;

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


  $("#ansdump").append($(window.getSelection().getRangeAt(0).commonAncestorContainer).closest('.t').html());
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
