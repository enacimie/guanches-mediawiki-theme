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
	// Registration is now handled via skin.json
	return true;
} else {
	die( 'This version of the Guanches skin requires MediaWiki 1.45+' );
}
