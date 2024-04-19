import Session from './session.entities.js';
import e from "express";

class SessionController {
  constructor(sessionService, userRepository, repository) {
    this.sessionService = sessionService;
    this.userRepository = userRepository;
    this.repository = repository;
  }

  createSession = async (req, res) => {
    this.sessionService.addSession(new Session(req.body.start, req.body.end, req.body.pause, req.body.userId, req.body.id))
        .then(createdSession => res.status(201).send(createdSession.toJSON()))
        .catch(err => res.status(403).send(err.message))
  };

  updateSession = async (req, res) => {
    this.sessionService.updateSession(new Session(req.body.start, req.body.end, req.body.pause, req.body.userId))
        .then(createdSession => res.status(200).send(createdSession.toJSON()))
        .catch(err => res.status(404).send(err.message))
  };

  getSessions = async (_, res) => {
    const sessions = await this.sessionService.getSessions();
    const sessionsJSON = sessions.map(session => session.toJSON());
    res.status(200).send(sessionsJSON);
  };

  getSessionById = async (req, res) => {
    const { id } = req.params;
    this.sessionService.getSessionById(id)
        .then(createdSession => res.status(200).send(createdSession))
        .catch(err => res.status(404).send(err.message))
  };

  // FIXME just a promise & no check on id path
  deleteSessionById = (req, res) => {
    const { id } = req.params;
    res.status(200).send(this.sessionService.deleteSessionById(id));
  };

  // just a promise
  deleteSessions = (_, res) => res.status(200).send(this.sessionService.deleteSessions());

  addEndDate = async (req, res) => {
    this.sessionService.updateSession(new Session(req.body.end, req.body.id))
        .then(createdSession => res.status(200).send(createdSession.toJSON()))
        .catch(err => res.status(404).send(err.message))
  };

  getToday = async (req, res) => {
    const { email } = req.body;

    const date = luxon.DateTime.now()
    const user = this.userRepository.getByEmail(email)

    const sessions = this.repository.getByUserId(user.id)
    let duration = 0

    for (let i = 0; i < sessions.length; i++) {
      const session = sessions[i]
      if (session.start.startOf("day") == date.startOf("day")) {
        if (session.end) {
          const diff = session.end.diff(session.start, ["hours"])
          duration = duration + diff
        } else {
          const diff = date.diff(session.start, ["hours"])
          duration = duration + diff
        }
      }
    }

    let dateEndPotentiel = null

    if (duration <= 15) {
      const rest = 15 - duration

      dateEndPotentiel = date.plus({ hours: rest })
    } else {
      throw new console.error("Temps dépassé");
    }
    

    return res.status(200).send({ estimation: dateEndPotentiel })
  }
}

export default SessionController;
