jQuery(document).ready(function($){
    $('#homeNav').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    });
});