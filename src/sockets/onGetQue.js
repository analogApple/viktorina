import { EVENTS } from './static';
import Questioners from '../models/Que';

export const onGetQue = Socket => {
  Socket.client.on(EVENTS.LISTEN.GET_QUE_LIST, () => {
    Questioners.find((err, res) => {
      if (err) return console.log(err);
      const names = res.map(q => ({
        name: q.name,
        id: q._id
      }));
      Socket.client.emit(EVENTS.EMIT.GET_QUE_LIST_RESPONSE, names);
    });
  });
};
