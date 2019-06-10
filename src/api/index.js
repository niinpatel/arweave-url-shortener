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
