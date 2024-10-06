var isShort = function(arg_link){
    return arg_link.indexOf("https://www.youtube.com/shorts") === 0;
}

var getVideoId = function(arg_link){
    return arg_link.substring(31);
}

var toNormalYtb = function(VideoId){
    return "https://www.youtube.com/watch?v=" + VideoId;
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.sync.get(["AlwaysOn"], function(item){
        let allowed = item.AlwaysOn;

        if (allowed === true){
            chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
                var link = tabs[0].url;
                if (isShort(link)) {
                    let newLink = toNormalYtb(getVideoId(link));
                    chrome.tabs.update(undefined, { url: newLink });
                }
            });
        }
    });
});

chrome.contextMenus.create({
    id: 'convert_short',
    title: 'Convert From Short',
    contexts: ['all'],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'convert_short'){

        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            var link = tabs[0].url;
            if (isShort(link)) {
                let newLink = toNormalYtb(getVideoId(link));
                chrome.tabs.update(undefined, { url: newLink });
            }
        });
    }
});


chrome.commands.onCommand.addListener(function(command) {
    if (command === 'kill_ytb_short') {
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            var link = tabs[0].url;
            if (isShort(link)) {
                let newLink = toNormalYtb(getVideoId(link));
                chrome.tabs.update(undefined, { url: newLink });
            }
        });
    }
});