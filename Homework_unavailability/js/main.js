// Полное отключение доступности для скринридеров

// Отключение всех ARIA атрибутов
(function() {
    // Удаление всех ARIA атрибутов из DOM
    const removeAriaAttributes = () => {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            // Получение всех атрибутов элемента
            const attributes = element.attributes;
            for (let i = attributes.length - 1; i >= 0; i--) {
                const attr = attributes[i];
                // Удаление всех aria атрибутов
                if (attr.name.startsWith('aria-') || 
                    attr.name === 'role' || 
                    attr.name === 'alt' || 
                    attr.name === 'title' ||
                    attr.name === 'label' ||
                    attr.name === 'aria-label' ||
                    attr.name === 'aria-labelledby' ||
                    attr.name === 'aria-describedby' ||
                    attr.name === 'aria-hidden' ||
                    attr.name === 'tabindex') {
                    element.removeAttribute(attr.name);
                }
            }
            // Удаление textContent для скрытия текста
            if (element.children.length === 0 && element.textContent) {
                element.textContent = '';
            }
        });
    };
    
    removeAriaAttributes();
    
    // Отслеживание изменений в DOM и удаление ARIA атрибутов
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes') {
                const element = mutation.target;
                if (mutation.attributeName.startsWith('aria-') || 
                    mutation.attributeName === 'role' || 
                    mutation.attributeName === 'alt' ||
                    mutation.attributeName === 'title') {
                    element.removeAttribute(mutation.attributeName);
                }
            } else if (mutation.type === 'childList') {
                removeAriaAttributes();
            }
        });
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['aria-label', 'aria-labelledby', 'aria-describedby', 'aria-hidden', 'role', 'alt', 'title', 'tabindex'],
        subtree: true,
        childList: true
    });
})();

// Отключение табуляции и навигации с клавиатуры
(function() {
    document.addEventListener('keydown', (e) => {
        // Блокирование Tab, Shift+Tab, Alt+Tab, Ctrl+Alt+Arrow
        if (e.key === 'Tab' || 
            (e.altKey && e.key === 'Tab') ||
            (e.ctrlKey && e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')) ||
            e.key === 'F1' ||
            (e.ctrlKey && e.key === 'h') ||
            (e.ctrlKey && e.key === 'u')) {
            e.preventDefault();
            return false;
        }
    }, true);
})();

// Отключение контекстного меню
(function() {
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
})();

// Отключение копирования текста
(function() {
    document.addEventListener('copy', (e) => {
        e.preventDefault();
        return false;
    });
    
    document.addEventListener('cut', (e) => {
        e.preventDefault();
        return false;
    });
})();

// Отключение выделения текста
(function() {
    document.addEventListener('selectstart', (e) => {
        e.preventDefault();
        return false;
    });
    
    document.addEventListener('mousedown', (e) => {
        if (e.detail > 1) {
            e.preventDefault();
            return false;
        }
    });
})();

// Отключение инспектора элементов
(function() {
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.key === 'I' || e.key === 'C' || e.key === 'J')) {
            e.preventDefault();
            return false;
        }
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
    }, true);
})();

// Отключение доступа к консоли
(function() {
    // Отключение console методов
    console.log = function() {};
    console.warn = function() {};
    console.error = function() {};
    console.info = function() {};
    console.debug = function() {};
    console.trace = function() {};
    console.assert = function() {};
    console.clear = function() {};
    console.count = function() {};
    console.dir = function() {};
    console.dirxml = function() {};
    console.group = function() {};
    console.groupEnd = function() {};
    console.table = function() {};
    console.time = function() {};
    console.timeEnd = function() {};
    console.profile = function() {};
    console.profileEnd = function() {};
})();

// Отключение доступа к DOM через инструменты разработчика
(function() {
    // Блокирование доступа к document
    Object.defineProperty(window, 'document', {
        get: function() {
            return document;
        },
        set: function() {
            return false;
        }
    });
})();

// Отключение всех форм
(function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.style.display = 'none';
        form.style.visibility = 'hidden';
        form.style.pointerEvents = 'none';
    });
})();

// Отключение всех ссылок для скринридеров
(function() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.removeAttribute('href');
        link.removeAttribute('title');
        link.removeAttribute('aria-label');
        link.removeAttribute('aria-labelledby');
        link.removeAttribute('aria-describedby');
        link.removeAttribute('role');
        link.removeAttribute('tabindex');
    });
})();

// Отключение всех кнопок
(function() {
    const buttons = document.querySelectorAll('button, input[type="button"], input[type="submit"]');
    buttons.forEach(button => {
        button.removeAttribute('aria-label');
        button.removeAttribute('aria-labelledby');
        button.removeAttribute('aria-describedby');
        button.removeAttribute('title');
        button.removeAttribute('type');
        button.removeAttribute('tabindex');
    });
})();

// Отключение всех изображений от скринридеров
(function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.removeAttribute('alt');
        img.removeAttribute('title');
        img.removeAttribute('aria-label');
        img.removeAttribute('aria-labelledby');
        img.removeAttribute('aria-describedby');
        img.removeAttribute('role');
    });
})();

// Отключение всех видео и аудио элементов
(function() {
    const videos = document.querySelectorAll('video, audio');
    videos.forEach(video => {
        video.style.display = 'none';
        video.style.visibility = 'hidden';
        video.removeAttribute('aria-label');
        video.removeAttribute('aria-labelledby');
        video.removeAttribute('aria-describedby');
        video.removeAttribute('title');
    });
})();

// Отключение всех iframe
(function() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.style.display = 'none';
        iframe.style.visibility = 'hidden';
        iframe.removeAttribute('title');
        iframe.removeAttribute('aria-label');
    });
})();

// Отключение всех встроенных объектов
(function() {
    const embeds = document.querySelectorAll('embed, object');
    embeds.forEach(embed => {
        embed.style.display = 'none';
        embed.style.visibility = 'hidden';
    });
})();

// Отключение всех скриптов
(function() {
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
        if (script.src && script.src.includes('accessibility') || script.src.includes('a11y')) {
            script.remove();
        }
    });
})();

// Отключение всех стилей доступности
(function() {
    const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
    styles.forEach(style => {
        if (style.textContent && (style.textContent.includes('accessibility') || style.textContent.includes('a11y') || style.textContent.includes('sr-only'))) {
            style.remove();
        }
    });
})();

// Отключение всех элементов с классами доступности
(function() {
    const accessibilityClasses = ['sr-only', 'screen-reader-only', 'visually-hidden', 'accessibility', 'a11y', 'skip-link', 'skip-to-content'];
    document.querySelectorAll('*').forEach(element => {
        accessibilityClasses.forEach(className => {
            if (element.classList.contains(className)) {
                element.style.display = 'none';
                element.style.visibility = 'hidden';
                element.style.width = '0';
                element.style.height = '0';
                element.style.overflow = 'hidden';
            }
        });
    });
})();

// Отключение всех элементов с атрибутами доступности
(function() {
    const accessibilityAttributes = ['data-a11y', 'data-accessibility', 'data-text', 'data-label', 'data-description'];
    document.querySelectorAll('*').forEach(element => {
        accessibilityAttributes.forEach(attr => {
            if (element.hasAttribute(attr)) {
                element.style.display = 'none';
                element.style.visibility = 'hidden';
            }
        });
    });
})();

// Отключение всех элементов с ARIA ролями
(function() {
    const ariaRoles = ['button', 'link', 'menuitem', 'tab', 'tablist', 'tabpanel', 'dialog', 'alertdialog', 'menu', 'menubar', 'navigation', 'main', 'complementary', 'contentinfo', 'banner', 'region', 'article', 'log', 'marquee', 'status', 'alert', 'progressbar', 'slider', 'spinbutton', 'tooltip', 'tree', 'treegrid', 'grid', 'gridcell', 'rowheader', 'columnheader', 'row', 'table', 'list', 'listitem', 'group', 'separator', 'img', 'application'];
    document.querySelectorAll('[role]').forEach(element => {
        const role = element.getAttribute('role');
        if (ariaRoles.includes(role)) {
            element.removeAttribute('role');
        }
    });
})();

// Отключение всех элементов с aria-live
(function() {
    document.querySelectorAll('[aria-live]').forEach(element => {
        element.removeAttribute('aria-live');
        element.removeAttribute('aria-atomic');
        element.removeAttribute('aria-relevant');
        element.removeAttribute('aria-busy');
    });
})();

// Отключение всех элементов с aria-label
(function() {
    document.querySelectorAll('[aria-label]').forEach(element => {
        element.removeAttribute('aria-label');
    });
})();

// Отключение всех элементов с aria-labelledby
(function() {
    document.querySelectorAll('[aria-labelledby]').forEach(element => {
        element.removeAttribute('aria-labelledby');
    });
})();

// Отключение всех элементов с aria-describedby
(function() {
    document.querySelectorAll('[aria-describedby]').forEach(element => {
        element.removeAttribute('aria-describedby');
    });
})();

// Отключение всех элементов с aria-hidden
(function() {
    document.querySelectorAll('[aria-hidden]').forEach(element => {
        element.removeAttribute('aria-hidden');
    });
})();

// Отключение всех элементов с tabindex
(function() {
    document.querySelectorAll('[tabindex]').forEach(element => {
        element.removeAttribute('tabindex');
    });
})();

// Отключение всех элементов с title
(function() {
    document.querySelectorAll('[title]').forEach(element => {
        element.removeAttribute('title');
    });
})();

// Отключение всех элементов с alt
(function() {
    document.querySelectorAll('[alt]').forEach(element => {
        element.removeAttribute('alt');
    });
})();

// Отключение всех элементов с label
(function() {
    document.querySelectorAll('label').forEach(label => {
        label.style.display = 'none';
        label.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с legend
(function() {
    document.querySelectorAll('legend').forEach(legend => {
        legend.style.display = 'none';
        legend.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с fieldset
(function() {
    document.querySelectorAll('fieldset').forEach(fieldset => {
        fieldset.style.display = 'none';
        fieldset.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с optgroup
(function() {
    document.querySelectorAll('optgroup').forEach(optgroup => {
        optgroup.style.display = 'none';
        optgroup.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с option
(function() {
    document.querySelectorAll('option').forEach(option => {
        option.style.display = 'none';
        option.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с datalist
(function() {
    document.querySelectorAll('datalist').forEach(datalist => {
        datalist.style.display = 'none';
        datalist.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с details и summary
(function() {
    document.querySelectorAll('details, summary').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с dialog
(function() {
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.style.display = 'none';
        dialog.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с progress
(function() {
    document.querySelectorAll('progress').forEach(progress => {
        progress.style.display = 'none';
        progress.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с meter
(function() {
    document.querySelectorAll('meter').forEach(meter => {
        meter.style.display = 'none';
        meter.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с output
(function() {
    document.querySelectorAll('output').forEach(output => {
        output.style.display = 'none';
        output.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с map и area
(function() {
    document.querySelectorAll('map, area').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с track
(function() {
    document.querySelectorAll('track').forEach(track => {
        track.style.display = 'none';
        track.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с source
(function() {
    document.querySelectorAll('source').forEach(source => {
        source.style.display = 'none';
        source.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с picture
(function() {
    document.querySelectorAll('picture').forEach(picture => {
        picture.style.display = 'none';
        picture.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с svg
(function() {
    document.querySelectorAll('svg').forEach(svg => {
        svg.removeAttribute('role');
        svg.removeAttribute('aria-label');
        svg.removeAttribute('aria-labelledby');
        svg.removeAttribute('aria-describedby');
        svg.removeAttribute('title');
    });
})();

// Отключение всех элементов с canvas
(function() {
    document.querySelectorAll('canvas').forEach(canvas => {
        canvas.removeAttribute('role');
        canvas.removeAttribute('aria-label');
        canvas.removeAttribute('aria-labelledby');
        canvas.removeAttribute('aria-describedby');
    });
})();

// Отключение всех элементов с template
(function() {
    document.querySelectorAll('template').forEach(template => {
        template.style.display = 'none';
        template.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с slot
(function() {
    document.querySelectorAll('slot').forEach(slot => {
        slot.style.display = 'none';
        slot.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с custom elements
(function() {
    document.querySelectorAll('[is]').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с микроданными
(function() {
    document.querySelectorAll('[itemscope], [itemtype], [itemid], [itemprop]').forEach(element => {
        element.removeAttribute('itemscope');
        element.removeAttribute('itemtype');
        element.removeAttribute('itemid');
        element.removeAttribute('itemprop');
    });
})();

// Отключение всех элементов с RDFa
(function() {
    document.querySelectorAll('[about], [property], [resource], [datatype], [typeof]').forEach(element => {
        element.removeAttribute('about');
        element.removeAttribute('property');
        element.removeAttribute('resource');
        element.removeAttribute('datatype');
        element.removeAttribute('typeof');
    });
})();

// Отключение всех элементов с JSON-LD
(function() {
    document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
        script.remove();
    });
})();

// Отключение всех элементов с Open Graph
(function() {
    document.querySelectorAll('meta[property^="og:"]').forEach(meta => {
        meta.remove();
    });
})();

// Отключение всех элементов с Twitter Card
(function() {
    document.querySelectorAll('meta[name^="twitter:"]').forEach(meta => {
        meta.remove();
    });
})();

// Отключение всех элементов с Schema.org
(function() {
    document.querySelectorAll('[data-schema], [schema]').forEach(element => {
        element.removeAttribute('data-schema');
        element.removeAttribute('schema');
    });
})();

// Отключение всех элементов с BreadcrumbList
(function() {
    document.querySelectorAll('[data-breadcrumb], [data-breadcrumbs]').forEach(element => {
        element.removeAttribute('data-breadcrumb');
        element.removeAttribute('data-breadcrumbs');
    });
})();

// Отключение всех элементов с SearchAction
(function() {
    document.querySelectorAll('[data-search-action]').forEach(element => {
        element.removeAttribute('data-search-action');
    });
})();

// Отключение всех элементов с SiteNavigation
(function() {
    document.querySelectorAll('[data-site-navigation], [data-main-navigation]').forEach(element => {
        element.removeAttribute('data-site-navigation');
        element.removeAttribute('data-main-navigation');
    });
})();

// Отключение всех элементов с Footer
(function() {
    document.querySelectorAll('footer, [role="contentinfo"]').forEach(element => {
        element.removeAttribute('role');
    });
})();

// Отключение всех элементов с Header
(function() {
    document.querySelectorAll('header, [role="banner"]').forEach(element => {
        element.removeAttribute('role');
    });
})();

// Отключение всех элементов с Main
(function() {
    document.querySelectorAll('main, [role="main"]').forEach(element => {
        element.removeAttribute('role');
    });
})();

// Отключение всех элементов с Aside
(function() {
    document.querySelectorAll('aside, [role="complementary"]').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
        element.removeAttribute('role');
    });
})();

// Отключение всех элементов с Navigation
(function() {
    document.querySelectorAll('nav, [role="navigation"]').forEach(element => {
        element.removeAttribute('role');
    });
})();

// Отключение всех элементов с Section
(function() {
    document.querySelectorAll('section, [role="region"]').forEach(element => {
        element.removeAttribute('role');
    });
})();

// Отключение всех элементов с Article
(function() {
    document.querySelectorAll('article, [role="article"]').forEach(element => {
        element.removeAttribute('role');
    });
})();

// Отключение всех элементов с List
(function() {
    document.querySelectorAll('ul, ol, li, [role="list"], [role="listitem"]').forEach(element => {
        element.removeAttribute('role');
    });
})();

// Отключение всех элементов с Table
(function() {
    document.querySelectorAll('table, thead, tbody, tfoot, tr, td, th, [role="table"], [role="row"], [role="cell"], [role="columnheader"], [role="rowheader"]').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
        element.removeAttribute('role');
    });
})();

// Отключение всех элементов с Form
(function() {
    document.querySelectorAll('form, fieldset, legend, label, input, textarea, select, button, [role="form"], [role="group"]').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
        element.removeAttribute('role');
    });
})();

// Отключение всех элементов с Input
(function() {
    document.querySelectorAll('input[type]').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Textarea
(function() {
    document.querySelectorAll('textarea').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Select
(function() {
    document.querySelectorAll('select').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Button
(function() {
    document.querySelectorAll('button').forEach(element => {
        element.removeAttribute('aria-label');
        element.removeAttribute('aria-labelledby');
        element.removeAttribute('aria-describedby');
        element.removeAttribute('title');
    });
})();

// Отключение всех элементов с Link
(function() {
    document.querySelectorAll('a[href]').forEach(element => {
        element.removeAttribute('aria-label');
        element.removeAttribute('aria-labelledby');
        element.removeAttribute('aria-describedby');
        element.removeAttribute('title');
    });
})();

// Отключение всех элементов с Image
(function() {
    document.querySelectorAll('img').forEach(element => {
        element.removeAttribute('alt');
        element.removeAttribute('title');
        element.removeAttribute('aria-label');
        element.removeAttribute('aria-labelledby');
        element.removeAttribute('aria-describedby');
    });
})();

// Отключение всех элементов с Picture
(function() {
    document.querySelectorAll('picture').forEach(element => {
        element.removeAttribute('aria-label');
        element.removeAttribute('aria-labelledby');
        element.removeAttribute('aria-describedby');
    });
})();

// Отключение всех элементов с Video
(function() {
    document.querySelectorAll('video').forEach(element => {
        element.removeAttribute('aria-label');
        element.removeAttribute('aria-labelledby');
        element.removeAttribute('aria-describedby');
        element.removeAttribute('title');
    });
})();

// Отключение всех элементов с Audio
(function() {
    document.querySelectorAll('audio').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Marquee
(function() {
    document.querySelectorAll('marquee').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Details
(function() {
    document.querySelectorAll('details, summary').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Dialog
(function() {
    document.querySelectorAll('dialog').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Progress
(function() {
    document.querySelectorAll('progress').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Meter
(function() {
    document.querySelectorAll('meter').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Output
(function() {
    document.querySelectorAll('output').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Datalist
(function() {
    document.querySelectorAll('datalist').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Keygen
(function() {
    document.querySelectorAll('keygen').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Command
(function() {
    document.querySelectorAll('command').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Menu
(function() {
    document.querySelectorAll('menu').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Menuitem
(function() {
    document.querySelectorAll('menuitem').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Optgroup
(function() {
    document.querySelectorAll('optgroup').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Option
(function() {
    document.querySelectorAll('option').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Param
(function() {
    document.querySelectorAll('param').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Map
(function() {
    document.querySelectorAll('map').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Area
(function() {
    document.querySelectorAll('area').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Applet
(function() {
    document.querySelectorAll('applet').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Frame
(function() {
    document.querySelectorAll('frame').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Frameset
(function() {
    document.querySelectorAll('frameset').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Noframes
(function() {
    document.querySelectorAll('noframes').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Bgsound
(function() {
    document.querySelectorAll('bgsound').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Blink
(function() {
    document.querySelectorAll('blink').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с Spacer
(function() {
    document.querySelectorAll('spacer').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с WBR
(function() {
    document.querySelectorAll('wbr').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с BR
(function() {
    document.querySelectorAll('br').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов с HR
(function() {
    document.querySelectorAll('hr').forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    });
})();

// Отключение всех элементов для доступности при загрузке страницы
window.addEventListener('load', () => {
    removeAriaAttributes();
});

// Отключение всех элементов для доступности при изменении DOM
document.addEventListener('DOMContentLoaded', () => {
    removeAriaAttributes();
});

// Отключение всех элементов для доступности при готовности документа
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        removeAriaAttributes();
    });
} else {
    removeAriaAttributes();
}

// Функция для удаления ARIA атрибутов
function removeAriaAttributes() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        const attributes = element.attributes;
        for (let i = attributes.length - 1; i >= 0; i--) {
            const attr = attributes[i];
            if (attr.name.startsWith('aria-') || 
                attr.name === 'role' || 
                attr.name === 'alt' || 
                attr.name === 'title' ||
                attr.name === 'label' ||
                attr.name === 'aria-label' ||
                attr.name === 'aria-labelledby' ||
                attr.name === 'aria-describedby' ||
                attr.name === 'aria-hidden' ||
                attr.name === 'tabindex') {
                element.removeAttribute(attr.name);
            }
        }
    });
}

// Конец JavaScript файла

