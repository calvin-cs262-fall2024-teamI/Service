# SwoleMate Service

This is the backend service for [SwoleMate](https://github.com/calvin-cs262-fall2024-teamI/SwoleMateClient).

[Database Schema](./SwoleMate.sql)

[Database Schema With Sequelize](./src/models/)

[Sample Data](./scripts/sample_data.ts)

### Setup

1. Install dependencies `npm install`
2. Create `.env` file based on `.env.example`
3. Run `npm run script scripts/syncDB.ts` to create tables.

### Running scripts

```bash
npm run script <script-name> # e.g. scripts/xxx.ts
```

### Running server

```bash
npm run dev
```
