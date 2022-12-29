import { FC, useState } from 'react'

interface ITestProps {
  title?: string
}

export const Admin: FC<ITestProps> = ({ title }) => {
  const [isMonitoringEnabled, setIsMonitoringEnabled] = useState<boolean>(false)

  return (
    <>
      <h2>Admin panel</h2>
      <div className="settings">
        <label>
          Включить мониторинг
          <input type="checkbox" />
        </label>
        <label>
          Ip сервера
          <input />
        </label>
        <label>
          Порт
          <input />
        </label>
      </div>
    </>
  )
}
