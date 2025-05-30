import { Settings } from 'lucide-react'
import { useGlobalContext } from '../contexts/GlobalContext';

const SettingsButton = () => {

    const {themeColor, setShowSettingsBar} = useGlobalContext();

    return (
        <button
            className="rounded-full p-2 text-white fixed bottom-3 right-3 z-[40]"
            style={{
                background: themeColor
            }}
            title="Settings"
            onClick={()=>setShowSettingsBar(true)}
        >
            <Settings
                className="h-7 w-7"
            />
        </button>
    )
}

export default SettingsButton;
