class SessionService {
   UserRepository = this.userRepository
    constructor(repository, userRepository) {
      this.repository = repository;
      this.userRepository = userRepository
    }
  
    addSession = async (session) => {
      if (!session.start.isValid) throw new Error('Date invalid');
      const user = this.userRepository.getUserById(session.userId)
      if (!user) throw new Error('User does not exists');
      const sessions = this.repository.getSessionByUserId(user._id)
      sessions.map(x => {
        if (x?.end > session.start) throw new Error('Session deja existante sur cette période');
        if (x.start > session.start && !x.end) throw new Error('Session deja existante sur cette période');
      })
      return this.repository.create(session);
    };
  
    updateSession = async (session) => {
      if (!session.end.isValid) throw new Error('Date invalid');
      const user = this.userRepository.getUserById(session.userId)
      if (!user) throw new Error('User does not exists');
      
      const findSession = await this.getSessionById(session._id);
       // Alternatively you can create with put if it does not exist
      
      if (session.end < findSession.start) throw new Error('La date de fin ne doit pas être inferieur à la date de début');
      const diff = session.end.diff(findSession.start, ["hours"])
      if (session.pause > diff) throw new Error('La pause ne peut pas être supérieur à la durée de la session');
      return await this.repository.update(session);
    };
  
  
    getSession = async () => {
      const sessions = await this.repository.getAll();

      sessions.map(async x => {
        const user = this.userRepository.getUserById(x.userId)
        if (!user) throw new Error('User does not exists');
        return {
          ...x,
          user
        }
      })
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
  