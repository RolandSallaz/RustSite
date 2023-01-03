import {FC, useState} from 'react'

interface ITestProps {
    title?: string
}

export const Admin: FC<ITestProps> = ({title}) => {
    const [isMonitoringEnabled, setIsMonitoringEnabled] = useState<boolean>(false)

    return (
        <main className="main">
            <h2>Admin panel</h2>
            <div className="settings">
                <div className='settings__container'>
                    <p>Подключенных серверов: 0</p>
                    <button>Добавить сервер</button>
                </div>
            </div>
        </main>
    )
}
