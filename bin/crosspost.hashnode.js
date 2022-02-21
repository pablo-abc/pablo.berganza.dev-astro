import got from 'got';
import { updateSaved } from './utils.js';

const GET_TAGS = `
query GetTags {
  tagCategories {
    _id
    name
    slug
  }
}`;

async function getTags() {
  const response = await got
    .post('https://api.hashnode.com', {
      json: {
        operationName: 'GetTags',
        query: GET_TAGS,
      },
    })
    .json();
  return response.data.tagCategories;
}

const UPDATE_STORY = `
mutation UpdateStory(
  $id: String!
  $input: UpdateStoryInput!
) {
  updateStory(
    postId: $id
    input: $input
  ) {
    code
    success
    post {
      _id
      title
      slug
    }
  }
}`;

export async function updateArticle(id, article) {
  const tags = await getTags();
  const response = await got
    .post('https://api.hashnode.com', {
      headers: {
        Authorization: process.env.HN_KEY,
      },
      json: {
        operationName: 'UpdateStory',
        query: UPDATE_STORY,
        variables: {
          id,
          input: {
            title: article.title,
            contentMarkdown: article.body_markdown,
            tags: article.tags
              .map((tag) => {
                return tags.find(
                  (t) => t.slug.toLowerCase() === tag.toLowerCase()
                );
              })
              .filter(Boolean),
            isPartOfPublication: {
              publicationId: process.env.HN_PUBLICATIONID,
            },
            slug: article.slug,
            coverImageURL: article.main_image,
            isRepublished: {
              originalArticleURL: article.canonical_url,
            },
          },
        },
      },
    })
    .json();
  if (response.errors) {
    throw new Error(response.errors[0].message);
  }
  const post = response.data.updateStory.post;
  await updateSaved(
    {
      id: post._id,
      slug: post.slug,
      title: post.title,
    },
    'hashnode'
  );
}

const CREATE_STORY = `
mutation CreateStory(
  $input: CreateStoryInput!
  $publicationId: String!
) {
  createPublicationStory(
    input: $input
    publicationId: $publicationId
  ) {
    post {
      _id
      title
      slug
    }
  }
}`;

export async function createArticle(article) {
  const tags = await getTags();
  const response = await got
    .post('https://api.hashnode.com', {
      headers: {
        Authorization: process.env.HN_KEY,
      },
      json: {
        operationName: 'CreateStory',
        query: CREATE_STORY,
        variables: {
          publicationId: process.env.HN_PUBLICATIONID,
          input: {
            title: article.title,
            contentMarkdown: article.body_markdown,
            tags: article.tags
              .map((tag) => {
                return tags.find(
                  (t) => t.slug.toLowerCase() === tag.toLowerCase()
                );
              })
              .filter(Boolean),
            slug: article.slug,
            coverImageURL: article.main_image,
            isRepublished: {
              originalArticleURL: article.canonical_url,
            },
          },
        },
      },
    })
    .json();
  if (response.errors) {
    throw new Error(response.errors[0].message);
  }
  await updateSaved(response, 'hashnode');
}

const GET_USER = `
query GetUser($username: String!) {
  user(username: $username) {
    publication {
      posts {
        _id
        title
        slug
      }
    }
  }
}`;

export async function getArticles() {
  const response = await got
    .post('https://api.hashnode.com', {
      json: {
        operationName: 'GetUser',
        query: GET_USER,
        variables: {
          username: process.env.HN_USERNAME,
        },
      },
    })
    .json();
  if (response.errors) {
    throw new Error(response.errors[0].message);
  }
  const articles = response.data.user.publication.posts.map((p) => {
    p.id = p._id;
    return p;
  });
  return articles;
}

export default {
  getArticles,
  updateArticle,
  createArticle,
};
