/**
 * Project                  : Bayer LARC
 * Type                     : Website
 * JS libraries             : jQuery
 * JS features detection    : Modernizr
 * Section                  : Animations
 * Developers               : Arm
 */

// Variables
var controller = $.superscrollorama({
			triggerAtCenter   : false,
			playoutAnimations : true
		});
// -----------------------------------------------------------------------------
$document.ready(function() {

	// Parallax
	if(!Modernizr.touch) {

		// Slider
		controller.addTween(
			'.item-teaser',
			(new TimelineLite())
				.append([
					TweenMax.fromTo($('.item-teaser .item'), 1,
						{css:{top: 0}, immediateRender: true},
						{css:{top: 500}, autoKill: false}),
				]),
			2000,
			0
		);

		// Comparison
		controller.addTween(
			'#tween-method',
			(new TimelineLite())
				.append([
					TweenMax.fromTo($('#tween-method .parallax'), 1,
						{css:{backgroundPosition: 'center center'}, immediateRender: true},
						{css:{backgroundPosition: 'center -50%'}, autoKill: false}),
				]),
			1200,
			-300
		);

		// Doctor
		controller.addTween(
			'#tween-doctor',
			(new TimelineLite())
				.append([
					TweenMax.fromTo($('#tween-doctor .parallax'), 1,
						{css:{backgroundPosition: 'center 60%'}, immediateRender: true},
						{css:{backgroundPosition: 'center -10%'}, autoKill: false}),
				]),
			1000,
			-50
		);
	}

	var $panel_content = $('.panel-content'),
			height_max     = 0;

});
// -----------------------------------------------------------------------------
// Window - load
// Specify a function to execute when complete page is fully loaded.
$window.load(function() {

	// scrollReveal
	window.sr = new scrollReveal({
		move    : '8px',
		mobile  : false,
		delay   : 'always',
		vFactor : 0.6,
		viewport: window.document.documentElement
	});

	// Equal height at video items
	$(document).foundation('equalizer');

});
