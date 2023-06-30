import PropTypes from 'prop-types';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import useChangeRoom from '../helperFunctions';

function NewRoom({ setIsOpen }) {
  const { handleChangeRoom } = useChangeRoom();
  const [textValue, setTextValue] = useState('');

  const handleChange = (value) => {
    setTextValue(value);
  };

  const handleSubmit = () => {
    handleChangeRoom(textValue);
    setIsOpen(false);
  };

  return (
    <>
      <TextField
        hiddenLabel
        id='filled-hidden-label-small'
        size='small'
        placeholder='New Room Name'
        className='pt-4'
        value={textValue}
        onChange={(event) => handleChange(event.target.value)}
      />
      <Button onClick={handleSubmit} />
    </>
  );
}
NewRoom.propTypes = {
  setIsOpen: PropTypes.func,
};

NewRoom.defaultProps = {
  setIsOpen: () => {},
};
export default NewRoom;
