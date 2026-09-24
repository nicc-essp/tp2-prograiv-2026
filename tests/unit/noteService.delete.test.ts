import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - deleteNote (Ejercicio 5)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('crear una nota y borrarla', () => {
    const note = service.createNote({ title: 'Comprar pan', content: 'Antes de las 20hs' });
    const result = service.deleteNote(note.id);
    expect(result).toBe(true);
  });

  it('borrar una nota inexistente', () => {
    const result = service.deleteNote(-1);
    expect(result).toBe(false);
  });

  it('cada nota borrada ya no aparece en listNotes()', () => {
    const nota1 = service.createNote({ title: 'A', content: 'B' });
    const nota2 = service.createNote({ title: 'C', content: 'D' });
    service.deleteNote(nota2.id);
    expect(service.listNotes()).toHaveLength(1);
    service.deleteNote(nota1.id);
    expect(service.listNotes()).toHaveLength(0);
  });
});
