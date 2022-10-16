import { GraphQLClient } from 'graphql-request'
import { API_URL, API_TOKEN } from '$env/static/private'

/**
 * @param {any} params
 */

export const load = async ({ params }) => {
	const { slug } = params
	const hygraph = new GraphQLClient(API_URL, {
		headers: {
			Authorization: `Bearer ${API_TOKEN}`
		}
	})

	const { post } = await hygraph.request(
		`query Post($slug: String!) {
            post(where: {slug: $slug}) {
              title
              content {
                html
				text
              }
              image {
                url
              }
            }
        }`,
		{
			slug
		}
	)

	return {
		post
	}
}
