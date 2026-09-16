# Regla: contract-ready

Toda función nueva de un endpoint HTTP (handler/ruta, o el método del
controlador que atiende esa ruta) lleva como primera línea interna el
comentario exacto `// contract-ready` (o `# contract-ready` en Python).

Aplica solo a funciones nuevas — no hace falta retrofitear endpoints
existentes que no lo tengan.

Ver también `.cursor/rules/contract-ready.mdc` (misma regla, para Cursor).
