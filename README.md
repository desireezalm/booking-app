# Back-end Project Assignment

- **Learning Institution:** _[Winc Academy](https://github.com/WincAcademy "Winc Academy")_
- **Course:** _Full-stack Development_
- **Student:** _Desirée Zalm_
- **Date:** _30-11-2024_

## Description

Back-end for a booking application.

## Contents

### **_API endpoints_**

- Users
- Login
- Users
- Hosts
- Amenities
- Properties
- Bookings
- Reviews

### **_Database schema_**

![data model](https://github.com/desireezalm/booking-app/blob/main/media/booking_model.jpg?raw=true)
Credit: [Winc Academy](https://github.com/WincAcademy "Winc Academy")

### **_CRUD service functions_**

![resources](https://github.com/desireezalm/booking-app/blob/develop/media/booking_resources.jpg?raw=true)

### **_Other functions_**

- Authentication
- Error handling
- Logging
- Test data in JSON format

## Technologies Used

- JavaScript
- [Vite](https://vite.dev/ "Vite")
- [Vitest](https://vitest.dev/ "Vitest") (Unit testing)
- [Postman](https://www.postman.com/ "Postman") (API testing)
- [Express.js](https://expressjs.com/ "Express.js")
- [Prisma](https://www.prisma.io/ "Prisma") (ORM)
- [CockroachDB](https://www.cockroachlabs.com/ "CockroachDB") (database)
- [Sentry](https://sentry.io/ "Sentry") (Error handling)
- [JSON Web Token](https://jwt.io/ "JSON Web Token") (authentication)
- `winston` - [link](https://www.npmjs.com/package/winston "Winston") (logging)
- `dotenv` - [link](https://www.npmjs.com/package/dotenv "link")
- `uuid()` - [link](https://www.npmjs.com/package/uuid "link")

## Commands

- `npm run dev`
- `npx prisma db seed`
- `npx prisma db push --force-reset`
- `npx prisma studio`
- `npm test`
- `npm run test-positive`
- `npm run test-negative`
