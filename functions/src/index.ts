import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const cors = require('cors')({origin: true});
const StreamChat = require('stream-chat').StreamChat;

const serverStreamClient = StreamChat.getInstance(
  functions.config().stream.key,
  functions.config().stream.secret
);

admin.initializeApp();

export const createUser = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { user } = request.body;
    if (!user) {
      throw new functions.https.HttpsError('failed-precondition', 'Bad Request');
    } else {
      try {
        await serverStreamClient.upsertUser({
          id: user.uid,
          name: user.displayName,
          email: user.email
        });
        response.status(200).send({ message : 'User created'})

      } catch (error) {
        throw new functions.https.HttpsError('aborted', 'Could not create a chat user');
      }
    }
  })

});

export const createToken = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { user } = request.body;
    if (!user) {
      throw new functions.https.HttpsError('failed-precondition', 'Bad Request');
    } else {
      try {
        const token = await serverStreamClient.createToken(user.uid);
        response.status(200).send({ token })

      } catch (error) {
        throw new functions.https.HttpsError('aborted', 'Could not create a chat user');
      }
    }
  })
})


export const revokeUserToken = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { user } = request.body;
    if (!user) {
      throw new functions.https.HttpsError('failed-precondition', 'Bad Request');
    } else {
      try {
        await serverStreamClient.revokeUserToken(user.uid);
        response.status(200).send({})

      } catch (error) {
        throw new functions.https.HttpsError('aborted', 'Could not create a chat user');
      }
    }
  })
})

