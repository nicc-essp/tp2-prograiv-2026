import { describe, it, expect, beforeEach } from 'vitest';
import { createDb } from '../../src/db/connection';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';

// 🟢 EJERCICIO 2: esta función YA FUNCIONA.
// No existe todavía el archivo tests/unit/noteService.list.test.ts:
// escríbanlo ustedes cubriendo al menos "lista vacía" y "varias notas".

describe('NoteService - listNotes - (Ejercicio 2)', () => {
    let notaService: NoteServiceImpl;

    beforeEach(()=>{
        const db = createDb(':memory:');
        const repo = new SqliteNoteRepository(db);
        notaService = new NoteServiceImpl(repo); 
    });

    // lista vacia
    it('Verificar que devuelve longitud 0 sin crear ninguna nota al llamar listNotes', ()=>{
        const cantNotas = notaService.listNotes().length;
        expect(cantNotas).toBe(0);
    });

    // lista con varias notas
    it('Verificar que creando varias notas devuelve la longitud exacta de notas al llamar listNotes', ()=>{
        const nota1 = notaService.createNote({ title: 'Mandados', content: 'Comida' });
        const nota2 = notaService.createNote({ title: 'Top 5 Lenguajes', content: 'python, java, typescript' });
        const nota3 = notaService.createNote({ title: 'Top 3 frameworks', content: 'react, angularjs, express' });
        expect(notaService.listNotes()).toHaveLength(3);
    });
});