$(document).ready(function(){

  $("#sub").click(function(){
    $.get(('/firstloginsub/'), {uid:$("#username").val(), email: $("#email").val(), pass: $("#password").val()},function(data){
      window.location = '/cs670/';
    });
  });
});
