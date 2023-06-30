import PropTypes from 'prop-types';

function InputField({ id, type, value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={id}>
        {placeholder}
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={type}
          required
          value={value}
          onChange={onChange}
          className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}
InputField.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

InputField.defaultProps = {
  id: '',
  type: '',
  value: '',
  onChange: () => {},
  placeholder: PropTypes.string,
};

export default InputField;
