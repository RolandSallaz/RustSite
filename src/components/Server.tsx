import React from 'react';
import {IServer} from "../interfaces";

interface props {
    serverData: IServer
}

function Server({serverData: {info, enabled,ip,port}}: props) {
    return (
        <div className='server'>
            <h3 className='server__heading'>{info?.Hostname || `Сервер ${ip}:${port} недоступен`}</h3>
            <div className='server__container'>
                {enabled && (
                    <>
                        <p>{`Онлайн ${info?.Players}`}</p>
                        <p>{`Карта ${info?.Map}`}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Server;