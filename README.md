## Empaquetar App para producción

Generar la carpeta dist con los archivos necesarios para distribuir la aplicación Angular en producción
```
ng build --configuration production   
```

### Servir App Angular en ExpressJS

Copiar los archivos generados por el empaquetador y pegarlos en el directorio público de nuestra aplicación angular
```
// Directorio con recursos publicos
app.use(express.static('public'));
```

### Solventar conflicto entre rutas (Frontend vs Backend)

Angular al ser un SPA, tiene su propio sistema de rutas. Pero el Backend, tambien tiene un sistema de rutas el cuál tiene prioridad sobre el router de Angular.
- **Solución 1**
- Agregar una configuración adicional al sistema de rutas de Angular, indicando que use el sistema de Hash. Esto evita el tener que hacer configuraciones en el backend. Modificando el .htaccess.
```
imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
``` 
- El único inconveniente es que la URL tendrá un # (hash) después del dominio del servidor, lo que la hace ver un poco fea
- La ventaja es que nuestra SPA podrá ser desplegada en la mayoría de los navegadores modernos y antigüos como IE. 
