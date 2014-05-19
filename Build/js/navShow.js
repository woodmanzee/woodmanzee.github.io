jQuery(document).ready(function($){
    $('#navNav').click(function(){
		$('.navBody').toggleClass('hide');
		$(this).toggleClass('navOpened');
    });
});