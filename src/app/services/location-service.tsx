import { LocationResponse } from "@/types/location-response";


export const locationService = {
    async getLocations(query: string): Promise<LocationResponse> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/location/${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch forecast');
        }
        return response.json();
    }
};