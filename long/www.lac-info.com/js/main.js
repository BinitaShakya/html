/**
 * Project                  : Bayer LARC
 * Type                     : Website
 * JS libraries             : jQuery
 * JS features detection    : Modernizr
 * Developers               : Arm, ArmNo, Kookkai, Kaowfang, Kot, Nut
 */

// -----------------------------------------------------------------------------
// Variables
var $window                 = $(window),
		$document               = $(document),
		$html                   = $('html'),
		$body                   = $('body'),
		viewport_mobile					= 320,
		viewport_tablet					= 768,
		viewport_desktop				= 976,
		viewport_widescreen			= 1280,
		$prints_checkbox        = $('#print-options input:checkbox'),
		play_count              = 0,
		larcGuides,

		// Arrays
		VIEWPORT								= {};
// -----------------------------------------------------------------------------
// Functions
/* Window size */
VIEWPORT.dynamicWindow = function() {
	// Get the browser viewport without scrollbar
	$body.addClass('overflow-hidden');
	var windowsize = $window.width();
	$body.removeClass('overflow-hidden');

	// Mobile (less than 768px)
	if(windowsize < viewport_tablet) {
		if(!$html.hasClass('viewport-mobile')) {
			// Viewport
			$html.removeClass('viewport-tablet viewport-desktop').addClass('viewport-mobile');

			// console.log('Viewport: mobile');
			if (typeof larcGuides !== 'undefined') {
				larcGuides.destroy();
				larcGuides.init();
				larcGuides.closeAll();
			}
		}
	}

	// Tablets (768px - 1200px)
	else if(windowsize >= viewport_tablet && windowsize < viewport_desktop) {
		if(!$html.hasClass('viewport-tablet')) {
			// Viewport
			var fromMobile = $html.hasClass('viewport-mobile');
			$html.removeClass('viewport-mobile viewport-desktop').addClass('viewport-tablet');

			// Debugging
			// console.log('Viewport: tablet');
			if (typeof larcGuides !== 'undefined' && fromMobile) {
				larcGuides.destroy();
				larcGuides.init();
				larcGuides.closeAll();
			}
		}
	}

	// Desktop (more than 1200px)
	else {
		if(!$html.hasClass('viewport-desktop')) {
			// Viewport
			$html.removeClass('viewport-mobile viewport-tablet').addClass('viewport-desktop');

			// Debugging
			// console.log('Viewport: desktop');
			if (typeof larcGuides !== 'undefined') {
				larcGuides.destroy();
				larcGuides.init();
			}
		}
	}
};
// -----------------------------------------------------------------------------
// Document ready
// Specify a function to execute when the DOM is fully loaded.
$document.ready(function() {

	// Momentum scroll
	if(!$html.hasClass('Browser-Firefox') && !$html.hasClass('Browser-Safari')) {
		//scrollMomentun();
	}

	VIEWPORT.dynamicWindow();         // Check browser viewport

	// initialize guides module and keep reference object in global scope
	// so we can destroy and re-initialize the guide module when breakpoint is changed
	larcGuides = new LARCGuides();
	larcGuides.init();

	$('#navbar-toggle-button').on('click', toggleMenu);
	function toggleMenu() {
		$('#menu').toggleClass('collapse');
	}

	// Smart resize function
	$(window).smartresize(function(){
		$.fancybox.update();
	});

	var openLB = false;

	// Normal lightbox
	$('a[rel="lightbox"]').fancybox({
		maxWidth	: 800,
		fitToView: false,
		autoSize	: false,
		autoResize : false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		arrows: false,
		onUpdate:  function(){
			if (openLB === true)
				$('.fancybox-iframe').attr( 'src', function ( i, val ) { return val; });

			openLB = true;
		},
		beforeShow: function(){
			$("body").css({'overflow-y':'hidden'});
			var wsize = $window.width();

			if (!$html.hasClass('viewport-mobile')) {
				if ($html.hasClass('viewport-tablet')) {
					this.width = '100%';
					this.height = '80%';
				} else {
					this.width = $(this.element).data("width") ? $(this.element).data("width") : '85%';
					this.height = $(this.element).data("height") ? $(this.element).data("height") : '90%';
				}
			} else {
				this.width = '100%';
				this.height = '100%';
			}
		},
		afterShow : function(){
			$(".fancybox-inner").css('overflow','hidden');
		},
		afterClose: function(){
			$("body").css({'overflow-y':'visible'});
			openLB = false;

			// Reset video counter
			play_count = 0;
		}
	});

	// Normal lightbox
	$('a[rel="lightbox-video"]').fancybox({
		fitToView: false,
		width		: 642,
		height		: 520,
		minHeight : 450,
		autoSize	: false,
		autoResize : false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		arrows: false,
		beforeShow: function(){
			$("body").css({'overflow-y':'hidden'});
			if ($html.hasClass('viewport-mobile')) {
				this.width = '90%';
				this.height = '65%';
			}
		},
		afterClose: function(){
			$("body").css({'overflow-y':'visible'});
			$('#jquery_jplayer_1').jPlayer("destroy");

			// Reset video counter
			play_count = 0;
		},
		afterShow : function(){
			$(".fancybox-inner").css("overflow", "visible");

			var $video_home     = $('#video-home'),
					$video_selector = $('#jquery_jplayer_1');

			/* jPlayer */
			// Variables
			var media = {
						m4v     : 'videos/video-ius.mp4',
						ogv     : 'videos/video-ius.ogv',
						poster  : 'img/video-teaser.jpg'
					},
					width     = $video_selector.width(),
					vid_w     = width + 2 + 'px',
					vid_h     = (width / 1.7833333) + 'px';
			// console.log(width);
			// Player
			$video_selector.jPlayer({
				ready: function() {
					$(this).jPlayer('setMedia', media);
					$(this).jPlayer("play");
					$(this).on('click', function() {
						if($(this).attr('data-status') === 'pause') {
							$(this)
								.jPlayer('play')
								.attr('data-status', 'play');
						} else if($(this).attr('data-status') === 'play') {
							$(this)
								.jPlayer('pause')
								.attr('data-status', 'pause');
						}
						return false;
					});
				},
				ended: function() {
					$(this)
						.jPlayer('stop')
						.attr('data-status', 'pause')
						.jPlayer('setMedia', media);
				},
				swfPath           : 'swf',
				supplied          : 'm4v,ogv',
				size: {
					width           : vid_w,
					height          : vid_h
				},
				solution          : 'html, flash',
				errorAlerts       : false,
				warningAlerts     : false,
				smoothPlayBar     : true,
				keyEnabled        : true,
				remainingDuration : true,
				toggleDuration    : true
			});

			$video_selector.bind($.jPlayer.event.playing, function(event) {
				// console.log(event);
			});
		}
	});
	// Social sharing
	$('.share-fb').click(function(){
		window.open('http://www.facebook.com/sharer/sharer.php?u=link', 'facebook_share', 'height=320, width=640, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no').focus();
		return false;
	});

	$('.share-tw').click(function(){
		window.open('https://twitter.com/intent/tweet?original_referer=link&amp;text=text-content', 'tweet', 'height=320, width=640, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no').focus();
		return false;
	});

	$('.share-gp').click(function(){
		window.open('http://plus.google.com/share?url=link', 'tweet', 'height=320, width=640, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no').focus();
		return false;
	});

	// -- New FAQ Section --
	// 1. Toggle FAQ panel
	$('.faq-toggle-header').on('click', function() {
		var $toggleTitle      = $('.faq-toggle-title');
    $('.faq-toggle-panel').slideToggle();
    $(this).toggleClass('active');
    if($(this).hasClass('active')) {
    	$toggleTitle.text('Frequently Asked Questions');
    } else {
    	$toggleTitle.text('If you still want to know more click here for our FAQs.');
    }
	});

	// 2. FAQ grid
	var $accordionFAQ         = $('#accordion-faq'),
			$thumbnailHead        = $('.faq-header'),
			$thumbnailContent     = $('.faq-content'),
			$cardFlipper          = $('.card.effect__click'),
			lockscroll            = true;

	// Add inactive class for accordion FAQ on Desktop start
	if($html.hasClass('viewport-desktop')) {
		$('#accordion-faq').removeClass('active').addClass('inactive');
	}

	// Flipper FAQ on iPad - Desktop
	// Support: IE10+ to Modern Browsers
	if(!$html.hasClass('MSIE-9')) {

			$thumbnailHead.on('click', function(ev) {
			if(!$html.hasClass('viewport-mobile') && !$(this).hasClass('flipped')) {
				$cardFlipper.removeClass('flipped');
				$(this).parent('.card.effect__click').addClass('flipped');
			}
		});

		$thumbnailContent.on('click',function(event) {
			// if ($(event.target).hasClass('faq-content-close')) {
				$(this).parent('.card.effect__click').removeClass('flipped');
			// }
		});

	} else {

		// IE9
		// Use normal Fading
		$thumbnailHead.on('click', function(evt) {

			// Check to add class active to content
			if( !$(this).hasClass('active') && !$html.hasClass('viewport-mobile') ) {
				var $thisContent   = $(this).siblings('.faq-content');
				$thumbnailContent.removeClass('active');
				$thisContent.addClass('active');

				// Animate when active
				if($thisContent.hasClass('active')) {
					// Reset another block
					$thumbnailContent.stop().fadeOut(0, function() {
						$thumbnailHead.fadeIn(500);
					});
					// Animate Content
					$(this).stop().fadeOut(0, function() {
						$thisContent.fadeIn(500);
					});
				}
			}
		});

		// On Click FAQ Thumbnail Open
		$thumbnailContent.on('click', function(evt) {
			if($(evt.target).hasClass('faq-content-close')) {
				var $thisHeader     = $(this).siblings('.faq-header');

				$(this)
					.removeClass('active')
					.stop().fadeOut(0, function() {
						$thisHeader.fadeIn(500);
					});
			}
		});
	}



	// print pdf functionality
	// $('#print-options').on('submit', openPdf);
	$('#download-now').on('click', openPdf);

	// Flash button when checkboxes are clicked.
	$prints_checkbox.on('click', function(ev) {

		// only allow max. of 2 to be selected
		var num_checked = $prints_checkbox.filter(':checked').length;
		if (num_checked > 2) {
			ev.preventDefault();
			return;
		}

		$checkbox = $(this);

		if(!$checkbox.hasClass('is-check')) {
			// Set state
			$checkbox.addClass('is-check');

			$('#download-now')
				.animate({
					backgroundColor   : '#fce4eb',
					color             : '#da2d59'
					}, 100)
				.animate({
					backgroundColor   : '#da2d59',
					color             : '#fff'
					}, 100, function() {
						$(this).removeAttr('style');
					});
		} else {
			$checkbox.removeClass('is-check');
		}
	});

	// Set background when Checkbox:checked
	var $checkboxBg      = $('.checkbox-list-item');

	$checkboxBg.on('click', function() {
		if($("input:radio[name=things]").is(":checked")) {
			$(this).addClass('checked');
		} else {
			$checkboxBg.removeClass('checked');
		}
	});

	// 3 Circle options - Change color on checked
	var $circle_label      = $('.radio-circle-item').find('label');
	$circle_label.on('click', function(evt) {
		var $radio    = $(this).siblings('input:radio');
		if($radio.attr('checked', true)) {
			$circle_label.removeClass('checked');
			$(this).addClass('checked');
		}
	});




	/**
	 * open pdf file in another window (tab) based on selected choices
	 * @param  {object} ev event object
	 * @author armno <armno@buzzwoo.de>
	 */
	function openPdf(ev) {
		ev.preventDefault();

		// get checked checkboxes from data-id attribute
		// as a dash-separated string, max. of 2 (e.g. "2-5", "8")
		// var $form = $(this);
		// var checked = [].map.call(
		// 	$form.find('input[type=checkbox]').filter(':checked'),
		// 	function(el) {
		// 		return $(el).data('id');
		// 	})
		// 	.join('-');

		// if (checked === '') {
		// 	checked = '0';
		// }

		// selecting nothing will download `checklist-default.pdf` file
		// var fileUrl = 'pdf/Bayer_LAC_Checklist-' + checked + '.pdf';

		var fileUrl = 'pdf/Bayer_LAC_Checklist.pdf';
		window.open(fileUrl, '', '');
	}

	// Youtube API
	$(".video-button").click( function(){
  	var $dataVideo = $(this).parents('.video-container').attr('data-video');
  	var $dataCover = $(this).parents('.video-container').attr('data-cover');
    var dataFacebook = $(this).parents('.video-container').attr('data-facebook');
    var dataTwitter = $(this).parents('.video-container').attr('data-twitter');
    var dataGoogle = $(this).parents('.video-container').attr('data-google');
  	var $playerId  = 'player-' +  $dataVideo;

    // set sharing url
    $('.js-social-sharing .js-facebook').attr('href', dataFacebook);
    $('.js-social-sharing .js-twitter').attr('href', dataTwitter);
    $('.js-social-sharing .js-google').attr('href', dataGoogle);

  	// Destroy old video when new one is activated
  	if ( $('.container-main').find('iframe').length ) {
  		player.destroy();
    }

    // Set new player id to main video
  	$('.container-main').find('.video-player').attr('id', $playerId);

    // update `data-video` attribute of the video container whic is used with tracking
  	$('.container-main.video-container').attr('data-video', $dataVideo);

    // If user click video button at main video then find what thumbnail it belong
    $(".video-container").removeClass('is-playing'); // Reset

    $(this).parents('.video-container').addClass('is-playing');

    if ($(this).parent().hasClass('container-main')) {
    	// main video
    	$( ".video-thumbnails .video-container" ).each(function( index ) {
			  if ( $dataVideo === $( this ).attr('data-video') ) {
			  	$( this ).addClass('is-playing');
			  }
			});
    } else {
    	// Thumbnails
    	$('.video-container.container-main').addClass('is-playing');

    	// Update cover image
    	var $newCover = 'img/video-cover/' + $dataCover + '.jpg';
    	$('.video-main-cover').attr('src', $newCover);

    	// Match thumnail with content
    	var $thumnailId = $(this).parents('.video-container').attr('id');

    	$('.video-content-wrapper').removeClass('video-content-active');
    	$('.' + $thumnailId).addClass('video-content-active');

    }

    player = new YT.Player($playerId, {
      width : '320',
      height : '180',
      videoId : $dataVideo,
      playerVars: { 'autoplay': 1 },
      events : {
        'onReady' : onPlayerReady,
        'onReady' : function(event){/*Webtrends.addYTPlayer(event.target);*/},
        'onStateChange' : onPlayerStateChange  
      }
    });
  });

	// Trigger video button when cover is clicked
	$('.video-container').click( function(event) {
    if (!$(event.target).is('.video-button')) {
      $(this).find(".video-button").trigger('click');
    }
	});

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  function onPlayerReady(event) {
    //Webtrends.addYTPlayer(event.target);
    //event.target.playVideo();
    player.playVideo();
  }
  function onPlayerStateChange(event) {
    if(event.data == YT.PlayerState.ENDED) {
      player.destroy();
      $(".video-container").removeClass('is-playing');

      // Set new player id to main video
  		$('.container-main').find('.video-player').attr('id', 'player');
    }
  }
});
// -----------------------------------------------------------------------------
// Window - load
// Specify a function to execute when complete page is fully loaded.
$window.load(function() {

	// Height calculation
	var $section_fact = $('#tween-fact');

	// Media queries
	enquire.register('screen and (max-width: 767px)', {
		match   : function() {
			var scope_height  = 0;

			$section_fact.find('.col-scope').each(function(index, element) {
				var $element = $(element);

				scope_height = scope_height + $element.height();
			});

			$section_fact.find('.scope-inner').height(scope_height - 40 - 22);
		},
		unmatch : function() {
			// Unmatch
		}
	});
});
// -----------------------------------------------------------------------------
// Window - resize
$window.resize(function() {

	VIEWPORT.dynamicWindow();         // Check browser viewport


		// $('.card.effect__click').on('click', function() {
		// 	if(!$html.hasClass('viewport-mobile')) {
		// 		console.log('click');
		// 		//$(this).toggleClass('flipped');
		// 	}
		// });

});


// --------------------------------------------------------------------------
/**
 * Constructor function for LARCGuides widget.
 * handles guide-through elements & functionalties
 * @author armno <armno@buzzwoo.de>
 * @todo - deal with viewport change event (re-init?)
 */
function LARCGuides() {
	this.choices = $('.js-choices');
	this.notes = $('.paper-notes');
	this.closeBtns = $('.notes-close');
	this.nextLinks = $('.notes-next-link');
	this.activeGuideId = -1;

	this.things = $('input[name="things"]');

	// this will be used to cache $accordion's `activate` callback function for mobile.
	this.mobileCallback = $.noop;
}

/**
 * initialization: bind events to releated elements.
 * always keep `this` reference as LARCGuide object
 * by using .apply() and .bind() function calls
 */
LARCGuides.prototype.init = function() {
	var _self = this;

	// 82: sticky nav, 84: .panel-head
	this.isMobile = false;
	if ($html.hasClass('viewport-mobile')) {
		this.SCROLL_OFFSET = 0; // mobile layout doesn't use offset
		this.isMobile = true;
	} else if ($html.hasClass('viewport-tablet')) {
		this.SCROLL_OFFSET = 136;
	} else {
		this.SCROLL_OFFSET = 146;
	}

	this.choices.on('click', function() {
		var ev = this;
		_self.closeAll(function() {
			_self.display.call(_self, ev); // `this` here is now the event object
		});

		// Add class has-paper when paper note is clicked.
		$('.panel-content').addClass('has-paper');
	});

	this.nextLinks.on('click', function(ev) {
		ev.preventDefault();
		_self.nextGuide.call(_self, this);
	});

	this.closeBtns.on('click', this.closeAll.bind(this));

	// Remove class has-paper when close the paper note.
	this.closeBtns.on('click', function(ev) {
		$('.panel-content').removeClass('has-paper');
	});
};

/**
 * unbind event handlers of clickable elements in guide items
 */
LARCGuides.prototype.destroy = function() {
	this.choices.off('click');
	this.nextLinks.off('click');
	this.closeBtns.off('click');
};

/**
 * display all guides in selected step.
 * also scroll to the first guide item in the series.
 *
 * @param  {jQuery object} $elem event object
 */
LARCGuides.prototype.display = function(elem) {

	var guideId = $(elem).data('guideId');
	this.activeGuideId = guideId;

	// make sure selected checkbox is checked
	// (in case the guide is triggered from first 3 circles)
	var target = $('label[data-guide-id=' + guideId + ']').attr('for');
	$('#' + target).prop('checked', true);

	// make the same choice checked in print-pdf section.
	// skip if there are already 2 options checked.
	var checkedPrintCheckboxes = $prints_checkbox.filter(':checked').length;
	if (checkedPrintCheckboxes < 2) {
		$('input[type=checkbox][data-id=' + guideId + ']').prop('checked', true);
	}

	var $currentNotes = this.notes.filter('[data-guide-id=' + guideId +']');

	if ($currentNotes.length === 0) {
		console.info('there is no guides to show');
		return;
	}

	// for mobile: open all accordion item that $currentNotes are in
	if (this.isMobile) {

		// since `expandable: true` (multiple accordion panels can be opened),
		// there is no option/method to collapse all panels.
		// so we need to destroy and re-activate the accordion menu again
		panelOff();
		panelOn();

		// disable accordion's `activate` callback feature when guide mode is activated
		// by keeping existing callback function in the class prop
		// and will be restored when exit guide mode (@see closeAll func)
		// (default callback is to scroll to accordion .panel-head)
		this.mobileCallback = $accordion.accordion('option', 'activate');
		$accordion.accordion('option', 'activate', $.noop);

		// open (set active) for all panels that have guide items in
		var $panels = $currentNotes.parents('.panel-content');
		$panels.each(function(index, elem) {
			var accordionIndex = ($(this).index() - 1) / 2;
			$accordion.accordion('option', 'active', accordionIndex);
		});
	}

	// mobile: need to wait to accordion to open before get top offset of the parent element
	var isMobile = this.isMobile; // cache locally to use in show()'s callback function
	var scrollOffset = this.SCROLL_OFFSET;
	var scrollTimeout = (this.isMobile) ? 500 : 0;
	$currentNotes.parents('.tween-group').fadeIn(250, function() {
	// $currentNotes.show(1, function() {
		// always start at the first step
		setTimeout(function() {
			var scrollTo;
			if (isMobile) {
				scrollTo = $currentNotes.filter('[data-guide-step=1]').parents('.panel-content').prev().offset().top;
			} else {
				scrollTo = ($currentNotes.filter('[data-guide-step=1]').parents('.panel-content').offset().top) - scrollOffset;
			}

			TweenLite.to(window,
				1.25, // animation duration, in seconds
				{
					scrollTo: {
						y: scrollTo,
						autoKill: false
					},
					ease: Power2.easeOut
				}
			);
		}, scrollTimeout);

	});

};

/**
 * hide all guide items and uncheck the selected choice
 */
LARCGuides.prototype.closeAll = function(fadeOutCb) {
	if (typeof fadeOutCb !== 'function') {
		fadeOutCb = function(){};
	}
	this.notes.parents('.tween-group').fadeOut(200);
	this.things.prop('checked', false)
		.parents('.checkbox-list-item').removeClass('checked');

	setTimeout(fadeOutCb, 250);
	// force scrolling to make content visible with scrollReveal
	setTimeout(function() {
		$window.scrollTop($window.scrollTop() - 1);
	}, 201);

	// restore `activate` callback function to $accordion object
	if (this.isMobile) {
		if ($accordion.length) {
			$accordion.accordion('option', 'activate', this.mobileCallback);
			this.mobileCallback = $.noop;
			panelOff();
			panelOn();
		}
	}
};

/**
 * go to the next guide item in the series
 */
LARCGuides.prototype.nextGuide = function(elem) {
	var step = $(elem).parents('.paper-notes').data('guideStep');
	var nextItem = this.notes.filter('[data-guide-id="'+this.activeGuideId+'"][data-guide-step="' + (step + 1) + '"]')[0];
	var scrollTo = 0;

	if (nextItem) {

		// mobile: we can get scroll offset by use .panel-content's prev() element
		// which is its .panel header element.
		if (this.isMobile) {
			scrollTo = $(nextItem).parents('.panel-content').prev().offset().top;
		} else {
			scrollTo = $(nextItem).parents('.panel-content').offset().top - this.SCROLL_OFFSET;
		}

		TweenLite.to(window,
			1.25, // animation duration, in seconds
			{
				scrollTo: {
					y: scrollTo,
					autoKill: false
				},
				ease: Power2.easeOut
			}
		);
	} else {

		this.closeAll(function() {
			scrollTo = $('#anchor-doctor').offset().top;
			// @todo - duplicated tweenlite calls
			TweenLite.to(window,
				1.25, // animation duration, in seconds
				{
					scrollTo: {
						y: scrollTo,
						autoKill: false
					},
					ease: Power2.easeOut
				}
			);
		});
	}

};

// helper guide (new)
var HelperGuide = (function() {

	init();

	// shared variables between functions (states)
	var $currentGuideItem;
	var $currentOption;
	var $downloadBubble = $('#js-download-instruction-wrapper');

	/**
	 * open a guide item when click on a checkbox
	 */
	function openGuide() {

		// close already opening guide item (if any)
		if ($currentGuideItem) {
			closeGuide(false);
			$currentGuideItem = null;
		}

		// add this class to the circle to hide its right arrow
		// (the arrow that only visible when all guide items are closed)
		$downloadBubble.addClass('has-guide');

		// then we open the guide item and keep current opening item
		// in $currentGuide item (will be used with `closeGuide` function)
		$currentOption = $(this);
		$currentGuideItem = $('#' + $currentOption.data('guideOption'));
		$currentGuideItem.fadeIn(250, scrollToContent);
	}

	/**
	 * close an opening guide item
	 * @param  {boolean} clear
	 */
	function closeGuide(clear) {
		$currentGuideItem.fadeOut(250, function() {

			// `clear` will be TRUE in case the item is manually closed via close button
			// here we manually remove the radio's value and the label's class
			// to revert them to "unchecked" state
			if (clear) {
				$downloadBubble.removeClass('has-guide');
				$currentOption.removeClass('checked');
				$('#' + $currentOption.attr('for')).removeAttr('checked');
			}
		});
	}

	/**
	 * scroll to related content when click on an option
	 * ONLY on mobile layout because the page can jump around when a guide is closed
	 */
	function scrollToContent() {
		if (!$('html').hasClass('viewport-mobile')) {
			return;
		}

		// scroll to `circle-X` element related to selected option
		setTimeout(function() {
			var section = $currentOption.parents('.helper-option').offset().top - 20;
			TweenLite.to(window,
				0.75, // animation duration, in seconds
				{
					scrollTo: {
						y: section,
						autoKill: false
					},
					ease: Power2.easeOut
				}
			);
		}, 300);
	}

	/**
	 * attach events to guide option items and their close buttons
	 */
	function init() {
		$('.check-helper, .js-helper-guide').on('click', openGuide);
		$('.notes-close-helper').on('click', function(ev) {
			ev.preventDefault();
			closeGuide(true);
		});
	}

})();
