import React from 'react';
import {RxArrowRight} from "react-icons/rx";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {SubmitHandler, useForm} from "react-hook-form";
import {IServerCommand} from "../interfaces";
import {sendRconCommand} from "../services/actions/api";

function RconManager() {
    const {servers} = useAppSelector(state => state.server)
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IServerCommand & { commandType: String }>();
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<IServerCommand> = data => {
        dispatch(sendRconCommand(data))
    };

    return (
        <div className='rcon'>
            <h3 className='rcon__status'></h3>
            <samp>Вывод консоли</samp>
            <form className='rcon__form' onSubmit={handleSubmit(onSubmit)}>

                <select {...register('serverId')}>
                    {servers.map((server) => (
                        <option key={server._id} value={server._id}>{server.info.Hostname}</option>))}
                </select>
                <select {
                            ...register('commandType')
                        } > //todo
                    <option>Команда</option>
                    <option>Перезагрузить плагин</option>
                </select>
                <input className='rcon__input' placeholder='rcon command'
                       {...register('command', {
                           required: 'Обязательное поле',
                       })}
                />
                <button className='rcon__submit-button' type='submit'><RxArrowRight/></button>
                <cite><a href='https://xgamingserver.com/blog/rust-rcon-server-console-commands/' target='_blank'>Список
                    rcon комманд</a></cite>
            </form>
        </div>
    );
}

export default RconManager;