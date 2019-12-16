import { EVENTS } from '../api/static';
import Questioners from '../models/Que';

export const onAddQue = Socket => {
  Socket.client.on(EVENTS.LISTEN.ADD_QUE, data => {
    const questioner = new Questioners(data);
    questioner.save((e, product) => console.log(e, product, 'save to data base'));
  });
};
