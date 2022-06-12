import { Pipe } from '@angular/core';
import { StrengthPipe } from './strength.pipe';
describe('Strength pipe', () => {

    it('should display weak if strength is 5', () => {
        let pipe = new StrengthPipe();
        let result = pipe.transform(5);
        expect(result).toBe("5 (weak)");
    })

})