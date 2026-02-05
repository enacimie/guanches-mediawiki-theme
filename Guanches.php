<?php
/**
 * Skin for La Enciclopedia Guanche
 *
 * @file
 * @ingroup Skins
 * @author Eduardo Nacimiento-García
 */

if ( function_exists( 'wfLoadSkin' ) ) {
	wfLoadSkin( 'Guanches' );
	// Keep i18n globals for backward compatibility
	$wgMessagesDirs['Guanches'] = __DIR__ . '/i18n';
	return true;
} else {
	die( 'This version of the Guanches skin requires MediaWiki 1.25+' );
}