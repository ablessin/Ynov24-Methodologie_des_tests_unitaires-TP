class SessionService {
    constructor(repository) {
      this.repository = repository;
    }
  
    addSession = async (session) => {
      return this.repository.create(session);
    };
  
    updateSession = async (session) => {
      await this.getSessionById(session._id); // Alternatively you can create with put if it does not exist
      return await this.repository.update(session);
    };
  
  
    getSession = () => this.repository.getAll();
  
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
  }
  
  export default SessionService;
  