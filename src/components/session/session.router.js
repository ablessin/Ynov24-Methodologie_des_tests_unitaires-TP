import express from 'express';

class SessionRouter {
  constructor(sessionController) {
    this.sessionController = sessionController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.sessionController.getSessionById);
    router.route('/:id').delete(this.sessionController.deleteSessionById);
    router.route('/').get(this.sessionController.getSessions);
    router.route('/').post(this.sessionController.createSession);
    router.route('/').put(this.sessionController.updateSession);
    router.route('/').delete(this.sessionController.deleteSessions);
    router.route('/today').get(this.sessionController.getToday);
    router.route('/endDate').put(this.sessionController.addEndDate)
    return router;
  }
}

export default SessionRouter;
