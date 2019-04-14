import React from 'react';
import PropTypes from 'prop-types';

const Uploader = ({ label, onFileRead }) => {
  let fileReader;
  const id = `${label.replace(/\s/g, '_')}_${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = ({ target }) => {
    fileReader = new FileReader();
    fileReader.onloadend = () => {
      onFileRead(fileReader.result);
    };
    fileReader.readAsText(target.files[0]);
  };

  return (
    <label className="custom-file" htmlFor={id}>
      <input
        type="file"
        className="custom-file-input"
        id={id}
        placeholder="Email"
        onChange={handleChange}
      />
      <span className="custom-file-label">{label}</span>
    </label>
  );
};

Uploader.propTypes = {
  label: PropTypes.string.isRequired,
  onFileRead: PropTypes.func,
};

Uploader.defaultProps = {
  onFileRead: () => {},
};

export default Uploader;
