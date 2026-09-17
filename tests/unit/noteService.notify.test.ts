// 🔴 EJERCICIO 6
// Objetivo: verificar que createNote llame a notify(nota) cuando pinned es true.
// Se usa vi.mock para reemplazar el módulo notificationService por uno falso (espía).

import { vi } from 'vitest';
import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';
import { notify } from '../../src/services/notificationService';

// vi.mock reemplaza TODO el módulo notificationService por uno falso.
// vi.fn() crea una función espía: acepta cualquier argumento, no hace nada,
// pero graba cada llamada para que después podamos preguntar con expect.
vi.mock('../../src/services/notificationService', () => ({
    notify: vi.fn(),
}));

describe('NoteService - createNote extendido (Ejercicio 6)', ()=>{
    // notaService es el SERVICE (el "gerente" que gestiona notas),
    // NO es una nota. Las notas son lo que devuelve createNote().
    let notaService : NoteServiceImpl; 

    // beforeEach: antes de cada test, arma una DB limpia en memoria
    // y crea un service nuevo. Así cada test es independiente.
    beforeEach(()=>{
        const db = createDb(':memory:');
        const repo = new SqliteNoteRepository(db);
        notaService = new NoteServiceImpl(repo);
    });

    it('Verifica que si pinned false --> notify no se llama', () => {
        // Creamos nota sin pinned (por defecto es false)
        const nota = notaService.createNote({title : 'prueba',content: '1'});
        // La espía no debería haber grabado ninguna llamada
        expect(notify).not.toHaveBeenCalled();
    });

    it('Verifica que si pinned true ---> notify se llama', () => {
        // Creamos nota con pinned: true
        const nota = notaService.createNote({title: 'prueba', content:'2', pinned: true});
        // Le preguntamos a la espía: "¿te llamaron con esta nota?"
        expect(notify).toHaveBeenCalledWith(nota);
    });
});
