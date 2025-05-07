import { $GOOGLE_API_KEY } from "../../lib/env";
import { LatLng } from "./types/LatLng.type";
import Axios from "axios";

export default async function reverseGeocoding (location: LatLng) {
    return await Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${$GOOGLE_API_KEY}`);
}