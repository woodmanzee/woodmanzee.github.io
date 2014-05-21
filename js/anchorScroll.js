function scrollToAnchor(sectionId){
    var aTag = $("section[id='"+ sectionId +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

$(document).ready(function() {
    $("#navBarIntro").click(function() {
        scrollToAnchor('intro');
    });
    $("#navBarHome").click(function() {
        scrollToAnchor('home');
    });
    $("#navBarZack").click(function() {
        scrollToAnchor('zack');
    });
    $("#navBarHannah").click(function() {
        scrollToAnchor('hannah');
    });
    $("#navBarPictures").click(function() {
        scrollToAnchor('pictures');
    });
});
