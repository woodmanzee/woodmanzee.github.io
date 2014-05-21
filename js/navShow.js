jQuery(document).ready(function($){
    $('#navNav, .navBar').click(function(){
        var $lefty = $('.navBody');
        $lefty.animate({
            right: parseInt($lefty.css('right'),10) == 0 ?
                -$lefty.outerWidth() :
                0
        });
        var $nav = $('#navNav');
        $nav.animate({
            right: parseInt($nav.css('right'),10) == 50 ?
                +230 :
                50
        });
    });
});
