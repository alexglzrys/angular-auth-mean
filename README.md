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

- **Solución 2**
- Realizar las configuraciones necesarias en el Backend, sin alterar las configuraciones por defecto que tiene el router de Angular
```
  imports: [RouterModule.forRoot(routes)]
```
- En servidores Apache, esta configuración se realiza en el .htaccess
- En Frameworks como ExpressJS, CodeIgniter, Laravel, se puede realizar en el sistema de rutas (al final)
```
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})
```
- De esta forma, le indicamos que para cualquier otra ruta, se sirva el archivo index.html de Angular. Lo que permite que el router del mismo tenga el control absoluto de sus rutas registradas

### Desplegar a producción (Backend con SPA integrada como archivos públicos) 

El siguiente listado son las instrucciones para desplegar nuestra App en Heroku (Backend + Frontend)

- Crear una cuenta en Heroku
- Crear una aplicación en Heroku **https://dashboard.heroku.com/apps**
- Instalar Keroku CLI
```
export HOMEBREW_NO_AUTO_UPDATE=1

brew tap heroku/brew && brew install heroku
```
- Hacer login desde la terminal a nuestra cuentra de Heroku
```
$ heroku login
```
- Agregar nuestra Aplicación creada en Heroku como un repositorio remoto de Git a nuestra App (asociar App con aplicación de Heroku). 
**Es importante mencionar que si o si nuestra App debe tener inicializado un repositorio local de Git**
```
heroku git:remote -a nombre-de-nuestra-aplicacion-creada-en-heroku
```
- Subir nuestra aplicación a Heroku
```
// Si nuestra App no se ha subido a github
$ git push heroku master  

// Si nuestra App ya tiene un repositorio remoto de github y la rama principal se llama main
$ git push heroku main 
```

### Subir nuevos cambios de nuestra App a Heroku (SPA integradas en el mismo Backend)

Depende en mucho de que se requiere actualizar, si el Backend o el Frontend (Angular)

- **Caso 1: Actualizar Backend**
- Se realizan los cambios pertinentes
- Se hace un commit de los cambios (no es necesario hacer un push a github, pero se recomienda si se tiene ese repositoro remoto agregado al proyecto)
- Hacer login a Heroku
```
$ heroku login
```
- Hacer push al repositorio de la aplicación en Heroku 
```
$ git push heroku main 
```

- **Caso 2: Actualizar Frontend (Angular)**
- Se realizan los cambios pertinentes
- Se hace un commit de los cambios (no es necesario hacer un push a github, pero se recomienda si se tiene ese repositoro remoto agregado al proyecto)
- Generar un Build de tipo producción de nuestra App
- Copiar y pegar el contenido del directorio dist/nombreApp al directorio de archivos públicos de nuestro backend
- Realizar todos los pasos descritos en el **Caso 1**

### Revisar logs de Heroku

Si por alguna razón deseamos obtener todos los logs que ocurren al momento de ejecutar nuestra aplicación en Heroku, solo tenemos que lanzar el siguiente comando en nuestra terminal
```
heroku logs -n 1000 --tail -a=nombre_app_a_inspeccionar_en_heroku
``` 
Lo anterior nos puede servir para
- Ver todos los logs generados desde el primer momento de que fue lanzada nuestra app
- Revisar por que falla algo que si funciona en local (console.log())
- Ver a que puertos se esta conectando nuestra app en producción
- **-n ### indica el número máximo de lineas de log que queremos recuperar**
