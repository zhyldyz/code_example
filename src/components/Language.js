import React from "react";
import PropTypes from 'prop-types';

class Language extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    native: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  };

  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick(this.props.code)
  };

  render() {
    const { native, name, active } = this.props;

    return (
      <a
        href="#"
        className={`list-group-item list-group-item-action ${active && 'active'}`}
        onClick={this.handleClick}
      >
        {name}/{native}
      </a>
    )
  }
}

export default Language;