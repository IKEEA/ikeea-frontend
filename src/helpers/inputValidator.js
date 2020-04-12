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

export const validatePassword = (value, feedback) => {
    if (value) {
        if(value.length < 8) {
            return constants.TOO_SHORT_PASSWORD_TEXT;
        } else {
            return false;
        }
    } else {
        return constants.REQUIRED_FIELD;
    }
}

export const validateName = (value) => {
    if (!value) {
        return constants.REQUIRED_FIELD;
    } else {
        return null;
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


