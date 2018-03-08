const { EditorState } = require('prosemirror-state')
const { EditorView, Decoration, DecorationSet } = require('prosemirror-view')
const { schema } = require('prosemirror-schema-basic')

new EditorView(document.querySelector('#plain'), {
  state: EditorState.create({ schema }),
})

new EditorView(document.querySelector('#with-placeholder'), {
  state: EditorState.create({ schema }),
  decorations: state => {
    const { doc } = state
    const decorations = []

    if (
      doc.childCount === 1 &&
      doc.firstChild.isTextblock &&
      doc.firstChild.content.size === 0
    ) {
      const placeHolder = document.createElement('div')
      placeHolder.textContent = 'Type here...'
      placeHolder.classList.add('placeholder')

      decorations.push(Decoration.widget(1, placeHolder))
    }

    return DecorationSet.create(doc, decorations)
  },
})
