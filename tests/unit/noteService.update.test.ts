import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - updateNote (Ejercicio 4)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('actualiza solamente el title y mantiene el content original', () => {
    const note = service.createNote({
      title: 'Título original',
      content: 'Contenido original'
    });

    const updated = service.updateNote(note.id, {
      title: 'Título modificado'
    });

    expect(updated).toBeDefined();
    expect(updated?.title).toBe('Título modificado');
    expect(updated?.content).toBe('Contenido original');
  });

  it('actualiza solamente el content y mantiene el title original', () => {
    const note = service.createNote({
      title: 'Título original',
      content: 'Contenido original'
    });

    const updated = service.updateNote(note.id, {
      content: 'Contenido modificado'
    });

    expect(updated).toBeDefined();
    expect(updated?.title).toBe('Título original');
    expect(updated?.content).toBe('Contenido modificado');
  });

  it('devuelve undefined si la nota no existe', () => {
    const updated = service.updateNote(9999, {
      title: 'Nuevo título'
    });

    expect(updated).toBeUndefined();
  });
});