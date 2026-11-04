---
slug: iphone-duo-layout
category: Detrás de la app
title: 'Diseñar para el plegable: cómo adapté Steps Widget para iPhone Duo'
metaTitle: 'Widgets para iPhone Duo: diseñar para el plegable | Steps Widget'
description: 'iPhone Duo es un teléfono al plegarlo y dos páginas al abrirlo. Mira cómo se adapta Steps Widget a ambos, desde la nueva barra lateral hasta vistas divididas.'
date: 2026-10-28
image: /assets/blog-iphone-duo-sketch-accent.webp
keywords:
  - iphone duo
  - aplicaciones iphone duo
  - contador de pasos iphone duo
  - widgets iphone duo
  - app iphone plegable
  - postura libro iphone duo
  - barra vertical iphone duo
  - apps optimizadas iphone duo
---

iPhone Duo son dos pantallas en una. Plegado, su pantalla exterior de 5,4 pulgadas es un teléfono compacto. Abierto, la pantalla interior de 7,6 pulgadas se parece más a una pequeña tableta, con un pliegue que divide el centro. Y entre ambos estados, semiabierto como un libro, ofrece una experiencia inédita en el iPhone.

Steps Widget es una app pensada para abrirse unos segundos: comprobar el progreso del día, cambiar el estilo de un widget o consultar un aviso. En un dispositivo que cambia de forma en tus manos, esos segundos deben sentirse naturales en cualquier postura. Estirar la interfaz habitual del teléfono a lo ancho de la pantalla grande habría funcionado técnicamente, pero no se habría sentido en su lugar.

Pliega y despliega el teléfono interactivo a continuación para ver el resultado final.

![Steps Widget en iPhone Duo, plegado y abierto](/demos/iphone-duo)

**En resumen**

- **Plegado:** es muy compacto; extendí el contenido para aprovechar al máximo el espacio horizontal.
- **Abierto:** en este modo puedes ver todas las paletas de colores a la vez. Los Ajustes y el editor de estilos con foto se convierten en dos páginas independientes.
- **Semiabierto:** ningún elemento interactivo importante queda sobre el pliegue central, incluidas las hojas modales y los cuadros de confirmación.

## Plegado: un teléfono con barra lateral

En iPhone Duo, las barras de herramientas pueden dejar las zonas superior e inferior de la pantalla para agruparse en una única barra vertical a lo largo del borde físico, junto al reloj y la cámara. Esto permite que el contenido ocupe toda la altura útil de la pantalla, algo crucial en un formato tan ancho y proporcionado.

![Steps Widget plegado en iPhone Duo, con sus controles en la barra lateral](/demos/iphone-duo/folded)

Extendí el widget, el fondo y la imagen hasta el borde de la barra usando `.ignoresSafeArea(edges: .trailing)`. La mayoría de nuestros controles se trasladaron allí sin necesidad de cambios complejos: Ajustes, compartir, el botón de estilo con foto y Guardar.

Otros elementos requirieron ajustes específicos:

- **El menú de estilos y su divisor** antes se ubicaban uno al lado del otro. En la barra vertical ahora se apilan, y el divisor pasa a ser horizontal.
- **Restablecer** solo aparece cuando modificas un estilo. Indicamos al sistema que le dé prioridad a la barra lateral para que se sitúe en la misma columna que Guardar, en lugar de aparecer en una posición inesperada.
- **Las pestañas del editor de fotos** también se integraron en la barra. Cambiar entre la paleta de colores y el fondo ahora desliza el contenido verticalmente en lugar de horizontalmente, acompañando la orientación natural de las pestañas.

## Abierto: no es solo una pantalla más grande

Al abrir el iPhone Duo, el pliegue cruza justo por el centro del panel. En lugar de tratarlo como una sola superficie partida por una línea, lo enfoqué como un lienzo extendido de dos páginas.

![Pantallas de Steps Widget en el iPhone Duo abierto](/demos/iphone-duo/open)

- **Inicio:** la única pantalla que se mantiene continua. La previsualización de tu widget queda en el centro con todos los estilos organizados en filas debajo, mientras que las opciones de apariencia, formato horario y gráficas se abren como un menú desde la barra lateral.
- **Ajustes:** la lista de ajustes se mantiene a la izquierda y lo que abras desde ella (como Perspectiva, los mensajes de recordatorio o el icono de la app) aparece a la derecha. Ambas columnas coinciden con total precisión en el pliegue.
- **Estilos con foto:** la previsualización del widget en una página, y las paletas, el tono, el desenfoque y los controles de color en la otra. Puedes arrastrar la fotografía a su posición y ver el resultado en directo sin que ningún menú la cubra.

Cuando la bisagra pasa al estado semiabierto, desplazo el contenido principal hacia la derecha, donde se produce la interacción principal con la mano.

![La pantalla de inicio de Steps Widget mientras iPhone Duo se pliega y despliega](/duo/home-half-fold.mp4)

## Hojas modales, diálogos y el pliegue central

Cuando el iPhone Duo está semiabierto, el sistema desplaza las hojas y avisos por completo hacia una mitad para que nunca queden doblados sobre el pliegue. Por defecto suele ser la mitad izquierda.

Es una decisión acertada por parte del sistema, pero no siempre era la mitad adecuada para nosotros. En **Perspectiva**, el selector de mes se encuentra en la parte inferior. Al estar semiabierto lo movemos a la página derecha, y el selector desplegable aparece en ese mismo lado, justo donde ya está colocado el pulgar.

![Ajustes y Perspectiva en el iPhone Duo abierto, con el selector de mes de Perspectiva abajo](/demos/iphone-duo/sheets)

También rediseñé cómo se abre el editor de estilos con foto. Al abrirse como tarjeta flotante en la pantalla completa quedaba aislada en el centro, desconectada de la barra lateral. Ahora se presenta a pantalla completa, adoptando la misma barra y la disposición a dos páginas que el resto de la aplicación.

Nuestros cuadros de confirmación (los avisos que preguntan si deseas guardar o descartar los cambios) siguen la misma regla: se ubican en un lateral cuando el dispositivo está semiabierto.

![El editor de estilos con foto en iPhone Duo semiabierto, con un diálogo de confirmación en la página izquierda](/demos/iphone-duo/dialog)

## Construir un sistema, no depender del tipo de dispositivo

Parte de este trabajo fue invisible entre bastidores. Mantener una estructura de navegación coherente adaptándose a los distintos estados de pliegue supuso repensar la lógica de diseño desde los cimientos. Crear un sistema que distribuye el contenido de forma diferente según la postura, en vez de alterar el contenido en sí, fue la clave.

![Perspectiva en iPhone Duo plegado y abierto, compartiendo el mismo código de interfaz](/demos/iphone-duo/space)

## Para desarrolladores

Si estás adaptando tu propia app, estas son las APIs que más nos ayudaron, todas introducidas en el SDK de iOS 27.1:

- **`onHingeChange`** notifica cuándo el dispositivo se abre, se cierra o pasa a postura de libro.
- Las **regiones reservadas** de tipo `.division` facilitan la posición exacta del pliegue para que las columnas terminen con precisión matemática sobre él.
- El modificador **`axisBehavior(.verticalPreferred)`** en los elementos de barra, junto al valor de entorno **`toolbarVerticalEdge`**, permiten que los controles personalizados se adapten a la barra vertical.
- **`presentationPlacement`** define en qué lado debe presentarse una hoja modal.

```swift
.onHingeChange { _, context in
  isOpen = context.hinge.map { $0.status != .closed }
}
```

Nuestra principal conclusión: diseña el contenido como componentes reutilizables primero, y luego distribúyelos según las posibilidades de cada dispositivo.

## ¿Steps Widget es compatible con iPhone Duo?

Sí. Steps Widget se adapta a la pantalla exterior plegada, a la pantalla interior abierta y a la postura semiabierta de libro, manteniendo tu posición intacta si abres o cierras el dispositivo en mitad de una tarea.

## ¿Steps Widget funciona cuando el iPhone Duo está semiabierto?

Sí. En la postura de libro cada vista se divide limpiamente en dos páginas sobre el pliegue, y las hojas y menús se mantienen en una sola página para que ningún texto se curve sobre la bisagra.
