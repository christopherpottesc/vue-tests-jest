import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

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
