# Admin - Pro Backend

Ejecutar

```sh
npm install
```

## Documentación en Postman del backend

[Psotman Link](https://documenter.getpostman.com/view/5248894/2sA3e5d7wY)

### DB

### Usuarios

- **Nombre**: String - Obligatorio
- **Email**: String - Obligatorio y único
- **Password**: String - Obligatorio - Encriptado
- **Img**: String - Opcional
- **Role**: String - Obligatorio con valor por defecto y debe de existir en una lista
- **Goggle**: Boolean - Opcional
  
### Médicos

- **Nombre**: String - Obligatorio
- **Img**: String - Opcional
- **Usuario**: Referencia al Usuario - Obligatorio
- **Hospital**: Referencia a los Hospitales - Obligatorio

### Hospitales

- **Nombre**: String - Obligatorio
- **Img**: Opcional
- **Usuario**: Referencia al Usuario - Obligatorio

### Login

- Email
- Password
- Recordar Usuario
- Api de Google Front End
- Generación de JWT

### Servicios

- CRUD (Create, Read, Update y Delete)
- Buscador general e independiente
- Carga de imágenes y archivos
- Paginaciones
- Bloqueo de imágenes
- Generador de Tokens
- Verificación de Tokens
- Validar token de Google - Backend
