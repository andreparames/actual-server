import Fallback from './integration-bank.js';

import { formatPayeeName } from '../../util/payee-name.js';

/** @type {import('./bank.interface.js').IBank} */
export default {
  ...Fallback,

  institutionIds: [
    'CETELEM_BLACK',
  ],

  /**
   * Sign of transaction amount needs to be flipped for Cetelem Black credit cards
   */
  normalizeTransaction(transaction, _booked) {
    transaction.transactionAmount = {
      // Flip transaction amount sign
      amount: (-parseFloat(transaction.transactionAmount.amount)).toString(),
      currency: transaction.transactionAmount.currency,
    };

    return {
      ...transaction,
      payeeName: formatPayeeName(transaction),
      date: transaction.valueDate,
    };
  }
};
