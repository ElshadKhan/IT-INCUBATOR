import "reflect-metadata"
import {UserRepository} from "./repositories/userRepository";
import {UserServices} from "./services/userServices";
import {UserControllers} from "./controllers/userControllers";
import { Container } from "inversify";

const userRepository = new UserRepository()
const userService = new UserServices(userRepository)
const userControllers = new UserControllers(userService)

export const container = new Container();
container.bind(UserControllers).to(UserControllers);
container.bind(UserServices).to(UserServices);
container.bind(UserRepository).to(UserRepository);