$(window).load(function(){
	var x = 0;
	$('#nav .stickybar-item').click(function(e){

		var tab_id = $(this).attr('data-tab');
		$('#nav .stickybar-item').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');

		if ($('#head-title').length) {
			$('#head-title').html($(this).data('title'));
		}
    $('.scroll-content').data('jsp').scrollToY('0px', 200);
		return false;
	});

	setTimeout(function() {
		var parentH = window.frameElement.offsetHeight,
				contentH = parentH - $('.scroll-content').offset().top - 8;
				$('.scroll-content').css('height',  contentH +'px');

		var pane = $('.scroll-content').jScrollPane({
					showArrows: true,
					autoReinitialise: true,
					verticalArrowPositions: 'split',
					horizontalArrowPositions: 'split',
					mouseWheelSpeed: 100
				});
	}, 500);

});