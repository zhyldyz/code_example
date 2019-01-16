import merge from 'xtend';
import createReducer from './create-reducer';
import {
  CANCEL_EDIT,
  CHANGE_LANGUAGE,
  CHANGE_NAME,
  CHANGE_SNIPPET,
  CREATE_TRANSLATION,
  EDIT_TRANSLATION,
  FETCH_LANGUAGES_SUCCESS,
  FETCH_TRANSLATION_SUCCESS,
  FETCH_TRANSLATIONS,
  FETCH_TRANSLATIONS_SUCCESS,
  SAVE_NEW_TRANSLATION_SUCCESS,
  SAVE_TRANSLATION_SUCCESS
} from "../actions/translations-page";

const INITIAL_STATE = {
  languages: [],
  translations: [],
  currentLanguage: 'en',
  isLoading: false,
  isProcessing: false,
  editableTranslation: {}
};

function fillNewTranslation(oldTranslations, translationToFill) {
  let changed = false;

  let newTranslations = oldTranslations.map((translation) => {
    if (translation.id === translationToFill.id) {
      changed = true;
      return translationToFill
    }
    return translation
  });

  if(!changed) {
    newTranslations.concat(translationToFill);
  }
  return newTranslations;
}

export default createReducer({
  [FETCH_TRANSLATIONS]: (state) => merge(state, {
    isLoading: true
  }),
  [FETCH_TRANSLATIONS_SUCCESS]: (state, action) => merge(state, {
    isLoading: false,
    translations: action.translations
  }),
  [EDIT_TRANSLATION]: (state, action) => merge(state, {
    editableTranslation: action.translation
  }),
  [CHANGE_NAME]: (state, action) => merge(state, {
    editableTranslation: {
      ...state.editableTranslation,
      name: action.name
    }
  }),
  [CHANGE_SNIPPET]: (state, action) => merge(state, {
    editableTranslation: {
      ...state.editableTranslation,
      snippet: action.snippet
    }
  }),
  [CREATE_TRANSLATION]: (state, action) => merge(state, {
    editableTranslation: {
      name: '',
      snippet: '',
      isNew: true
    },
  }),
  [SAVE_NEW_TRANSLATION_SUCCESS]: (state, action) => merge(state, {
    isProcessing: false,
    editableTranslation: {},
    translations: state.translations.concat(action.translation)
  }),
  [SAVE_TRANSLATION_SUCCESS]: (state, action) => merge(state, {
    isProcessing: false,
    editableTranslation: {},
    translations: fillNewTranslation(state.translations, action.translation)
  }),
  [FETCH_LANGUAGES_SUCCESS]: (state, action) => merge(state, {
    languages: action.languages
  }),
  [CHANGE_LANGUAGE]: (state, action) => merge(state, {
    currentLanguage: action.languageCode
  }),
  [FETCH_TRANSLATION_SUCCESS]: (state, action) => merge(state, {
      translations: fillNewTranslation(state.translations, action.translation)
  }),
  [CANCEL_EDIT]: (state, action) => merge(state, {
    editableTranslation: {}
  })
}, INITIAL_STATE)