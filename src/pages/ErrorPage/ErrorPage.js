import React, { useContext } from 'react';
import { ErrorsContext } from '../../context/ErrorsContext';
import { Alert, AlertTitle } from '@material-ui/lab';

function ErrorPage() {

    const [errors, setErrors] = useContext(ErrorsContext);

    return (
        <div>
            {errors.errors ? errors.errors.map(element => (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {element}
                </Alert>
            )) : ''}
        </div >
    );
}

export default ErrorPage;