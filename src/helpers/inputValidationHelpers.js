import * as constants from '../constants/InputValidation.constants.js';

export const validateName = (value) => {
    console.log(value);
    if (!value) {
        return constants.REQUIRED_FIELD;
    } else {
        return null;
    }
}

export const validatePassword = (value) => {
    console.log(value);
    if (!value) {
        return constants.REQUIRED_FIELD;
    } else {
        return null;
    }
}

export const validateField = (input, setter, validatingFunction) => {
    const errorText = validatingFunction(input.value);
    if (errorText) {
        setter({ value: input.value, error: true, helperText: errorText });
        return true;
    } else {
        setter({ value: input.value, error: false, helperText: null });
        return false;
    }
}