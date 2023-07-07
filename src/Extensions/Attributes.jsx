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
    marginInlineStart: '16.5vw',
    marginInlineEnd: '5vw',
    textTransform: 'uppercase',
    marginTop: '1em',
  },
  dialogue: {
    marginInlineStart: '9vw',
    marginInlineEnd: '14vw',
  },
  parenthetical: {
    marginInlineStart: '12.5vw',
    marginInlineEnd: '18.1vw',
  },
};
