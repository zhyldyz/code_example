import React from "react";
import Language from "./Language";
import PropTypes from 'prop-types';

class LanguagesList extends React.Component {
  static propTypes = {
    languages: PropTypes.array.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func.isRequired
  };

  render() {
    const { languages, currentLanguage } = this.props;

    return (
      <div className="list-group">
        {languages.map((language) => (
          <Language
            native={language.native}
            name={language.name}
            code={language.code}
            active={currentLanguage === language.code}
            onClick={this.props.onLanguageChange}
            key={`language-${language.code}`}
          />
        ))}
      </div>
    )
  }
}

export default LanguagesList;