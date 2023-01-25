import axios from 'axios'

export class ApiService {
    static async get(api: string): Promise<any> {
        try {
            const response = await axios.get(api, { headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'application/json', withCredentials: true}})
            return response.data
        } catch (err: any) {
            return null
        }
    }
}

export class PoeApiService {
    private static readonly API_URL = 'https://www.pathofexile.com/character-window/get-characters?accountName='

    static async characters(account: string): Promise<any[]> {
        const characters = await ApiService.get(this.API_URL + account)

        if (!characters || !Array.isArray(characters)) {
            return []
        }

        return characters
    }
}