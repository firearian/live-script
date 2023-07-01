import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import useChangeRoom from '../helperFunctions';

function NewRoom({ isOpen, setIsOpen }) {
  const { handleChangeRoom } = useChangeRoom();
  const [textValue, setTextValue] = useState('');

  const handleChange = (value) => {
    setTextValue(value);
  };

  useEffect(() => {
    if (!isOpen) {
      setTextValue('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    handleChangeRoom(textValue);
    setTextValue('');
    setIsOpen(false);
  };

  return (
    <div className='new-room-container'>
      <TextField
        hiddenLabel
        id='filled-hidden-label-small'
        size='small'
        placeholder='Find/New Room'
        value={textValue}
        inputProps={{ style: { fontSize: 12 } }}
        onChange={(event) => handleChange(event.target.value)}
      />
      <Button size='small' variant='outlined' onClick={handleSubmit} aria-haspopup='true'>
        Search/Create
      </Button>
    </div>
  );
}
NewRoom.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

NewRoom.defaultProps = {
  isOpen: null,
  setIsOpen: () => {},
};
export default NewRoom;
