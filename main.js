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

    function paintSettings () {
        console.log('Painting Settings');
    	document.getElementById('crm-id-field').value = crmIdField;
    }

    function paintMap() {
        console.log('Painting Map');
        console.log('crm-id-field is ' + document.getElementById('crm-id-field').value);
    	crmIdField = document.getElementById('crm-id-field').value;
        console.log('crmIdField is ' + crmIdField);
    	if (!crmIdField) {
    		return;
    	}

    	sdk.setContent('<p>' + crmIdField + '</p>');
        //console.log('sdk content is : ' + sdk.getContent());
    	sdk.setData({
    		crmIdField: crmIdField
    	});
    }

    sdk.getData(function (data) {
        console.log('Running getData');
    	crmIdField = data.crmIdField;
    	paintSettings();
    });

    document.getElementById('workspace').addEventListener("input", function () {
        console.log('Event Listener Running');
        debounce(paintMap, 500)();
    });
});
