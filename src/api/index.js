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
  const longUrl = await extractTransactionData(transaction);

  return longUrl;
};

export const getWalletAddress = async wallet =>
  arweave.wallets.jwkToAddress(wallet);

export const getAllSavedUrls = async walletAddress => {
  const query = {
    op: 'and',
    expr1: {
      op: 'equals',
      expr1: 'from',
      expr2: walletAddress
    },
    expr2: {
      op: 'equals',
      expr1: 'App-Name',
      expr2: getAppName()
    }
  };

  const txids = await arweave.arql(query);

  const savedUrls = Promise.all(
    txids.map(txid => arweave.transactions.get(txid))
  )
    .then(transactions =>
      Promise.all(
        transactions.map(transaction => {
          return Promise.all([
            extractTransactionData(transaction),
            extractTransactionTags(transaction)
          ]);
        })
      )
    )
    .then(transactions => transactions.map(extractUrlsFromDecodedTransaction));

  return savedUrls;
};

const extractTransactionData = async transaction =>
  transaction.get('data', { decode: true, string: true });

const extractTransactionTags = async transaction => {
  const tagIds = await transaction.get('tags');
  return Promise.all(
    tagIds.map(tag =>
      Promise.all([
        tag.get('name', { decode: true, string: true }),
        tag.get('value', { decode: true, string: true })
      ])
    )
  ).then(tags => tags.map(([name, value]) => ({ name, value })));
};

const extractUrlsFromDecodedTransaction = ([data, tags]) => {
  const longUrl = data;
  const shortUrlPath = tags.find(tag => tag.name === 'Short-Url').value;
  const shortUrl = `${window.location.origin}/${shortUrlPath}`;

  return { longUrl, shortUrl };
};
