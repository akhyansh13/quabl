function onPageDetailsReceived(pageDetails)
{
    document.getElementById('context').innerText = pageDetails.context;
}

var statusDisplay = null;


function postcontext()
{
    event.preventDefault();
    var url = 'http://127.0.0.1:8000/addpostext';

    var context = encodeURIComponent($('#context').val());
    var questions = encodeURIComponent($('#questions').val());
    $.get((url), {context:context, questions:questions}, function(data){
      alert(data);
    });

}

window.addEventListener('load', function(evt)
{
    statusDisplay = document.getElementById('status-display');
    document.getElementById('htmlcontext').addEventListener('submit', postcontext);
    chrome.runtime.getBackgroundPage(function(eventPage)
    {
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});
