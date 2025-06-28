import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const transactionValidationRules = [
  body('amount').isNumeric(),
  body('type').isIn(['income', 'expense']),
  body('category').notEmpty(),
  body('date').isISO8601(),
];

export const validateTransactionHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const validateTransaction = [
  body('amount').isNumeric().withMessage('金額は数値である必要があります'),
  body('category').isString().notEmpty().withMessage('カテゴリは必須です'),
  body('type').isIn(['income', 'expense']).withMessage('タイプはincomeまたはexpense'),
];







