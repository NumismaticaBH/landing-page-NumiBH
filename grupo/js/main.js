(function () {
  'use strict';

  /* ============================================================
     WHATSAPP — troque o número (formato 55 + DDD + número, só
     dígitos) e a mensagem inicial que já chega pronta no chat.
     ============================================================ */
  var WHATSAPP_NUMBER = '5531972667185';
  var WHATSAPP_MESSAGE = 'Olá! Gostaria de entrar no grupo de colecionadores da Numismática BH.';
  var WHATSAPP_LINK = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);

  document.querySelectorAll('.js-whatsapp-cta').forEach(function (el) {
    el.setAttribute('href', WHATSAPP_LINK);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* Header muda de aparência depois de rolar a página */
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* FAQ — acordeão acessível */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      var opening = !item.classList.contains('is-open');
      item.classList.toggle('is-open', opening);
      question.setAttribute('aria-expanded', String(opening));
    });
  });

  /* Carrossel de relatos — bolinhas indicam o print visível */
  var carousel = document.querySelector('.relatos-carousel');
  var dots = document.querySelectorAll('.relato-dot');
  if (carousel && dots.length) {
    var onCarouselScroll = function () {
      var cardWidth = carousel.firstElementChild.getBoundingClientRect().width + 20;
      var idx = Math.max(0, Math.min(dots.length - 1, Math.round(carousel.scrollLeft / cardWidth)));
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === idx);
      });
    };
    carousel.addEventListener('scroll', onCarouselScroll, { passive: true });
  }

  /* Revela cada seção com fade + leve deslocamento ao entrar na tela */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('[data-reveal]');
  if (!prefersReduced && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .15, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
