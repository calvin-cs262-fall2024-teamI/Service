# SwoleMate Service

This is the backend service for [SwoleMate](https://github.com/calvin-cs262-fall2024-teamI/SwoleMateClient).

[Database Schema](./SwoleMate.sql)

[Database Schema With Sequelize](./src/models/)

[Sample Data](./scripts/sample_data.ts)

### Default Domain

[swolemate-service.azurewebsites.net](swolemate-service.azurewebsites.net)

### Setup

1. Install dependencies `npm install`
2. Create `.env` file based on `.env.example`
3. Run `npm run script scripts/syncDB.ts force` to create tables.
4. Run `npm run script scripts/fakeDB.ts` to populate the database with sample data.

### Running scripts

```bash
npm run script <script-name> # e.g. scripts/xxx.ts
```

### Running server

```bash
npm run dev
```

### API Documentation

[API Documentation](./API.md)
