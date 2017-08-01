//approximate year 1 draft cost

//get picks
var cost = 0;
$('#row div.span4').eq(1).find('dd').each(function(){
    var pick = parseFloat($(this).text().split('(')[1].split(')')[0]);
    cost += 420 + 5080*Math.exp((pick-1)/-25);
})
cost = Math.trunc(cost)*1000;
cost = '$' + cost.toLocaleString();

//place number in page
$('#row div.span4').eq(1).find('dd:last').after('<dl><dt>Est. Year 1 Cost:</dt><dd>' + cost +'</dd></dl>');