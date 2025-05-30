import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useGlobalContext } from '../contexts/GlobalContext';
import { getChartThemeColor } from '../lib/ChartTheme';

const data = [
    { name: 2020, value: 0 },
    { name: 2021, value: 20000 },
    { name: 2022, value: 40000 },
    { name: 2023, value: 50000 },
    { name: 2024, value: 93438 },
];

const LineChartComponent = () => {
    const {themeColor} = useGlobalContext();
    return (
        <div style={{ width: "100%", height: "200px" }} className='text-xs text-secondary-text'>
            <ResponsiveContainer>
                <LineChart data={data} >
                    <Line type="monotone" dataKey="value" stroke={themeColor} />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" stroke={getChartThemeColor()} />
                    <YAxis  stroke={getChartThemeColor()}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LineChartComponent;
