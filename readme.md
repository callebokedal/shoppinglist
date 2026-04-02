# Shopping list App

An app to simplify planning and purchasing things.

## Goal

The goal is to help out how to remember things to buy, and where they are located in the store.

## Demo

TODO

## Use cases

- The app has multiple "pages"
    - Shopping list
        - Where to add things to buy
        - Where to mark things as completed (put in my shopping basket)
        - It should be possible to select store for this particular shopping list (may also be empty)
        - Items are sorted according to currently selected store
        - Showing quantity to buy for each item
        - It should be easy to add items to the list by just writing a couple of letters (then matching items will be displayed for selecting)
            - If a new name is entered, add this to the list
            - Quantity should be easy to add
        - It should be easy to re-order an item on the shopping list via drag and drop
            - If a store is currently linked to this shopping cart - then update the order for that item and that store accordingly automatically
            - If no store is currently linked to this shopping cart - add items and order according to a "default store" (not visible but acting as default store)
    - Stores
        - Where user manages stores
            - Each store has at least a name and then remembers the order (section) of each item
    - Items
        - Quantity [visible on shopping list]
        - Name  [visible on shopping list]
        - Store order [in what order this item comes in the store, hidden in the shopping list but affects sort order of course]
        - Last bought [like a short ISO 8601 timestamp]
    - Statistics
        - Show some way to visualize which items are most common to being bought and how often
    - At least 10 latest actions should be possible to "undo"
    - Logs
        - A log of last actions must be accessible

- It is possible to switch UI language using a "Settings" page/view.
    - English and Swedish are currently supported (Swedish default)

- Data stored using localStorage items (in JSON format)

## Data model

TODO

## Project conventions

See [CLAUDE.md](./CLAUDE.md) for full coding conventions.

## Technical stack
- Container managed by Podman on MacOS
- React 18 with JavaScript
- Vite as build tool
- Tailwind CSS for styling
- React Query for server state (when/if needed)
- Zustand for client state
- React Router v6 for routing

## Roadmap

- Add backend storage

## Development build instructions

```sh
# Install dependencies (never run npm on the host machine directly)
podman run --rm -v $(pwd):/app:z -w /app node:22-alpine sh -c "npm install"

# Security audit
podman run --rm -v $(pwd):/app:z -w /app node:22-alpine sh -c "npm audit"
# -> Should return "found 0 vulnerabilities"

# Run in development mode
podman run --rm -p 5178:5178 -v $(pwd):/app:z -w /app node:22-alpine sh -c "npm run dev -- --host 0.0.0.0"

# To build single page artifacts
# Note that GitHub can source pages from the `/docs` folder, but not `/dist` folder
podman run --rm -v $(pwd):/app:z -w /app node:22-alpine sh -c "npm run build"

# To run manual tests
podman run --rm -v $(pwd):/app:z -w /app node:22-alpine sh -c "npm test" 2>&1

```

## Initial setup (first time only)

```sh
# Create project with Vite
podman run --rm -v $(pwd):/app:z -w /app node:22-alpine \
  sh -c "npm create vite@latest . -- --template react && npm install"

# Update dependencies
podman run --rm -v $(pwd):/app:z -w /app node:22-alpine \
  sh -c "npm install -g npm-check-updates && ncu -u && npm install"
```
