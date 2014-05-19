jQuery(document).ready(function() {
    jQuery(".toggle").next(".secret").hide();
    jQuery(".toggle").click(function() {
		$('.toggle').not(this).toggleClass('secret').slideToggle(300);
        $('.active').not(this).toggleClass('active').next('.secret').slideToggle(300);
        $(this).toggleClass('active').next().slideToggle("fast");
    });
});