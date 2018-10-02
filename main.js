$('document').ready(function() {
    var sdk = new window.sfdc.BlockSDK();
    var crmIdField;
    var modelAmp;

    $.get("https://flowbuilders.github.io/createtaskblock/amp.txt", function(data, status){
        modelAmp = data;

        sdk.getData(function(data) {
            crmIdField = data.crmIdField;
            fillSettings();
        });
    });

    function debounce(func, wait, immediate) {
        console.log('Debouncing');
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function fillSettings() {
        document.getElementById('crm-id-field').value = crmIdField;
    }

    function updateMe() {
        crmIdField = document.getElementById('crm-id-field').value;
        if (!crmIdField) {
            return;
        }

        // Generate required AMPScript
        var amp = modelAmp.replace(/%%WhatId%%/img,crmIdField)
        sdk.setContent(amp);
        sdk.setSuperContent('Logging an Email against the' + crmIdField);
        //console.log('sdk content is : ' + sdk.getContent());
        sdk.setData({
            crmIdField: crmIdField
        });
    }

    document.getElementById('workspace').addEventListener("input", function() {
        debounce(updateMe, 500)();
    });
});
