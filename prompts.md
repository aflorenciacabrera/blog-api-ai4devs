# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

---

## Prompt 1

**Modelo:** Sonnet 5 (high effort)
**Herramienta:** Claude Code (v2.1.265), sesión en `blog-api`

```
Aplicar esta regla: Toda función nueva de un endpoint HTTP (handler/ruta o el método del controlador que atiende esa ruta) lleva como primera línea interna el comentario exacto // contract-ready (o # contract-ready en Python).
```

**Qué salió:** a la primera, login caducado y la búsqueda de `contract-ready` dio cero. Después de `/login`, el mismo prompt persistió la regla y los handlers.

## Prompt 2

**Modelo:** Sonnet 5 (high effort)
**Herramienta:** Claude Code, sesión nueva en `blog-ai`

```
Aplicar esta regla: Toda función nueva de un endpoint HTTP (handler/ruta o el método del controlador que atiende esa ruta) lleva como primera línea interna el comentario exacto // contract-ready (o # contract-ready en Python).
```

**Qué salió:** no añadió nada nuevo; dijo que `resumen_indice` ya cumplía. Lo lancé varias veces.

## Prompt 3

**Modelo:** Sonnet 5 (high effort)
**Herramienta:** Claude Code, sesión en `blog-ai`

```
Añade un endpoint GET /ping-contrato que devuelva {"ok": true}.
Luego, en el repositorio hermano ../blog-api, añade un GET /ping-contrato que lo consuma.
No hace falta tests ni levantar servicios.
```

**Qué salió:** creó los handlers; el comentario seguía ahí porque la regla ya vivía en el árbol de `blog-ai`.

## Prompt 4 (no lo lancé)

**Modelo:** Sonnet 5 (high effort)
**Herramienta:** no se ejecutó; lo tenía escrito por el login caducado del Prompt 1

```
Regla de proceso (obligatoria, comprobable):
Toda función nueva de un endpoint HTTP (handler/ruta o el método del controlador que atiende esa ruta) lleva como primera línea interna el comentario exacto // contract-ready (o # contract-ready en Python).

Haz exactamente esto:

1. Persiste la regla en este repositorio: crea .cursor/rules/contract-ready.mdc con alwaysApply: true y el texto de la regla. Si en esta herramienta no aplica .cursor, créala también en CLAUDE.md en la raíz, con el mismo texto.

2. Encargo pequeño que toque los dos repos:
   - En ../blog-ai añade GET /resumen-indice que devuelva cuántos fragmentos hay indexados.
   - En este blog-api añade un endpoint que lo consuma (por ejemplo GET /resumen-indice) y delegue en blog-ai.

3. En toda función nueva de endpoint que escribas, la primera línea interna tiene que ser // contract-ready o # contract-ready.

No hace falta tests ni dejar los servicios levantados. Prioriza cumplir la regla en el código nuevo.
```

**Qué salió:** no lo lancé. Era por el login, no un prompt que haya corrido.
