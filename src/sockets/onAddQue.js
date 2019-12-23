import { EVENTS } from './static';
import Questioners from '../models/Que';

export const onAddQue = Socket => {
  Socket.client.on(EVENTS.LISTEN.ADD_QUE, data => {
    const questioner = new Questioners(data);
    questioner.save((e) => console.log(e));
  });
};
