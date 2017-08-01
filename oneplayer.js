//=== Add age to player profile===

var getUrlParameter = function getUrlParameter(url,sParam) {
    var sPageURL = decodeURIComponent(url.split('?')[1]),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

//find current league year
var year = undefined;
var lg = getUrlParameter(window.location.href,'myleagueno') || getUrlParameter(window.location.href,'leagueno');
$('ul.nav').first().find('ul li:nth-child(4) a').each(function(){
    lg1 = getUrlParameter($(this)[0].href,'myleagueno') || getUrlParameter($(this)[0].href,'leagueno');
    if(lg == lg1){
        year = parseFloat(getUrlParameter($(this)[0].href,'year'));
    }
});

// get birthday
$col = $('ul.list-group li:nth-child(5)');
bday = parseFloat($col.text().match(/\d{4}/)[0]);

// add age after birthday
$col.append(' (Age: ' + (year - bday) + ')' );
