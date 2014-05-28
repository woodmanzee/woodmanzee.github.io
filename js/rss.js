//<![CDATA[
/**
this script was written by Confluent Forms LLC http://www.confluentforms.com
for the BlogXpertise website http://www.blogxpertise.com
any updates to this script will be posted to BlogXpertise
please leave this message and give credit where credit is due!
**/

/**
The script inserts LI items into a target UL object within your site. Within each
new LI item are a h5, an img with class 'feedThumb', a p with class 'feedBlurb', 
and a span with class 'feedDate'. Set the style information for these classes 
elsewhere in your template.

You will also want to provide styling for the UL object that you are targeting.
**/

/**
set your variable values in the area below
**/

// set to be the URL of your RSS feed
var feedURL 			= 'http://newmansee.blogspot.com/feeds/posts/default?alt=rss';
// set to be the number of entries you'd like to display
var numEntries 			= 5;
// set to be the date format you'd like to use; look down at function formatDate for more info
var dateFormat 			= 'mmmm dd, yyyy';
// set to be the ID of the target UL within your page or template; make sure to have a # sign before the id name
var targetLocation 		= '.blogfeed';
// set to be 1 or 0 for whether you'd like to use thumbnails for posts if they're available
var imageThumbnails 	= 0;
// set to the width that you'd like the thumbnail to be
var imageThumbnailWidth = 200;
// set to be 1 or 0 if you'd like the script to square-crop the thumbnail
var imageThumbnailCrop 	= 1;
// set to be the length of the post lead-in in characters
var blurbLength 		= 45;
// set to the characters you'd like at the end of the post lead-in
var blurbContinue 		= '...'


// MY VARIABLES
var currentPost = 0;
var numPosts = 0;

if (imageThumbnailCrop) {
	var imageVar = 's' + imageThumbnailWidth + '-c';
} else {
	var imageVar = 's' + imageThumbnailWidth;
}

/**
the script below formats the date that is returned from the RSS feed
we did not create the script but believe it was created by
Big Cartel at http://www.bigcartel.com
**/
function formatDate(d, f) {
    var d = new Date(d);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return f.replace(/(yyyy|mmmm|mmm|mm|dddd|ddd|dd|hh|nn|ss|a\/p)/gi,
		function($1) {
			switch ($1.toLowerCase()) {
              case 'yyyy': return d.getFullYear(); // full year, 4 digits
              case 'mmmm': return months[d.getMonth()]; // full month
              case 'mmm':  return months[d.getMonth()].substr(0, 3); // month abbreviated
              case 'mm':   return (d.getMonth() + 1); // month numerical value
              case 'dddd': return days[d.getDay()]; // full day
              case 'ddd':  return days[d.getDay()].substr(0, 3); // day abbreviated
              case 'dd':   return d.getDate(); // day numerical value
              case 'hh':   return ((h = d.getHours() % 12) ? h : 12); // hour value
              case 'nn':   return d.getMinutes(); // minute value
              case 'ss':   return d.getSeconds(); // second value
              case 'a/p':  return d.getHours() < 12 ? 'a' : 'p'; // am or pm
			}
		}
	);
}
  
google.load("feeds","1");

function displayFeed(){
	console.log('beginning displayFeed');
	var feed = new google.feeds.Feed(feedURL);
	feed.setNumEntries(numEntries)
	feed.load(function(result) {
        if (!result.error) {
			console.log('displayFeed commencing, processing entries');
            numPosts = result.feed.entries.length - 1;
			for (var i = 0; i < result.feed.entries.length; i++) {
				console.log('processing entry #' + i);
				var entry 			= result.feed.entries[i];
				var entryID			= "entryItem" + i;
				var entryURL 		= entry.link;
				var entryTitle 		= entry.title;
				var entryContent 	= $('<div>').html(entry.content);
				var entryDate 		= formatDate(entry.publishedDate, dateFormat);
				var imageReg 		= /s\B\d{3,4}/;
				var entryImage 		= entryContent.find('a img').first(); // there might be issues here due to the tracking image placed into the feed by Google
				var entryBlurb 		= entryContent.text().split(' ').slice(0,blurbLength).join(' ') + blurbContinue;
                
                if (i != 0) {
                    $(targetLocation).append($('<div>').attr('id', entryID).addClass('hide'));
                } else {
                    $(targetLocation).append($('<div>').attr('id', entryID));
                }
                $('<p>').addClass('styleText text-center blog-title').text(entryTitle).appendTo('#' + entryID);
				$('<p>').addClass('feedDate text-center blog-date').text(entryDate).appendTo('#'+ entryID);
				//$('<p>').addClass('feedBlurb blog-text').text(entry.content).appendTo('#'+ entryID);
                parsedHtml = $.parseHTML(entry.content);
                console.log(parsedHtml);
                $('#' + entryID).append(parsedHtml);
                $('<div>').addClass('text-center blog-link').append($('<a>').addClass('btn btn-default text-center').text('View this post on Blogger.com').attr('href', entryURL)).appendTo('#' + entryID);
                console.log('entry ' + entryID + ' added');
                // $('<h5>').append($('<a>').attr('href',entryURL).text(entryTitle)).appendTo("#"+ entryID);
			}
            console.log('Found ' + (numPosts + 1) + ', currently displaying index:' + currentPost);
            showHideButtons();
        } else console.log('error loading');
	});
}

google.setOnLoadCallback(displayFeed);

function showHideButtons() {
    console.log('showHideButtons: currentPost: ' + currentPost + ', numPosts: ' + numPosts);
	if (currentPost == 0) {
		$('.blog-nav-right').toggleClass('hide');
	}
	if (currentPost == numPosts) {
		$('.blog-nav-left').toggleClass('hide');
	}
}


$(document).ready(function() {
    // CLICK NEXT POST
	$('.blog-nav-right').click(function() {
        // if not the first post
		if (currentPost != 0) {
			$('#entryItem' + currentPost).toggleClass('hide');
            // if we're on the oldest post, and we're navigating to a newer post, show the prev button
            if(currentPost == numPosts) {
                $('.blog-nav-left').toggleClass('hide');
            }
			currentPost--;
			$('#entryItem' + currentPost).toggleClass('hide');
			showHideButtons();
            console.log('Now showing post #' + currentPost);
		}
	});
    // CLICK PREV POST
	$('.blog-nav-left').click(function() {
        // if not the last post
		if (currentPost != numPosts) {
			$('#entryItem' + currentPost).toggleClass('hide');
            // if we're on the newest post, and we're navigating to an older post, show the next button
            if (currentPost == 0) {
                $('.blog-nav-right').toggleClass('hide');
            }
			currentPost++;
			$('#entryItem' + currentPost).toggleClass('hide');
			showHideButtons();
            console.log('Now showing post #' + currentPost);
		}
        if (currentPost != 0) {
            
        }
	});
});
