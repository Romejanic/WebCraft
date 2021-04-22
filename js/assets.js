const assets = {};
const assetLoader = {
    assetsToLoad: undefined,
    loadAssets: function(callback) {
        this.callback = callback;

        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if(req.readyState == 4 && req.status == 200) {
                assetLoader.assetsToLoad = JSON.parse(req.responseText);
                assetLoader.loadAsset(0);
            }
        };
        req.onerror = function(err) {
            console.error("Failed to load asset manifest!");
            console.error(err);
        };
        req.open("GET", "WebCraft/res/assets.json", true);
        req.send();
    },
    loadAsset: function(idx) {
        if(idx >= assetLoader.assetsToLoad.length && assetLoader.callback) {
            assetLoader.callback();
        } else {
            var asset = assetLoader.assetsToLoad[idx];
            switch(asset.type) {
                case "texture":
                case "image":
                    var img = new Image();
                    img.onload = function() {
                        assets[asset.id] = img;
                        assetLoader.loadAsset(idx + 1);    
                    };
                    img.onerror = function(err) {
                        console.error("Failed to load asset: " + asset.id + "(" + asset.url + ")");
                        console.error(err);
                        assetLoader.loadAsset(idx + 1);
                    };
                    img.src = asset.url;
                    break;
                default:
                    var req = new XMLHttpRequest();
                    req.onreadystatechange = function() {
                        if(req.readyState == 4 && req.status == 200) {
                            assets[asset.id] = req.responseText;
                            assetLoader.loadAsset(idx + 1);
                        }
                    };
                    req.onerror = function(err) {
                        console.error("Failed to load asset: " + asset.id + "(" + asset.url + ")");
                        console.error(err);
                        assetLoader.loadAsset(idx + 1);
                    };
                    req.open("GET", asset.url, true);
                    req.send();
                    break;
            }
        }
    }
};
