// Webtrends Tracking
$document.ready(function() {

	// 4.1 Entering Page
	$window.scroll(function(event) {
		if($window.scrollTop() >= $('#anchor-overview').offset().top) {
			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',        'Entering page',
					'DCS.dcsuri',          '/entering_page',
					'WT.ti',               'Entering page'
				]
			});

			// console.log('4.1 Entering page');
			$(this).off(event);
		}
	});

	// 4.2 Starting to read
	$window.scroll(function(event) {
		if($window.scrollTop() >= $('#anchor-method').offset().top) {
			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',        'Starting to read',
					'DCS.dcsuri',          '/starting_to_read',
					'WT.ti',               'Starting to read'
				]
			});

			// console.log('4.2 Start reading');
			$(this).off(event);
		}
	});

	// 4.3 Getting Engaged
	$('#btn-ius, #btn-ius + p').on('click', function() {
		Webtrends.multiTrack({
			argsa: [
				'WT.cusAction',        'Getting engaged - method selected',
				'WT.cusActionElement', 'IUS',
				'WT.dl',               '99',
				'WT.es',               window.location.host + '/starting_to_read'
			]
		});
		// console.log('4.3 User clicks on button The IUS');
	});

	$('#btn-iud, #btn-iud + p').on('click', function() {
		Webtrends.multiTrack({
			argsa: [
				'WT.cusAction',        'Getting engaged - method selected',
				'WT.cusActionElement', 'IUD',
				'WT.dl',               '99',
				'WT.es',               window.location.host + '/starting_to_read'
			]
		});

		// console.log('4.3 User clicks on button The IUD');
	});

	$('#btn-implant, #btn-implant + p').on('click', function() {
		Webtrends.multiTrack({
			argsa: [
				'WT.cusAction',        'Getting engaged - method selected',
				'WT.cusActionElement', 'Implant',
				'WT.dl',               '99',
				'WT.es',               window.location.host + '/starting_to_read'
			]
		});

		// console.log('4.3 User clicks on button The Implant');
	});

	// 4.4 Topic selected
	$('#matters-pre').find('input:radio').on('change', function() {
		if(this.checked) {
			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',        'Getting engaged - topic selected',
					'WT.cusActionElement', $(this).next('label').text(),
					'WT.dl',               '99',
					'WT.es',               window.location.host + '/starting_to_read'
				]
			});

			// console.log('4.4 User selects - "' + $(this).next('label').text() + '"');
		}
	});


	// [Added] - Entering Understanding the facts
	// Comparison & the pill
	$window.scroll(function(event) {
		if($window.scrollTop() >= $('#anchor-comparison').offset().top) {
			Webtrends.multiTrack({
				argsa: [
					'DCS.dcsuri',          '/understanding_the_facts',
					'WT.ti',               'Understanding the facts'
				]
			});

			//console.log('Entering Understanding the facts');
			$(this).off(event);
		}
	});


	// 4.5.1 Complete Table
	$window.scroll(function(event) {
		if($window.scrollTop() >= $('#anchor-more-questions').offset().top - 25) {
			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',        'Understanding the facts',
					'WT.cusActionElement', 'Scrolled through complete table',
					'WT.dl',               '99',
					'WT.es',               window.location.host + '/understanding_the_facts'
				]
			});

			// console.log('4.5.1 Scrolled through complete table');
			$(this).off(event);
		}
	});

	// 4.5.2 Opened tooltips
	$('.ico-tooltip').on('click', function(event) {
		if (!$(this).hasClass('tooltip-opened')) {
			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',        'Understanding the facts',
					'WT.cusActionElement', 'Opened tooltips',
					'WT.dl',               '99',
					'WT.es',               window.location.host + '/understanding_the_facts'
				]
			});

			// console.log('4.5.2 Opened tooltips');
		}
	});

	// 4.5.3 Opened Overlays
	// a) The user clicks on the link "Learn more"
	// b) The user clicks on the links "Find out more about the ..."
	$('.link-more').on('click', function() {
		Webtrends.multiTrack({
			argsa: [
				'WT.cusAction',        'Understanding the facts',
				'WT.cusActionElement', 'Opened overlays',
				'WT.dl',               '99',
				'WT.es',               window.location.host + '/understanding_the_facts'
			]
		});

		// console.log('4.5.3 The user clicks on the link "Learn more / Find out more"');
	});

	// c) The user clicks on a video link
	$('.video-wrapper').find('.play').on('click', function() {
		Webtrends.multiTrack({
			argsa: [
				'WT.cusAction',        'Understanding the facts',
				'WT.cusActionElement', 'Opened overlays',
				'WT.clip_t',           'video/mp4',
				'WT.clip_n',           'The placement of IUS and IUD',
				'WT.clip_ev',          'Play',
				'WT.dl',               '41',
				'WT.es',               window.location.host + '/understanding_the_facts'
			]
		});

		// console.log('4.5.3 The user clicks on a video link / auto play');
	});

	// d) The user click on the button to resume the video
	$('#jquery_jplayer_1').bind($.jPlayer.event.play, function(event) {
		// Counter check
		if(!play_count == 0) {
			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',        'Understanding the facts',
					'WT.cusActionElement', 'Opened overlays',
					'WT.clip_t',           'video/mp4',
					'WT.clip_n',           'The placement of IUS and IUD',
					'WT.clip_ev',          'Resume',
					'WT.dl',               '41',
					'WT.es',               window.location.host + '/understanding_the_facts'
				]
			});

      // console.log('4.5.3 The user resumes a video');
     }
	});

	// The user click on the button to pause the video
	$('#jquery_jplayer_1').bind($.jPlayer.event.pause, function(event) {
		var playerTime = Math.round(event.jPlayer.status.currentPercentAbsolute);
		if(playerTime < 100) {
			Webtrends.multiTrack({
				argsa: [
					'WT.clip_t',           'video/mp4',
					'WT.clip_n',           'The placement of IUS and IUD',
					'WT.clip_ev',          'Pause',
					'WT.dl',               '41',
					'WT.es',               window.location.host + '/understanding_the_facts'
				]
			});

			// Activate rusume counter
			play_count = 1;

      // console.log('4.5.3 The user pauses a video');
    }
	});

	// The video is watched to the end
	$('#jquery_jplayer_1').bind($.jPlayer.event.ended, function(event) {

		Webtrends.multiTrack({
			argsa: [
				'WT.clip_t',           'video/mp4',
				'WT.clip_n',           'The placement of IUS and IUD',
				'WT.clip_ev',          'End',
				'WT.clip_perc',        '100',
				'WT.dl',               '41',
				'WT.es',               window.location.host + '/understanding_the_facts'
			]
		});

	  // console.log('4.5.3 VDO is watched til the end');
	});

	// while the video is playing
	var is25PercentTracked = false;
	var is50PercentTracked = false;
	var is75PercentTracked = false;
	$('#jquery_jplayer_1').bind($.jPlayer.event.timeupdate, function(event) {
		var playedPercent = Math.round(event.jPlayer.status.currentPercentRelative);

		if (playedPercent === 25 && !is25PercentTracked) {

			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',        'Understanding the facts',
					'WT.cusActionElement', 'Opened overlays',
					'WT.clip_t',           'video/mp4',
					'WT.clip_n',           'The placement of IUS and IUD',
					'WT.clip_perc',        '25',
					'WT.dl',               '41',
					'WT.es',               window.location.host + '/understanding_the_facts'
				]
			});
			is25PercentTracked = true;

		} else if (playedPercent === 50 && !is50PercentTracked) {

			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',        'Understanding the facts',
					'WT.cusActionElement', 'Opened overlays',
					'WT.clip_t',           'video/mp4',
					'WT.clip_n',           'The placement of IUS and IUD',
					'WT.clip_perc',        '50',
					'WT.dl',               '41',
					'WT.es',               window.location.host + '/understanding_the_facts'
				]
			});
			is50PercentTracked = true;

		} else if (playedPercent === 75 && !is75PercentTracked) {

			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',        'Understanding the facts',
					'WT.cusActionElement', 'Opened overlays',
					'WT.clip_t',           'video/mp4',
					'WT.clip_n',           'The placement of IUS and IUD',
					'WT.clip_perc',        '75',
					'WT.dl',               '41',
					'WT.es',               window.location.host + '/understanding_the_facts'
				]
			});
			is75PercentTracked = true;

		} else if (playedPercent === 100) {

			// reset tracking flags
			is25PercentTracked = false;
			is50PercentTracked = false;
			is75PercentTracked = false;
		}
	});

	// 4.5.4 Spent 1.5 min
	setTimeout(function() {
		var $startReadingTop       = $('#anchor-method').offset().top,
				$understandFactTop     = $('#anchor-comparison').offset().top,
				$faqTop                = $('#anchor-more-questions').offset().top,
				$checklistTop          = $('#anchor-checklist').offset().top;

		if ($window.scrollTop() >= $startReadingTop && $window.scrollTop() < $understandFactTop) {

			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',        'Understanding the facts',
					'WT.cusActionElement', 'Spent 1,5 minutes',
					'WT.cus90SecEng',      1,
					'WT.dl',               '99',
					'WT.es',               window.location.host + '/starting_to_read'
				]
			});
			// console.log('4.5.4 Spend 90 seconds at /starting_to_read');
			$(this).off(event);

		} else if ($window.scrollTop() >= $understandFactTop && $window.scrollTop() < $faqTop) {

			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',        'Understanding the facts',
					'WT.cusActionElement', 'Spent 1,5 minutes',
					'WT.cus90SecEng',      1,
					'WT.dl',               '99',
					'WT.es',               window.location.host + '/understanding_the_facts'
				]
			});
			// console.log('4.5.4 Spend 90 seconds at /understanding_the_facts');
			$(this).off(event);

		} else if ($window.scrollTop() >= $faqTop && $window.scrollTop() < $checklistTop) {

			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',        'Understanding the facts',
					'WT.cusActionElement', 'Spent 1,5 minutes',
					'WT.cus90SecEng',      1,
					'WT.dl',               '99',
					'WT.es',               window.location.host + '/myths_and_faq'
				]
			});
			// console.log('4.5.4 Spend 90 seconds at /myths_and_faq');
			$(this).off(event);

		} else if ($window.scrollTop() >= $checklistTop) {

			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',        'Understanding the facts',
					'WT.cusActionElement', 'Spent 1,5 minutes',
					'WT.cus90SecEng',      1,
					'WT.dl',               '99',
					'WT.es',               window.location.host + '/creating_checklist'
				]
			});
			// console.log('4.5.4 Spend 90 seconds at /creating_checklist');
			$(this).off(event);

		} else {
			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',        'Understanding the facts',
					'WT.cusActionElement', 'Spent 1,5 minutes',
					'WT.cus90SecEng',      1,
					'WT.dl',               '99',
					'WT.es',               window.location.host + '/entering_page'
				]
			});
			// console.log('4.5.4 Spend 90 seconds at /entering_page');
		}
		//console.log('4.5.4 Spent 90 seconds');
	}, 90000);

	// 4.7 Using Physican Finder
	$('#s_text').on('click', function() {
		if ($('#address').val()) {
			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',        'Using Physican Finder',
					'DCS.dcsuri',          '/using_physican_finder',
					'WT.ti',               'Using Physican Finder'
				]
			});

			// console.log('4.7 Using Physican Finder');
		}
	});

	// 4.8 Number of shares
	$('#share-facebook').on('click', function() {
		Webtrends.multiTrack({
			argsa: [
				'WT.cusAction',        'Number of shares',
				'WT.cusActionElement', 'facebook',
				'WT.dl',               '99',
				'WT.es',               window.location.host + '/creating_checklist',
				'WT.soc_action',       'Facebook: Share',
				'WT.soc_content',      window.location.protocol + '//' + window.location.host
			]
		});

		// console.log('4.8 User clicks on button "Facebook"');
	});

	$('#share-twitter').on('click', function() {
		Webtrends.multiTrack({
			argsa: [
				'WT.cusAction',        'Number of shares',
				'WT.cusActionElement', 'Twitter',
				'WT.dl',               '99',
				'WT.es',               window.location.host + '/creating_checklist',
				'WT.soc_action',       'Twitter: Tweet',
				'WT.soc_content',      window.location.protocol + '//' + window.location.host
			]
		});

		// console.log('4.8 User clicks on button "Twitter"');
	});

	$('#share-gplus').on('click', function() {
		Webtrends.multiTrack({
			argsa: [
				'WT.cusAction',        'Number of shares',
				'WT.cusActionElement', 'Google+',
				'WT.dl',               '99',
				'WT.es',               window.location.host + '/creating_checklist',
				'WT.soc_action',       'Google+: Share',
				'WT.soc_content',      window.location.protocol + '//' + window.location.host
			]
		});

		// console.log('4.8 User clicks on button "Google+"');
	});


	// 2.1 FAQ
	// 2.1.1 Entering FAQ section
	$('[data-anchor="#anchor-faq"]').children('.bubble-content, .bubble-arrow').on('click', function() {
		Webtrends.multiTrack({
			argsa: [
				'DCS.dcsuri',          '/myths_and_faq',
				'WT.ti',               'Myths and Frequently Asked Questions'
			]
		});

		// console.log('Entering FAQ section');
	});

	$window.scroll(function(event) {
		if($window.scrollTop() >= $('#anchor-faq').offset().top) {
			Webtrends.multiTrack({
				argsa: [
					'DCS.dcsuri',          '/myths_and_faq',
					'WT.ti',               'Myths and Frequently Asked Questions'
				]
			});

			// console.log('Entering FAQ section');
			$(this).off(event);
		}
	});


	// 2.1.2 Select a FAQ
	$('.faq-header').on('click', function() {

		Webtrends.multiTrack({
			argsa: [
				'WT.cusAction',               'FAQ',
				'WT.cusActionElement',        $(this).data('faq-topic'),
				'WT.dl',                      '99',
				'WT.es',              				window.location.host + '/myths_and_faq'
			]
		});

		// console.log('Select a FAQ');
	});


	// 2.2 Create Checklist
	// [Added] - Enter Creating Checklist
	$window.scroll(function(event) {
		if($window.scrollTop() >= $('#anchor-checklist').offset().top) {
			Webtrends.multiTrack({
				argsa: [
					'DCS.dcsuri',          '/creating_checklist',
					'WT.ti',               'Creating checklist'
				]
			});

			//console.log('Entering Creating Checklist');
			$(this).off(event);
		}
	});

	// 2.2.1 Selection of decision
	$('#talk-to-friend, #talk-to-doc, #keep-using').on('click', function(event) {
		var $checked = $('.radio-circle-item').find('input:checked');
		Webtrends.multiTrack({
			argsa: [
				'WT.cusAction',               'Creating checklist',
				'WT.cusActionElement',        'Download',
				'WT.dl',                      '99',
				'WT.es',              				window.location.host + '/creating_checklist'
			]
		});

		//console.log('download Checklist');

		if ($checked.attr('id') == 'talk-to-friend') {
			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',               'Creating checklist',
					'WT.cusActionElement',        'Decision Friend',
					'WT.dl',                      '99',
					'WT.es',              				window.location.host + '/creating_checklist'
				]
			});
		} else if ($checked.attr('id') == 'talk-to-doc') {
			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',               'Creating checklist',
					'WT.cusActionElement',        'Decision Doctor',
					'WT.dl',                      '99',
					'WT.es',              				window.location.host + '/creating_checklist'
				]
			});
		} else if ($checked.attr('id') == 'keep-using') {
			Webtrends.multiTrack({
				argsa: [
					'WT.cusAction',               'Creating checklist',
					'WT.cusActionElement',        'Decision Continue',
					'WT.dl',                      '99',
					'WT.es',              				window.location.host + '/creating_checklist'
				]
			});
		}
	});

	// 2. New adjustments for Redesign April 2016

	// 2.2 Youtube video share buttons
	$('.js-social-sharing').on('click', function() {

		var socialNetworkName = $(this).find('a').attr('title');
		var socAction;
		if (socialNetworkName === 'Facebook') {
			socAction = 'Facebook: Share';
		} else if (socialNetworkName === 'Twitter') {
			socAction = 'Twitter: Tweet';
		} else if (socialNetworkName === 'Google+') {
			socAction = 'Google: Share';
		}

		var videoId = $(this).parents('.yt-section')
			.find('.video-container').attr('data-video');
		var videoUrl = 'https://www.youtube.com/embed/' + videoId;

		Webtrends.multiTrack({
			argsa: [
				'WT.dl',                      '99',
				'WT.es',                      window.location.host + '/myths_and_faq',
				'WT.soc_action',              socAction,
				'WT.soc_content',             videoUrl
			]
		});
	});

	// 2.3 Entering page section "Join the Conversation"
	$('[data-anchor="#anchor-social-media"]').children('.bubble-content, .bubble-arrow').on('click', function() {
		Webtrends.multiTrack({
			argsa: [
				'DCS.dcsuri',          '/join_the_conversation',
				'WT.ti',               'Join the conversation'
			]
		});
	});

	$window.scroll(function(event) {
		if($window.scrollTop() >= $('#anchor-social-media').offset().top) {
			Webtrends.multiTrack({
				argsa: [
					'DCS.dcsuri',          '/join_the_conversation',
					'WT.ti',               'Join the conversation'
				]
			});

			$(this).off(event);
		}
	});
});
