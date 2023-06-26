import PropTypes from 'prop-types';

const ContainerComponent = function ({ children }) {
  console.log('editorcontainer log');
  return <div className='editor container'>{children}</div>;
};

ContainerComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContainerComponent;
