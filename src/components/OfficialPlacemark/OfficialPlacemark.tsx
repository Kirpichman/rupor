import * as React from 'react';
import {Placemark} from 'react-yandex-maps';

export interface OfficialPlacemarkProps {

}

interface PublicData {
    country: string;
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    totalTests: number;
    testsPerOneMillion: number;
}

const OFFICIAL_DATA_COLORS = {
    recovered: '#28a745',
    deaths: '#dc3545',
    active: '#ffc107',
};

const PUBLIC_API = 'https://coronavirus-19-api.herokuapp.com/countries/belarus';
const fetchData = async (): Promise<PublicData> => {
    let response = await fetch(PUBLIC_API);

    return response.json();
}

export const OfficialPlacemark: React.FC<OfficialPlacemarkProps> =
    function OfficialPlacemark({}: OfficialPlacemarkProps) {
        let [data, setData] = React.useState<PublicData>();

        React.useEffect(() => {
            fetchData().then((fetchedData) => {
                setData(fetchedData);
            });
        }, []);

        if (!data) return null;

        return (
            <Placemark
                geometry={[53.931574, 27.623856]}
                properties={{
                    data: [
                        {weight: data.recovered, color: OFFICIAL_DATA_COLORS.recovered},
                        {weight: data.deaths, color: OFFICIAL_DATA_COLORS.deaths},
                        {weight: data.active, color: OFFICIAL_DATA_COLORS.active},
                    ],
                    balloonContent: `Всего случаев: ${data.cases} (+${data.todayCases})<br>Активных: ${data.active}<br>Смертей: ${data.deaths} (+${data.todayDeaths})<br>Выздоровевших: ${data.recovered}<br>Сделано тестов: ${data.totalTests} (+${data.totalTests})`,
                }}
                options={{
                    hideIconOnBalloonOpen: false,
                    iconLayout: 'default#pieChart',
                    // Радиус диаграммы в пикселях.
                    iconPieChartRadius: 34,
                    // Радиус центральной части макета.
                    iconPieChartCoreRadius: 24,
                    // Стиль заливки центральной части.
                    iconPieChartCoreFillStyle: '#ffffff',
                    // Cтиль линий-разделителей секторов и внешней обводки диаграммы.
                    iconPieChartStrokeStyle: '#ffffff',
                    // Ширина линий-разделителей секторов и внешней обводки диаграммы.
                    iconPieChartStrokeWidth: 3,
                    // Максимальная ширина подписи метки.
                    iconPieChartCaptionMaxWidth: 200
                }}
            />
        );
    };
