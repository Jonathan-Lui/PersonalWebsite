import { VercelRequest, VercelResponse } from '@vercel/node';

import { client } from '../../lib/db';

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method !== 'POST') {
    response.status(400).end();
  }

  await client.connect();

  const visitID: string = JSON.parse(request.body)['visit_id'];
  if (visitID != null && visitID !== 'undefined') {
    const query = 'UPDATE visits SET end_time = current_timestamp() WHERE visit_id = $1;';
    await client.query(query, [visitID]);
  }

  await client.clean();
  response.status(200).end();
};
