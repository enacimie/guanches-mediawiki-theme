<?php

namespace MediaWiki\Skins\Guanches;

use SkinMustache;
use OutputPage;

/**
 * SkinGuanches class
 * 
 * Modern implementation for La Enciclopedia Guanche theme.
 * Extends SkinMustache for logic-less templating.
 */
class SkinGuanches extends SkinMustache {

	/**
	 * @inheritDoc
	 */
	public function getTemplateData(): array {
		$data = parent::getTemplateData();
		$out = $this->getOutput();

		// Add custom data here if needed
		$data['guanches-skin-version'] = '1.0.0';
		
		// Ensure search action is correct (fixes the need for JS hack)
		if ( !isset( $data['link-search-action'] ) || $data['link-search-action'] === '' ) {
			$data['link-search-action'] = $this->getConfig()->get( 'ScriptPath' ) . '/index.php';
		}
		
		// Add helper class for dark mode if user preference exists (server-side hint)
		// Note: Actual toggle is often client-side, but we can check user options here via $this->getUser()
		
		return $data;
	}
}
