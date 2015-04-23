function init() {
    FastClick.attach(document.body);

    $('#play').on('click', function() {
    	$(this).css('opacity',0);
    	$('#mask, video, #close').css('display','block');
		setTimeout(function(){
	    	$('#mask, video, #close').css('opacity',1);
		}, 200);
    	$('#video')[0].play();
    });

    $('#close').on('click', function() {
    	$('#play').css('opacity',1);
    	$('#mask, video, #close').css('opacity',0);
		setTimeout(function(){
	    	$('#mask, video, #close').css('display','none');
            $('#video').prop("currentTime",0);
		}, 1000);
    	$('#video')[0].pause();
    });
};

$(document).ready(init);