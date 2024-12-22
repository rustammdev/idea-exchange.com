import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // IP manzilini olish
    let userIp =
      (req.headers['x-forwarded-for'] as string) ||
      req.socket.remoteAddress ||
      null;
    // Agar x-forwarded-for header comma bilan ajratilgan bo'lsa
    if (typeof userIp === 'string' && userIp.includes(',')) {
      userIp = userIp.split(',')[0].trim();
    }

    // IPv6 formatini IPv4 ga o'tkazish
    if (userIp === '::1') {
      userIp = '127.0.0.1';
    }

    // IP ni request obyektiga custom property sifatida qo'shish
    (req as any).clientIp = userIp;

    next();
  }
}
