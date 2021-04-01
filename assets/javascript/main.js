(function () {
	"use strict"

	/**
	 * Helps selecting items and elements from the DOM.
	 */
	const select = (element, all = false) => {
		console.log("hello from function select")
		element = element.trim()
		if (all) {
			return [...document.querySelectorAll(element)]
		} else {
			return document.querySelector(element)
		}
	}

	/**
	 * Helps creating event listeners
	 */
	const on = (type, element, listener, all = false) => {
		console.log("hello from function on")
		let selectedElement = select(element, all)

		if (selectedElement) {
			if (all) {
				selectedElement.forEach(element => element.addEventListener(type, listener))
			} else {
				selectedElement.addEventListener(type, listener)
			}
		}
	}

	/**
	 * Scrolls to an element with header offset
	 */
	const scrollTo = (element) => {
		console.log("hello from function scrollTo")
		window.scrollTo({
			                top: 0,
			                behavior: "smooth",
		                })
	}

	/**
	 * Mobile navigation toggle
	 */
	on("click", ".mobile-navigation-toggle", function (e) {
		select("#navigation-bar").classList.toggle("navigation-bar-mobile")
		this.classList.toggle("bi-list")
		this.classList.toggle("bi-x")
	})

	/**
	 * Scroll with offset on links with a class name .scrollTo
	 */
	on("click", "#navigation-bar .navigation-link", function (event) {
		let section = select(this.hash)
		if (section) {
			event.preventDefault()

			let navigationBar = select("#navigation-bar")
			let header = select("#header")
			let sections = select("section", true)
			let navigationLinks = select("#navigation-bar .navigation-link", true)

			navigationLinks.forEach((item) => {
				item.classList.remove("active")
			})

			this.classList.add("active")

			if (navigationBar.classList.contains("navigation-bar-mobile")) {
				navigationBar.classList.remove("navigation-bar-mobile")
				let navbarToggle = select(".mobile-navigation-toggle")
				navbarToggle.classList.toggle("bi-list")
				navbarToggle.classList.toggle("bi-x")
			}

			if (this.hash === "#header") {
				header.classList.remove("header-top")
				sections.forEach((item) => {
					item.classList.remove("section-show")
				})
				return
			}

			if (!header.classList.contains("header-top")) {
				header.classList.add("header-top")
				setTimeout(function () {
					sections.forEach((item) => {
						item.classList.remove("section-show")
					})
					section.classList.add("section-show")

				}, 350)
			} else {
				sections.forEach((item) => {
					item.classList.remove("section-show")
				})
				section.classList.add("section-show")
			}

			scrollTo(this.hash)
		}
	}, true)

	/**
	 * Activate/show sections on load with hash links
	 */
	window.addEventListener("load", () => {
		if (window.location.hash) {
			let initialNavigation = select(window.location.hash)

			if (initialNavigation) {
				let header = select("#header")
				let navigationLinks = select("#navigation-bar .navigation-link", true)

				header.classList.add("header-top")

				navigationLinks.forEach((item) => {
					if (item.getAttribute("href") === window.location.hash) {
						item.classList.add("active")
					} else {
						item.classList.remove("active")
					}
				})

				setTimeout(function () {
					initialNavigation.classList.add("section-show")
				}, 350)

				scrollTo(window.location.hash)
			}
		}
	})

	/**
	 * Skills animation
	 */
	let skillsContent = select(".skills-content")
	if (skillsContent) {
		new Waypoint({
			             element: skillsContent,
			             offset: "80%",
			             handler: function (direction) {
				             let progress = select(".progress .progress-bar", true)
				             progress.forEach((element) => {
					             element.style.width = element.getAttribute("aria-valuenow") + "%"
				             })
			             },
		             })
	}

	/**
	 * Testimonials slider
	 */
	new Swiper(".testimonials-slider", {
		speed: 600,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: true,
		},
		slidesPerView: "auto",
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
			clickable: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
			},

			1200: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
		},
	})

	/** Initiate
	portfolio
	lightbox
	 */
	const portfolioLightbox = GLightbox({
		                                    selector: ".portfolio-lightbox",
	                                    })

	/**
	 * Initiate portfolio details lightbox
	 */
	const portfolioDetailsLightbox = GLightbox({
		                                           selector: ".portfolio-details-lightbox",
		                                           width: "90%",
		                                           height: "90vh",
	                                           })


	/**
	 * Portfolio isotope and filter
	 */
	window.addEventListener("load", () => {
		let portfolioContainer = select(".portfolio-container")
		if (portfolioContainer) {
			let portfolioIsotope = new Isotope(portfolioContainer, {
				itemSelector: ".portfolio-item",
				layoutMode: "fitRows",
			})

			let portfolioFilters = select("#portfolio-filters li", true)

			on("click", "#portfolio-filters li", function (event) {
				event.preventDefault()
				portfolioFilters.forEach(function (element) {
					element.classList.remove("filter-active")
				})
				this.classList.add("filter-active")

				portfolioIsotope.arrange({
					                         filter: this.getAttribute("data-filter"),
				                         })
			}, true)
		}

	})

	/**
	 * Portfolio details slider
	 */
	new Swiper(".portfolio-details-slider", {
		speed: 400,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
			clickable: true,
		},
	})

})()