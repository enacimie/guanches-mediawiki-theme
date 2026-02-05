# Guanches Skin

A modern and attractive skin for MediaWiki, specifically designed for **La Enciclopedia Guanche** (guanches.org). This skin offers a contemporary reading experience, moving away from traditional Wikipedia aesthetics, with responsive design, accessibility, and optimized performance.

![Guanches Skin Preview](preview.png)

## Features

- **Modern and clean design** with a color palette inspired by the nature of the Canary Islands
- **Fully responsive** (adaptable to mobiles, tablets, and desktop)
- **Accessibility** (WCAG AA compatible, keyboard navigation, screen reader support)
- **Optimized performance** (CSS variables, modular and lightweight JavaScript)
- **Native MediaWiki integration** (portlets, search, table of contents)
- **Readable typography** (serif for titles, sans-serif for content)
- **Dark mode** (prefers-color-scheme)
- **Easy customization** through CSS variables

## Requirements

- MediaWiki 1.41 or higher
- PHP 7.4 or higher
- Composer (recommended for installation)

## Installation

### Method 1: Composer (recommended)

1. In your MediaWiki installation directory, run:

```bash
composer require enacimie/guanches-mediawiki-theme
```

2. Add the following line to the end of your `LocalSettings.php`:

```php
wfLoadSkin( 'Guanches' );
```

3. Optionally, set Guanches as the default skin:

```php
$wgDefaultSkin = 'guanches';
```

### Method 2: Manual installation

1. Download or clone this repository to the `skins/` directory of your MediaWiki:

```bash
cd /path/to/mediawiki/skins/
git clone https://github.com/enacimie/guanches-mediawiki-theme.git Guanche
```

2. Add the following lines to your `LocalSettings.php`:

```php
wfLoadSkin( 'Guanches' );
$wgDefaultSkin = 'guanches'; // Optional
```

3. Ensure file permissions are correct.

## Customization

### CSS Variables

The skin uses CSS variables to facilitate customization. You can override them by creating an additional CSS file:

```css
:root {
    --color-primary: #2c5530;      /* Primary color (green) */
    --color-secondary: #d4a762;    /* Secondary color (gold) */
    --color-accent: #8b4513;       /* Accent color (terracotta) */
    --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-family-heading: 'Georgia', 'Times New Roman', serif;
    --container-max-width: 1280px;
    --sidebar-width: 280px;
}
```

### Custom Logo

To change the logo:

1. Upload your logo image through the MediaWiki administration interface (Preferences → Appearance)
2. Or configure manually in `LocalSettings.php`:

```php
$wgLogos = [
    'icon' => '/path/to/your/logo.png',
    '1x' => '/path/to/your/logo.png',
    '2x' => '/path/to/your/logo-2x.png'
];
```

### Custom Messages

You can modify skin texts by editing files in `i18n/` or using MediaWiki's localization system.

## Project Structure

```
Guanches/
├── skin.json                    # Main skin configuration
├── Guanche.php                 # Skin entry point
├── composer.json               # Composer configuration
├── README.md                   # This file
├── templates/
│   ├── skin.mustache           # Main template
│   └── partials/               # Partial templates
│       ├── Portlet.mustache
│       ├── TableOfContents.mustache
│       └── FooterInfo.mustache
├── resources/
│   ├── guanches.css           # Main styles
│   └── guanches.js            # Interactive JavaScript
└── i18n/
    ├── en.json                # English messages
    └── es.json                # Spanish messages
```

## Development

### Prerequisites

- Node.js (optional for CSS/JS processing)
- Basic knowledge of MediaWiki skin development

### Modifying CSS

1. Edit the `resources/guanches.css` file
2. Changes will be automatically reflected thanks to ResourceLoader (disable cache in development)

### Modifying Templates

1. Edit `.mustache` files in `templates/`
2. Consult the [SkinMustache documentation](https://www.mediawiki.org/wiki/Manual:SkinMustache) for available variables

### Build (optional)

No build process required. For development, you can use:

```bash
# Check CSS syntax
npx stylelint resources/guanches.css

# Check JS syntax
npx eslint resources/guanches.js
```

## Compatibility

- ✅ MediaWiki 1.41+
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS, Android)
- ✅ Screen readers (NVDA, VoiceOver, JAWS)
- ✅ JavaScript disabled (basic functionality)

## License

This skin is licensed under the **GNU General Public License v3.0 or later**. See the [LICENSE](LICENSE) file for more details.

## Contributions

Contributions are welcome. Please:

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/new-feature`)
3. Make your changes
4. Ensure the code follows standards
5. Submit a pull request

## Credits

- **Developed by**: Eduardo Nacimiento-García
- **Design inspired by**: Modern WordPress themes and Material Design principles
- **Color palette**: Inspired by the nature of the Canary Islands
- **Typography**: Combination of serif and sans-serif for optimal readability

## Support

- **Documentation**: [MediaWiki Skin Development](https://www.mediawiki.org/wiki/Manual:Skin_development)
- **Issues**: Report problems on [GitHub Issues](https://github.com/enacimie/guanches-mediawiki-theme/issues)
- **Contact**: enacimie@ull.edu.es

---

**Thank you for using Guanches Skin!** We hope this skin helps improve the reading experience on La Enciclopedia Guanche.