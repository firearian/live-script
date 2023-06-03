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
      scriptTypes: ['header', 'action', 'character', 'dialogue', 'parenthetical'],
      textAlign: '',
      marginInlineStart: '',
      marginInlineEnd: '',
      textTransform: '',
      fontStyle: '',
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
        this.editor.commands.setScriptSubType(false);
        this.editor.commands.setParentheses();
        return true;
      },
      Enter: () => {
        console.log('Enterabby');
        this.editor
          .chain()
          .newlineInCode()
          .createParagraphNear()
          .liftEmptyBlock()
          .splitBlock()
          .focus()
          .run();
        this.editor.commands.setScriptSubType(true);
        return true;
      },
    };
  },

  addCommands() {
    return {
      getScriptSubType: (currentSubType, isNewLine) => () => {
        const scriptTypes = Array.from(this.options.scriptTypes);
        if (!scriptTypes.includes(currentSubType)) {
          return false;
        }
        if (isNewLine) {
          switch (currentSubType) {
            case 'header':
              return 'action';
            case 'character':
              return 'dialogue';
            case 'parenthetical':
              return 'dialogue';
            default:
              return currentSubType;
          }
        }
        if (scriptTypes.indexOf(currentSubType) === scriptTypes.length - 1) {
          return scriptTypes[0];
        }
        return scriptTypes[scriptTypes.indexOf(currentSubType) + 1];
      },
      setAttributes:
        (attributes) =>
        ({ commands }) =>
          this.options.types.every((type) => commands.updateAttributes(type, attributes)),
      getAttributes: (nodeSubType) => () => {
        let attributes = styleAtributes(nodeSubType);
        switch (nodeSubType) {
          case 'header':
            attributes = {
              ...attributes,
              textTransform: 'uppercase',
              marginTop: '2ch',
            };
            break;
          case 'action':
            attributes = {
              ...attributes,
              marginTop: '1ch',
            };
            break;
          case 'character':
            attributes = {
              ...attributes,
              textAlign: 'center',
              textTransform: 'uppercase',
              marginTop: '1ch',
            };
            break;
          case 'parenthetical':
            attributes = {
              ...attributes,
              marginInlineStart: '15.1ch',
              marginInlineEnd: '15.1ch',
              fontStyle: 'italic',
            };
            break;
          case 'dialogue':
            attributes = {
              ...attributes,
              textAlign: 'justify',
              marginInlineStart: '10.1ch',
              marginInlineEnd: '10.1ch',
            };
            break;
          default:
            break;
        }
        return attributes;
      },
      setParentheses:
        () =>
        ({ tr }) => {
          const { selection } = tr;
          let transaction = tr;
          const currentNode = selection.$head.parent;
          const currentScriptSubType = currentNode.attrs.scriptType;
          const re = /^\(.*\)$/;
          const text = currentNode.textContent;
          let newText;
          if (currentScriptSubType === 'parenthetical') {
            newText = `(${text})`;
          } else if (currentScriptSubType === 'header' && text.match(re)) {
            newText = text.replaceAll(/^\(*|\)*$/g, '');
          } else {
            return;
          }
          const start = selection.$to.before() + 1;
          const end = selection.$to.after() - 1;
          transaction = transaction.insertText(newText, start, end);
          if (!text) {
            const newResolvedPos = transaction.doc.resolve(end + 1);
            const newSelection = new TextSelection(newResolvedPos);
            transaction = transaction.setSelection(newSelection);
          }
        },
      setScriptSubType:
        (isNewLine) =>
        ({ commands, tr }) => {
          const { selection } = tr;
          const currentSubScriptType = selection.$head.parent.attrs.scriptType;
          const newScriptSubType = commands.getScriptSubType(currentSubScriptType, isNewLine);
          if (currentSubScriptType === newScriptSubType) {
            return;
          }
          const attributes = commands.getAttributes(newScriptSubType);
          commands.setAttributes(attributes);
        },
    };
  },
});

export default ScriptType;
