import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import { Monster } from '../../models';

const server = app.listen();


const mockMonsters = [
  {
    "name": "Dead Unicorn",
    "attack": 60,
    "defense": 40,
    "hp": 10,
    "speed": 80,
    "imageUrl": "https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png"
  },
  {
    "name": "Old Shark",
    "attack": 50,
    "defense": 20,
    "hp": 80,
    "speed": 90,
    "imageUrl": "https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/old-shark.png"
  },
  {
    "name": "Red Dragon",
    "attack": 90,
    "defense": 80,
    "hp": 90,
    "speed": 70,
    "imageUrl": "https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/red-dragon.png"
  },
];

beforeAll(async () => {
  jest.useFakeTimers(); 
  await Promise.all(
    mockMonsters.map(async (data) => (await Monster.query().insert(data)).id)
  );
});
afterAll(async () => {
  await Monster.query().del();
  server.close();
});

const inexistentMonster = {
  "id": 11,
  "name": "Dead Unicorn",
  "attack": 40,
  "defense": 50,
  "hp": 10,
  "speed": 80,
  "imageUrl": "https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png"
}

describe('BattleController', () => {
  describe('List', () => {
    test('should list all battles', async () => {
      const response = await request(server).get('/battle');
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Battle', () => {
    test('should fail when trying a battle of monsters with an undefined monster', async () => {

      const response = await request(server)
        .post('/battle')
        .send([{ ...mockMonsters[0], id: 1 }, undefined]);
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
  
    // test('should fail when trying a battle of monsters with an inexistent monster', async () => {
    //   const response = await request(server)
    //     .post('/battle')
    //     .send([{ ...mockMonsters[0], id: 1 }, inexistentMonster]);
    //   expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    // });
  
    // test('should insert a battle of monsters successfully with monster 1 winning', async () => {
    //   const response = await request(server)
    //     .post('/battle')
    //     .send([{ ...mockMonsters[0], id: 1 }, { ...mockMonsters[1], id: 2 }]);
    //   expect(response.status).toBe(StatusCodes.OK);
    // });
  
    // test('should insert a battle of monsters successfully with monster 2 winning', async () => {
    //   const response = await request(server)
    //     .post('/battle')
    //     .send([{ ...mockMonsters[1], id: 2 }, { ...mockMonsters[0], id: 1 }]);
    //   expect(response.status).toBe(StatusCodes.OK);
    // });
  });
});
