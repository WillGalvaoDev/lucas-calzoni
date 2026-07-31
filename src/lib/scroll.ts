export function scrollToTop() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
}

// Compartilhada entre Navbar (links âncora) e o CTA da Hero — mesma lógica
// exata nos dois lugares (nenhuma variação de comportamento entre eles),
// então extrair evita duplicar o cálculo de `prefers-reduced-motion`.
export function scrollToId(id: string) {
  const element = document.getElementById(id)
  if (!element) return
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
  element.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  })
}
