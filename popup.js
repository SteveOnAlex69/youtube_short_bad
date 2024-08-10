var switch_button = document.getElementById("switch_button");
var checkbox1 = document.getElementById("checkbox1");

var isShort = function(arg_link){
    return arg_link.indexOf("https://www.youtube.com/shorts") === 0;
}

var getVideoId = function(arg_link){
    return arg_link.substring(31);
}

var toNormalYtb = function(VideoId){
    return "https://www.youtube.com/watch?v=" + VideoId;
}


switch_buttom.onclick = function(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let link = tabs[0].url;
        
        if (isShort(link)) {
            let newLink = toNormalYtb(getVideoId(link));
            chrome.tabs.update(undefined, { url: newLink });
        }
        else{
            alert("This only works on Youtube Short.")
        }
        window.close();
    });

}

checkbox1.onclick = function(){
    let hmm = checkbox1.checked;
    chrome.storage.sync.set({"AlwaysOn": hmm});

    if (hmm === true){
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs){
            var link = tabs[0].url;
            if (isShort(link)) {
                let newLink = toNormalYtb(getVideoId(link));
                chrome.tabs.update(undefined, { url: newLink });
            }
        });
    }
}

window.onload = function(){
    chrome.storage.sync.get(["AlwaysOn"], function(item) {
        let allowed = item.AlwaysOn;
        if (allowed === undefined){
            chrome.storage.sync.set({"AlwaysOn": false}, function() {});
            allowed = false;
        }
        document.getElementById("checkbox1").checked = allowed;
    });
}