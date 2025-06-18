import L from 'leaflet'

export function useMap() {
    let map = null

    function initMap(mapId) {
        map = L.map(mapId)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map)

        map.zoomControl.setPosition('bottomright')

        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude
                const lon = position.coords.longitude

                const hereIcon = L.icon({
                    iconUrl: new URL('../assets/markers/here.png', import.meta.url).href,
                    iconSize: [42, 62],
                    iconAnchor: [19, 38],
                    popupAnchor: [0, -38]
                })

                L.marker([lat, lon], { icon: hereIcon })
                    .addTo(map)
                    .bindPopup('Jesteś tutaj')
                    .openPopup()

                map.setView([lat, lon], 15)
            },
            () => {
                map.setView([52.2297, 21.0122], 13) // fallback: Warszawa
            }
        )
    }

    return { initMap }
}
