import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
  {
    produto: 'Um livro da casa do código',
    lanceInicial: 49,
    descricao: 'Um maravilhoso livro sobre Vue'
  },
  {
    produto: 'Um livro da casa do código',
    lanceInicial: 49,
    descricao: 'Livro sobre Teste Unitário'
  }
]

describe('Um avaliador que se conecta com a API', () => {
  test('Mostra todos os leiloes retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce(leiloes)
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(leiloes.length)
  })

  test('Não há eiloes retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce([])
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(0)
  })
})
