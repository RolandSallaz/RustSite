import React, {useEffect, useState} from 'react';
import {RxArrowRight} from "react-icons/rx";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import {IServer, IServerCommand} from "../interfaces";
import {sendRconCommand} from "../services/actions/api";
import Select, {StylesConfig} from 'react-select'

interface ISelect {
    value: String,
    label: String
}

interface ISelectValues {
    [key: string]: ISelect
}

enum CommandTypeValues {
    rconCommand = 'rconCommand',
    reloadPlugin = 'reloadPlugin'
}

enum SelectTypes {
    server = 'server',
    command = 'command',
    plugin = 'plugin',
}

function RconManager() {
    const {servers} = useAppSelector(state => state.server)
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IServerCommand & { commandType: String }>();
    const dispatch = useAppDispatch();

    const [enabledServers, setEnabledServers] = useState<IServer[]>([])
    const [selectValues, setSelectValues] = useState<ISelectValues>({server: {value: '', label: ''}});

    const selectStyles: StylesConfig = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            color: 'black',
            borderColor: state.isFocused ? 'grey' : 'red',
        }),
        option: (base) => ({
            ...base,
            color: "black"
        })
    }

    const onSubmit: SubmitHandler<IServerCommand> = data => {
        dispatch(sendRconCommand(data))
    };

    const commandOptions: ISelect[] = [
        {value: CommandTypeValues.rconCommand, label: 'Rcon команда'},
        {value: CommandTypeValues.reloadPlugin, label: 'Перезагрузить плагин'}
    ]

    useEffect(() => {
        setSelectValues(prev => ({...prev, [SelectTypes.command]: commandOptions[0]}))
    }, [])

    useEffect(() => {
        if (servers) {
            setEnabledServers(servers.filter(item => Boolean(item.enabled && item.info)))
        }
    }, [servers])

    useEffect(() => {
        if (!enabledServers.length) return
        const {_id, info} = enabledServers[0]
        setSelectValues(prev => ({...prev, [SelectTypes.server]: {value: _id, label: info?.Hostname || ''}}))
    }, [enabledServers])

    const serversOptions = servers.filter(server => server.enabled).map(server => ({
        value: server._id,
        label: server.info?.Hostname
    }))

    function handleSelectChange(newValue: ISelect, type: SelectTypes) {
        const {value, label} = newValue;
        setSelectValues({...selectValues, [type]: {value, label}})
    }

    return (
        <div className='rcon'>
            <h3 className='rcon__status'></h3>
            <samp>Вывод консоли</samp>
            <form className='rcon__form' onSubmit={handleSubmit(onSubmit)}>
                <>
                    <Select options={serversOptions}
                            onChange={(val) => handleSelectChange(val as ISelect, SelectTypes.server)}
                            styles={selectStyles}
                            value={selectValues[SelectTypes.server]}/>

                    <Select options={commandOptions} value={selectValues[SelectTypes.command]}
                            onChange={(val) => handleSelectChange(val as ISelect, SelectTypes.command)}
                            styles={selectStyles}/>
                    {
                        selectValues[SelectTypes.command]?.value == CommandTypeValues.rconCommand
                            ? (<input className='rcon__input' placeholder='rcon command'
                                      {...register('command', {
                                          required: 'Обязательное поле',
                                      })}
                            />)
                            : (<Select onChange={console.log}/>)

                    }
                    <button className='rcon__submit-button' type='submit'><RxArrowRight/></button>
                    <cite><a href='https://xgamingserver.com/blog/rust-rcon-server-console-commands/' target='_blank'>Список
                        rcon комманд</a></cite>
                </>
            </form>
        </div>
    );
}

export default RconManager;