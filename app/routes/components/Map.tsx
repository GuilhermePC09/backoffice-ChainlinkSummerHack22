import React, { useContext } from 'react';
import {GoogleMap, Marker, Polyline, useJsApiLoader} from '@react-google-maps/api';
import { MyContext} from '~/routes/context/context_provider';

const containerStyle = {
    width: '100vw',
    height: '100vh',
};

export type Path={
    lat: number;
    lng: number;
}

export default function TrackMap() {
    const path = useContext(MyContext);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDM9y8YCKfW_v0j0iBvPHe9bOyZFtkB1DU',
    });
    const options = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        zIndex: 1,
    };

    let center: Path

    if (path) {
        const centerIndex = path.length - 1;
        center = path[centerIndex];
    }
    else{
        center = { lat: 0, lng: 0}
    }

    const [map, setMap] = React.useState(null);

    // @ts-ignore
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, []);

    if (!isLoaded) {
        return null;
    }

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} onLoad={onLoad} onUnmount={onUnmount}>
            {path && <Marker position={center} />}
            {path && <Polyline path={path} options={options} />}
        </GoogleMap>
    );
}
