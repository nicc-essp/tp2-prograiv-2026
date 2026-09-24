import { describe, expect, it, beforeAll } from 'vitest';
import request from 'supertest';
import { makeApp } from '../../src/app';

describe('DELETE /notes/delete/:id', () => {
  let app: any;

  beforeAll(() => {
    app = makeApp(':memory:')
  });

  it('debe responder con un código de estado 204 y retornar true', async () => {
    const nuevaNota = { title: 'test', content: 'testing'};
    const responseCreate = await request(app).post('/notes').send(nuevaNota);
    const notaId = responseCreate.body.id;
    const response = await request(app).delete(`/notes/${notaId}`);

    expect(response.status).toBe(204);
  });
});