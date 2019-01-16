import { BASE_URL } from "../config";

export const CREATE_TRANSLATION = '@TRANSLATIONS_PAGE/CREATE_TRANSLATION';
export const CHANGE_LANGUAGE = '@TRANSLATIONS_PAGE/CHANGE_LANGUAGE';
export const CANCEL_EDIT = '@TRANSLATIONS_PAGE/CANCEL_EDIT';
export const EDIT_TRANSLATION = '@TRANSLATIONS_PAGE/EDIT_TRANSLATION';

export const CHANGE_NAME = '@TRANSLATIONS_PAGE/CHANGE_NAME';
export const CHANGE_SNIPPET = '@TRANSLATIONS_PAGE/CHANGE_SNIPPET';

export const FETCH_TRANSLATIONS = '@TRANSLATIONS_PAGE/FETCH_TRANSLATIONS';
export const FETCH_TRANSLATIONS_SUCCESS = '@TRANSLATIONS_PAGE/FETCH_TRANSLATIONS_SUCCESS';
export const FETCH_TRANSLATIONS_FAILURE = '@TRANSLATIONS_PAGE/FETCH_TRANSLATIONS_FAILURE';

export const SAVE_TRANSLATION = '@TRANSLATIONS_PAGE/SAVE_TRANSLATION';
export const SAVE_TRANSLATION_SUCCESS = '@TRANSLATIONS_PAGE/SAVE_TRANSLATION_SUCCESS';
export const SAVE_TRANSLATION_FAILURE = '@TRANSLATIONS_PAGE/SAVE_TRANSLATION_FAILURE';

export const SAVE_NEW_TRANSLATION = '@TRANSLATIONS_PAGE/SAVE_NEW_TRANSLATION';
export const SAVE_NEW_TRANSLATION_SUCCESS = '@TRANSLATIONS_PAGE/SAVE_NEW_TRANSLATION_SUCCESS';
export const SAVE_NEW_TRANSLATION_FAILURE = '@TRANSLATIONS_PAGE/SAVE_NEW_TRANSLATION_FAILURE';

export const FETCH_LANGUAGES = '@TRANSLATIONS_PAGE/FETCH_LANGUAGES';
export const FETCH_LANGUAGES_SUCCESS = '@TRANSLATIONS_PAGE/FETCH_LANGUAGES_SUCCESS';
export const FETCH_LANGUAGES_FAILURE = '@TRANSLATIONS_PAGE/FETCH_LANGUAGES_FAILURE';

export const FETCH_TRANSLATION = '@TRANSLATIONS_PAGE/FETCH_TRANSLATION';
export const FETCH_TRANSLATION_SUCCESS = '@TRANSLATIONS_PAGE/FETCH_TRANSLATION_SUCCESS';
export const FETCH_TRANSLATION_FAILURE = '@TRANSLATIONS_PAGE/FETCH_TRANSLATION_FAILURE';


export function editTranslation(translation) {
  return { type: EDIT_TRANSLATION, translation };
}

export function changeName(name) {
  return { type: CHANGE_NAME, name };
}

export function changeSnippet(snippet) {
  return { type: CHANGE_SNIPPET, snippet };
}

export function createTranslation() {
  return { type: CREATE_TRANSLATION };
}

export function cancelEdit() {
  return { type: CANCEL_EDIT };
}

export function fetchLanguages() {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_LANGUAGES });

    const response = await fetch(`${BASE_URL}/languages`);
    const languages = await response.json();
    dispatch({ type: FETCH_LANGUAGES_SUCCESS, languages });
  }
}

export function changeLanguage(languageCode) {
  return (dispatch) => {
    dispatch({ type: CHANGE_LANGUAGE, languageCode });
    dispatch(fetchTranslations());
  }
}

export function fetchTranslations() {
  return async (dispatch, getState) => {
    const { currentLanguage } = getState().translationsPage;

    dispatch({ type: FETCH_TRANSLATIONS });

    const response = await fetch(`${BASE_URL}/translations`, {
      method: 'GET',
      headers: {
        'Accept-Language': currentLanguage,
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include'
    });
    const translations = await response.json();
    dispatch({ type: FETCH_TRANSLATIONS_SUCCESS, translations });
  }
}

export function saveTranslation() {
  return async (dispatch, getState) => {
    const { currentLanguage, editableTranslation: { id, snippet } } = getState().translationsPage;

    dispatch({ type: SAVE_TRANSLATION });

    const response = await fetch(`${BASE_URL}/translation/${id}`, {
      method: 'PUT',
      headers: {
        'Accept-Language': currentLanguage,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ snippet }),
      mode: 'cors',
      credentials: 'include'
    });
    const translation = await response.json();
    dispatch({ type: SAVE_TRANSLATION_SUCCESS, translation });
  }
}

export function saveNewTranslation() {
  return async (dispatch, getState) => {
    const { currentLanguage, editableTranslation: { name, snippet } } = getState().translationsPage;

    dispatch({ type: SAVE_NEW_TRANSLATION });

    const response = await fetch(`${BASE_URL}/translation`, {
      method: 'POST',
      headers: {
        'Accept-Language': currentLanguage,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, snippet }),
      mode: 'cors',
      credentials: 'include'
    });
    const translation = await response.json();
    dispatch({ type: SAVE_NEW_TRANSLATION_SUCCESS, translation });
  }
}

export function fetchTranslation(translationId) {
  return async (dispatch, getState) => {
    const { currentLanguage } = getState().translationsPage;
    dispatch({ type: FETCH_TRANSLATION });

    const response = await fetch(`${BASE_URL}/translation/${translationId}`, {
      method: 'GET',
      headers: {
        'Accept-Language': currentLanguage,
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include'
    });

    const translation = await response.json();
    dispatch({ type: FETCH_TRANSLATION_SUCCESS, translation });
  }
}