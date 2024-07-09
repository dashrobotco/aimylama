export default function handler(req, res) {
    res.status(200).json({ status: 'OK', message: 'Socket test endpoint is accessible' });
  }