class Session {
    constructor(start, end, pause, userId, _id = null) {
      if (_id) {
        this._id = _id;
      }
      this.start = start;
      this.end = end;
      this.pause = pause;
      this.userId = userId;
    }
      
    toJSON() {
      return {
        id: this._id,
        start: this.start,
        end: this.end || null,
        pause: this.pause || 0,
        userId: this.userId
      };
    }
  
    static fromDocument(doc) {
      return new Session(doc.start, doc.end, doc.pause, doc.userId, doc._id);
    }
  }
  
  export default Session;
  