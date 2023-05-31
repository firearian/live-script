import PropTypes from 'prop-types';

const ContainerComponent = function ({ children }) {
  return <div className='editor container'>{children}</div>;
};

ContainerComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContainerComponent;
