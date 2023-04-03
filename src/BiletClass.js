import { AppFetch } from "./AppFetch"

export class BiletClass {
    static async checkBilet(qr) {
        let bilet = false
        const data = new FormData
        data.append('qr', qr)
        const response = await AppFetch.postWithToken({url: "/userchecker/check_bilet/", body: data})
        if(response.status == 200) {
            bilet = response
        }

        return Promise.resolve(bilet)
    }

    static getUserName(user) {
        if(user.username)
            return user.username

        if(user.legal_name)
            return user.legal_name
        
        if(user.email)
            return user.email

        return 'Неизвестный'
    }
}