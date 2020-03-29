import React from 'react';
import { useStore } from 'react-context-hook';

function ErrorPage() {

    const [errors, setErrors, deleteErrors] = useStore('errors');

    console.log(errors);

    return (
        <div>
            {errors}
        </div>
    );
}

export default ErrorPage;