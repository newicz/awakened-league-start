export default {
    account: '',
    characters: [],
    character: {},

    setAccount(account: string) {
        this.account = account
    },

    setCharacters(characters: any) {
        this.characters = characters
    },

    setCharacter(character: any) {
        this.character = character
    }
}