# Lucas Calzoni — Landing Page

Landing page de página única para o ator Lucas Calzoni: apresentação, filmografia, galeria + reel e contato, bilíngue (PT/EN). Objetivo, público-alvo e critérios de sucesso completos em [`docs/product.md`](docs/product.md); direção visual e narrativa em [`docs/design.md`](docs/design.md).

Esta fase usa conteúdo **placeholder** (textos, fotos, dados de contato) — ver [Substituindo os placeholders](#substituindo-os-placeholders) abaixo.

## Stack

React + Vite + TypeScript (`strict`) + Tailwind CSS + shadcn/ui, sem `react-router` (página única, âncoras) e i18n via Context/hook próprio. Detalhes completos (estrutura de pastas, decisões técnicas, processo) em [`docs/architecture.md`](docs/architecture.md).

## Pré-requisitos

- Node.js `^20.19.0` ou `>=22.12.0` (exigido pelo Vite 8, instalado como dependência de build)
- npm

## Instalação

```bash
npm install
```

## Execução em desenvolvimento

```bash
npm run dev
```

Abre o servidor de desenvolvimento do Vite com hot reload.

## Build de produção

```bash
npm run build
npm run preview
```

`build` gera o `dist/` de produção; `preview` serve esse `dist/` localmente — é a forma correta de validar o site como ele realmente se comporta em produção (o servidor de desenvolvimento não representa o build final).

## Estrutura principal do projeto

```
src/
  components/ui/        # componentes shadcn/ui
  components/layout/    # Navbar, Footer, LanguageToggle
  components/sections/  # Hero, About, Filmography, Gallery, Contact
  content/               # i18n.tsx, pt.ts, en.ts
  data/                  # filmography.ts, gallery.ts, contact.ts (dados tipados)
public/
  assets/placeholders/   # imagens estáticas placeholder
```

Árvore completa e racional de cada pasta em [`docs/architecture.md`](docs/architecture.md).

## Substituindo os placeholders

Todo o conteúdo abaixo é fictício e existe apenas para preencher o layout. Nenhuma substituição exige mudar componentes ou layout — apenas os arquivos de dados/conteúdo indicados.

- **Retratos (Hero e Sobre)**: trocar os arquivos `public/assets/placeholders/hero-portrait.svg` e `about-portrait.svg` por imagens reais (mesmo nome de arquivo, ou atualizar a referência em `src/components/sections/Hero.tsx`/`About.tsx`). Ver `docs/design.md` (Princípios de imagem) para o tratamento visual esperado (preto-e-branco/dessaturado).
- **Galeria**: adicionar/substituir arquivos em `public/assets/placeholders/` e atualizar o array `galleryPhotos` em `src/data/gallery.ts` (`src` + `alt` em PT/EN por foto).
- **Reel**: em `src/data/gallery.ts`, o objeto `reel` está com `status: 'pending'` (nenhum vídeo real ainda — nenhum player interativo é exibido). Ao ter uma URL de embed real, trocar para `{ status: 'defined', embedUrl: '...', posterSrc: '...', posterAlt: {...} }` — o componente já lida com os dois estados automaticamente.
- **Contatos**: em `src/data/contact.ts`, cada canal está `status: 'pending'` (renderizado como texto não interativo "[a definir]"). Ao ter o dado real, trocar para `{ status: 'defined', href: '...', external: boolean }` conforme o exemplo comentado no próprio arquivo — vira automaticamente um link acessível.
- **Textos e filmografia**: bio, tags de navegação, rótulos etc. em `src/content/pt.ts`/`en.ts`; itens da filmografia em `src/data/filmography.ts`.

## i18n

Dois dicionários tipados (`src/content/pt.ts`, `en.ts`) por uma única `interface Dictionary`, servidos via Context/hook (`useI18n`) — sem biblioteca externa de i18n. Justificativa e detalhes em [`docs/architecture.md`](docs/architecture.md) (seção i18n).

## Comandos disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Typecheck + build de produção em `dist/` |
| `npm run preview` | Serve o `dist/` gerado, para validar o build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | Verificação de tipos (`tsc -b`), sem gerar build |

## Licença

Código-fonte distribuído sob a licença MIT — ver [`LICENSE`](LICENSE).

As imagens, textos, dados de contato e demais conteúdos presentes neste repositório são **placeholders para demonstração** e devem ser substituídos por conteúdo real antes de qualquer uso em produção (ver [Substituindo os placeholders](#substituindo-os-placeholders)).
