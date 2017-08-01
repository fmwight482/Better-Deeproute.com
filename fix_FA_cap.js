//disable warning
document.getElementById('mywarn').value = "Y";

//FA salary is caused by incorrect deadcap reporting in year 0...current year
//get correct deadcap from roster move page and overwrite value on current page
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}

//figure out which url we need to grab
tm = $.urlParam('myteamno');
lg = $.urlParam('myleagueno');

//get deadcap0 from roster move page
$.get("http://deeproute.com/?js=rosters&myleagueno=" + lg + "&myteamno=" + tm, function(data) {
    
    //get and set values
    $('#deadcap0').val($(data).find('#deadcap0').val());
    $('#yearcap0').val($(data).find('#yearcap0').val());
    
    //update page
    deadcap = parseFloat($('#deadcap0').val()) * 1000;
    $('#deadcapsalary td').eq(0).text('$' + deadcap.toLocaleString());
    yearcap = parseFloat($('#yearcap0').val()) * 1000;
    $('#capwithcontracts').prev().text('$' + yearcap.toLocaleString())
	location.href="javascript:fillsignedcap(); updateplayer(1,999,'','Active'); void 0";
});
