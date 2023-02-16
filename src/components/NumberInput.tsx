import React, {ChangeEvent, useState} from 'react';
import {AiOutlineArrowUp, AiOutlineArrowDown} from "react-icons/ai";
import {set, useController, UseControllerProps} from "react-hook-form";

interface IFormValue {
    count: number,
}

interface NumberInputProps {
    className: string

}

export default function NumberInput({className, ...props}: UseControllerProps<IFormValue> & NumberInputProps) {
    const {field, fieldState} = useController(props)
    const [value, setValue] = useState<number>(1)

    function plusValue() {
        updateValue(value + 1)
    }

    function minusValue() {
        if (value > 1) {
            updateValue(value - 1)
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = Number(e.target.value)
        if (!Number.isNaN(value)) {
            value > 1
                ? updateValue(value)
                : updateValue(1)
        }
    }

    function updateValue(value: number) {
        field.onChange(value)
        setValue(value)
    }

    return (
        <div className={`input_type_number ${className}`}>
            <AiOutlineArrowUp onClick={plusValue} className='input__button'/>
            <input {...field} className='input__element' onChange={handleChange}/>
            <AiOutlineArrowDown onClick={minusValue} className='input__button'/>
        </div>
    );
};
