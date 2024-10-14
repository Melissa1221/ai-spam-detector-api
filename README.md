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

### Ejecutar el archivo `oopspam.js`

Después de transpilar los archivos, puedes ejecutar el servidor para la API de OOPSpam. Ejecuta el siguiente comando para iniciar el servidor:

```bash
node oopspam.js
```

Esto iniciará el servidor en el puerto 3000 (o el que hayas configurado). Ahora estará listo para recibir solicitudes POST en el endpoint configurado.

### Ejecutar el archivo `spamCheck.js`

Del mismo modo, puedes ejecutar el servidor para la API de **SpamCheck**. Usa este comando:

```bash
node spamCheck.js
```

---

## 3. Probar las APIs en Postman

Una vez que el servidor esté en ejecución, puedes probar los endpoints usando **Postman**. A continuación, te muestro cómo hacerlo para cada API.

### a. Pruebas de la API de **OOPSpam**

1. **URL del Endpoint**:
   - Si usas OOPSpam directamente: `http://localhost:3000/oopspam/check`
   - Si usas OOPSpam desde **RapidAPI**: `https://oopspam.p.rapidapi.com/v1/spamdetection`

2. **Headers**:
   - **Content-Type**: `application/json`
   - **X-Api-Key** (o `X-Rapidapi-Key` para RapidAPI): Tu clave API de OOPSpam.

3. **Cuerpo de prueba (JSON)**:
```json
{
    "senderIP": "185.234.219.246",
    "email": "testing@example.com",
    "content": "Dear Agent, We are a manufacturing company which specializes in supplying Aluminum Rod...",
    "checkForLength": true,
    "blockTempEmail": false,
    "allowedLanguages": ["en"],
    "allowedCountries": ["it", "us"],
    "blockedCountries": ["ru"]
}
```

#### Explicación del cuerpo:
- **senderIP**: (Opcional) Dirección IP del remitente que se validará en listas de bloqueo de IP.
- **email**: (Opcional) Correo electrónico del remitente que se validará en listas de bloqueo de correos electrónicos.
- **content**: (Requerido) El contenido que deseas analizar para spam.
- **checkForLength**: Si está activado, considerará el contenido como spam si es muy corto.
- **allowedLanguages**: Especifica los idiomas permitidos para el contenido.
- **allowedCountries**: Especifica los países permitidos para el contenido.
- **blockedCountries**: Lista de países bloqueados. Si el remitente está en alguno de estos países, será considerado spam.

### b. Pruebas de la API de **SpamCheck**

1. **URL del Endpoint**:
   - `http://localhost:3000/spamcheck/check`

2. **Headers**:
   - **Content-Type**: `application/json`
   - **Api-Key**: Tu clave API de SpamCheck.

3. **Cuerpo de prueba (JSON)**:
```json
{
    "ip": "89.22.235.226",
    "email": "ericjonesmyemail@gmail.com",
    "email_validation_method": "mx",
    "body": {
        "utm_source": "",
        "utm_medium": "",
        "utm_campaign": "",
        "first_name": "Eric",
        "last_name": "Jones",
        "email": "ericjonesmyemail@gmail.com",
        "phone": "555-555-1212",
        "message": "Hello Admin. my name is Eric and I’m betting you’d like your website to generate more leads..."
    }
}
```

#### Explicación del cuerpo:
- **ip**: Dirección IP del remitente, que será validada.
- **email**: El correo electrónico del remitente que será validado.
- **email_validation_method**: Puedes usar `mx` para validar los registros MX del dominio o `smtp` para validar si el servidor de correo puede recibir mensajes.
- **body**: Contiene información del remitente y el contenido del mensaje a analizar.

### Resultados esperados:

Dependiendo del contenido enviado, las APIs te devolverán una respuesta JSON indicando si el mensaje es spam o no, y qué factores influyeron en la decisión.

