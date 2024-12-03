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
	var portfolioIsotope = $('.projects-container').isotope({
		itemSelector: '.projects-item',
		layoutMode: 'fitRows'
	});

	$('#projects-flters li').on('click', function () {
		$("#projects-flters li").removeClass('filter-active');
		$(this).addClass('filter-active');

		portfolioIsotope.isotope({filter: $(this).data('filter')});
	});
	
	
	// passions slider
	$('.passions-slider').slick({
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

	// Contact Form
	const btn = document.getElementById('sendButton');
	document.getElementById('contactForm').addEventListener('submit', function(event) {
		event.preventDefault();

		const name = this.name.value.trim();
		const email = this.email.value.trim();
		const subject = this.subject.value.trim();
		const message = this.message.value.trim();

		if (!name || !email || !subject || !message) {
			alert('Veuillez remplir tous les champs du formulaire.');
			return;
		}

		const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const textRegex = /^[^<>]+$/;

		if (!nameRegex.test(name)) {
			alert("Le champ 'Nom' contient des caractères non autorisés.");
			return;
		}

		if (!emailRegex.test(email)) {
			alert("Veuillez entrer une adresse email valide.");
			return;
		}

		if (!textRegex.test(subject) || !textRegex.test(message)) {
			alert("Les champs 'Objet' et 'Message' ne doivent pas contenir de caractères spéciaux (< ou >).");
			return;
		}

		btn.innerText = 'Envoi en cours...';

		const serviceID = 'default_service';
		const templateID = 'template_uumhhxe';
		const userID = 'sgxU_U3Jo-gEoQvbL';

		emailjs.sendForm(serviceID, templateID, this, userID)
		.then(() => {
			btn.innerText = 'Envoyer un message';
			alert('Message envoyé !');
			this.reset();
		}, (err) => {
			btn.innerText = 'Envoyer un message';
			alert(JSON.stringify(err));
		});
	});
})(jQuery);