import { describe, it, expect, beforeEach } from "vitest";
import { NoteServiceImpl} from "../../src/services/NoteService";
import { SqliteNoteRepository } from "../../src/repositories/NoteRepository";
import { createDb } from "../../src/db/connection";

describe('NoteService - getNote (Ejercicio 3)', () => {
    let service: NoteServiceImpl;

    beforeEach(()=>{
        const db = createDb(':memory:');
        const repo = new SqliteNoteRepository(db);
        service = new NoteServiceImpl(repo);
    });

    it('crea varias notas y devuelve una por id', () => {
        const notaA = service.createNote({title: 'A', content:'B'});
        const notaB = service.createNote({title:'C', content:'D'});
        const notaC = service.createNote({title:'E', content:'D'});
        const encontrada = service.getNote(notaB.id);

        expect(encontrada?.id).toBe(notaB.id);
        expect(encontrada?.title).toBe(notaB.title);
        expect(encontrada?.content).toBe(notaB.content);
    })

    it('devuelve undefined si la nota no existe',() => {
        const encontrada = service.getNote(666);

        expect(encontrada).toBeUndefined();
    })
})