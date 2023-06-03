import { Extension } from '@tiptap/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TextSelection } from 'prosemirror-state';
import styleAtributes from './Attributes';

// eslint-disable-next-line import/prefer-default-export
const ScriptType = Extension.create({
  name: 'scriptType',

  addOptions() {
    return {
      types: ['paragraph'],
      scriptTypes: ['header', 'action', 'character', 'parenthetical', 'dialogue'],
      textAlign: '',
      marginInlineStart: '',
      marginInlineEnd: '',
      textTransform: '',
      fontStyle: '',
    };
  },

  addStorage() {
    return {
      currentType: 'action',
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          scriptType: {
            default: 'action',
            parseHTML: (element) => element.scriptType,
            renderHTML: (attributes) => ({
              class: attributes.scriptType,
            }),
          },
          marginInlineStart: {
            default: '0ch',
            parseHTML: (element) => element.style.marginInlineStart,
            renderHTML: (attributes) => ({
              style: `margin-inline-start: ${attributes.marginInlineStart}`,
            }),
          },
          marginInlineEnd: {
            default: '0ch',
            parseHTML: (element) => element.style.marginInlineEnd,
            renderHTML: (attributes) => ({
              style: `margin-inline-end: ${attributes.marginInlineEnd}`,
            }),
          },
          textTransform: {
            default: 'none',
            parseHTML: (element) => element.style.textTransform,
            renderHTML: (attributes) => ({
              style: `text-transform: ${attributes.textTransform}`,
            }),
          },
          textAlign: {
            default: 'left',
            parseHTML: (element) => element.style.textAlign,
            renderHTML: (attributes) => ({
              style: `text-align: ${attributes.textAlign}`,
            }),
          },
          fontStyle: {
            default: 'normal',
            parseHTML: (element) => element.style.fontStyle,
            renderHTML: (attributes) => ({
              style: `font-style: ${attributes.fontStyle}`,
            }),
          },
          marginTop: {
            default: '0ch',
            parseHTML: (element) => element.style.marginTop,
            renderHTML: (attributes) => ({
              style: `margin-top: ${attributes.marginTop}`,
            }),
          },
        },
      },
    ];
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => {
        console.log('Tabby');
        if (!this.editor.chain().focus().isEmpty()) {
          this.editor.commands.enter();
        }
        this.editor.commands.setScriptType();
        this.editor.commands.setParentheses();
        return true;
      },
    };
  },

  addCommands() {
    return {
      getScriptType: () => () => this.storage.currentType,
      getConfiguration: (nodeSubType) => () => {
        let configuration = styleAtributes(nodeSubType);
        switch (nodeSubType) {
          case 'header':
            configuration = {
              ...configuration,
              textTransform: 'uppercase',
              marginTop: '2ch',
            };
            break;
          case 'action':
            configuration = {
              ...configuration,
              marginTop: '1ch',
            };
            break;
          case 'character':
            configuration = {
              ...configuration,
              textAlign: 'center',
              textTransform: 'uppercase',
              marginTop: '1ch',
            };
            break;
          case 'parenthetical':
            configuration = {
              ...configuration,
              marginInlineStart: '15.1ch',
              marginInlineEnd: '15.1ch',
              fontStyle: 'italic',
            };
            break;
          case 'dialogue':
            configuration = {
              ...configuration,
              textAlign: 'justify',
              marginInlineStart: '10.1ch',
              marginInlineEnd: '10.1ch',
            };
            break;
          default:
            break;
        }
        return configuration;
      },
      setNewLine:
        (currentNodeSubType) =>
        ({ tr, commands }) => {
          let newAttributes = '';
          switch (currentNodeSubType) {
            case 'header':
              newAttributes = commands.getConfiguration('action');
              break;
            case 'character':
              newAttributes = commands.getConfiguration('dialogue');
              break;
            case 'parenthetical':
              newAttributes = commands.getConfiguration('dialogue');
              break;
            default:
              break;
          }
          const { selection } = tr;
          let transaction = tr;
          const currentNode = selection.$head.parent;
          if (['parenthetical', 'dialogue'].includes(currentNode.attrs.scriptType)) {
            const re = /^\(.*\)$/;
            let newText;
            const text = currentNode.textContent;
            const start = selection.$to.before() + 1;
            const end = selection.$to.after() - 1;

            if (this.storage.currentType === 'parenthetical') {
              newText = `(${text})`;
            } else if (text.match(re)) {
              newText = text.replaceAll(/^\(*|\)*$/g, '');
            } else {
              return;
            }
            transaction = transaction.insertText(newText, start, end);
            if (!text) {
              const newResolvedPos = transaction.doc.resolve(end + 1);
              const newSelection = new TextSelection(newResolvedPos);
              transaction = transaction.setSelection(newSelection);
            }
          }
        },
      setParentheses:
        () =>
        ({ tr }) => {
          const { selection } = tr;
          let transaction = tr;
          const currentNode = selection.$head.parent;
          if (['parenthetical', 'dialogue'].includes(currentNode.attrs.scriptType)) {
            const re = /^\(.*\)$/;
            let newText;
            const text = currentNode.textContent;
            const start = selection.$to.before() + 1;
            const end = selection.$to.after() - 1;

            if (this.storage.currentType === 'parenthetical') {
              newText = `(${text})`;
            } else if (text.match(re)) {
              newText = text.replaceAll(/^\(*|\)*$/g, '');
            } else {
              return;
            }
            transaction = transaction.insertText(newText, start, end);
            if (!text) {
              const newResolvedPos = transaction.doc.resolve(end + 1);
              const newSelection = new TextSelection(newResolvedPos);
              transaction = transaction.setSelection(newSelection);
            }
          }
        },
      setScriptType:
        () =>
        ({ commands, tr }) => {
          const { selection } = tr;
          const currentScriptType = selection.$head.parent.attrs.scriptType;
          const scriptTypes = Array.from(this.options.scriptTypes);
          let newType;
          if (scriptTypes.indexOf(currentScriptType) === scriptTypes.length - 1) {
            newType = scriptTypes[0];
          } else {
            newType = scriptTypes[scriptTypes.indexOf(currentScriptType) + 1];
          }
          if (!scriptTypes.includes(currentScriptType)) {
            return false;
          }
          const configuration = commands.getConfiguration(newType);

          this.storage.currentType = newType;
          return this.options.types.every((type) => commands.updateAttributes(type, configuration));
        },
    };
  },
});

export default ScriptType;
