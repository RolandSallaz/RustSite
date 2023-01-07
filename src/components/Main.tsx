import React from 'react';
import { useAppSelector } from '../hooks/redux';

const Main = () => {
    const {servers} = useAppSelector(state=>state.server)
    return (
        <main className="main">
            {}

        </main>
    );
};

export default Main;