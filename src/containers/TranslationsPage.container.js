import * as TranslationsPageActions from '../actions/translations-page';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TranslationsPage from "../components/TranslationsPage";


function mapStateToProps(state) {
  return state.translationsPage;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TranslationsPageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslationsPage);
