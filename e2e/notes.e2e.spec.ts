import { test, expect } from '@playwright/test';
import { resetAndSeed } from './helpers';

test.describe('Notes API - E2E (Ejercicio 7)', () => {
  test.beforeEach(async ({ baseURL }) => {
    await resetAndSeed(baseURL!);
  });

  test('flujo completo: crear, listar, modificar y eliminar una nota', async ({ request }) => {
    // Crear una nota
    const createResponse = await request.post('/notes', {
      data: {
        title: 'Nota E2E',
        content: 'Contenido original'
      }
    });

    expect(createResponse.status()).toBe(201);

    const createdNote = await createResponse.json();

    expect(createdNote.title).toBe('Nota E2E');
    expect(createdNote.content).toBe('Contenido original');
    expect(createdNote.id).toBeDefined();

    // Listar notas y comprobar que aparece la nueva
    const listResponse = await request.get('/notes');

    expect(listResponse.status()).toBe(200);

    const notes = await listResponse.json();

    expect(notes).toHaveLength(3);
    expect(notes.some((note: any) => note.id === createdNote.id)).toBe(true);

    // Modificar parcialmente la nota
    const updateResponse = await request.patch(`/notes/${createdNote.id}`, {
      data: {
        title: 'Nota E2E modificada'
      }
    });

    expect(updateResponse.status()).toBe(200);

    const updatedNote = await updateResponse.json();

    expect(updatedNote.title).toBe('Nota E2E modificada');
    expect(updatedNote.content).toBe('Contenido original');

    // Eliminar la nota
    const deleteResponse = await request.delete(`/notes/${createdNote.id}`);

    expect(deleteResponse.status()).toBe(204);

    // Comprobar que efectivamente dejó de existir
    const getDeletedResponse = await request.get(`/notes/${createdNote.id}`);

    expect(getDeletedResponse.status()).toBe(404);
  });

  test('devuelve 404 al intentar obtener una nota inexistente', async ({ request }) => {
    const response = await request.get('/notes/9999');

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body).toEqual({ error: 'NotFound' });
  });
});