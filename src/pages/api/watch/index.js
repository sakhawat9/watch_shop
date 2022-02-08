import nc from 'next-connect';
import Watch from '../../../models/Watch';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const watch = await Watch.find({});
  await db.disconnect();
  res.send(watch);
});

export default handler;