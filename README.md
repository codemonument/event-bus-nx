# Event-Bus-Nx

A NX Monorepo for a typed event-bus implementation

---

# Repo Log

## 2022-07-20 libs/event-bus-core

1. `nx generate @nrwl/js:library --name=event-bus-core --publishable --tags=type:lib,project:event-bus-core --importPath @codemonument/event-bus-core --pascalCaseFiles --strict --config project --compiler swc --skipTypeCheck`

## 2022-07-20 create-nx-workspace

1. `npx create-nx-workspace --name event-bus-nx --preset empty --interactive --cli nx --nxCloud`  
   Options: https://nx.dev/nx/create-nx-workspace
2. Add github remote origin at: https://github.com/codemonument/event-bus-nx
3. Move nx-cloud token into a .env file and ignore it in .gitignore
