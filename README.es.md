# Skin Guanches

Un skin moderno y atractivo para MediaWiki, diseñado específicamente para **La Enciclopedia Guanche** (guanches.org). Este skin ofrece una experiencia de lectura contemporánea, alejada de la estética tradicional de Wikipedia, con diseño responsive, accesibilidad y rendimiento optimizado.

![Guanches Skin Preview](preview.png)

## Características

- **Diseño moderno y limpio** con paleta de colores inspirada en la naturaleza de las Islas Canarias
- **Completamente responsive** (adaptable a móviles, tablets y desktop)
- **Accesibilidad** (WCAG AA compatible, navegación por teclado, lectores de pantalla)
- **Rendimiento optimizado** (CSS con variables, JavaScript modular y ligero)
- **Integración nativa con MediaWiki** (portlets, búsqueda, tabla de contenidos)
- **Tipografía legible** (serif para títulos, sans-serif para contenido)
- **Modo oscuro** (prefers-color-scheme)
- **Personalización fácil** mediante variables CSS

## Requisitos

- MediaWiki 1.41 o superior
- PHP 7.4 o superior
- Composer (recomendado para instalación)

## Instalación

### Método 1: Composer (recomendado)

1. En el directorio de tu instalación de MediaWiki, ejecuta:

```bash
composer require enacimie/guanches-mediawiki-theme
```

2. Añade la siguiente línea al final de tu archivo `LocalSettings.php`:

```php
wfLoadSkin( 'Guanches' );
```

3. Opcionalmente, establece Guanches como skin predeterminado:

```php
$wgDefaultSkin = 'guanches';
```

### Método 2: Instalación manual

1. Descarga o clona este repositorio en el directorio `skins/` de tu MediaWiki:

```bash
cd /ruta/a/mediawiki/skins/
git clone https://github.com/enacimie/guanches-mediawiki-theme.git Guanche
```

2. Añade las siguientes líneas a tu `LocalSettings.php`:

```php
wfLoadSkin( 'Guanches' );
$wgDefaultSkin = 'guanches'; // Opcional
```

3. Asegúrate de que los permisos de archivos sean correctos.

## Personalización

### Variables CSS

El skin utiliza variables CSS para facilitar la personalización. Puedes sobrescribirlas creando un archivo CSS adicional:

```css
:root {
    --color-primary: #2c5530;      /* Color principal (verde) */
    --color-secondary: #d4a762;    /* Color secundario (dorado) */
    --color-accent: #8b4513;       /* Color de acento (terracota) */
    --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-family-heading: 'Georgia', 'Times New Roman', serif;
    --container-max-width: 1280px;
    --sidebar-width: 280px;
}
```

### Logo personalizado

Para cambiar el logo:

1. Sube tu imagen logo a través de la interfaz de administración de MediaWiki (Preferencias → Apariencia)
2. O configura manualmente en `LocalSettings.php`:

```php
$wgLogos = [
    'icon' => '/ruta/a/tu/logo.png',
    '1x' => '/ruta/a/tu/logo.png',
    '2x' => '/ruta/a/tu/logo-2x.png'
];
```

### Mensajes personalizados

Puedes modificar los textos del skin editando los archivos en `i18n/` o usando el sistema de localización de MediaWiki.

## Estructura del proyecto

```
Guanches/
├── skin.json                    # Configuración principal del skin
├── Guanche.php                 # Punto de entrada del skin
├── composer.json               # Configuración de Composer
├── README.md                   # Este archivo
├── templates/
│   ├── skin.mustache           # Plantilla principal
│   └── partials/               # Plantillas parciales
│       ├── Portlet.mustache
│       ├── TableOfContents.mustache
│       └── FooterInfo.mustache
├── resources/
│   ├── guanches.css           # Estilos principales
│   └── guanches.js            # JavaScript interactivo
└── i18n/
    ├── en.json                # Mensajes en inglés
    └── es.json                # Mensajes en español
```

## Desarrollo

### Prerrequisitos

- Node.js (para procesamiento de CSS/JS opcional)
- Conocimientos básicos de MediaWiki skin development

### Modificando el CSS

1. Edita el archivo `resources/guanches.css`
2. Los cambios se reflejarán automáticamente gracias a ResourceLoader (en desarrollo desactiva caché)

### Modificando las plantillas

1. Edita los archivos `.mustache` en `templates/`
2. Consulta la [documentación de SkinMustache](https://www.mediawiki.org/wiki/Manual:SkinMustache) para variables disponibles

### Construcción (opcional)

No se requiere proceso de build. Para desarrollo, puedes usar:

```bash
# Verificar sintaxis CSS
npx stylelint resources/guanches.css

# Verificar sintaxis JS
npx eslint resources/guanches.js
```

## Compatibilidad

- ✅ MediaWiki 1.41+
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Navegadores móviles (iOS, Android)
- ✅ Lectores de pantalla (NVDA, VoiceOver, JAWS)
- ✅ JavaScript deshabilitado (funcionalidad básica)

## Licencia

Este skin está licenciado bajo la **GNU General Public License v3.0 o posterior**. Ver el archivo [LICENSE](LICENSE) para más detalles.

## Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios
4. Asegúrate de que el código sigue los estándares
5. Envía un pull request

## Créditos

- **Desarrollado por**: Eduardo Nacimiento-García
- **Diseño inspirado en**: Temas modernos de WordPress y principios de Material Design
- **Paleta de colores**: Inspirada en la naturaleza de las Islas Canarias
- **Tipografía**: Combinación de serif y sans-serif para legibilidad óptima

## Soporte

- **Documentación**: [MediaWiki Skin Development](https://www.mediawiki.org/wiki/Manual:Skin_development)
- **Issues**: Reporta problemas en el [GitHub Issues](https://github.com/enacimie/guanches-mediawiki-theme/issues)
- **Contacto**: enacimie@ull.edu.es

---

**¡Gracias por usar Skin Guanches!** Esperamos que este skin ayude a mejorar la experiencia de lectura en La Enciclopedia Guanche.