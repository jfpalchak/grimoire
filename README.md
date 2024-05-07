### TODO
* Would like to transition from using fetch API to GraphQL (urql).

* WIP Monster Card:
  * Examples: Archmage, Mummy Lord, Aboleth, Azer
* WIP Equipment Card
  * WIP Magic Item Card

* WIP Rules:
  * Each Rule endpoint contains numerous rule-sections.

### NOTE FOR SEARCH/FILTER
Don't use searchParams as props, as this sends a network request each time we update the searchParams and receive new prop values from the server.

Instead, we'll want to use the useSearchParams hook in a client component, as this will save our Page from sending new network requests each time we update the url search params.