import { MessageService } from './message.service';
describe('Message service', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('message should no message to start', () => {
    expect(service.messages.length).toEqual(0);
  });

  it('message should not empty after add', () => {
    service.add('message');
    expect(service.messages.length).toEqual(1);
  });

  it('No messages exits after clear', () => {
    service.add('message');
    service.clear();
    expect(service.messages.length).toEqual(0);
  });
});
