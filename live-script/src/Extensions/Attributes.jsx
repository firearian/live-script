export const styleAttributes = (type) => ({
  scriptType: type,
  textAlign: 'left',
  marginInlineStart: '0ch',
  marginInlineEnd: '0ch',
  textTransform: 'none',
  fontStyle: 'normal',
  marginTop: '0ch',
});

export const SCRIPT_ATTRIBUTE_TYPES = {
  header: {
    textTransform: 'uppercase',
    marginTop: '2ch',
  },
  action: {
    marginTop: '1ch',
  },
  character: {
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: '1ch',
  },
  dialogue: {
    textAlign: 'justify',
    marginInlineStart: '10.1ch',
    marginInlineEnd: '10.1ch',
  },
  parenthetical: {
    marginInlineStart: '15.1ch',
    marginInlineEnd: '15.1ch',
    fontStyle: 'italic',
  },
};
