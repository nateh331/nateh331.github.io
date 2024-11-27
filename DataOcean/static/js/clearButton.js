//clear button logic
$('#clear').click(function(){
	$('#search_form *').filter(':input').each(function(){
		this.value='';
		this.checked=false;
	});
});
