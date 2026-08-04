import { useEffect, useRef, useState } from 'react'

// Revelação por entrada na viewport — docs/design.md ("Motion") e docs/architecture.md ("Revelação por viewport").
//
// Um **único** `IntersectionObserver` é compartilhado por todos os elementos
// que usam o hook, em vez de um observador por banda: são 6 elementos só na
// seção Sobre e cada observador extra é um custo fixo sem contrapartida.
// Cada alvo é desinscrito no primeiro cruzamento — a revelação acontece uma
// vez por visita e não re-anima ao sair e voltar à viewport.
interface Subscriber {
  /** Chamado quando o alvo cruza o limiar: revela o conteúdo. */
  reveal: () => void
  /** Chamado na primeira notificação sobre o alvo, cruzando ou não — é a
      prova de que a API está viva e desarma a rede de segurança. */
  acknowledge: () => void
}

const subscribers = new Map<Element, Subscriber>()
let observer: IntersectionObserver | null = null

// `threshold` e `rootMargin` da especificação: a banda só revela quando 20%
// dela está visível e antes de encostar na borda inferior da viewport, para
// que a animação não comece fora do campo de atenção.
const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.2,
  rootMargin: '0px 0px -10% 0px',
}

// Rede de segurança, avaliada uma vez por alvo. Ela distingue
// dois motivos muito diferentes para um elemento ainda estar oculto:
//
// 1. **O observador nunca entregou nada** (API morta): revela
//    incondicionalmente — conteúdo nunca depende de animação para existir.
// 2. **O observador está vivo, mas o alvo não cruzou o limiar**: só revela se
//    o alvo já estiver *acima* da viewport. Esse é o caso de um salto que o
//    observador não consegue registrar — a razão de interseção vai de 0 a 0
//    sem cruzar nada, e nenhuma notificação é emitida. Acontece de verdade ao
//    carregar a página já posicionada num fragmento abaixo da seção
//    (`/#contact`, link compartilhado, restauração de rolagem do navegador):
//    sem esta condição, a seção inteira ficaria invisível para sempre.
//    Se o alvo está *abaixo*, é só conteúdo ainda não alcançado — continua
//    esperando o observador, que está funcionando.
const REVEAL_FALLBACK_MS = 1200

function unobserve(element: Element) {
  subscribers.delete(element)
  observer?.unobserve(element)

  if (subscribers.size === 0) {
    observer?.disconnect()
    observer = null
  }
}

function observe(element: Element, subscriber: Subscriber) {
  observer ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const target = subscribers.get(entry.target)
      if (!target) continue

      target.acknowledge()

      // Revela quando o alvo cruza o limiar **ou** quando ele já ficou para
      // trás (borda inferior acima do topo da viewport). Sem a segunda
      // condição, todo elemento ultrapassado por um salto instantâneo —
      // âncora da navegação, link direto para `#work`, restauração de posição
      // de rolagem — ficaria invisível para sempre, porque nunca chegaria a
      // intersectar. Conteúdo nunca depende de animação para existir.
      const passou = entry.boundingClientRect.bottom <= 0

      if (!entry.isIntersecting && !passou) continue

      unobserve(entry.target)
      target.reveal()
    }
  }, OBSERVER_OPTIONS)

  subscribers.set(element, subscriber)
  observer.observe(element)
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  // O elemento já nasce revelado em dois casos, decididos aqui e não dentro do
  // efeito (setState síncrono em efeito causa render em cascata):
  //
  // - `prefers-reduced-motion: reduce` — o estado inicial oculto nunca chega a
  //   ser aplicado, então não há transição a suprimir;
  // - navegador sem `IntersectionObserver` — não faz sentido esconder conteúdo
  //   esperando um gatilho que nunca vem.
  const [revealed, setRevealed] = useState(
    () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    if (revealed) return

    const element = ref.current
    if (!element) return

    let acknowledged = false

    const timeout = window.setTimeout(() => {
      if (acknowledged && element.getBoundingClientRect().bottom > 0) return
      setRevealed(true)
    }, REVEAL_FALLBACK_MS)

    observe(element, {
      reveal: () => setRevealed(true),
      acknowledge: () => {
        acknowledged = true
      },
    })

    return () => {
      window.clearTimeout(timeout)
      unobserve(element)
    }
  }, [revealed])

  return { ref, revealed }
}
