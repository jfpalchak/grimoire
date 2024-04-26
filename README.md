### TODO
* Would like to transition from using fetch API to GraphQL.
* Fix formatting on markdown tables in spell descriptions.
  * Examples: control-weather, confusion, creation

* Monster Card:
  * Examples: Ancient Red Dragon, Azer
  
### Dynamic Routes for Category & Index:
```
- [category]
  - page.tsx
  - [index]
    - page.tsx
```
Which entails conditionally rendering the appropriate stat card for a given category.
Basically simulating React Router which feels silly to do in Next, but then again,
this would reduce the amount of files/code by a great deal.

### OR, static routes for Category & Index:
```
- [category]???
  - page.tsx
- monsters
  - page.tsx
  - [slug]
    - page.tsx
- spells
  - [slug]
    - page.tsx
- equipment
  - [slug]
    - page.tsx
- classes
  - [slug]
    - page.tsx
```

With a dynamic route for category lists? Or separate each category into its own static route?
More repeated code, more files, but static file structure might be easier to navigate.

### So far:
Not sure yet, but I lean towards the nested dynamic routes. Although it's possible each category
may need custom components for filters/features down the road.