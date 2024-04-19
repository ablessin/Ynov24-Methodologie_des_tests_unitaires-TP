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
      deleteAll: jest.fn()
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

});
