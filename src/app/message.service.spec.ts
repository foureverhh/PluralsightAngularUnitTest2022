import { MessageService } from './message.service';
describe('Message service', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('message should no message to start', () => {
    expect(service.messages.length).toEqual(0);
  })
});
