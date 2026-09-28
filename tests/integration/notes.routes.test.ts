import { describe, expect, it, beforeEach } from 'vitest';
import request from 'supertest';
import { makeApp } from '../../src/app';

describe('DELETE /notes/:id', () => {
  let app: any;

  beforeEach(() => {
    app = makeApp(':memory:')
  });

  it('debe responder con un código de estado 204 y retornar true', async () => {
    const nuevaNota = { title: 'test', content: 'testing'};
    const responseCreate = await request(app).post('/notes').send(nuevaNota);
    const notaId = responseCreate.body.id;
    const response = await request(app).delete(`/notes/${notaId}`);

    expect(response.status).toBe(204);
  });

  it('debe responder 404 si la nota no existe', async () => {
    const response = await request(app).delete('/notes/9999');
    expect(response.status).toBe(404);
  });
});

describe('PATCH /notes/:id', () => {
  let app: any;

  beforeEach(() => {
    app = makeApp(':memory:');
  });

  it('debe actualizar parcialmente una nota', async () => {
    const nuevaNota = {
      title: 'Título original',
      content: 'Contenido original'
    };

    const responseCreate = await request(app)
      .post('/notes')
      .send(nuevaNota);

    const notaId = responseCreate.body.id;

    const response = await request(app)
      .patch(`/notes/${notaId}`)
      .send({
        title: 'Título modificado'
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Título modificado');
    expect(response.body.content).toBe('Contenido original');
  });

  it('debe responder 404 si la nota no existe', async () => {
    const response = await request(app)
      .patch('/notes/9999')
      .send({
        title: 'Título modificado'
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'NotFound' });
  });
});