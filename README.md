### Actualización del README

```markdown
# README: Configuración y pruebas de APIs OOPSpam y SpamCheck con TypeScript

## Introducción

Este proyecto implementa dos APIs para la detección de spam: **OOPSpam** y **SpamCheck**. Ambas APIs permiten detectar contenido sospechoso basado en direcciones IP, correos electrónicos y el contenido de mensajes.

## Requisitos previos

- **Node.js** v12 o superior
- **Postman** (para realizar pruebas de las APIs)
- **Claves API** válidas para **OOPSpam** y **SpamCheck**
- **TypeScript** configurado en tu entorno de desarrollo

---

## 1. Configuración del entorno

### a. Instalar dependencias

Primero, clona el repositorio y navega al directorio del proyecto. Luego, instala todas las dependencias listadas en el archivo `package.json` con el siguiente comando:

```bash
npm install
```

### b. Crear archivo `.env`

Crea un archivo `.env` en la raíz del proyecto, donde almacenarás tus claves API de **OOPSpam** y **SpamCheck**. Asegúrate de que el archivo `.env` siga el siguiente formato:

```plaintext
OOPSPAM_API_KEY=tu_oopspam_api_key
SPAMCHECK_API_KEY=tu_spamcheck_api_key
```

- **OOPSPAM_API_KEY**: Clave API de OOPSpam.
- **SPAMCHECK_API_KEY**: Clave API de SpamCheck.

### c. Transpilar el código TypeScript

Dado que el código fuente está en **TypeScript**, es necesario transpilarlo a **JavaScript** antes de ejecutarlo. Para ello, usa el siguiente comando:

```bash
npx tsc
```

Este comando generará los archivos `.js` correspondientes a partir de los archivos `.ts` en tu proyecto.

---

## 2. Ejecución del servidor

### Ejecutar el archivo `server.js`

Después de transpilar los archivos, puedes ejecutar el servidor para la API de OOPSpam y SpamCheck. Ejecuta el siguiente comando para iniciar el servidor:

```bash
node dist/server.js
```

Esto iniciará el servidor en el puerto 3000 (o el que hayas configurado). Ahora estará listo para recibir solicitudes POST en el endpoint configurado.

---

## 3. Probar las APIs en Postman

Una vez que el servidor esté en ejecución, puedes probar los endpoints usando **Postman**. A continuación, te muestro cómo hacerlo para cada API.

---

### a. Pruebas del endpoint `/check-spam`

Este endpoint combina las evaluaciones de **OOPSpam** y **SpamCheck** para determinar si el mensaje enviado es spam.

1. **URL del Endpoint**:
   - `http://localhost:3000/check-spam`

2. **Headers**:
   - **Content-Type**: `application/json`

3. **Cuerpo de prueba (JSON)**:
```json
{
    "message": "Hello Admin. my name is Eric and I’m betting you’d like your website to generate more leads...",
    "from": "email@test.com",
    "title": "Urgent message: You won!"
}
```

4. **Resultado esperado (Ejemplo):**
   El servidor devolverá un resultado simplificado indicando si el mensaje es spam según cada API:

```json
{
    "spamcheck": {
        "isSpam": false
    },
    "oopspam": {
        "isSpam": true
    }
}
```

---

## Conclusión

Este proyecto integra las APIs de **OOPSpam** y **SpamCheck** para evaluar contenido de mensajes en busca de spam. Con la configuración adecuada, puedes implementar un sistema robusto para proteger tus aplicaciones de contenido sospechoso.

Para cualquier duda o problema, revisa los logs del servidor o los datos de respuesta de las APIs en Postman.
```