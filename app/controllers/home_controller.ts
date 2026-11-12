import type { HttpContext } from '@adonisjs/core/http'

/**
 * HomeController
 * Mostra a página inicial da galeria (resources/views/pages/home.edge).
 */
export default class HomeController {
  async index({ view }: HttpContext) {
    // Passos exibidos na secção "Como funciona".
    const steps = [
      { title: 'Crie a sua galeria', text: 'Faça o registo e dê um nome à sua galeria.' },
      { title: 'Envie as suas fotos', text: 'Arraste as imagens ou escolha-as no dispositivo.' },
      { title: 'Baixe quando quiser', text: 'Descarregue qualquer imagem no tamanho original.' },
    ]

    // Exemplos fixos só para mostrar o layout.
    // Mais tarde, troque por uma consulta ao banco (Lucid) com as galerias reais.
    const featuredGalleries = [
      { title: 'Viagens', photos: 24, hue: 250 },
      { title: 'Família', photos: 58, hue: 330 },
      { title: 'Eventos', photos: 31, hue: 190 },
      { title: 'Natureza', photos: 42, hue: 140 },
    ]

    // O primeiro argumento é o caminho dentro de resources/views
    return view.render('pages/home', { steps, featuredGalleries })
  }
}