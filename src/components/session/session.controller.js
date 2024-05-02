import Session from './session.entities.js';

class SessionController {
  constructor(sessionService, userRepository, repository) {
    this.sessionService = sessionService;
    this.userRepository = userRepository;
    this.repository = repository;
  }

  createSession = async (req, res) => {
    this.sessionService.addSession(new Session(req.body.start, req.body.end, req.body.pause, req.body.userId))
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
    console.log('24', sessions)
    // const sessionsJSON = sessions.map(session => session.toJSON());
    res.status(200).send(sessions);
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
    if (!user) res.status(404).send({ message: "non trouvé" })

    const sessions = this.repository.getByUserId(user.id)
    if (!sessions) res.status(404).send({ message: "non trouvé" })
    let duration = 0

    for (let i = 0; i < sessions.length; i++) {
      const session = sessions[i]
      if (session.start.startOf("day") == date.startOf("day")) {
        if (session.end) {
          const diff = session.end.diff(session.start, ["hours"])
          duration = duration + diff - session?.pause
        } else {
          const diff = date.diff(session.start, ["hours"])
          duration = duration + diff - session?.pause
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

  stats = async (req, res) => {
    const { email } = req.body;
    const user = this.userRepository.getByEmail(email)
    if (!user) res.status(404).send({ message: "non trouvé" })
    const sessions = this.repository.getByUserId(user.id)
    if (!sessions) res.status(404).send({ message: "non trouvé" })
    let duration = []

    for (let i = 0; i < sessions.length; i++) {
      const session = sessions[i]
    
      if (session.end) {
        const diff = session.end.diff(session.start, ["hours"])
        duration.push(diff)
      }
    }

    const sum = duration.reduce((partialSum, a) => partialSum + a, 0);
    const moyenne = sum / duration.length
    const max = Math.max(duration)
    const min = Math.min(duration)

    function numMedian(a) {
      a = a.slice(0).sort(function(x, y) {
        return x - y;
      });
      var l = a.length,
          b = (l + 1) / 2;
      return (l % 2) ? a[b - 1] : (a[b - 1.5] + a[b - 0.5]) / 2;
    }

    const mediane = numMedian(duration)
    
    return res.status(200).send({
      moyenne: moyenne,
      max: max,
      min: min,
      mediane: mediane
    })
  }
}

export default SessionController;
