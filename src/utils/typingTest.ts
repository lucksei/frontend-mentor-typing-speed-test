class TypingTest {
  words: string[]
  constructor(text: string) {
    this.words = this._textToWordlist(text)
  }

  _textToWordlist(text: string): string[] {
    return text.split(' ')
  }
}
