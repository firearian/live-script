/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useCurrentContext } from '../Contexts/CurrentContext';

function LogoutButton(props) {
  const { closeApp } = props;
  const { isAuthenticated } = useCurrentContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!isAuthenticated) {
    return null; // or any other fallback behavior if not authenticated
  }

  return (
    isAuthenticated && (
      <>
        <Button
          id='demo-customized-button'
          aria-controls={isMenuOpen ? 'demo-customized-button' : undefined}
          aria-haspopup='true'
          aria-expanded={isMenuOpen ? 'true' : undefined}
          variant='outlined'
          onClick={handleClick}
          disableElevation
        >
          Menu
        </Button>
        <Menu
          id='demo-customized-menu'
          open={isMenuOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          sx={{}}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={closeApp}>Logout</MenuItem>
        </Menu>
      </>
    )
  );
}
LogoutButton.propTypes = {
  closeApp: PropTypes.func,
};
LogoutButton.defaultProps = {
  closeApp: () => {},
};

export default LogoutButton;
