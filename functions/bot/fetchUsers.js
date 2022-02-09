require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { doc, getFirestore, setDoc, writeBatch } = require("firebase/firestore");
const { anyPass, equals, any, splitEvery } = require('ramda');
const {
  discordKey,
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = require('../config');

// Initialize Firebase
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const printPass = (obj) => { console.log(obj); return obj; };
const getFetchUsers = (client) => async () => {
  await client.login(discordKey);
  client.once('ready', async () => {
    const rolesIds = {
      COURTSIDE_ID: '916123593753112616',
      CLUB_ID: '916157625291395102',
      UPPER_ID: '916124443582017546',
      WILLCALL_ID: '850848105556475924',
      COURTSIDE_OLD_ID: '912363347641511956',
      CLUB_OLD_ID: '912365367588950047',
      UPPER_OLD_ID: '912365613337427998',
      GUEST_ID: '912821336387240017',
    }
    
    client.guilds.fetch()
      .then(x => Array.from(x.values())[0]) // TODO: make this detect KH by name or id
      .then(x => x.fetch())
      .then(x => x.members.fetch())
      .then(x => Array.from(x.values()))
      .then(x => x.filter(y => !y.user.bot))
      .then(x => x.filter(user => {
        const roles = user._roles
        return roles.includes(rolesIds.COURTSIDE_ID) 
          || roles.includes(rolesIds.CLUB_ID) 
          || roles.includes(rolesIds.UPPER_ID) 
          || roles.includes(rolesIds.WILLCALL_ID)
          || roles.includes(rolesIds.COURTSIDE_OLD_ID)
          || roles.includes(rolesIds.CLUB_OLD_ID)
          || roles.includes(rolesIds.UPPER_OLD_ID)
          || roles.includes(rolesIds.GUEST_ID)
      }))
      .then(x => { console.log(x.length); return x; })
      .then(x => x.map(user => ({ name: user.user.username, discord: { avatar: user.user.avatar, roles: user._roles, id: user.user.id, username: user.user.username }})))
      .then(users => {
        const batches = splitEvery(500, users);
        batches.map((users, i) => {
          console.log(`Batch ${i}`)
          const batch = writeBatch(db);
          users.map(user => batch.set(doc(db, 'users', user.discord.id), user))
          batch.commit()
        })
      })
  })
}


module.exports = { getFetchUsers }