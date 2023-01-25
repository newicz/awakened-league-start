import { store } from '../store/store'

export default class PoeLogService {
    public static readonly CLIENT_LOG_PATH: string = "logs\\Client.txt";
    private static readonly LEVEL: RegExp = / : (.+) \((.+)\) is now level (.+)/;
    private static readonly AREA: RegExp = / : You have entered (.+)\./;

    static process(line: string) {
        if (!PoeLogService.LEVEL.test(line)) {
            console.log('Line failed test')
            return
        }

        const processed = line.match(PoeLogService.LEVEL);
        if (!processed) {
            return
        }

        const levelChangeEvent: { character: string; level: string } = {
            character: processed[1],
            level: processed[3],
        };
        const character: Character = store.character as Character

        if (!character || levelChangeEvent.character != character.name) {
            console.log('Character check failed')
            return
        }
        
        character.level = Number(levelChangeEvent.level)
        store.setCharacter(character)
    }
}
