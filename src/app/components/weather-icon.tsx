import { Cloud, CloudDrizzle, CloudFog, CloudRain, CloudSun, Snowflake, Sun, Zap } from "lucide-react";

function Empty() {
    return <div/>;
}

export function WeatherIcon({code}: {code: string | null}) {

    let Icon: any; // eslint-disable-line @typescript-eslint/no-explicit-any

    if (code != null) {
        switch (code) {
            case 'sunny':
                Icon = <Sun color="gold" size={40}/>;
                break;
            case 'cloudy':
                Icon = <Cloud color="gray" size={40}/>;
                break;
            case 'overcast':
                Icon = <CloudSun color="gold" size={40}/>;
                break;
            case 'foggy':
                Icon = <CloudFog color="silver" size={40}/>;
                break;
            case 'drizzly':
                Icon = <CloudDrizzle color="#5F9EA0" size={40}/>;
                break;
            case 'snow':
                Icon = <Snowflake color="lightblue" size={40}/>;
                break;
            case 'rainy':
                Icon = <CloudRain color="#4682B4" size={40}/>;
                break;
            case 'thunderstorm':
                Icon = <Zap color="FFD700" size={40}/>;
                break;
            default:
                Icon = <Empty/>;
        }
    } else {
        Icon = <Empty/>;
    }
    
    return (
        <div title={code}>{Icon }</div>
    );
}
