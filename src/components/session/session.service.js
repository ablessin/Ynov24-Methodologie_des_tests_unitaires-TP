import { DateTime } from "luxon";

class SessionService {
   UserRepository = this.userRepository
    constructor(repository, userRepository) {
      this.repository = repository;
      this.userRepository = userRepository
    }
  
    addSession = async (session) => {
      const startDateTime = DateTime.fromISO(session.start);
      if (!startDateTime) throw new Error('Date invalid');
      const user = await this.userRepository.getById(session.userId)
      if (!user) throw new Error('User does not exists');
      console.log('15', user._id)
      const sessions = await this.repository.getSessionByUserId(user._id.toString())
      console.log("ses", sessions)
      const sessionStart = DateTime.fromISO(session.start);
      const sessionEnd = session.end ? DateTime.fromISO(session.end) : null;
      
      sessions.map(x => {
        const xStart = DateTime.fromISO(x.start);
        const xEnd = x.end ? DateTime.fromISO(x.end) : null;

        // Vérifiez si la session actuelle chevauche une session existante
        if ((xEnd && xEnd > sessionStart) || (sessionEnd && sessionEnd > xStart)) {
          throw new Error('Session déjà existante sur cette période');
        }

        // Vérifiez si la session existante chevauche la session actuelle (inverse de la vérification précédente)
        if ((sessionEnd && sessionEnd > xStart) || (xEnd && xEnd > sessionStart)) {
          throw new Error('Session déjà existante sur cette période');
        }

        if (!xEnd)  throw new Error('Session déjà en cours');
      })
      return this.repository.create(session);
    };
  
    updateSession = async (session) => {
      if (!session.end.isValid) throw new Error('Date invalid');
      const user = this.userRepository.getById(session.userId)
      if (!user) throw new Error('User does not exists');
      
      const findSession = await this.getSessionById(session._id);
       // Alternatively you can create with put if it does not exist
      
      if (session.end < findSession.start) throw new Error('La date de fin ne doit pas être inferieur à la date de début');
      const diff = session.end.diff(findSession.start, ["hours"])
      if (session.pause > diff) throw new Error('La pause ne peut pas être supérieur à la durée de la session');
      return await this.repository.update(session);
    };
  
  
    getSessions = async () => {
      const sessions = await this.repository.getAll();

      const values = Promise.all(sessions.map(async x => {
        const user = await this.userRepository.getById(x.userId)
        if (!user) throw new Error('User does not exists');
        return {
          ...x,
          pause: x.pause || 0
        }
      }))
      console.log(values)
      return await values
    }
  
    getSessionById = async (id) => {
      const session = await this.repository.getById(id);
      if (session) {
        return session
      } else {
        throw new Error('Session does not exists');
      }
    };
  
    // TODO throw if not founded using property "deletedCount" of return value
    deleteSessionById = (id) => this.repository.deleteById(id);
  
    deleteSession = () => this.repository.deleteAll();

    getToday = () => this.repository.getToday();
  
    addEndDate = () => this.repository.addEndDate();

    stats = () => this.repository.stats();
  }
  
  export default SessionService;
  