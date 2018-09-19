$('document').ready(function() {
    var sdk = new window.sfdc.BlockSDK();
    var crmIdField;

    function debounce (func, wait, immediate) {
    	var timeout;
    	return function() {
    		var context = this, args = arguments;
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

    function paintSettings () {
    	document.getElementById('crm-id-field').value = crmIdField;
    }

    function paintMap() {
    	crmIdField = document.getElementById('crm-id-field').value;
    	if (!crmIdField) {
    		return;
    	}

    	sdk.setContent('<p>' + crmIdField + '</p>');
    	sdk.setData({
    		crmIdField: crmIdField
    	});
    	localStorage.setItem('crmIdField', crmIdField);
    }

    sdk.getData(function (data) {
    	crmIdField = data.crmIdField || localStorage.getItem('crmIdField');
    	paintSettings();
    });

    document.getElementById('workspace').addEventListener("input", function () {
        debounce(paintMap, 500)();
    	paintSettings();
    });
});
