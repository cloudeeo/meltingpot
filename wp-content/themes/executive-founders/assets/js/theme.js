/**
 * Executive Founders — front-end scripts.
 * Vanilla, no framework. Deferred load.
 */
(function () {
    'use strict';

    var toggle = document.getElementById('menu-toggle');
    var nav = document.getElementById('main-navigation');
    var header = document.getElementById('site-header');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            nav.classList.toggle('is-open');
            document.body.style.overflow = !expanded ? 'hidden' : '';
        });

        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (nav.classList.contains('is-open')) {
                    nav.classList.remove('is-open');
                    toggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close on Escape.
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                nav.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
                document.body.style.overflow = '';
            }
        });
    }

    if (header) {
        var lastY = 0;
        var ticking = false;
        var update = function () {
            if (window.scrollY > 32) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
            ticking = false;
        };
        window.addEventListener('scroll', function () {
            lastY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });
    }

    // Smooth-scroll for in-page anchors only.
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        var href = a.getAttribute('href');
        if (!href || href === '#' || href.length < 2) {
            return;
        }
        a.addEventListener('click', function (e) {
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });
})();
