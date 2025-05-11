# Aquariux Weather

This is a weather app where users can search for locations and check the weather of them.

This project is built using React, Typescript, TailwindCSS.

Currently, two features are available:

- Weather (Current weather and 5 days forecast)
- Location search (Search with city name)

## How to set up

After cloning this project, you need to ensure that you installed `pnpm`

Firstly, my advice is run `cp .env-example .env`, then provide the value of `VITE_API_APP_ID`. it's very important of this app

Now, we can start viewing the app, you need to run following commands:

```
pnpm install
pnpm run dev
```

## Testing

This project is tested using Jest, Testing Library.

You can just check the test cases by:

```
pnpm run test
```

If you want to check the coverage. just add `--coverage` after the test command. 

```
pnpm run test --coverage
```

## How to deploy

You can just run build by `pnpm run build`

