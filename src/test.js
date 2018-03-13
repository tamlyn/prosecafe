import {Selector, ClientFunction} from 'testcafe'

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

test('workaround for empty editor with placeholder', async t => {
  const selector = Selector('#with-placeholder div[contenteditable]')
  await t.typeText(...await prepareEditor(selector, 'Hello test'))
  	.expect(selector.innerText).contains('Hello')
})

async function prepareEditor(selector, text) {
	const hasPlaceholder = await selector.find('.placeholder').exists
	const options = {}
	if (hasPlaceholder) {
		await goToEditMode(selector.child())
		options.replace = true
	}
	return [selector, text, options]
}


const goToEditMode = ClientFunction(selector => selector().innerHTML += '')
