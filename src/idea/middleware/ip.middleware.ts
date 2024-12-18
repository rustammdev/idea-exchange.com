import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // IP manzilini olish
    const userIp =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Agar userIp massiv bo'lsa, faqat birinchi IP manzilini tanlab olish
    let ip: string;
    if (Array.isArray(userIp)) {
      ip = userIp[0]; // Agar `x-forwarded-for` bir nechta IP manzillarini qaytarsa, birinchi manzilni olamiz
    } else {
      ip = userIp as string; // Agar `userIp` bitta IP manzili bo'lsa, uni string sifatida olish
    }

    // IP manzilini saqlash (misol uchun req obyektiga qo'shamiz)
    req['userIp'] = ip;

    // Keyingi middleware'ga o'tish
    next();
  }
}
