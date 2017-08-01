$('select[name$=roster]').change(function(){
	var sel = $(this);
	var selected = sel.val(); // cache selected value, before reordering
	var opts_list = sel.find('option');
	opts_list.sort(function(a,b){
		//clean up text so that sort is based on position THEN overall if it exists
		a.text = a.text.replace('* ','');
		a = a.text.split(' ');
		a_pos = a[0];
		a_name = a[1] + a[2];
		a_ovr = '0'
		if(a[3] != 'undefined'){
			a_ovr = 110-parseFloat(a[3].slice(1,3));
		}
		a = a_pos + a_ovr + a_name;
		
		b.text = b.text.replace('* ','');
		b = b.text.split(' ');
		b_pos = b[0];
		b_name = b[1] + b[2];
		b_ovr = '(00/00)'
		if(b[3] != 'undefined'){
			b_ovr = 110-parseFloat(b[3].slice(1,3));
		}
		b = b_pos + b_ovr + b_name;
			
		
		if (a > b) return 1;
		if (a < b) return -1;
		return 0;
	});
	sel.html('').append(opts_list);
	sel.val(selected); // set cached selected value
});

$('select[name$=roster]').trigger('change');