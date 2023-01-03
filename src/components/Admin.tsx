export default function Admin() {
    return (
        <main className="main">
            <h2>Admin panel</h2>
            <div className="settings">
                <div className='settings__container'>
                    <p>Подключенных серверов: 0</p>
                    <button className='settings__add-button'>Добавить сервер</button>
                    <button className='settings__add-button'>Редактировать товары</button>
                </div>
            </div>
        </main>
    )
}
