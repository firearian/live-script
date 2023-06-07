export const styleAttributes = (type) => ({
  scriptType: type,
  textAlign: 'left',
  marginInlineStart: '0.5rem',
  marginInlineEnd: '0ch',
  textTransform: 'none',
  marginTop: '0ch',
});

export const SCRIPT_ATTRIBUTE_TYPES = {
  header: {
    textTransform: 'uppercase',
    marginTop: '1em',
  },
  action: {
    marginTop: '1em',
  },
  character: {
    marginInlineStart: '15.5rem',
    marginInlineEnd: '4rem',
    textTransform: 'uppercase',
    marginTop: '1em',
  },
  dialogue: {
    marginInlineStart: '8rem',
    marginInlineEnd: '13rem',
  },
  parenthetical: {
    marginInlineStart: '11.5rem',
    marginInlineEnd: '18.1rem',
  },
};
