import {UserRepository} from "./repositories/userRepository";
import {UserServices} from "./services/userServices";
import {UserControllers} from "./controllers/userControllers";




const userRepository = new UserRepository()
const userService = new UserServices(userRepository)
export const userControllers = new UserControllers(userService)