export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

export function scrollToBotomEl(el: HTMLElement | null) {
  if (el)
    el.scrollTo(0, el?.scrollHeight);
}