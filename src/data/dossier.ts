// Mesmo padrão de estado dos canais de contato (`src/data/contact.ts`): um
// recurso sem arquivo real não renderiza nenhum controle. Trocar para
// `{ status: 'defined', href: '/curriculo-lucas-calzoni.pdf', sizeLabel: '320 KB' }`
// quando o PDF for entregue — o arquivo vai em `public/`, nunca em
// `public/assets/`, que é intocável.
export type ResumeFile =
  | { status: 'defined'; href: string; sizeLabel: string }
  | { status: 'pending' }

export const resumeFile: ResumeFile = { status: 'pending' }
