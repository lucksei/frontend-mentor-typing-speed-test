import type { InjectionKey, Ref } from 'vue'
import type TypingTest from './typingTest'

export const typingTestKey = Symbol() as InjectionKey<Ref<TypingTest>>
