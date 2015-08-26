var ibood = {
    lastProduct: {},
    
    getLatestProduct: function (callback) {
    
        var url = 'https://www.ibood.com/be/nl/',
            x = new XMLHttpRequest();

        x.open('GET', url);

        // Response has been received!
        x.onload = function () {
            
            // Create variables
            var data = {},
                doc = document.implementation.createHTMLDocument("example");
            
            // Parse the DOM
            doc.documentElement.innerHTML = x.responseText;

            // Scrape required data from website
            data.title = doc.querySelectorAll('.offer-title .long')[0].innerHTML;
            data.image = "http:" + doc.querySelectorAll('.offer-img img')[0].getAttribute('data-mobile');
            data.price_old = doc.querySelectorAll('.price .old-price')[0].innerHTML.replace(/<[^>]*>/g, "");
            data.price_new = doc.querySelectorAll('.price .new-price')[0].innerHTML.replace(/<[^>]*>/g, "");
            data.url = doc.querySelectorAll('.button-cta.buy a')[0].href;
            
            // Send the data back to the caller
            if (typeof callback === 'function') {
                callback(data);
            }
            
        };

        // Ajax error occured
        x.onerror = function (e) {
            window.console.log('ajax error!', e);
        };

        // Send the ajaxRequest
        x.send();
        
    },
    
    openInTab: function () {
        chrome.tabs.create({ 
            active: true,
            url: ibood.lastProduct.url 
        });
    }
    
};