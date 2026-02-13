type Character = {
  id: number
  char: string
  status: 'empty' | 'correct' | 'incorrect' | 'selected'
}

type Word = {
  id: number
  word: Character[]
  status: 'empty' | 'correct' | 'incorrect'
}

type Cursor = {
  word_idx: number
  char_idx: number | 'end'
}

class TypingTest {
  text: Word[]
  cursor: Cursor
  constructor(text: string) {
    this.text = this._textToWordlist(text)
    this.cursor = { word_idx: 0, char_idx: 0 }
    this._cursorReset()
  }

  _wordToCharacterList(word: string): Character[] {
    return word.split('').map((char, index) => ({
      id: index,
      char,
      status: 'empty',
    }))
  }

  _textToWordlist(text: string): Word[] {
    const words = text.split(' ')
    return words.map((word, index) => ({
      id: index,
      word: this._wordToCharacterList(word),
      status: 'empty',
    }))
  }

  _cursorReset() {
    this.cursor = { word_idx: 0, char_idx: 0 }

    if (!this.text[0]) throw new Error('Text is empty')
    if (!this.text[0].word[0]) throw new Error('Text is empty')
    this.text[0].word[0].status = 'selected'
  }

  _cursorAdvance(status: 'correct' | 'incorrect'): number {
    const curr_word_length = this.text[this.cursor.word_idx]!.word.length

    if (typeof this.cursor.char_idx === 'number') {
      this.text[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = status
      if (this.cursor.char_idx === curr_word_length - 1) {
        this.cursor.char_idx = 'end'
        return 1
      }
      this.cursor.char_idx += 1
      this.text[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = 'selected'
    }
    if (this.cursor.char_idx === 'end') return 1

    return 0
  }

  _cursorAdvanceWord(): number {
    const curr_text_length = this.text.length

    if (typeof this.cursor.char_idx === 'number') {
      this.text[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = 'empty'
    }

    // If the current word is the last word
    if (this.cursor.word_idx === curr_text_length - 1) return 1

    this.cursor.word_idx += 1
    this.cursor.char_idx = 0
    this.text[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = 'selected'
    return 0
  }

  _cursorBacktrack(): number {
    if (typeof this.cursor.char_idx === 'number') {
      if (this.cursor.char_idx === 0) {
        if (this.cursor.word_idx === 0) return 1
        this.text[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = 'empty'
        this.cursor.word_idx -= 1
        this.cursor.char_idx = 'end'
        return 0
      }
      this.text[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = 'empty'
      this.cursor.char_idx -= 1
      this.text[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = 'selected'
      return 0
    }
    if (this.cursor.char_idx === 'end') {
      this.cursor.char_idx = this.text[this.cursor.word_idx]!.word.length - 1
      this.text[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = 'selected'
      return 0
    }
    return 0
  }

  getText(): Word[] {
    return this.text
  }

  getCursor(): Cursor {
    return this.cursor
  }

  sendKeyStroke(key: string) {
    if (typeof this.cursor.char_idx !== 'number') return
    const current_char = this.text[this.cursor.word_idx]?.word[this.cursor.char_idx]
    if (!current_char) return

    if (current_char.char === key) {
      this._cursorAdvance('correct')
    } else {
      this._cursorAdvance('incorrect')
    }
  }

  sendSpace() {
    if (this.cursor.char_idx === 'end') this._cursorAdvanceWord()
  }

  sendBackspace() {
    this._cursorBacktrack()
  }
}

export default TypingTest
