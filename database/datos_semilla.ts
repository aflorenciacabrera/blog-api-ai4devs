/**
 * Semilla del blog «Corriente».
 *
 * Es la MISMA semilla que usa la otra materializacion del dominio: si aqui se cambia
 * un titulo o un slug, las dos dejan de verse iguales y la comparacion deja de ensenar nada.
 */

export const autores = [
  {
    id: 1,
    nombre: 'Marta Sela',
    email: 'marta.sela@corriente.es',
    rol: 'Editora jefa y diseño',
    bio: 'Dirige Corriente desde 2021. Antes montó el equipo de diseño de un diario regional y aprendió a marchas forzadas que un rediseño se gana en la sala de redacción, no en el Figma. Escribe sobre tendencias con más escepticismo del que le gustaría.',
    avatar: 'https://i.pravatar.cc/160?u=marta-sela',
    redes: {
      youtube: 'https://youtube.com/@corriente',
      facebook: 'https://facebook.com/corriente.medio',
      instagram: 'https://instagram.com/marta.sela',
      x: 'https://x.com/martasela',
      linkedin: 'https://linkedin.com/in/martasela',
    },
  },
  {
    id: 2,
    nombre: 'Iván Berrocal',
    email: 'ivan.berrocal@corriente.es',
    rol: 'Redactor de producto',
    bio: 'Pasó seis años como product manager antes de cambiarse a escribir sobre ello. Le interesa la parte aburrida: qué mide un panel, quién lo mira y qué decisión cambia. Cree que casi ninguna métrica sobrevive a esa tercera pregunta.',
    avatar: 'https://i.pravatar.cc/160?u=ivan-berrocal',
    redes: {
      x: 'https://x.com/ivanberrocal',
      linkedin: 'https://linkedin.com/in/ivanberrocal',
      youtube: 'https://youtube.com/@corriente',
    },
  },
  {
    id: 3,
    nombre: 'Nuria Peláez',
    email: 'nuria.pelaez@corriente.es',
    rol: 'Diseñadora UI y colaboradora',
    bio: 'Diseña sistemas de interfaz para equipos pequeños y da clase de tipografía los jueves. Defiende que el contraste no es una opinión y que la accesibilidad se decide en la primera semana del proyecto, no en la última.',
    avatar: 'https://i.pravatar.cc/160?u=nuria-pelaez',
    redes: {
      instagram: 'https://instagram.com/nuria.disena',
      linkedin: 'https://linkedin.com/in/nuriapelaez',
      facebook: 'https://facebook.com/nuria.pelaez.ui',
    },
  },
]

export const categorias = [
  { id: 1, nombre: 'Noticias', slug: 'noticias' },
  { id: 2, nombre: 'Tendencias', slug: 'tendencias' },
  { id: 3, nombre: 'Consejos', slug: 'consejos' },
  { id: 4, nombre: 'Herramientas de diseño', slug: 'herramientas-de-diseno' },
  { id: 5, nombre: 'Desarrollo web', slug: 'desarrollo-web' },
  { id: 6, nombre: 'Recursos', slug: 'recursos' },
  { id: 7, nombre: 'Inspiración', slug: 'inspiracion' },
  { id: 8, nombre: 'Reseñas', slug: 'resenas' },
  { id: 9, nombre: 'Gráficos', slug: 'graficos' },
  { id: 10, nombre: 'Diseño UI/UX', slug: 'diseno-ui-ux' },
  { id: 11, nombre: 'Entrevistas', slug: 'entrevistas' },
  { id: 12, nombre: 'Ideas de contenido', slug: 'ideas-de-contenido' },
]

export const etiquetas = [
  { id: 1, nombre: 'Diseño web', slug: 'diseno-web' },
  { id: 2, nombre: 'UI/UX', slug: 'ui-ux' },
  { id: 3, nombre: 'Consejos', slug: 'consejos' },
  { id: 4, nombre: 'Desarrollo', slug: 'desarrollo' },
  { id: 5, nombre: 'Inspiración', slug: 'inspiracion' },
  { id: 6, nombre: 'Diseño gráfico', slug: 'diseno-grafico' },
  { id: 7, nombre: 'Ideas de diseño', slug: 'ideas-de-diseno' },
  { id: 8, nombre: 'Portafolios', slug: 'portafolios' },
  { id: 9, nombre: 'Tendencias', slug: 'tendencias' },
  { id: 10, nombre: 'Artículos', slug: 'articulos' },
  { id: 11, nombre: 'Herramientas de diseño', slug: 'herramientas-de-diseno' },
]

export type PostSemilla = {
  id: number
  titulo: string
  slug: string
  resumen: string
  cuerpo: string
  imagenPortada: string
  estado: 'borrador' | 'publicado'
  publicadoEn: string | null
  autorId: number
  categoriaId: number
  etiquetas: number[]
}

export const posts: PostSemilla[] = [
  {
    id: 1,
    titulo: 'Diez tendencias de diseño que pueden cambiar la web moderna',
    slug: 'diez-tendencias-de-diseno-que-pueden-cambiar-la-web-moderna',
    resumen:
      'Repasamos diez movimientos que se repiten en los rediseños de este año y separamos los que resuelven un problema real de los que solo se ven bien en una captura.',
    cuerpo: `## Por qué una lista de tendencias envejece mal

Casi todas las listas de tendencias se escriben mirando portfolios, no analíticas. Nosotros hemos hecho lo contrario: hemos mirado veinte rediseños publicados entre enero y julio y hemos anotado qué cambió de verdad en la plantilla, no en la portada.

![Mosaico de portadas de veinte rediseños analizados](https://picsum.photos/seed/corriente-tendencias-1/1200/675)
*Los veinte rediseños analizados. Nueve de ellos comparten la misma retícula de doce columnas.*

## Las que resuelven algo

1. **Retículas asimétricas** con una columna ancha para el cuerpo y otra estrecha para el aparato: mejora la lectura larga sin inventar nada.
2. **Tipografía fluida** con \`clamp()\`, que elimina tres puntos de corte del CSS.
3. **Modo oscuro real**, no un filtro invertido.
4. **Micro-animaciones de estado** en formularios, que bajan los errores de envío.
5. **Imágenes con relación de aspecto declarada**, que matan el salto de maquetación.

## Las que son decorado

6. Cursores personalizados.
7. Desplazamiento secuestrado.
8. Degradados animados a pantalla completa.
9. Texto que aparece letra a letra.
10. Ilustraciones 3D de stock, idénticas en cuatro de los veinte sitios.

![Comparativa de dos portadas con el mismo pack de ilustraciones 3D](https://picsum.photos/seed/corriente-tendencias-2/1200/675)
*Dos medios distintos, el mismo pack de ilustraciones. La tendencia era el pack.*

## Cómo usar esta lista

Coge las cinco primeras y mide antes y después. Las cinco últimas no necesitan medición: necesitan una conversación sobre presupuesto.`,
    imagenPortada: 'https://picsum.photos/seed/corriente-portada-1/1600/900',
    estado: 'publicado',
    publicadoEn: '2026-08-12T09:00:00.000Z',
    autorId: 1,
    categoriaId: 2,
    etiquetas: [9, 1, 10],
  },
  {
    id: 2,
    titulo: 'Quince ejemplos de diseño de una sola página',
    slug: 'quince-ejemplos-de-diseno-de-una-sola-pagina',
    resumen:
      'Quince sitios de una sola página que funcionan, agrupados por el trabajo que hacen: presentar un producto, contar una historia o cerrar una venta.',
    cuerpo: `## Una sola página no es un formato, es una decisión

El sitio de una sola página se elige cuando hay **una** cosa que contar y **una** acción que pedir. En cuanto aparece la segunda, la página empieza a pelearse consigo misma.

![Quince capturas de portada en cuadrícula](https://picsum.photos/seed/corriente-onepage-1/1200/675)
*Los quince ejemplos, ordenados por longitud de página. El más largo mide once pantallas.*

## Presentar un producto

Los cinco primeros usan la misma estructura: promesa, demostración, prueba social, precio y cierre. Lo interesante es dónde ponen la demostración: cuatro de cinco la suben por encima del primer pliegue.

## Contar una historia

Aquí el patrón cambia: el desplazamiento marca el ritmo y las secciones no son intercambiables. Es el caso donde más se justifica una animación ligada al desplazamiento, y también donde peor envejece si se abusa.

![Detalle de una línea temporal vertical con hitos](https://picsum.photos/seed/corriente-onepage-2/1200/675)
*Línea temporal vertical: cada hito es un ancla con su propia URL.*

## Cerrar una venta

Los cinco últimos son páginas de campaña. Todos repiten la llamada a la acción entre tres y cinco veces, y ninguno cambia el texto del botón entre repeticiones.

## Lo que copiaríamos

El ancla por sección con URL propia. Es lo único de esta lista que mejora el sitio aunque cambies de formato.`,
    imagenPortada: 'https://picsum.photos/seed/corriente-portada-2/1600/900',
    estado: 'publicado',
    publicadoEn: '2026-08-05T08:30:00.000Z',
    autorId: 3,
    categoriaId: 7,
    etiquetas: [5, 1, 7],
  },
  {
    id: 3,
    titulo: 'Cinco consejos de diseño que aumentarán tus conversiones',
    slug: 'cinco-consejos-de-diseno-que-aumentaran-tus-conversiones',
    resumen:
      'Cinco cambios pequeños, medidos en tiendas reales, con el efecto que tuvieron y el que no. Ninguno necesita rediseñar la marca.',
    cuerpo: `## Antes de tocar nada, mide el punto de fuga

El cambio que más convierte es el que resuelve el motivo real del abandono. En cuatro de las cinco tiendas que revisamos, ese motivo estaba en el formulario, no en la portada.

## 1. Un solo botón por pantalla

Dos llamadas a la acción con el mismo peso visual reparten el clic. En la tienda A, dejar una sola subió el paso al carrito del 18% al 24%.

![Antes y después de una ficha de producto con una sola llamada a la acción](https://picsum.photos/seed/corriente-conversion-1/1200/675)
*La versión de la derecha eliminó el botón secundario y subió el gris del enlace de ayuda.*

## 2. El precio, antes que el formulario

Pedir datos antes de enseñar el importe final duplicó el abandono en la tienda C.

## 3. Errores junto al campo, no arriba

Mover el mensaje de error al lado del campo bajó los reintentos un 30%.

## 4. Imágenes con peso, no con adorno

Sustituir la foto de ambiente por una foto de producto a escala subió la conversión un 6%. La foto de ambiente sigue estando: la movimos abajo.

## 5. Lo que no funcionó

El contador de urgencia. Subió el clic y bajó el pedido completado: la gente entraba y salía. Lo quitamos a la semana.

![Gráfica de la semana con el contador de urgencia activo](https://picsum.photos/seed/corriente-conversion-2/1200/675)
*La línea azul es el clic; la naranja, el pedido completado. Se separan justo el martes.*`,
    imagenPortada: 'https://picsum.photos/seed/corriente-portada-3/1600/900',
    estado: 'publicado',
    publicadoEn: '2026-07-28T10:15:00.000Z',
    autorId: 2,
    categoriaId: 3,
    etiquetas: [3, 1, 10],
  },
  {
    id: 4,
    titulo: 'Las dos caras del diseño de interfaz oscuro',
    slug: 'las-dos-caras-del-diseno-de-interfaz-oscuro',
    resumen:
      'El modo oscuro reduce el deslumbramiento y también el contraste efectivo. Dónde ayuda, dónde estorba y qué hay que medir antes de ofrecerlo por defecto.',
    cuerpo: `## El malentendido de partida

El modo oscuro no es «lo mismo con los colores invertidos». Invertir un tema claro produce texto gris claro sobre negro puro, que es justo la combinación que más halo genera en pantallas OLED.

![Comparativa de un mismo panel en tema claro, tema oscuro invertido y tema oscuro diseñado](https://picsum.photos/seed/corriente-oscuro-1/1200/675)
*El del centro es el tema claro invertido automáticamente. El texto vibra en los bordes.*

## Dónde ayuda de verdad

- Herramientas de uso prolongado en salas con poca luz.
- Interfaces donde el contenido es la imagen: vídeo, fotografía, mapas.
- Paneles de guardia nocturna, donde el deslumbramiento es un problema de seguridad.

## Dónde estorba

- Lectura larga de texto pequeño: el astigmatismo penaliza el texto claro sobre fondo oscuro.
- Formularios densos, donde el usuario necesita distinguir campo activo, campo con error y campo deshabilitado. En oscuro, esos tres estados se comprimen.

## Reglas que aplicamos

1. Nunca negro puro: el fondo base es \`#121212\` y las superficies suben en pasos de luminancia.
2. El contraste mínimo es 4.5:1 también en oscuro, comprobado con la herramienta, no a ojo.
3. El acento se desatura un 15% respecto al tema claro.

![Escala de superficies del tema oscuro, de la base a la elevación cuatro](https://picsum.photos/seed/corriente-oscuro-2/1200/675)
*Cinco superficies, cada una con su token. La elevación se comunica con luminancia, no con sombra.*`,
    imagenPortada: 'https://picsum.photos/seed/corriente-portada-4/1600/900',
    estado: 'publicado',
    publicadoEn: '2026-07-19T07:45:00.000Z',
    autorId: 3,
    categoriaId: 10,
    etiquetas: [2, 1, 6],
  },
  {
    id: 5,
    titulo: 'Los mejores portafolios online de diez diseñadores',
    slug: 'los-mejores-portafolios-online-de-diez-disenadores',
    resumen:
      'Diez portafolios que consiguen entrevistas, y el patrón común que comparten: enseñan la decisión, no solo el resultado.',
    cuerpo: `## Qué mira quien contrata

Hablamos con cuatro responsables de equipo. Los cuatro dijeron lo mismo: pasan menos de dos minutos por portafolio y buscan una cosa, **por qué** el diseño acabó así.

![Cuadrícula con las portadas de los diez portafolios](https://picsum.photos/seed/corriente-portafolios-1/1200/675)
*Diez portafolios, siete tipografías distintas y una sola estructura de caso.*

## El patrón común

Todos los que funcionaron abren el caso con el problema y la restricción, no con la captura bonita. La captura llega en el tercer bloque, cuando ya sabes qué estaba en juego.

## Tres errores que se repiten

1. **Todo el trabajo, sin filtrar.** Ocho casos mediocres pesan más que dos buenos.
2. **Proceso sin decisión.** Enseñar veinte pantallas de exploración no cuenta nada si no dices cuál elegiste y por qué.
3. **Sin números.** No hace falta un panel: una frase con el antes y el después basta.

![Detalle de un caso que abre con la restricción del proyecto](https://picsum.photos/seed/corriente-portafolios-2/1200/675)
*El caso que más citaron: abre con «teníamos seis semanas y un solo desarrollador».*

## Si estás rehaciendo el tuyo

Empieza por escribir los casos en texto plano. Si el caso se sostiene sin imágenes, el portafolio ya está hecho; lo demás es maquetarlo.`,
    imagenPortada: 'https://picsum.photos/seed/corriente-portada-5/1600/900',
    estado: 'publicado',
    publicadoEn: '2026-07-08T11:20:00.000Z',
    autorId: 1,
    categoriaId: 7,
    etiquetas: [8, 5, 10],
  },
  {
    id: 6,
    titulo: 'Qué mide de verdad una métrica de producto',
    slug: 'que-mide-de-verdad-una-metrica-de-producto',
    resumen:
      'Una métrica no vale por lo que cuenta, sino por la decisión que cambia. Un método corto de tres preguntas para limpiar un panel inflado.',
    cuerpo: `## El panel de veinte gráficas

Casi todos los equipos llegan al mismo sitio: un panel con veinte gráficas que nadie mira los lunes. El problema no es la cantidad, es que ninguna está atada a una decisión.

## Las tres preguntas

1. **¿Qué decisión cambia si esta métrica sube o baja?** Si no hay respuesta, la métrica es decoración.
2. **¿Quién la mira y cuándo?** Una métrica sin dueño y sin cadencia deja de mantenerse en dos meses.
3. **¿Qué la puede mover sin que mejore nada?** Toda métrica tiene una forma barata de subir. Escríbela al lado.

![Panel con veinte gráficas, la mayoría sin dueño asignado](https://picsum.photos/seed/corriente-metricas-1/1200/675)
*El panel original. Solo tres gráficas tenían un nombre al lado.*

## Un ejemplo incómodo

«Usuarios activos diarios» subió un 12% el trimestre pasado. La causa fue un correo de recordatorio que abría la aplicación. La decisión que cambió: ninguna. La métrica siguió en el panel dos trimestres más.

## Qué dejamos

Del panel de veinte quedaron cuatro gráficas y una tabla. Las cuatro tienen dueño, cadencia y una nota de qué las puede mover en falso.

![El panel reducido a cuatro gráficas con dueño y cadencia](https://picsum.photos/seed/corriente-metricas-2/1200/675)
*El mismo panel, tres semanas después. La columna de la derecha es la nota de «falso positivo».*`,
    imagenPortada: 'https://picsum.photos/seed/corriente-portada-6/1600/900',
    estado: 'publicado',
    publicadoEn: '2026-06-30T09:10:00.000Z',
    autorId: 2,
    categoriaId: 12,
    etiquetas: [10, 3, 7],
  },
  {
    id: 7,
    titulo: 'Tipografía grande: cuándo ayuda y cuándo estorba',
    slug: 'tipografia-grande-cuando-ayuda-y-cuando-estorba',
    resumen:
      'Los titulares enormes venden bien en una captura. En una página real compiten con el contenido. Dónde está la línea, con medidas.',
    cuerpo: `## De dónde viene la moda

La tipografía descomunal llegó de los estudios de branding, donde la pieza es una sola imagen. En una página que hay que leer, el titular deja de ser la pieza y pasa a ser una señal.

![Titular de 120 px sobre una portada de revista digital](https://picsum.photos/seed/corriente-tipo-1/1200/675)
*120 píxeles en pantalla ancha. En móvil, el mismo titular ocupaba pantalla y media.*

## Cuándo ayuda

- **Portadas y páginas de campaña**, donde el titular es el contenido.
- **Jerarquías planas**, cuando solo hay dos niveles y el salto tiene que ser evidente.
- **Lectura a distancia**: paneles, pantallas de sala, quioscos.

## Cuándo estorba

- Cuando hay más de tres niveles de jerarquía: el titular gigante aplasta al resto y obliga a inflar todos los demás.
- En listados: quince titulares grandes son quince titulares iguales.
- En móvil, si no se reduce la escala con \`clamp()\`, porque el corte de palabra aparece a partir de los 40 píxeles.

## La medida que usamos

Cuerpo a 18 px, línea de 68 caracteres, y el titular como mucho a 3,2 veces el cuerpo en escritorio. Por encima de ahí, el ojo salta del titular al pie y se salta la entradilla.

![Retícula tipográfica con la escala aplicada a tres anchos de pantalla](https://picsum.photos/seed/corriente-tipo-2/1200/675)
*La misma escala en tres anchos. El titular baja de 3,2 a 2,1 veces el cuerpo en móvil.*`,
    imagenPortada: 'https://picsum.photos/seed/corriente-portada-7/1600/900',
    estado: 'publicado',
    publicadoEn: '2026-06-17T12:00:00.000Z',
    autorId: 3,
    categoriaId: 9,
    etiquetas: [6, 2, 3],
  },
  {
    id: 8,
    titulo: 'Cómo elegir una paleta que sobreviva al rediseño',
    slug: 'como-elegir-una-paleta-que-sobreviva-al-rediseno',
    resumen:
      'Una paleta dura si está construida por función y no por gusto. Cómo montarla en tokens para que el siguiente rediseño no la tire entera.',
    cuerpo: `## El error de empezar por los colores bonitos

Casi todas las paletas mueren igual: se eligen seis colores que quedan bien juntos y, tres meses después, hace falta un séptimo para un estado de error que nadie previó.

## Empieza por las funciones

Antes de elegir un tono, escribe la lista de trabajos que la paleta tiene que hacer: marca, superficie, texto, borde, éxito, aviso, error, información y estado deshabilitado. Son nueve funciones, y ninguna es opcional.

![Tabla de funciones de color antes de asignar ningún tono](https://picsum.photos/seed/corriente-paleta-1/1200/675)
*La tabla se rellena de izquierda a derecha. Los tonos entran en la última columna.*

## Tokens en dos capas

- **Capa uno, primitivos**: \`azul-500\`, \`gris-900\`. Sin significado.
- **Capa dos, semánticos**: \`color-texto-principal\`, \`color-borde-sutil\`. Apuntan a un primitivo.

El rediseño cambia la capa uno. Si los componentes solo usan la capa dos, el rediseño es un cambio de una línea por token.

## Contraste antes que gusto

Cada pareja texto/fondo se comprueba con la herramienta. Un tono que no llega a 4.5:1 no entra, por bonito que sea. Es más rápido descartar en la paleta que en la revisión de accesibilidad.

![Matriz de contraste de la paleta final con los pares que se descartaron](https://picsum.photos/seed/corriente-paleta-2/1200/675)
*Las celdas rojas son las combinaciones descartadas. Dos de ellas eran las favoritas del equipo.*`,
    imagenPortada: 'https://picsum.photos/seed/corriente-portada-8/1600/900',
    estado: 'publicado',
    publicadoEn: '2026-06-03T08:00:00.000Z',
    autorId: 1,
    categoriaId: 3,
    etiquetas: [6, 3, 11],
  },
  {
    id: 9,
    titulo: 'Guía de accesibilidad para equipos pequeños',
    slug: 'guia-de-accesibilidad-para-equipos-pequenos',
    resumen:
      'Borrador: qué se puede cubrir con dos personas y sin presupuesto de auditoría, y en qué orden hacerlo.',
    cuerpo: `## Borrador en revisión

Este texto está sin terminar. Falta la sección de pruebas con lector de pantalla y el checklist final.

## Lo que ya está

- Contraste y tamaño de objetivo táctil.
- Foco visible en todos los elementos interactivos.
- Texto alternativo con criterio: describir la función, no la imagen.

![Pendiente de sustituir por la captura del recorrido de teclado](https://picsum.photos/seed/corriente-a11y-1/1200/675)
*Imagen provisional.*

## Pendiente

Escribir el orden de ataque para un equipo de dos personas y añadir el coste real en horas de cada punto.`,
    imagenPortada: 'https://picsum.photos/seed/corriente-portada-9/1600/900',
    estado: 'borrador',
    publicadoEn: null,
    autorId: 3,
    categoriaId: 5,
    etiquetas: [2, 4],
  },
  {
    id: 10,
    titulo: 'Lo que aprendimos migrando el blog',
    slug: 'lo-que-aprendimos-migrando-el-blog',
    resumen:
      'Borrador: notas internas de la migración del blog, con los tres sustos y lo que costó cada uno.',
    cuerpo: `## Borrador interno

Notas sin pulir de la migración. No publicar hasta contrastar los números con el equipo de sistemas.

## Los tres sustos

1. Las URLs antiguas sin redirección durante nueve horas.
2. Los pies de imagen que se perdieron al convertir el contenido.
3. El buscador, que estuvo devolviendo resultados de la base vieja dos días.

![Pendiente: gráfica de tráfico durante la ventana de migración](https://picsum.photos/seed/corriente-migracion-1/1200/675)
*Imagen provisional.*

## Pendiente

Cerrar el apartado de costes y decidir si esto se publica o se queda como documento interno.`,
    imagenPortada: 'https://picsum.photos/seed/corriente-portada-10/1600/900',
    estado: 'borrador',
    publicadoEn: null,
    autorId: 2,
    categoriaId: 5,
    etiquetas: [4, 10],
  },
]

export type ComentarioSemilla = {
  id: number
  postId: number
  autorNombre: string
  autorEmail: string
  cuerpo: string
  estado: 'pendiente' | 'aprobado'
  creadoEn: string
  padreId: number | null
}

export const comentarios: ComentarioSemilla[] = [
  {
    id: 1,
    postId: 1,
    autorNombre: 'Lucía Arribas',
    autorEmail: 'lucia.arribas@ejemplo.es',
    cuerpo:
      'El punto de las imágenes con relación de aspecto declarada nos ahorró media jornada de peleas con el salto de maquetación. Lo confirmo desde un equipo de tres.',
    estado: 'aprobado',
    creadoEn: '2026-08-12T13:40:00.000Z',
    padreId: null,
  },
  {
    id: 2,
    postId: 1,
    autorNombre: 'Marta Sela',
    autorEmail: 'marta.sela@corriente.es',
    cuerpo:
      'Gracias, Lucía. Justo ese es el cambio con mejor relación entre esfuerzo y resultado de toda la lista, y el que menos aparece en los artículos de tendencias.',
    estado: 'aprobado',
    creadoEn: '2026-08-12T15:05:00.000Z',
    padreId: 1,
  },
  {
    id: 3,
    postId: 1,
    autorNombre: 'Diego Ferrán',
    autorEmail: 'diego.ferran@ejemplo.es',
    cuerpo:
      'Discrepo con meter el desplazamiento secuestrado en la lista del decorado. Bien hecho, en una página de producto larga funciona.',
    estado: 'aprobado',
    creadoEn: '2026-08-13T09:12:00.000Z',
    padreId: null,
  },
  {
    id: 4,
    postId: 1,
    autorNombre: 'Comercial SEO',
    autorEmail: 'ventas@enlaces-baratos.example',
    cuerpo: 'Compra enlaces para tu blog, primeros resultados garantizados en Google.',
    estado: 'pendiente',
    creadoEn: '2026-08-13T22:47:00.000Z',
    padreId: null,
  },
  {
    id: 5,
    postId: 3,
    autorNombre: 'Rosa Millán',
    autorEmail: 'rosa.millan@ejemplo.es',
    cuerpo:
      'Lo del contador de urgencia me pasó igual: subió el clic y bajó el pedido. Es el ejemplo perfecto de métrica que se mueve sin que mejore nada.',
    estado: 'aprobado',
    creadoEn: '2026-07-29T10:02:00.000Z',
    padreId: null,
  },
  {
    id: 6,
    postId: 3,
    autorNombre: 'Andrés Vila',
    autorEmail: 'andres.vila@ejemplo.es',
    cuerpo: '¿Tenéis el desglose por dispositivo? Sospecho que en móvil el efecto es mayor.',
    estado: 'pendiente',
    creadoEn: '2026-07-30T18:30:00.000Z',
    padreId: null,
  },
  {
    id: 7,
    postId: 4,
    autorNombre: 'Pau Estrany',
    autorEmail: 'pau.estrany@ejemplo.es',
    cuerpo:
      'La regla del negro puro debería estar en todas las guías. El halo en OLED es real y se nota sobre todo con tipografías finas.',
    estado: 'aprobado',
    creadoEn: '2026-07-20T08:55:00.000Z',
    padreId: null,
  },
  {
    id: 8,
    postId: 7,
    autorNombre: 'Nuria Peláez',
    autorEmail: 'nuria.pelaez@corriente.es',
    cuerpo:
      'Añado una medida que no cabía en el artículo: por encima de 3,2 veces el cuerpo, el titular obliga a subir también los subtítulos y la jerarquía se aplana sola.',
    estado: 'aprobado',
    creadoEn: '2026-06-18T09:30:00.000Z',
    padreId: null,
  },
]
