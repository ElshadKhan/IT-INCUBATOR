import {userRepository} from "../repositories/userRepository";
import {_generateHash} from "../helpers/helpFunctions";

export const authService = {

    async checkCredentials(login: string, password: string) {
        const user = await userRepository.findUserByLogin(login)
        if(!user) return false
        const passwordHash = await _generateHash(password, user.passwordSalt)
        if(user.passwordHash !== passwordHash) {return false}
        return user
    }
}