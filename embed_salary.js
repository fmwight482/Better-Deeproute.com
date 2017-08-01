//embed salary in page

$('#SalarySpan').removeAttr( 'style' )
$('#SalarySpan').find('table:first').addClass('span12');
var $sal = $('#SalarySpan').clone();
$('#SalarySpan').remove();
$('table.span12').first().after($sal);