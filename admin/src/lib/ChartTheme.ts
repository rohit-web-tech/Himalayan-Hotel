import { useTheme } from "../contexts/Theme.context"

export const getChartThemeColor = () => {
    const {theme} = useTheme();
    return theme === 'light' ? '#333' : '#fff';
}