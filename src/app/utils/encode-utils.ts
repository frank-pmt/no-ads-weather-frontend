import { GpsLocation } from "@/types/gps-location";

export function decodeLocation(str: string): GpsLocation {
    const buffer = Buffer.from(str, 'hex');
    const d = buffer.toString();
    const parts = d.split('|');
    return {
        latitude: Number(parts[0]),
        longitude: Number(parts[1]),
        name: parts[2]
    }
}

export function encodeLocation(location: GpsLocation): string {
    const str = location.latitude + "|" + location.longitude + "|" + location.name;
    const buffer = Buffer.from(str);
    const hex = buffer.toString('hex');
    return hex;
}