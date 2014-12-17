function getPageDetails(callback) 
{ 
    chrome.tabs.executeScript(null, { file: 'select.js' }); 
    chrome.runtime.onMessage.addListener(function(message) 
    { 
        callback(message); 
    }); 
};