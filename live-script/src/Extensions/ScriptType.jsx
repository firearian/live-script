// This file defines a TipTap extension named ScriptType.
// It adds styles to the paragraph node to reflect each Script Type (action, dialogue, etc.).
// And it handles the logic to change between styles.
import { Extension } from '@tiptap/core';
import { TextSelection } from 'prosemirror-state';
import { styleAttributes, SCRIPT_ATTRIBUTE_TYPES } from './Attributes';

const SCRIPT_TYPES = {
  HEADER: 'header',
  ACTION: 'action',
  CHARACTER: 'character',
  DIALOGUE: 'dialogue',
  PARENTHETICAL: 'parenthetical',
};

const ScriptType = Extension.create({
  name: 'scriptType',

  // List of options (HTML attributes) for extension.
  // Add Node types into "types" to apply extension to more node types.
  addOptions() {
    return {
      types: ['paragraph'],
      scriptTypes: [
        SCRIPT_TYPES.HEADER,
        SCRIPT_TYPES.ACTION,
        SCRIPT_TYPES.CHARACTER,
        SCRIPT_TYPES.DIALOGUE,
        SCRIPT_TYPES.PARENTHETICAL,
      ],
      textAlign: '',
      marginInlineStart: '',
      marginInlineEnd: '',
      textTransform: '',
      fontStyle: '',
    };
  },

  // functions for setting each of the options as HTML attributes. Default values included.
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          scriptType: {
            default: SCRIPT_TYPES.ACTION,
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

  // The Tab key is used to shuffle between the types of scripts
  // When in new line, defaults to an appropriate script type based on previous script type
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        this.editor.commands.setScriptType(false);
        this.editor.commands.setParentheses();
        return true;
      },
      Enter: () => {
        this.editor
          .chain()
          .newlineInCode()
          .createParagraphNear()
          .liftEmptyBlock()
          .splitBlock()
          .focus()
          .run();
        this.editor.commands.setScriptType(true);
        return true;
      },
    };
  },

  // Commands as follows:
  // getScriptType: get the next script type (if shuffling) or appropriate script type (if on new line)
  // setAttributes: sets input attributes to current node
  // getAttributes: gets relevant attributes based on input script type
  // setParentheses: This method adds or removes end/beginning parentheses depending on the script type.
  // setScriptType: parent function to call to apply a script type
  addCommands() {
    return {
      getScriptType: (currentScriptType, isNewLine) => () => {
        const { scriptTypes } = this.options;

        // gets current script type index in the master list of script types.
        const currentIndex = scriptTypes.indexOf(currentScriptType);
        if (!scriptTypes.includes(currentScriptType)) {
          return false;
        }
        if (isNewLine) {
          switch (currentScriptType) {
            case SCRIPT_TYPES.HEADER:
              return SCRIPT_TYPES.ACTION;
            case SCRIPT_TYPES.CHARACTER:
              return SCRIPT_TYPES.DIALOGUE;
            case SCRIPT_TYPES.PARENTHETICAL:
              return SCRIPT_TYPES.DIALOGUE;
            default:
              return currentScriptType;
          }
        }
        const nextIndex = (currentIndex + 1) % scriptTypes.length;
        return scriptTypes[nextIndex];
      },
      setAttributes:
        (attributes) =>
        ({ commands }) =>
          this.options.types.every((type) => commands.updateAttributes(type, attributes)),
      getAttributes: (nodeScriptType) => () => {
        let attributes = {};
        attributes = SCRIPT_ATTRIBUTE_TYPES[nodeScriptType];
        return { ...styleAttributes(nodeScriptType), ...attributes };
      },
      setParentheses:
        () =>
        ({ tr }) => {
          const { selection } = tr;
          let transaction = tr;
          const currentNode = selection.$head.parent;
          const currentScriptType = currentNode.attrs.scriptType;
          const re = /^\(.*\)$/;
          const text = currentNode.textContent;
          let newText;
          if (currentScriptType === SCRIPT_TYPES.PARENTHETICAL) {
            newText = `(${text})`;
          } else if (currentScriptType === SCRIPT_TYPES.HEADER && text.match(re)) {
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
      setScriptType:
        (isNewLine) =>
        ({ commands, tr }) => {
          const { selection } = tr;
          const currentScriptType = selection.$head.parent.attrs.scriptType;

          // obtains a new script type based on whether a newline (enter pressed) or same line.
          const newScriptType = commands.getScriptType(currentScriptType, isNewLine);
          if (currentScriptType === newScriptType) {
            return;
          }
          const attributes = commands.getAttributes(newScriptType);
          commands.setAttributes(attributes);
        },
    };
  },
});

export default ScriptType;
