import { VercelRequest, VercelResponse } from '@vercel/node';
import { v4 as uuidv4 } from 'uuid';

import { client } from '../../lib/db';

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method !== 'POST') {
    response.status(400).end();
  }

  await client.connect();

  const visitID: string = request.body['visit_id'];
  if (visitID == null) {
    response.status(400).end();
  }

  const action: string = request.body['action'];
  if (action == null) {
    response.status(400).end();
  }

  const eventCategory: string = request.body['event_category'];
  const eventDetail: string = request.body['event_detail'];
  const eventID: string = uuidv4();

  const query = 'INSERT INTO events(event_id, visit_id, action, category, detail) VALUES($1, $2, $3, $4, $5);';
  const values = [eventID, visitID, action, eventCategory, eventDetail];
  await client.query(query, values);

  await client.clean();
  response.status(200).end();
};
