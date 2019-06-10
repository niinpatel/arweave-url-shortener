import arweave from './arweaveSetup';
import { randomShortUrlString, currentUnixTime, getAppName } from './utils';

export const shortenUrlAndSave = async (url, wallet) => {
  const shortUrl = randomShortUrlString();

  const transaction = await arweave.createTransaction({ data: url }, wallet);
  transaction.addTag('Short-Url', shortUrl);
  transaction.addTag('App-Name', getAppName());
  transaction.addTag('Unix-Time', currentUnixTime());

  await arweave.transactions.sign(transaction, wallet);
  await arweave.transactions.post(transaction);

  return `${window.location.origin}/${shortUrl}`;
};

export const getLongUrl = async shortUrlPath => {
  const query = {
    op: 'and',
    expr1: {
      op: 'equals',
      expr1: 'App-Name',
      expr2: getAppName()
    },
    expr2: {
      op: 'equals',
      expr1: 'Short-Url',
      expr2: shortUrlPath
    }
  };

  const [txid] = await arweave.arql(query);

  if (!txid) {
    console.log('not found');
    return null;
  }

  const transaction = await arweave.transactions.get(txid);
  const longUrl = await transaction.get('data', { decode: true, string: true });

  return longUrl;
};
