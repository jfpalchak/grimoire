### NOTES
* GraphQL notes:
  * For the simple purposes of this project, could simply use React Query + fetch or GraphQL Request (or even just a fetch) to make our GraphQL requests, especially since we're still making requests to the REST endpoints (could use RQ w/ both gql & rest fetches). 
  * ie:
  ```javascript
  const gqlFetcher = <TData>(
    query: string,
    variables?: Record<string, unknown>,
  ): (() => Promise<TData>) => {
    return async () => {
      const res = await fetch('url/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const { data, errors } = await res.json();

      if (errors) {
        const { message } = errors[0];
        throw new Error(message);
      }

      return data;
    }
  };

  // Grab all spells
  const { data } = useQuery({
    queryKey: ['spells'],
    queryFn: gqlFetcher<Spells>(GET_ALL_SPELLS),
  });

  // Grab individual spell
  const { data } = useQuery({
    queryKey: ['spell', index],
    queryFn: restFetcher<Spell>(`spells/${index}`),
  });
  ```

### TODO
* WIP Class Card
* WIP Navigation
  * -> Spellbook: user collection of saved spells, etc
    * -> Custom spells? Custom monsters?
  * -> Bag of Holding: user collection of saved items
