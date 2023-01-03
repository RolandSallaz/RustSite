import React from "react";
import {Link} from "react-router-dom";

type Props = {
    text: string
};
export const FailPage = ({text}: Props) => {
    return (
        <main className="failpage">
            <p className='failpage__text'>{text}</p>
            <Link className='failpage__link' to='/'>&larr; Вернуться на главную</Link>
        </main>
    );
};