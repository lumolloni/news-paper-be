import type { Core } from '@strapi/strapi';
import { Server as SocketIOServer } from 'socket.io';

/**
 * Single Socket.IO server instance, shared between the bootstrap (which creates
 * it and binds it to Strapi's HTTP server) and the article lifecycles (which
 * broadcast on it). Kept module-local so we don't pollute the global `strapi`.
 */
let io: SocketIOServer | null = null;

export function initWebsocket(strapi: Core.Strapi): SocketIOServer {
  if (io) return io;

  // In production only the deployed frontend may connect (same env vars as the
  // HTTP CORS config in config/env/production/middlewares.ts). In dev any origin
  // is allowed so the Vite dev server (5173) works.
  const origins = (process.env.CORS_ORIGINS || process.env.FRONTEND_URL || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  io = new SocketIOServer(strapi.server.httpServer, {
    cors: {
      origin: origins.length ? origins : true,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    strapi.log.info(`[ws] client connected: ${socket.id}`);
    socket.on('disconnect', () => {
      strapi.log.info(`[ws] client disconnected: ${socket.id}`);
    });
  });

  strapi.log.info('[ws] Socket.IO server ready');
  return io;
}

export function getIO(): SocketIOServer | null {
  return io;
}
