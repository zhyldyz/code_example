import React from 'react';
import Translation from "./Translation";
import LanguagesList from "./LanguagesList";
import PropTypes from 'prop-types';

class TranslationsPage extends React.Component {
  static propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    languages: PropTypes.array.isRequired,
    translations: PropTypes.array.isRequired,
    editableTranslation: PropTypes.object,
    actions: PropTypes.shape({
      fetchLanguages: PropTypes.func.isRequired,
      fetchTranslations: PropTypes.func.isRequired,
      createTranslation: PropTypes.func.isRequired,
      editTranslation: PropTypes.func.isRequired,
      changeName: PropTypes.func.isRequired,
      changeSnippet: PropTypes.func.isRequired,
      saveTranslation: PropTypes.func.isRequired,
      saveNewTranslation: PropTypes.func.isRequired,
      cancelEdit: PropTypes.func.isRequired,
      changeLanguage: PropTypes.func.isRequired,
    })
  };

  componentDidMount() {
    this.props.actions.fetchLanguages().then(() => {
      this.props.actions.fetchTranslations();
    });
  }

  handleCreateTranslationButton = (e) => {
    e.preventDefault();
    this.props.actions.createTranslation();
  };

  renderTranslation = (translation) => {
    const { editableTranslation } = this.props;
    const translationId = translation.id;
    const editable = translationId === editableTranslation.id;

    const targetTranslation = editable ? editableTranslation : translation;

    return (
      <Translation
        {...targetTranslation}
        editable={editable}
        key={`translation-${translationId}`}
        onEdit={this.props.actions.editTranslation.bind(null, translation)}
        onNameChange={this.props.actions.changeName}
        onSnippetChange={this.props.actions.changeSnippet}
        onSave={this.props.actions.saveTranslation}
        onCancel={this.props.actions.cancelEdit}
      />
    )
  };

  render() {
    const { translations, editableTranslation, languages, currentLanguage } = this.props;

    return (
      <div className="row">
        <div className="col-md-10">
          <table className="table table-striped table-bordered">
            <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>snippet</th>
              <th>created</th>
              <th>updated</th>
              <th>actions</th>
            </tr>
            </thead>
            <tbody>
            {translations.map(this.renderTranslation)}
            {editableTranslation.isNew &&
            <Translation
              {...editableTranslation}
              onNameChange={this.props.actions.changeName}
              onSnippetChange={this.props.actions.changeSnippet}
              onSave={this.props.actions.saveNewTranslation}
              onCancel={this.props.actions.cancelEdit}
              editable
            />
            }
            </tbody>
          </table>
        </div>
        <div className="col-md-2">
          <div style={{ position: 'fixed' }}>
            <LanguagesList
              languages={languages}
              currentLanguage={currentLanguage}
              onLanguageChange={this.props.actions.changeLanguage}
            />
            <a
              href="#"
              className="btn btn-success btn-block"
              onClick={this.handleCreateTranslationButton}
              style={{ marginTop: '5px' }}
            >
              Create translation
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default TranslationsPage;