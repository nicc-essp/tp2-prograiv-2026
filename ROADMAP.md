# TP2: Programación IV 

Es un **TP de TDD** *(Rojo → Verde → Refactor)*: hay que completar una API REST de notas en TypeScript + Express + SQLite, testeada con Vitest/Supertest (unitarios e integración) y Playwright (E2E).

Ya viene resuelto (no lo toquen): la conexión SQLite (`src/db/connection.ts`), el repositorio (`src/repositories/NoteRepository.ts`), las rutas (`src/routes/notes.ts`) y el controller HTTP (`src/controllers/NoteController.ts`), el armado de la app (`src/app.ts`) y el helper de reset/seed para E2E.

Lo que **SÍ hay que modificar/completar** vive casi todo en:
- **`src/services/NoteService.ts`** (tiene 5 métodos marcados con comentarios `EJERCICIO N`).
- Los tests correspondientes en **`tests/unit/`**, **`tests/integration/`** y **`e2e/`**.

## Reglas que aplican a todo el grupo:

- No se puede renombrar ni cambiar la firma de los 5 métodos de NoteService, las rutas HTTP, los campos de Note, ni la función notify.
- El nombre de cada archivo de test está fijo (el corrector automático los busca por nombre exacto).
- Para cada ejercicio donde ustedes escriben el test (2, 3, 4, 5, 6, 7): mínimo 2 commits separados — uno solo con el test en rojo, y después uno o más con la implementación en verde. Un commit que mezcle test + implementación invalida la evidencia de TDD.
- En los ejercicios 3, 4 y 5 hay que escribir tanto el test unitario de NoteService como el test de integración de la ruta (ambos van al mismo archivo compartido tests/integration/notes.routes.test.ts).

##	Cuadro de tareas
| Ejercicio | Que hay que hacer | Punto de partida |
|-------|-------------------|------------------|
|1|	createNote|	Test ya escrito, en rojo — solo falta implementar|
|2|	listNotes|	Implementación ya en verde — falta escribir el test|
|3|	getNote (+ 404 si no existe)|	Ciclo completo: unit + integración|
|4|	updateNote (patch parcial)	|Ciclo completo: unit + integración|
|5|	deleteNote|	Ciclo completo: unit + integración|
|6|	Notificar cuando pinned:true (extiende createNote), mockeando con vi.mock|	Depende del 1|
|7|	E2E con Playwright: 1 caso feliz + 1 de error	|Depende de que 1–6 estén resueltos|

<br>

> [!WARNING]
> Dependencia clave: el Ejercicio 1 es un cuello de botella. Para testear getNote/updateNote/deleteNote/notify (ejercicios 3 a 6) primero hay que poder crear notas. Sin createNote andando, nadie más puede avanzar en serio — conviene resolverlo primero y pushearlo temprano.

### División de tareas

| Integrante | Tareas |
|------------|--------|
| Federico Heinrich | Setup del repo (npm install, correr npm run dev y npm test para confirmar que arranca) + Ejercicio 1 (createNote) + Ejercicio 2 (test de listNotes). Es lo primero que tiene que estar en verde y pusheado. |
| Nicolas Espulef | Ejercicio 3 completo: test unitario de getNote (caso feliz + id inexistente) + implementación + test de integración de GET /notes/:id |
| Homero Colombo | Ejercicio 4 completo: test unitario de updateNote (patch parcial: solo title, solo content, id inexistente) + implementación + test de integración de PATCH /notes/:id |
| Matias Oviedo | Ejercicio 5 completo: test unitario de deleteNote + implementación + test de integración de DELETE /notes/:id |


### Una vez que los ejercicios del 1 al 5 estén mergeados a main:

- Federico Heinrich sigue con el Ejercicio 6 (notificación al fijar), porque ya conoce createNote de punta a punta.
- Matias Oviedo (delete suele ser el más rápido de los tres) arma el Ejercicio 7 (E2E), que necesita todo lo anterior resuelto para que el seed funcione. Nicolas Espulef y Homero Colombo revisan el E2E antes de entregar.

## Metodologia de trabajo:

- Trabajen en ramas separadas (ej1-create, ej3-get, etc.) y mergeen seguido, no todo al final.
- NoteService.ts y tests/integration/notes.routes.test.ts los va a tocar más de una persona: avisen cuando pusheen y hagan pull antes de escribir ahí, para evitar conflictos.
- Realizar commits separados, primero del rojo, y luego del verde (rojo→verde). 
  - **Convención de commits:**
    - Commit 1 (Rojo): `test(notas): agregar tests para getNote`
    - Commit 2 (Verde): `feat(notas): implementar getNote y manejar 404`

> [!NOTE]
> El README describe un workflow de CI en .github/workflows/ci.yml, pero ese archivo no está en el repo; hay que preguntar al profesor si falta agregarlo o si él lo suma después.