import SessionController from './session.controller.js';
import SessionService from './session.service.js';
import SessionRouter from './session.router.js';
import SessionRepository from "./session.repository.js";
import UserRepository from '../user/user.repository.js';

const sessionRepository = new SessionRepository();
const userRepository = new UserRepository();
const sessionService = new SessionService(sessionRepository, userRepository);
const sessionController = new SessionController(sessionService, userRepository);
const sessionRouter = new SessionRouter(sessionController);

export default {
  service: sessionService,
  controller: sessionController,
  router: sessionRouter.getRouter(),
  repository: sessionRepository,
  userRepository: userRepository
};
