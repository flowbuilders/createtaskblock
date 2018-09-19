$('document').ready(function() {
    var sdk = new window.sfdc.BlockSDK();
    var crmIdField;

    function debounce (func, wait, immediate) {
        console.log('Debouncing');
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

    function fillSettings () {
    	document.getElementById('crm-id-field').value = crmIdField;
    }

    function updateMe() {
    	crmIdField = document.getElementById('crm-id-field').value;
    	if (!crmIdField) {
    		return;
    	}

        // Generate required AMPScript
        var amp = '%%[\n';
        amp += 'SET @crmfield = AttributeValue("' + crmIdField + '")\n';
        amp += '\n]%%';

    	sdk.setContent(amp);
        //console.log('sdk content is : ' + sdk.getContent());
    	sdk.setData({
    		crmIdField: crmIdField
    	});
    }

    sdk.getData(function (data) {
    	crmIdField = data.crmIdField;
    	fillSettings();
    });

    document.getElementById('workspace').addEventListener("input", function () {
        debounce(updateMe, 500)();
    });
});
