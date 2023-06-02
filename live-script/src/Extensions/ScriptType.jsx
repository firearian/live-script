import { Extension } from '@tiptap/core';

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
            default: this.options.defaultAlignment,
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

  addCommands() {
    return {
      getScriptType: () => () => this.storage.currentType,
      setScriptType:
        (currentScriptType) =>
        ({ commands }) => {
          console.log('Script Align Entered');
          let newType;
          const scriptTypes = Array.from(this.options.scriptTypes);
          if (scriptTypes.indexOf(currentScriptType) === scriptTypes.length - 1) {
            newType = scriptTypes[0];
          } else {
            newType = scriptTypes[scriptTypes.indexOf(currentScriptType) + 1];
          }
          console.log(newType);

          if (!scriptTypes.includes(currentScriptType)) {
            return false;
          }
          let configuration = {
            textAlign: 'left',
            marginInlineStart: '0ch',
            marginInlineEnd: '0ch',
            textTransform: 'none',
            fontStyle: 'normal',
            marginTop: '0ch',
          };

          if (newType === 'header') {
            configuration = {
              ...configuration,
              textTransform: 'uppercase',
              marginTop: '2ch',
            };
          } else if (newType === 'action') {
            configuration = {
              ...configuration,
              marginTop: '1ch',
            };
          } else if (newType === 'character') {
            configuration = {
              ...configuration,
              textAlign: 'center',
              textTransform: 'uppercase',
              marginTop: '1ch',
            };
          } else if (newType === 'parenthetical') {
            configuration = {
              ...configuration,
              marginInlineStart: '15.1ch',
              marginInlineEnd: '15.1ch',
              fontStyle: 'italic',
            };
          } else if (newType === 'dialogue') {
            configuration = {
              ...configuration,
              textAlign: 'justify',
              marginInlineStart: '10.1ch',
              marginInlineEnd: '10.1ch',
            };
          }
          console.log('configuration: ', configuration);
          this.storage.currentType = newType;
          return this.options.types.every((type) => commands.updateAttributes(type, configuration));
        },
    };
  },
});

export default ScriptType;
