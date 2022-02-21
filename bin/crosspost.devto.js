import got from 'got';
import { updateSaved } from './utils.js';

export async function updateArticle(id, article) {
  const response = await got
    .put(`https://dev.to/api/articles/${id}`, {
      headers: {
        'api-key': process.env.DEVTO_KEY,
      },
      json: { article },
    })
    .json();
  await updateSaved(response, 'devto');
}

export async function createArticle(article) {
  const response = await got
    .post('https://dev.to/api/articles', {
      headers: {
        'api-key': process.env.DEVTO_KEY,
      },
      json: { article },
    })
    .json();
  await updateSaved(response, 'devto');
}

export async function getArticles() {
  const response = await got('https://dev.to/api/articles', {
    searchParams: {
      username: process.env.DEVTO_USERNAME,
    },
  }).json();
  return response;
}

export default {
  getArticles,
  updateArticle,
  createArticle,
};
