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
  text: string = ''
  textArray: Word[] = []
  cursor: Cursor = { word_idx: 0, char_idx: 0 }
  startTime: number | null = null // Start time in milliseconds, null if not started
  stopTime: number | null = null
  constructor(text: string) {
    this.text = text
    this.resetTest()
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

  _cursorAdvance(status: 'correct' | 'incorrect'): number {
    const curr_word_length = this.textArray[this.cursor.word_idx]!.word.length

    if (typeof this.cursor.char_idx === 'number') {
      this.textArray[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = status
      if (this.cursor.char_idx === curr_word_length - 1) {
        this.cursor.char_idx = 'end'
        this.setWordStatus()
        return 1
      }
      this.cursor.char_idx += 1
      this.textArray[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = 'selected'
    }
    if (this.cursor.char_idx === 'end') return 1

    return 0
  }

  _cursorAdvanceWord(): number {
    const curr_text_length = this.textArray.length

    if (typeof this.cursor.char_idx === 'number') {
      this.textArray[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = 'empty'
    }

    // If the current word is the last word
    if (this.cursor.word_idx === curr_text_length - 1) return 1

    this.cursor.word_idx += 1
    this.cursor.char_idx = 0
    this.textArray[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = 'selected'
    return 0
  }

  _cursorBacktrack(): number {
    if (typeof this.cursor.char_idx === 'number') {
      if (this.cursor.char_idx === 0) {
        if (this.cursor.word_idx === 0) return 1
        this.textArray[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = 'empty'
        this.cursor.word_idx -= 1
        this.cursor.char_idx = 'end'
        return 0
      }
      this.textArray[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = 'empty'
      this.cursor.char_idx -= 1
      this.textArray[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = 'selected'
      return 0
    }
    if (this.cursor.char_idx === 'end') {
      this.cursor.char_idx = this.textArray[this.cursor.word_idx]!.word.length - 1
      this.textArray[this.cursor.word_idx]!.word[this.cursor.char_idx]!.status = 'selected'
      this.clearWordStatus()
      return 0
    }
    return 0
  }

  startTest() {
    this.startTime = Date.now()
  }

  resetTest() {
    this.textArray = this._textToWordlist(this.text)
    this.cursor = { word_idx: 0, char_idx: 0 }
    this.startTime = null

    if (!this.textArray[0]) throw new Error('Text is empty')
    if (!this.textArray[0].word[0]) throw new Error('Text is empty')
    this.textArray[0].word[0].status = 'selected'
  }

  getText(): Word[] {
    return this.textArray
  }

  getCursor(): Cursor {
    return this.cursor
  }

  getWpm(): number {
    if (this.startTime === null) return 0
    const words = this.textArray.reduce((sum, word) => {
      return word.status === 'correct' ? sum + 1 : sum
    }, 0)
    if (this.stopTime !== null) {
      const elapsedTime = this.stopTime - this.startTime
      return words / (elapsedTime / (1000 * 60))
    }
    const elapsedTime = Date.now() - this.startTime
    return words / (elapsedTime / (1000 * 60))
  }

  getAccuracy(): number {
    const count = this.textArray.reduce<{ correct: number; incorrect: number }>(
      (acc, word) => {
        word.word.forEach((char) => {
          if (char.status === 'correct') acc.correct += 1
          if (char.status === 'incorrect') acc.incorrect += 1
        })
        return acc
      },
      { correct: 0, incorrect: 0 },
    )
    if (count.correct + count.incorrect === 0) return 0
    return count.correct / (count.correct + count.incorrect)
  }

  getElapsedTime(): number | null {
    if (this.startTime === null) return null
    if (this.stopTime !== null) return this.stopTime - this.startTime
    return Date.now() - this.startTime
  }

  getIsTestFinished(): boolean {
    return this.cursor.word_idx === this.textArray.length - 1 && this.cursor.char_idx === 'end'
  }

  setWordStatus() {
    const currentWord = this.textArray[this.cursor.word_idx]
    const incorrect = currentWord?.word.some((char) => char.status === 'incorrect')
    if (incorrect) {
      this.textArray[this.cursor.word_idx]!.status = 'incorrect'
    } else {
      this.textArray[this.cursor.word_idx]!.status = 'correct'
    }
  }

  clearWordStatus() {
    this.textArray[this.cursor.word_idx]!.status = 'empty'
  }

  sendKeyStroke(key: string) {
    // If the test is finished return
    if (this.stopTime !== null) return

    if (typeof this.cursor.char_idx !== 'number') return
    // If the first word is typed start the test
    if (this.cursor.char_idx === 0 && this.cursor.word_idx === 0) {
      this.startTest()
    }

    // Advance the cursor to the next character
    const current_char = this.textArray[this.cursor.word_idx]?.word[this.cursor.char_idx]
    if (!current_char) return

    if (current_char.char === key) {
      this._cursorAdvance('correct')
    } else {
      this._cursorAdvance('incorrect')
    }

    // If the last word was typed, stop the test
    // TODO: Fix linting error
    if (this.cursor.word_idx === this.textArray.length - 1 && this.cursor.char_idx === 'end') {
      this.stopTime = Date.now()
    }
  }

  sendSpace() {
    // If the test is finished return
    if (this.stopTime !== null) return

    if (this.cursor.char_idx === 'end') this._cursorAdvanceWord()
  }

  sendBackspace() {
    // If the test is finished return
    if (this.stopTime !== null) return

    this._cursorBacktrack()
  }
}

export default TypingTest
