import { Router } from "express";

const aiRoutes = Router();

aiRoutes.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

export default aiRoutes;