export default {
    account: '',
    characters: new Array<Character>,
    character: {},

    setAccount(account: string) {
        this.account = account
    },

    setCharacters(characters: Array<Character>) {
        this.characters = characters
    },

    setCharacter(character: Character) {
        this.character = character
    }
}