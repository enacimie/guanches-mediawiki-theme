/*!
 * Guanches Skin - JavaScript for interactive features
 * Version 1.0.0
 */

( function () {
	'use strict';

	// Wait for DOM to be ready
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}

	function init() {
		setupMobileMenu();
		setupTableOfContents();
		setupSkipLink();
		setupPortletDropdowns();
		enhanceExternalLinks();
	}

	/**
	 * Mobile menu toggle functionality
	 */
	function setupMobileMenu() {
		var menuToggle = document.querySelector( '.guanches-menu-toggle' );
		var mainNav = document.querySelector( '.guanches-main-nav' );
		var body = document.body;

		if ( !menuToggle || !mainNav ) {
			return;
		}

		menuToggle.addEventListener( 'click', function ( e ) {
			e.preventDefault();
			var isExpanded = menuToggle.getAttribute( 'aria-expanded' ) === 'true';

			// Toggle menu visibility
			mainNav.classList.toggle( 'active' );
			menuToggle.setAttribute( 'aria-expanded', !isExpanded );
			body.classList.toggle( 'guanches-menu-open' );

			// Update button label
			var label = isExpanded ? mw.message( 'navigation' ).text() : mw.message( 'hidenavigation' ).text();
			menuToggle.setAttribute( 'aria-label', label );
		} );

		// Close menu when clicking outside
		document.addEventListener( 'click', function ( e ) {
			if ( mainNav.classList.contains( 'active' ) &&
				!mainNav.contains( e.target ) &&
				!menuToggle.contains( e.target ) ) {
				mainNav.classList.remove( 'active' );
				menuToggle.setAttribute( 'aria-expanded', 'false' );
				body.classList.remove( 'guanches-menu-open' );
			}
		} );

		// Close menu on escape key
		document.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Escape' && mainNav.classList.contains( 'active' ) ) {
				mainNav.classList.remove( 'active' );
				menuToggle.setAttribute( 'aria-expanded', 'false' );
				body.classList.remove( 'guanches-menu-open' );
				menuToggle.focus();
			}
		} );
	}

	/**
	 * Table of contents toggle (show/hide)
	 */
	function setupTableOfContents() {
		var tocToggle = document.querySelector( '.guanches-toc-toggle' );
		var tocContent = document.querySelector( '.guanches-toc-content' );

		if ( !tocToggle || !tocContent ) {
			return;
		}

		// Initially hide TOC on mobile
		if ( window.innerWidth < 768 ) {
			tocContent.style.display = 'none';
			tocToggle.setAttribute( 'aria-expanded', 'false' );
		}

		tocToggle.addEventListener( 'click', function ( e ) {
			e.preventDefault();
			var isExpanded = tocToggle.getAttribute( 'aria-expanded' ) === 'true';

			if ( tocContent.style.display === 'none' ) {
				tocContent.style.display = 'block';
				tocToggle.setAttribute( 'aria-expanded', 'true' );
				tocToggle.textContent = mw.message( 'hidetoc' ).text();
			} else {
				tocContent.style.display = 'none';
				tocToggle.setAttribute( 'aria-expanded', 'false' );
				tocToggle.textContent = mw.message( 'toc' ).text();
			}
		} );

		// Update on window resize
		window.addEventListener( 'resize', function () {
			if ( window.innerWidth >= 768 ) {
				tocContent.style.display = 'block';
				tocToggle.setAttribute( 'aria-expanded', 'true' );
			} else {
				tocContent.style.display = 'none';
				tocToggle.setAttribute( 'aria-expanded', 'false' );
				tocToggle.textContent = mw.message( 'toc' ).text();
			}
		} );
	}

	/**
	 * Skip link focus management
	 */
	function setupSkipLink() {
		var skipLink = document.querySelector( '.guanches-skip-link' );
		var mainContent = document.getElementById( 'mw-content' );

		if ( !skipLink || !mainContent ) {
			return;
		}

		skipLink.addEventListener( 'click', function ( e ) {
			// Prevent default only if we're handling the focus
			if ( mainContent ) {
				e.preventDefault();
				mainContent.setAttribute( 'tabindex', '-1' );
				mainContent.focus();
				// Remove tabindex after focus to avoid focus trap
				setTimeout( function () {
					mainContent.removeAttribute( 'tabindex' );
				}, 1000 );
			}
		} );
	}

	/**
	 * Enhance portlets with dropdown behavior on hover/focus (desktop)
	 */
	function setupPortletDropdowns() {
		var portlets = document.querySelectorAll( '.guanches-portlet' );

		portlets.forEach( function ( portlet ) {
			var title = portlet.querySelector( '.guanches-portlet-title' );
			var list = portlet.querySelector( '.guanches-portlet-list' );

			if ( !title || !list || list.children.length <= 5 ) {
				return; // Skip small portlets
			}

			// Only on desktop
			if ( window.innerWidth >= 1024 ) {
				title.setAttribute( 'role', 'button' );
				title.setAttribute( 'tabindex', '0' );
				title.setAttribute( 'aria-expanded', 'false' );

				// Hide list initially
				list.style.display = 'none';

				title.addEventListener( 'click', function () {
					var isExpanded = title.getAttribute( 'aria-expanded' ) === 'true';
					list.style.display = isExpanded ? 'none' : 'block';
					title.setAttribute( 'aria-expanded', !isExpanded );
				} );

				title.addEventListener( 'keydown', function ( e ) {
					if ( e.key === 'Enter' || e.key === ' ' ) {
						e.preventDefault();
						title.click();
					}
				} );

				// Show on hover (optional)
				portlet.addEventListener( 'mouseenter', function () {
					list.style.display = 'block';
					title.setAttribute( 'aria-expanded', 'true' );
				} );

				portlet.addEventListener( 'mouseleave', function () {
					list.style.display = 'none';
					title.setAttribute( 'aria-expanded', 'false' );
				} );
			}
		} );
	}

	/**
	 * Add external link indicators and security attributes
	 */
	function enhanceExternalLinks() {
		var externalLinks = document.querySelectorAll( '.guanches-content a[href^="http"]:not([href*="' + window.location.hostname + '"])' );

		externalLinks.forEach( function ( link ) {
			// Add external link indicator
			var indicator = document.createElement( 'span' );
			indicator.className = 'guanches-external-indicator';
			indicator.setAttribute( 'aria-hidden', 'true' );
			indicator.textContent = ' ↗';
			link.appendChild( indicator );

			// Add security attributes
			link.setAttribute( 'rel', 'noopener noreferrer' );
			link.setAttribute( 'target', '_blank' );

			// Add accessible description
			var srText = document.createElement( 'span' );
			srText.className = 'screen-reader-text';
			srText.textContent = mw.message( 'extlink' ).text();
			link.appendChild( srText );
		} );
	}

	/**
	 * Debounce function for resize events
	 */
	function debounce( func, wait ) {
		var timeout;
		return function () {
			var context = this;
			var args = arguments;
			clearTimeout( timeout );
			timeout = setTimeout( function () {
				func.apply( context, args );
			}, wait );
		};
	}

	// Re-initialize on window resize (with debounce)
	window.addEventListener( 'resize', debounce( function () {
		setupPortletDropdowns();
		setupTableOfContents();
	}, 250 ) );

	// Make functions available globally for debugging
	window.guanchesSkin = {
		setupMobileMenu: setupMobileMenu,
		setupTableOfContents: setupTableOfContents,
		setupSkipLink: setupSkipLink,
		setupPortletDropdowns: setupPortletDropdowns,
		enhanceExternalLinks: enhanceExternalLinks
	};

}() );