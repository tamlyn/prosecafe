import {Selector, ClientFunction} from 'testcafe'

fixture('ProseMirror repro').page('http://localhost:8080')

test('empty editor without placeholder', async t => {
  const selector = Selector('#plain div[contenteditable]')
  await t
    .hover(selector)
    .expect(selector.hasAttribute("disabled")).notOk({timeout: 5000})
    .click(selector)
    .typeText(selector, 'Hello test')
    .pressKey("tab")
    .expect(selector.innerText).contains('Hello');
})

test('empty editor with placeholder', async t => {
  const selector = Selector('#with-placeholder div[contenteditable]');
  await t
    .hover(selector)
    .expect(selector.hasAttribute("disabled")).notOk({timeout: 5000})
    .click(selector);
   await typeTextInEditor(selector, "Hello World", t);
   await t
    .pressKey("tab")
    .expect(selector.innerText).contains('Hello');
})

async function typeTextInEditor(selector, text, t) {
  const input = selector.find("p");
  await t.click(input);
  [...text].forEach( async char => {
    await sendKey(char, input);
    await t.wait(100);
  });
  await t.click(input);
}

const sendKey = ClientFunction((key, selector) => {
  return new Promise ( (resolve) => {
    const element = selector();
    element.innerText += key;
    resolve();
  });
});