import sanityClient from '@sanity/client';
import imageBuilder from '@sanity/image-url';

const client = sanityClient({
    projectId: 'd6ab47ge',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-02-01'
})

const builder = imageBuilder(client);

export const urlFor = source => builder.image(source);

export default client;