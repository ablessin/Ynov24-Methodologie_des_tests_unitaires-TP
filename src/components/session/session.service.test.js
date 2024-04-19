// session.service.test.js

import SessionService from './session.service';

describe('SessionService', () => {
  let mockRepository, sessionService;
  const session = { _id: '1', name: 'Test Session' };

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
      deleteAll: jest.fn(),
      addEndDate: jest.fn().mockImplementation(async (session) => {
        return { ...session, end: new Date().toISOString() };
      }),
      getToday: jest.fn().mockImplementation(async () => {
        return new Date().toISOString();
      }),
      stats: jest.fn()
      
    };
    sessionService = new SessionService(mockRepository);
    
  });

  describe('addSession', () => {
    it('should add a new session', async () => {
      mockRepository.create.mockResolvedValue(session);
      const result = await sessionService.addSession(session);
      expect(mockRepository.create).toHaveBeenCalledWith(session);
      expect(result).toEqual(session);
    });
  });

  describe('updateSession', () => {
    it('should update a session', async () => {
      mockRepository.getById.mockResolvedValue(session);
      mockRepository.update.mockResolvedValue(session);
      const result = await sessionService.updateSession(session);
      expect(mockRepository.update).toHaveBeenCalledWith(session);
      expect(result).toEqual(session);
    });

    it('throws error when session does not exist', async () => {
      mockRepository.getById.mockResolvedValue(null);
      await expect(sessionService.updateSession(session)).rejects.toThrow('Session does not exists');
    });
  });

  describe('getSession', () => {
    it('should return all sessions', async () => {
      mockRepository.getAll.mockResolvedValue([session]);
      const result = await sessionService.getSession();
      expect(mockRepository.getAll).toHaveBeenCalled();
      expect(result).toEqual([session]);
    });
  });

  describe('getSessionById', () => {
    it('should return a session by ID', async () => {
      mockRepository.getById.mockResolvedValue(session);
      const result = await sessionService.getSessionById('1');
      expect(mockRepository.getById).toHaveBeenCalledWith('1');
      expect(result).toEqual(session);
    });

    it('should throw an error if session not found', async () => {
      mockRepository.getById.mockResolvedValue(null);
      await expect(sessionService.getSessionById('1')).rejects.toThrow('Session does not exists');
    });
  });

  describe('deleteSessionById', () => {
    it('should delete a session by ID', async () => {
      mockRepository.deleteById.mockResolvedValue({ deletedCount: 1 });
      const result = await sessionService.deleteSessionById('1');
      expect(mockRepository.deleteById).toHaveBeenCalledWith('1');
      expect(result.deletedCount).toBe(1);
    });
  });

  describe('deleteSession', () => {
    it('should delete all sessions', async () => {
      mockRepository.deleteAll.mockResolvedValue({ deletedCount: 5 });
      const result = await sessionService.deleteSession();
      expect(mockRepository.deleteAll).toHaveBeenCalled();
      expect(result.deletedCount).toBe(5);
    });
  });
  describe('addEndDate', () => {
    it('should correctly add an end date to a session', async () => {
      const session = { id: '1', start: new Date().toISOString(), end: null };
      const updatedSession = await sessionService.addEndDate(session);
      expect(mockRepository.addEndDate).toHaveBeenCalledWith(session);
      expect(updatedSession.end).toBeDefined();
    });
  });

  describe('getToday', () => {
    it('should retrieve today\'s date', async () => {
      const today = await sessionService.getToday();
      expect(mockRepository.getToday).toHaveBeenCalled();
      expect(new Date(today).toDateString()).toBe(new Date().toDateString());
    });
  });

  describe('stats', () => {
    it('should calculate average, maximum, and minimum durations of sessions', async () => {
      const sessions = [
        { start: new Date('2021-09-01T12:00:00Z'), end: new Date('2021-09-01T14:00:00Z') }, // 2 hours
        { start: new Date('2021-09-02T12:00:00Z'), end: new Date('2021-09-02T15:00:00Z') }, // 3 hours
        { start: new Date('2021-09-03T12:00:00Z'), end: new Date('2021-09-03T18:00:00Z') }  // 6 hours
      ];
      mockRepository.getByUserId = jest.fn().mockReturnValue(sessions.map(session => ({
        ...session,
        end: {
          diff: (start, units) => {
            const endDate = new Date(session.end);
            const startDate = new Date(session.start);
            const diffTime = Math.abs(endDate - startDate);
            const diffHours = diffTime / (1000 * 60 * 60);
            return diffHours;
          }
        }
      })));
      
      const user = { id: '1', email: 'test@example.com' };
      mockRepository.getByEmail = jest.fn().mockReturnValue(user);

      const req = { body: { email: 'test@example.com' } };
      const res = {
        status: jest.fn(() => res),
        send: jest.fn()
      };

      await sessionService.stats(req, res);

      expect(mockRepository.getByEmail).toHaveBeenCalledWith('test@example.com');
      expect(mockRepository.getByUserId).toHaveBeenCalledWith(user.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        moyenne: 11 / 3, // Average
        max: 6, // Max
        min: 2  // Min
      });
    });
  });
});
