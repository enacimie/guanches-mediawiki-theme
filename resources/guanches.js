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
		filterHeaderLinks();
		enhanceExternalLinks();
		enhanceMainNav();
	}

	/**
	 * Sidebar drawer functionality
	 * Updated to always show sidebar toggle regardless of device size
	 */
	function setupMobileMenu() {
		var menuToggle = document.querySelector( '.guanches-menu-toggle' );
		var drawer = document.getElementById( 'sidebar-drawer' );
		var overlay = document.getElementById( 'drawer-overlay' );
		var closeButton = drawer ? drawer.querySelector( '.guanches-drawer-close' ) : null;
		var body = document.body;

		if ( !menuToggle || !drawer || !overlay ) {
			return;
		}

		// Get focusable elements inside the drawer
		var getFocusableElements = function () {
			return drawer.querySelectorAll( 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])' );
		};

		var firstFocusableElement, lastFocusableElement;

		var updateFocusableElements = function () {
			var focusable = getFocusableElements();
			if ( focusable.length > 0 ) {
				firstFocusableElement = focusable[0];
				lastFocusableElement = focusable[ focusable.length - 1 ];
			}
		};

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

		var openDrawer = function () {
			body.classList.add( 'guanches-drawer-open' );
			menuToggle.setAttribute( 'aria-expanded', 'true' );
			overlay.setAttribute( 'aria-hidden', 'false' );
			drawer.setAttribute( 'aria-hidden', 'false' );

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

		var closeDrawer = function () {
			body.classList.remove( 'guanches-drawer-open' );
			menuToggle.setAttribute( 'aria-expanded', 'false' );
			overlay.setAttribute( 'aria-hidden', 'true' );
			drawer.setAttribute( 'aria-hidden', 'true' );

			announce( mw.message( 'menu-closed' ).text() );

			// Update button label
			menuToggle.setAttribute( 'aria-label', mw.message( 'navigation' ).text() );

			// Return focus to menu toggle
			menuToggle.focus();
		};

		var toggleDrawer = function () {
			var isExpanded = menuToggle.getAttribute( 'aria-expanded' ) === 'true';
			if ( isExpanded ) {
				closeDrawer();
			} else {
				openDrawer();
			}
		};

		// Toggle drawer on menu button click
		menuToggle.addEventListener( 'click', function ( e ) {
			e.preventDefault();
			toggleDrawer();
		} );

		// Close drawer on close button click
		if ( closeButton ) {
			closeButton.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				closeDrawer();
			} );
		}

		// Close drawer when clicking on overlay
		overlay.addEventListener( 'click', function ( e ) {
			e.preventDefault();
			closeDrawer();
		} );

		// Keyboard navigation and focus trap
		drawer.addEventListener( 'keydown', function ( e ) {
			if ( !body.classList.contains( 'guanches-drawer-open' ) ) {
				return;
			}

			if ( e.key === 'Escape' ) {
				e.preventDefault();
				closeDrawer();
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

		// Close drawer on escape key from anywhere
		document.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Escape' && body.classList.contains( 'guanches-drawer-open' ) ) {
				closeDrawer();
			}
		} );

		// Update focusable elements on drawer open/close
		menuToggle.addEventListener( 'click', updateFocusableElements );
		
		// Always show the menu toggle regardless of screen size
		menuToggle.style.display = 'block';
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
	 * Enhance portlets with accessibility attributes (no dropdown behavior)
	 */
	function setupPortletDropdowns() {
		var portlets = document.querySelectorAll( '.guanches-portlet' );

		portlets.forEach( function ( portlet ) {
			var title = portlet.querySelector( '.guanches-portlet-title' );
			var list = portlet.querySelector( '.guanches-portlet-list' );

			if ( !title || !list ) {
				return;
			}

			// Add accessibility attributes for better semantics
			title.setAttribute( 'role', 'heading' );
			title.setAttribute( 'aria-level', '2' );
			
			// Ensure list has an ID for aria-labelledby reference
			if ( !list.id ) {
				list.id = 'portlet-list-' + Math.random().toString( 36 ).substr( 2, 9 );
			}
			
			// Link list to its title for screen readers
			list.setAttribute( 'aria-labelledby', title.id );
		} );
	}

	/**
	 * Filter irrelevant links from navigation
	 * Updated for sidebar navigation
	 */
	function filterHeaderLinks() {
		// Target all navigation links in the sidebar
		var navLinks = document.querySelectorAll('#sidebar-drawer .guanches-portlet-list a');
		
		navLinks.forEach(function(link) {
			var href = link.getAttribute('href') || '';
			var text = link.textContent.toLowerCase();

			// Hide links that are not relevant for general public
			if (href.includes('Special:') || href.includes('Talk:') || href.includes('User:') || href.includes('File:') || href.includes('MediaWiki:') || href.includes('Help:') || text.includes('discusión') || text.includes('special') || text.includes('user')) {
				// Instead of hiding, we'll just continue (do nothing)
				// This preserves the original functionality but applies to sidebar
			}
		});
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
	 * Enhance main navigation with additional portlets for desktop
	 * Updated to work with sidebar menu approach
	 */
	function enhanceMainNav() {
		// Since we're using a sidebar menu, we don't need to enhance the header navigation
		// This function is now simplified to handle any remaining navigation elements
		
		// Find the main navigation container
		var mainNav = document.getElementById( 'main-nav' );
		if ( !mainNav ) {
			return;
		}

		// Update ARIA attributes for accessibility
		mainNav.setAttribute( 'aria-label', mw.message( 'navigation' ).exists() ?
			mw.message( 'navigation' ).text() : 'Navegación' );
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
		enhanceMainNav();
	}, 250 ) );

	/**
	 * Theme toggler functionality
	 */
	function setupThemeToggle() {
		var themeToggle = document.querySelector('.guanches-theme-toggle');
		if (!themeToggle) {
			return;
		}

		// Check for saved theme preference or respect OS preference
		const savedTheme = localStorage.getItem('theme');
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
		
		if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
			document.documentElement.setAttribute('data-theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
		}

		themeToggle.addEventListener('click', function(e) {
			e.preventDefault();
			
			const currentTheme = document.documentElement.getAttribute('data-theme');
			const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
			
			document.documentElement.setAttribute('data-theme', newTheme);
			localStorage.setItem('theme', newTheme);
			
			// Update icon based on theme
			updateThemeIcon(newTheme);
		});

		// Initialize icon based on current theme
		const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
		updateThemeIcon(currentTheme);
	}

	/**
	 * Update theme toggle icon based on current theme
	 */
	function updateThemeIcon(theme) {
		var themeIcon = document.querySelector('.theme-icon');
		if (!themeIcon) {
			return;
		}

		// Clear existing paths
		while (themeIcon.firstChild) {
			themeIcon.removeChild(themeIcon.firstChild);
		}

		if (theme === 'dark') {
			// Moon icon for dark mode
			var moonPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			moonPath.setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 1 21 12.79z');
			themeIcon.appendChild(moonPath);
		} else {
			// Sun icon for light mode
			var sunCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
			sunCircle.setAttribute('cx', '12');
			sunCircle.setAttribute('cy', '12');
			sunCircle.setAttribute('r', '5');
			themeIcon.appendChild(sunCircle);
			
			var sunRays = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			for (let i = 0; i < 8; i++) {
				let ray = document.createElementNS('http://www.w3.org/2000/svg', 'line');
				ray.setAttribute('x1', '12');
				ray.setAttribute('y1', '1');
				ray.setAttribute('x2', '12');
				ray.setAttribute('y2', '3');
				ray.setAttribute('transform', `rotate(${i * 45} 12 12)`);
				sunRays.appendChild(ray);
			}
			themeIcon.appendChild(sunRays);
		}
	}

	/**
	 * Setup language selector dropdown
	 */
	function setupLanguageSelector() {
		var langSelectorBtn = document.querySelector('.language-selector-btn');
		if (!langSelectorBtn) {
			return;
		}

		var langPortlet = langSelectorBtn.nextElementSibling;
		if (!langPortlet || !langPortlet.classList.contains('guanches-portlet')) {
			// If there's no portlet next to the button, create a simple dropdown
			console.log('Language portlet not found next to selector button');
			return;
		}

		// Initially hide the language portlet
		langPortlet.style.display = 'none';
		langPortlet.classList.add('language-dropdown');

		langSelectorBtn.addEventListener('click', function(e) {
			e.preventDefault();
			
			var isExpanded = langSelectorBtn.getAttribute('aria-expanded') === 'true';
			var newExpandedState = !isExpanded;
			
			langSelectorBtn.setAttribute('aria-expanded', newExpandedState.toString());
			langPortlet.style.display = newExpandedState ? 'block' : 'none';
			
			// Position the dropdown below the button
			if (newExpandedState) {
				var btnRect = langSelectorBtn.getBoundingClientRect();
				langPortlet.style.position = 'absolute';
				langPortlet.style.top = 'calc(100% + 4px)';
				langPortlet.style.right = '0';
				langPortlet.style.zIndex = 'var(--z-dropdown)';
				langPortlet.style.boxShadow = 'var(--shadow-md)';
				langPortlet.style.backgroundColor = 'var(--color-background)';
				langPortlet.style.border = '1px solid var(--color-border)';
				langPortlet.style.borderRadius = 'var(--radius-md)';
				langPortlet.style.padding = 'var(--spacing-md)';
			}
		});

		// Close dropdown when clicking outside
		document.addEventListener('click', function(e) {
			if (!langSelectorBtn.contains(e.target) && !langPortlet.contains(e.target)) {
				langSelectorBtn.setAttribute('aria-expanded', 'false');
				langPortlet.style.display = 'none';
			}
		});
	}

	// Initialize theme toggle when DOM is ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function() {
			setupThemeToggle();
			setupLanguageSelector();
		});
	} else {
		setupThemeToggle();
		setupLanguageSelector();
	}

	// Make functions available globally for debugging
	window.guanchesSkin = {
		setupMobileMenu: setupMobileMenu,
		setupTableOfContents: setupTableOfContents,
		setupSkipLink: setupSkipLink,
		setupPortletDropdowns: setupPortletDropdowns,
		filterHeaderLinks: filterHeaderLinks,
		enhanceExternalLinks: enhanceExternalLinks,
		enhanceMainNav: enhanceMainNav,
		setupThemeToggle: setupThemeToggle,
		setupLanguageSelector: setupLanguageSelector
	};

}() );