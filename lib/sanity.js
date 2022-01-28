import sanityClient from "@sanity/client";

export const client = sanityClient({
    projectId: 'ga0dyt2e',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: 'skIWdG46uxk1HnjBhwDDJ4SaZ5WoyXMO4dbyED3o8AOyhNwUwwyoWlQu2cgtjfEN20UVsFoXlxosiGD1HNmVTSh1HMiI4hZQSszTY3F2JZGQvDR9cRS5eZgYoFYTkyGntOS8O23vHrb8gEOuqaim7PYD1E96afdgUngEu5DXZ0A5YVL1CtIt',
    useCdn: false,
})