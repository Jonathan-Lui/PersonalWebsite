import axios from 'axios';
import { serialize } from 'cookie';
import parser from 'ua-parser-js';
import { v4 as uuidv4 } from 'uuid';
import { VercelRequest, VercelResponse } from '@vercel/node';

import { client } from '../../lib/db';

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method !== 'POST') {
    response.status(400).end();
  }

  await client.connect();

  // Check if user is new or returning
  let visitorID: string = request.cookies['visitor_id'];
  if (visitorID == null) {
    visitorID = uuidv4();
  }

  // Generate a unique visit ID for tracking
  let visitID: string = uuidv4();

  // Get user IP address
  const ipAddress =
    (request.headers['x-forwarded-for'] as string)?.split(',').shift() || request.socket?.remoteAddress || null;

  // Get referrers
  const referrer: string = request.body['referrer'];
  const customReferrer: string = request.body['custom_referrer'];

  // Get screen size
  const screenHeight: number = request.body['screen_height'];
  const screenWidth: number = request.body['screen_width'];

  // Parse user-agent string
  const uaString = request.headers['user-agent'];
  const ua = parser(uaString as string);
  const browserName = ua.browser.name;
  const browserVersion = ua.browser.version;
  const platformName = ua.os.name;
  const platformVersion = ua.os.version;

  // Set visitor ID on cookie
  const cookie = serialize('visitor_id', visitorID);
  response.setHeader('Set-Cookie', [cookie]);

  // Add visit to database
  const query =
    'INSERT INTO visits(visit_id, visitor_id, ip_address, referrer, custom_referrer, browser, browser_version, platform, platform_version, screen_height, screen_width) ' +
    'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);';
  const values = [
    visitID,
    visitorID,
    ipAddress,
    referrer,
    customReferrer,
    browserName,
    browserVersion,
    platformName,
    platformVersion,
    screenHeight,
    screenWidth,
  ];

  await client.query(query, values);

  // Cache IP if needed
  const rowCount = await client.query('SELECT COUNT(*) AS num FROM locations WHERE ip_address = $1;', [ipAddress]);
  if (rowCount.rows[0]['num'] < 1) {
    const ipRes = await axios.get(`http://api.ipstack.com/${ipAddress}?access_key=${process.env.IPSTACK_API_KEY}`);
    const ipDetails = ipRes.data;

    const ipQuery =
      'INSERT INTO locations(ip_address, latitude, longitude, city, region, country) VALUES($1, $2, $3, $4, $5, $6)';
    const ipValues = [
      ipAddress,
      ipDetails['latitude'],
      ipDetails['longitude'],
      ipDetails['city'],
      ipDetails['region_name'],
      ipDetails['country_name'],
    ];

    await client.query(ipQuery, ipValues);
  }

  await client.clean();
  response.status(200).json({ visit_id: visitID });
};
