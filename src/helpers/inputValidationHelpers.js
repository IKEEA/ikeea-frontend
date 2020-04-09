import * as constants from '../constants/InputValidation.constants.js';

export const validateName = (value) => {
    if (!value) {
        return constants.REQUIRED_FIELD;
    } else {
        return null;
    }
}

export const validateEmail = (value) => {
    // the more specific feedback functions should wrap the less specific feedback functions
    return validateEmailPattern(value, validateRequiredField(value, null));
}

export const validatePassword = (value) => {
    // the more specific feedback functions should wrap the less specific feedback functions
    return validatePasswordLength(value, validateRequiredField(value, null));
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

export const ensurePasswordMatching = (passwordInput, repeatPasswordInput, setPassword, setRepeatPassword) => {
    if (passwordInput.value !== repeatPasswordInput.value) {
        setPassword({ input: passwordInput, error: true, helperText: constants.PASSWORDS_DO_NOT_MATCH_TEXT });
        setRepeatPassword({ input: repeatPasswordInput, error: true, helperText: constants.PASSWORDS_DO_NOT_MATCH_TEXT });
        return true;
    } else {
        return false;
    }
}

const validateRequiredField = (value, feedback) => {
    if (!value) {
        return constants.REQUIRED_FIELD;
    } else {
        return feedback;
    }
}

const validatePasswordLength = (value, feedback) => {
    if (value.length && value.length < 8) {
        return constants.TOO_SHORT_PASSWORD_TEXT;
    } else {
        return feedback;
    }
}

const validateEmailPattern = (value, feedback) => {
    if (value) {
        if (constants.EMAIL_REGEX.test(value)) {
            return feedback;
        } else {
            return constants.INVALID_EMAIL;
        }
    } else {
        return feedback;
    }
}