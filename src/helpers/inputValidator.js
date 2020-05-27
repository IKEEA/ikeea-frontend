import * as constants from '../constants/InputValidation.constants.js';

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

export const validateEmail = (value) => {
    if (value) {
        if (constants.EMAIL_REGEX.test(value)) {
            return false;
        } else {
            return constants.INVALID_EMAIL;
        }
    } else {
        return constants.REQUIRED_FIELD;
    }
}

export const validatePassword = (value) => {
    if (value) {
        if (value.length < 6) {
            return constants.TOO_SHORT_PASSWORD_TEXT;
        } else if (value.length > 20) {
            return constants.TOO_LONG_PASSWORD_TEXT;
        } else {
            return false;
        }
    } else {
        return constants.REQUIRED_FIELD;
    }
}

export const validateRequiredField = (value) => {
    if (!value) {
        return constants.REQUIRED_FIELD;
    } else {
        return null;
    }
}

export const validateFieldLength = (value) => {
    if (value) {
        if (value.length < 3 || value.length > 15) {
            return constants.INVALID_INPUT_LENGTH;
        } else {
            return false;
        }
    } else {
        return constants.REQUIRED_FIELD;
    }
}

export const ensurePasswordMatching = (passwordInput, repeatPasswordInput, setPassword, setRepeatPassword) => {
    if (passwordInput.value !== repeatPasswordInput.value) {
        setPassword({ input: passwordInput.value, error: true, helperText: constants.PASSWORDS_DO_NOT_MATCH_TEXT });
        setRepeatPassword({ input: repeatPasswordInput.value, error: true, helperText: constants.PASSWORDS_DO_NOT_MATCH_TEXT });
        return true;
    } else {
        return false;
    }
}



