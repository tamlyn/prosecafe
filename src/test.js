import {Selector} from 'testcafe'

fixture('ProseMirror repro').page('http://localhost:8080')

test('empty editor without placeholder', t => {
  const selector = Selector('#plain div[contenteditable]')
  return t.typeText(selector, 'Hello test')
      .expect(selector.innerText).contains('Hello')
})

test('empty editor with placeholder', t => {
  const selector = Selector('#with-placeholder div[contenteditable]')
  return t.typeText(selector, 'Hello test')
      .expect(selector.innerText).contains('Hello')
})
