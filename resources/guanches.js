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

		// Get focusable elements inside the menu
		var getFocusableElements = function () {
			return mainNav.querySelectorAll( 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])' );
		};

		var firstFocusableElement, lastFocusableElement;

		var updateFocusableElements = function () {
			var focusable = getFocusableElements();
			if ( focusable.length > 0 ) {
				firstFocusableElement = focusable[0];
				lastFocusableElement = focusable[ focusable.length - 1 ];
			}
		};

		// Create aria-live region for announcements
		var liveRegion = document.createElement( 'div' );
		liveRegion.setAttribute( 'aria-live', 'polite' );
		liveRegion.setAttribute( 'aria-atomic', 'true' );
		liveRegion.classList.add( 'screen-reader-text' );
		document.body.appendChild( liveRegion );

		var announce = function ( message ) {
			liveRegion.textContent = '';
			setTimeout( function () {
				liveRegion.textContent = message;
			}, 100 );
		};

		var openMenu = function () {
			mainNav.classList.add( 'active' );
			menuToggle.setAttribute( 'aria-expanded', 'true' );
			body.classList.add( 'guanches-menu-open' );
			announce( mw.message( 'menu-opened' ).text() );
			
			// Update button label
			menuToggle.setAttribute( 'aria-label', mw.message( 'hidenavigation' ).text() );
			
			// Update focusable elements and set focus to first element
			updateFocusableElements();
			if ( firstFocusableElement ) {
				setTimeout( function () {
					firstFocusableElement.focus();
				}, 10 );
			}
		};

		var closeMenu = function () {
			mainNav.classList.remove( 'active' );
			menuToggle.setAttribute( 'aria-expanded', 'false' );
			body.classList.remove( 'guanches-menu-open' );
			announce( mw.message( 'menu-closed' ).text() );
			
			// Update button label
			menuToggle.setAttribute( 'aria-label', mw.message( 'navigation' ).text() );
			
			// Return focus to menu toggle
			menuToggle.focus();
		};

		var toggleMenu = function () {
			var isExpanded = menuToggle.getAttribute( 'aria-expanded' ) === 'true';
			if ( isExpanded ) {
				closeMenu();
			} else {
				openMenu();
			}
		};

		// Toggle menu on button click
		menuToggle.addEventListener( 'click', function ( e ) {
			e.preventDefault();
			toggleMenu();
		} );

		// Close menu when clicking outside
		document.addEventListener( 'click', function ( e ) {
			if ( mainNav.classList.contains( 'active' ) &&
				!mainNav.contains( e.target ) &&
				!menuToggle.contains( e.target ) ) {
				closeMenu();
			}
		} );

		// Keyboard navigation and focus trap
		mainNav.addEventListener( 'keydown', function ( e ) {
			if ( !mainNav.classList.contains( 'active' ) ) {
				return;
			}

			if ( e.key === 'Escape' ) {
				e.preventDefault();
				closeMenu();
				return;
			}

			// Tab key focus trap
			if ( e.key === 'Tab' ) {
				updateFocusableElements();
				if ( !firstFocusableElement || !lastFocusableElement ) {
					return;
				}

				if ( e.shiftKey && document.activeElement === firstFocusableElement ) {
					e.preventDefault();
					lastFocusableElement.focus();
				} else if ( !e.shiftKey && document.activeElement === lastFocusableElement ) {
					e.preventDefault();
					firstFocusableElement.focus();
				}
			}
		} );

		// Close menu on escape key from anywhere
		document.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Escape' && mainNav.classList.contains( 'active' ) ) {
				closeMenu();
			}
		} );

		// Update focusable elements on menu open/close
		menuToggle.addEventListener( 'click', updateFocusableElements );
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

		// Ensure aria-controls is set (already in template)
		if ( !tocToggle.hasAttribute( 'aria-controls' ) ) {
			tocToggle.setAttribute( 'aria-controls', 'toc-content' );
		}

		// Use existing live region or create one
		var liveRegion = document.querySelector( '[aria-live="polite"]' ) || ( function () {
			var region = document.createElement( 'div' );
			region.setAttribute( 'aria-live', 'polite' );
			region.setAttribute( 'aria-atomic', 'true' );
			region.classList.add( 'screen-reader-text' );
			document.body.appendChild( region );
			return region;
		} )();

		var announce = function ( message ) {
			liveRegion.textContent = '';
			setTimeout( function () {
				liveRegion.textContent = message;
			}, 100 );
		};

		var expandToc = function () {
			tocContent.style.display = 'block';
			tocToggle.setAttribute( 'aria-expanded', 'true' );
			tocToggle.textContent = mw.message( 'hidetoc' ).text();
			announce( mw.message( 'toc-expanded' ).text() );
		};

		var collapseToc = function () {
			tocContent.style.display = 'none';
			tocToggle.setAttribute( 'aria-expanded', 'false' );
			tocToggle.textContent = mw.message( 'toc' ).text();
			announce( mw.message( 'toc-collapsed' ).text() );
		};

		var toggleToc = function () {
			var isExpanded = tocToggle.getAttribute( 'aria-expanded' ) === 'true';
			if ( isExpanded ) {
				collapseToc();
			} else {
				expandToc();
			}
		};

		// Initially hide TOC on mobile
		if ( window.innerWidth < 768 ) {
			collapseToc();
		} else {
			expandToc();
		}

		tocToggle.addEventListener( 'click', function ( e ) {
			e.preventDefault();
			toggleToc();
		} );

		// Update on window resize
		window.addEventListener( 'resize', function () {
			if ( window.innerWidth >= 768 ) {
				expandToc();
			} else {
				collapseToc();
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
	 * Enhance portlets with dropdown behavior (desktop)
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
				title.setAttribute( 'aria-controls', list.id || ( function () {
					var id = 'portlet-list-' + Math.random().toString( 36 ).substr( 2, 9 );
					list.id = id;
					return id;
				} )() );

				// Hide list initially
				list.style.display = 'none';

				var expandList = function () {
					list.style.display = 'block';
					title.setAttribute( 'aria-expanded', 'true' );
				};

				var collapseList = function () {
					list.style.display = 'none';
					title.setAttribute( 'aria-expanded', 'false' );
				};

				var toggleList = function () {
					var isExpanded = title.getAttribute( 'aria-expanded' ) === 'true';
					if ( isExpanded ) {
						collapseList();
					} else {
						expandList();
					}
				};

				title.addEventListener( 'click', function ( e ) {
					e.preventDefault();
					toggleList();
				} );

				title.addEventListener( 'keydown', function ( e ) {
					if ( e.key === 'Enter' || e.key === ' ' ) {
						e.preventDefault();
						toggleList();
					}
					if ( e.key === 'Escape' && title.getAttribute( 'aria-expanded' ) === 'true' ) {
						collapseList();
						title.focus();
					}
				} );

				// Optional hover support (does not interfere with keyboard)
				portlet.addEventListener( 'mouseenter', expandList );
				portlet.addEventListener( 'mouseleave', collapseList );

				// Close when clicking outside
				document.addEventListener( 'click', function ( e ) {
					if ( title.getAttribute( 'aria-expanded' ) === 'true' &&
						!portlet.contains( e.target ) ) {
						collapseList();
					}
				} );

				// Close on escape key
				document.addEventListener( 'keydown', function ( e ) {
					if ( e.key === 'Escape' && title.getAttribute( 'aria-expanded' ) === 'true' ) {
						collapseList();
						title.focus();
					}
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