$(document).ready(function(){

  var fixmeTop = $('#ftopbar').offset().top;
  $(window).scroll(function() {
    var scrollmark = $("#biglogo").offset().top + $("#biglogo").height();
    var currentScroll = $(window).scrollTop();
    if(currentScroll <= scrollmark){
      if($("#biglogo").is(":visible")){
        $("#logocontainer img").fadeOut('fast');
      }
    }
    else{
      $("#logocontainer img").fadeIn('fast');
    }
    if (currentScroll >= fixmeTop) {
      $('#ftopbar').css({
        position: 'fixed',
        top: '0',
        left: '0'
      });
    } else {

      $('#ftopbar').css({
        position: 'static'
      });
    }
  });

  $("#signin").click(function(){
    window.scrollTo(0,0);
    $(this).hide('fast');
    $("#biglogo").hide();
    $("#introtext").hide();
    $("#login").fadeIn('fast');
    $("#logocontainer img").fadeIn('fast');
  });

}); //document.ready closed.
