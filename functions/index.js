const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require('algoliasearch');

admin.initializeApp();

const algoliaClient = algoliasearch('CJQI1GSDF6', '23df10b43136c09b11a1e4979d7972a5');
const algoliaIndex = algoliaClient.initIndex('accounts');

exports.indexPost = functions.firestore.document('accounts/{accountId}').onCreate(async (snap, context) => {
  const account = snap.data();

  console.log(account.userName);

  await algoliaIndex.saveObjects([
    {
      objectID: snap.id,
      account: account.userName
    }
  ]);
})