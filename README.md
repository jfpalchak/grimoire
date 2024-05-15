### TODO
* Would like to transition from using fetch API to GraphQL (urql, or apollo).
* Validate API responses with Zod?

* WIP Spells Card & Monster Card.
* WIP Equipment & Magic Item Card
* WIP Class Card
* WIP Navigation
  * -> Basic Rules
  * -> Explore: Spells, Monsters, Classes, Equipment, etc
  * -> Spellbook: user collection of saved spells, etc
    * -> Custom spells? Custom monsters?

### NOTE FOR SEARCH/FILTER
Don't use searchParams as props, as this sends a network request each time we update the searchParams and receive new prop values from the server.

Instead, we'll want to use the useSearchParams hook in a client component, as this will save our Page from sending new network requests each time we update the url search params.