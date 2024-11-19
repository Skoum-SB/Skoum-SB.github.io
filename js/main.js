(function ($) {
	"use strict";
	
	// Smooth scrolling on the navbar links
	$(".navbar-nav a").on('click', function (event) {
		if (this.hash !== "") {
			event.preventDefault();
			
			$('html, body').animate({
				scrollTop: $(this.hash).offset().top - 30
			}, 1500, 'easeInOutExpo');
			
			if ($(this).parents('.navbar-nav').length) {
				$('.navbar-nav .active').removeClass('active');
				$(this).closest('a').addClass('active');
			}
		}
	});
	

	// Typed Initiate
	if ($('.header h2').length == 1) {
		var typed_strings = $('.header .typed-text').text();
		var typed = new Typed('.header h2', {
			strings: typed_strings.split(', '),
			typeSpeed: 100,
			backSpeed: 20,
			smartBackspace: false,
			loop: true
		});
	}
	
	
	// Skills
	$('.skills').waypoint(function () {
		$('.progress .progress-bar').each(function () {
			$(this).css("width", $(this).attr("aria-valuenow") + '%');
		});
	}, {offset: '80%'});
	
	
	// Porfolio isotope and filter
	var portfolioIsotope = $('.portfolio-container').isotope({
		itemSelector: '.portfolio-item',
		layoutMode: 'fitRows'
	});

	$('#portfolio-flters li').on('click', function () {
		$("#portfolio-flters li").removeClass('filter-active');
		$(this).addClass('filter-active');

		portfolioIsotope.isotope({filter: $(this).data('filter')});
	});
	
	
	// Review slider
	$('.review-slider').slick({
		autoplay: true,
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});
	
	
	// Back to top button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn('slow');
		} else {
			$('.back-to-top').fadeOut('slow');
		}
	});
	$('.back-to-top').click(function () {
		$('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
		return false;
	});

	// Smooth scrolling for the contact button
	$('a[href="#contact"]').on('click', function (event) {
		if (this.hash !== "") {
			event.preventDefault();
			$('html, body').animate({
			scrollTop: $('#contact').offset().top - 120
		}, 1500, 'easeInOutExpo');
		}
	});

	document.getElementById('sendButton').addEventListener('click', function (event) {
	event.preventDefault(); // Empêche le rechargement de la page

	const form = document.getElementById('contactForm');
	const formData = new FormData(form);

	// Envoyer les données via EmailJS
	emailjs.send('service_e9gro46', 'template_uumhhxe', {
		name: formData.get('name'),
		email: formData.get('email'),
		subject: formData.get('subject'),
		message: formData.get('message'),
	})
	.then(function (response) {
		alert('Message envoyé avec succès !');
		form.reset(); // Réinitialiser le formulaire après envoi
	})
	.catch(function (error) {
		alert('Erreur lors de l\'envoi du message : ' + error);
	});
});


})(jQuery);