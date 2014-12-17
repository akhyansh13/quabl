function onPageDetailsReceived(pageDetails)  
{ 
    document.getElementById('context').innerText = pageDetails.context; 
}

var statusDisplay = null;


function postcontext() 
{
    event.preventDefault();
    var url = 'www.quabl.com/addpost';
    var req = new XMLHttpRequest();
    req.open('POST', url, true);
    var context = encodeURIComponent(document.getElementById('context').value);
    var questions = encodeURIComponent(document.getElementById('question').value);

    var params =
                 '&context=' + context +
                 '&questions =' + questions;

    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = function() 
    {
        if (req.readyState == 4) 
        {
            statusDisplay.innerHTML = '';
            if (req.status == 200) 
	    {
                statusDisplay.innerHTML = 'Posted!';
                window.setTimeout(window.close, 1000);
            } 
 	    else 
	    {
                
                statusDisplay.innerHTML = 'Error posting: ' + req.statusText;
            }
        }
    };

    req.send(params);
    statusDisplay.innerHTML = 'Posting...';
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