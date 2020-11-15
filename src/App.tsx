import React from 'react';
import {Clusterer, YMaps, Map, YMapsApi, Placemark, PlacemarkGeometry, ZoomControl} from 'react-yandex-maps';
import './App.css';
import {MapSwitcher} from 'components/MapSwitcher/MapSwitcher';
import {OfficialPlacemark} from 'components/OfficialPlacemark/OfficialPlacemark';

// COLORS
const COLORS = ['#f8da84', '#f3b45f', '#ee924f', '#e95b3b', '#d1352b', '#a2202c']

const points: PlacemarkGeometry[] = [
    [53.931574, 27.623856],
    [53.731574, 27.523856],
    [53.801574, 27.723856],
    [53.831574, 27.793856],
];

const REGIONS = [
    {
        color: "#ff001a",
        opacity: 0.1,
    },
    {
        color: "#ff001a",
        opacity: 0.2,
    },
    {
        color: "#ff001a",
        opacity: 0.3,
    },
    {
        color: "#ff001a",
        opacity: 0.4,
    },
    {
        color: "#ff001a",
        opacity: 0.5,
    },
    {
        color: "#ff001a",
        opacity: 0.6,
    },
    {
        color: "#ff001a",
        opacity: 0.7,
    },
];

function App() {
    const mapRef = React.createRef<any>();

    let onMapLoad = React.useCallback((ymaps: YMapsApi) => {
        if (mapRef && mapRef.current) {
            var objectManager = new ymaps.ObjectManager();
            ymaps.borders
                .load("BY", {
                    lang: "ru",
                    quality: 2
                })
                .then(function(result: any) {
                    result.features = result.features.map(function(feature: any, index: number) {
                        // Добавим ISO код региона в качестве feature.id для objectManager.
                        return {
                            ...feature,
                            id: feature.properties.iso3166,
                            properties: {
                                ...feature.properties,
                                balloonContent: 'test',
                            },
                            options: {
                                fillColor: REGIONS[index].color,
                                fillOpacity: REGIONS[index].opacity,
                                strokeColor: "#000",
                                strokeOpacity: 0.3
                            },
                        };
                    });

                    objectManager.add(result);
                    mapRef.current.geoObjects.add(objectManager);
                });
        }
    }, [mapRef.current]);

  return (
      <YMaps
          key="5361a2f0-a070-4194-bd64-9db3c31f80af"
      >
        <Map
            instanceRef={mapRef as any}

            className="map"
            width="100%"
            height="100%"
            defaultState={{
                center: [53.74, 27.63],
                zoom: 7,
            }}

            onLoad={onMapLoad}
            modules={["borders", "ObjectManager", 'GeoObject', 'map.addon.hint', 'map.addon.balloon', 'geoObject.addon.balloon', 'geoObject.addon.hint', 'objectManager.addon.objectsBalloon', 'objectManager.addon.objectsHint', 'layout.PieChart']}
        >
            <MapSwitcher />

            <OfficialPlacemark />

            {false && (
            <Clusterer
                options={{
                    //preset: 'islands#redClusterIcons',
                    groupByCoordinates: false,
                }}
            >
                {points.map((coordinates, index) => (
                    <Placemark
                        modules={["geoObject.addon.balloon"]}
                        key={index}
                        geometry={coordinates}
                        properties={{
                            data: [
                                {weight: 720, color: '#FFA002'},
                                {weight: 420, color: '#880011'},
                                {weight: 230, color: '#035201'},
                                {weight: 120, color: '#002f55'},
                            ],
                            balloonContent: 'Текст',
                        }}
                        options={{
                            hideIconOnBalloonOpen: false,
                            iconLayout: 'default#pieChart',
                            //preset: 'islands#redGardenCircleIcon', // islands#COLOR + NAME + CircleIcon
                        }}
                    />
                ))}
            </Clusterer>
            )}

            <ZoomControl options={{ float: 'right' }} />
        </Map>
      </YMaps>
  );
}

export default App;
