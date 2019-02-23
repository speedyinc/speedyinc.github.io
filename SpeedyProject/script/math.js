function func(num) {
	document.form.result.value = document.form.result.value + num;
}

function funcRavn() {
	var exp = document.form.result.value;
	document.form.result.value = eval(exp);
}

function clean() {
	document.form.result.value = '';
}

function back() {
	var exp = document.form.result.value;
	document.form.result.value = exp.substring(0,exp.length - 1);
}

function stepen () {
	document.form.result.value *= document.form.result.value;
}

function sqrt () {
	document.form.result.value = Math.sqrt(document.form.result.value);
}

jQuery('document').ready(function()
	{
		jQuery('#sin').on('keyup', function() {

		var value1,
			result1;

		value1 = jQuery('#sin').val();
		result1 = Math.sin(value1);
	
		jQuery('#result1').html( result1 );
	
		});

		jQuery('#cos').on('keyup', function() {

		var value2,
			result2;

		value2 = jQuery('#cos').val();
		result2 = Math.cos(value2);
	
		jQuery('#result2').html( result2 );
	
		});

		jQuery('#tg').on('keyup', function() {

		var value3,
			result3;

		value3 = jQuery('#tg').val();
		result3 = Math.tan(value3);
	
		jQuery('#result3').html( result3 );
	
		});

		jQuery('#ctg').on('keyup', function() {

		var value4,
			result4;

		value4 = jQuery('#ctg').val();
		result4 =  1 / Math.tan(value4);
	
		jQuery('#result4').html( result4 );
	
		});
	}
);