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
		
		// Populate custom navigation links for the secondary navbar
		$services = \MediaWiki\MediaWikiServices::getInstance();
		$titleFactory = $services->getTitleFactory();
		
		$data['link-mainpage'] = \Title::newMainPage()->getLinkURL();
		$data['link-portal'] = \Title::newFromText( 'Project:Portal' )->getLinkURL();
		$data['link-currentevents'] = \Title::newFromText( 'Project:Current_events' )->getLinkURL();
		$data['link-recentchanges'] = \SpecialPage::getTitleFor( 'Recentchanges' )->getLinkURL();
		$data['link-randompage'] = \SpecialPage::getTitleFor( 'Random' )->getLinkURL();
		
		return $data;
	}
}
