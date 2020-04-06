import * as constants from '../constants/InputValidation.constants.js';

export const validateName = (value) => {
    if (!value) {
        return constants.REQUIRED_FIELD;
    } else {
        return null;
    }
}

export const validateEmail = (value) => {
    if (!value) {
        return constants.REQUIRED_FIELD;
    } else {
        return null;
    }
}

export const validatePassword = (value) => {
    if (!value) {
        return constants.REQUIRED_FIELD;
    } else {
        return null;
    }
}

export const validateField = (input, setter, validatingFunction) => {
    const errorText = validatingFunction(input.value);
    if (errorText) {
        setter({ input: input, error: true, helperText: errorText });
        return true;
    } else {
        setter({ input: input, error: false, helperText: null });
        return false;
    }
}