import {ChangeEvent, useCallback, useState} from 'react';

interface props {

}

function UseFormValidator(props: props) {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {target, target: {name, value}} = event;
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: target.validationMessage});
        const formElement = target.closest('form')
        if (formElement) {
            setIsValid(formElement.checkValidity());
        }
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return {values, handleChange, errors, isValid, resetForm};
}

export default UseFormValidator;