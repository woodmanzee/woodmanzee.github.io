jQuery(document).ready(function() {
    jQuery(".box").hover(function() {
		$(this).children("#card").toggleClass('flipped');
    });
});
