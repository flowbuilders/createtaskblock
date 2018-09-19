$('document').ready(function() {
    var sdk = new window.sfdc.BlockSDK();
    var crmIdField;

    function paintSettings () {
    	document.getElementById('crm-id-field').value = crmIdField;
    }

    function paintMap() {
    	crmIdField = document.getElementById('crm-id-field').value;
    	address = document.getElementById('text-input-id-1').value;
    	width = document.getElementById('slider-id-01').value;
    	height = document.getElementById('slider-id-02').value;
    	zoom = document.getElementById('slider-id-03').value;
    	link = document.getElementById('text-input-id-2').value;
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
    	paintSettings();
    });
});
