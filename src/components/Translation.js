import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const DATE_FORMAT = 'D.MM.YYYY HH:mm';

class Translation extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    snippet: PropTypes.string,
    created: PropTypes.number,
    updated: PropTypes.number,
    isNew: PropTypes.bool,
    onNameChange: PropTypes.func,
    onSnippetChange: PropTypes.func.isRequired,
    onEdit: PropTypes.func,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  handleNameChange = (e) => {
    e.preventDefault();
    this.props.onNameChange(e.target.value);
  };

  handleSnippetChange = (e) => {
    e.preventDefault();
    this.props.onSnippetChange(e.target.value);
  };

  formatDate = (date) => {
    return !!date && moment(date).format(DATE_FORMAT);
  };

  renderPlain = () => {
    const { id, name, snippet, created, updated } = this.props;

    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{snippet}</td>
        <td>{this.formatDate(created)}</td>
        <td>{this.formatDate(updated)}</td>
        <td>
          <button className="btn btn-primary" onClick={this.props.onEdit}>Edit</button>
        </td>
      </tr>
    )
  };

  renderEditable = () => {
    const { id, name, snippet, created, updated, isNew } = this.props;

    return (
      <tr className="table-warning">
        <td>{id}</td>
        <td>
          {isNew ?
            <input
              type="text"
              value={name}
              onChange={this.handleNameChange}
              placeholder="name"
              autoFocus
            /> :
            name
          }
        </td>
        <td>
          <input
            type="text"
            value={snippet}
            onChange={this.handleSnippetChange}
            placeholder="snippet"
            autoFocus={!isNew}
          />
        </td>
        <td>{this.formatDate(created)}</td>
        <td>{this.formatDate(updated)}</td>
        <td>
          <button onClick={this.props.onSave} className="btn btn-success">Save</button>
          <button onClick={this.props.onCancel} className="btn btn-outline-danger">Cancel</button>
        </td>
      </tr>
    )
  };

  render() {
    const { editable } = this.props;

    return editable ? this.renderEditable() : this.renderPlain();
  }
}

export default Translation;