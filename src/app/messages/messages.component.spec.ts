import { MessagesComponent } from './messages.component';
describe('message component', () => {
  const messsageService = jasmine.createSpyObj(['add', 'clear']);
  it('messages component should setup', () => {
    expect(new MessagesComponent(messsageService)).toBeTruthy();
  })
});










