$(document).ready(function(){

  $(".t span").each(function(){
    if($(this).html().trim() != ''){
      $(this).css("display", "inline");
    }
  });

  window.selectmode = false;

  $(document).mouseup(function(){

    if(getSelectionHtml().trim() != ''){

      window.selectmode = true;

      window.line_arr = [];

      $("#empty").append(getSelectionHtml());

      $("#empty").find(".t").each(function(){
        window.line_arr.push($(this).attr("class"));
      });
      var selector1 = '.' + window.line_arr[0].split(" ").join('.');
      var selector2 = '.' + window.line_arr[window.line_arr.length-1].split(" ").join('.');
      var firstline_full = $(selector1).first().html();
      var first_selection_html = $("#empty").find(selector1).html();
      var last_selection_html = $("#empty").find(selector2).html();
      var lastline_full = $(selector2).first().html();

      $(selector1).first().html(firstline_full.replace(first_selection_html, '<span class="highlight_wrapper"><span class="highlight"></span>'+first_selection_html+'</span>'));
      $(selector2).first().html(lastline_full.replace(last_selection_html, '<span class="highlight_wrapper">'+last_selection_html+'</span>'));

      var l;
      for (l = 1; l < window.line_arr.length-1; ++l) {
        var selector = "." + window.line_arr[l].split(" ").join('.');
        var shtml = $(selector).first().html();
        $(selector).first().html('<span class="highlight_wrapper">' + shtml + "</span>");
      }

      $("#quesboxwrapper").show();
      $("#contextquesbox").focus();

      window.onehview = true;
      $("body").addClass("noselect");

      $(".instruct").html('Enter the related question below.');
    }
    else if(window.selectmode && getSelectionHtml()==''){

        $("#quescrate").empty();

        $(".instruct").html('Select any text to add a question<br/> Or, click on a dot to view related question(s).')

        $(".instruct").show('fast');

        $("#qinst").hide();

        $("#quesboxwrapper").hide();

        $("#queswrapper").hide();

        $("body").removeClass("noselect");

        window.selectmode = false;

        clearSelection();

        var l;
        for (l = 0; l < window.line_arr.length; ++l) {
          var selector = "." + window.line_arr[l].split(" ").join('.');
          var hwhtml = $(selector).first().find(".highlight_wrapper").html();
          $(selector).first().find(".highlight_wrapper").replaceWith(hwhtml);
          if(l==window.line_arr.length-1){
            window.line_arr = [];
            $("#empty").empty();
          }
        }

      }
  });
});

function clearSelection() {
  if ( document.selection ) {
    document.selection.empty();
  } else if ( window.getSelection ) {
    window.getSelection().removeAllRanges();
  }
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

function hidehighlights(){

  var hldefer = $.Deferred();

  $('.highlight').css('visibility', 'collapse');

  setTimeout(function(){
    hldefer.resolve();
  },5);

  return hldefer;
}

function striptag_jq(element){
  element.contents().unwrap();
}
