import sessionModule from '../components/session/session.module.js';
import userModule from '../components/user/user.module.js';

export default (app) => {
  app.use('/users', userModule.router);
  app.use('/session', sessionModule.router);
};
