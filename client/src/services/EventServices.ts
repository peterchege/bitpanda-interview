/* eslint-disable import/prefer-default-export */
import { Todo } from '../types/Todo';

const baseURL = 'http://localhost:3000/api/v1';

export async function createTodo(description: string): Promise<Todo> {
  const url = new URL(`${baseURL}/todo`);

  return fetch(url.toString(), {
    method: 'POST',
    body: JSON.stringify({ description }),
    headers: new Headers({ 'Content-type': 'application/json' }),
  }).then((res) => res.json()) as Promise<Todo>;
}
