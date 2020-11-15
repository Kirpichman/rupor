import * as React from 'react';
import {ListBox, ListBoxItem} from 'react-yandex-maps';

export interface MapSwitcherProps {

}

export const MapSwitcher: React.FC<MapSwitcherProps> =
    function MapSwitcher({}: MapSwitcherProps) {
        const regionsTypeRef = React.createRef<any>();
        const citiesTypeRef = React.createRef<any>();
        let [mapType, setType] = React.useState('regions');

        return (
            <ListBox data={{ content: 'Тип' }}>
                <ListBoxItem
                    data={{ content: 'Регионы' }}
                    //state={{ selected: mapType === 'regions' }}
                    //instanceRef={regionsTypeRef as any}
                    onLoad={() => {
                        // regionsTypeRef.current.events.add('click', () => {
                        //     setType('regions');
                        //     //citiesTypeRef.current.deselect();
                        // });
                    }}
                />
                <ListBoxItem
                    data={{
                        content: 'Города',
                    }}
                    //state={{ selected: mapType === 'cities' }}
                    // instanceRef={citiesTypeRef as any}
                    // onLoad={() => {
                    //     citiesTypeRef.current.events.add('click', () => {
                    //         setType('cities');
                    //         //regionsTypeRef.current.deselect();
                    //     });
                    // }}
                />
            </ListBox>
        );
    };
