import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

describe('um lance sem valor mínimo', () => {
  test('não aceita lance com valor menor do que zero', () => {
  // montando o componente
    const wrapper = mount(Lance)
    // encontrado o input
    const input = wrapper.find('input')
    // set valor inválido
    input.setValue(-100)
    // escutando o evento
    const lancesEmitidos = wrapper.emitted('novo-lance')
    wrapper.trigger('submit')
    expect(lancesEmitidos).toBeUndefined()
  })

  test('emite um lance quando o valor é maior do que zero', () => {
  // montando o componente
    const wrapper = mount(Lance)
    // encontrado o input
    const input = wrapper.find('input')
    // set valor inválido
    input.setValue(100)
    // escutando o evento
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })

  test('emite o valor esperado de um lance válido', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    // [
    //   [100]
    // ]
    const lance = parseInt(lancesEmitidos[0][0])
    expect(lance).toBe(100)
  })
})

describe('um lance com valor mínimo', () => {
  test('todos os lances devem possuir um valor maior do que o mínimo informado', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })

  test('emite o valor esprado de um lance válido', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    const valorLance = parseInt(lancesEmitidos[0][0])
    expect(valorLance).toBe(400)
  })

  test('não são aceitos lances com valores menores que do que o mínimo informado', async () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    await wrapper.vm.$nextTick()
    const msgErro = wrapper.find('p.alert').element.textContent
    const msgEsperada = 'O valor mínimo para o lance é de R$ 300'
    // expect(msgErro).toBeTruthy() => valida se existe/true
    expect(msgErro).toContain(msgEsperada)
  })
})
