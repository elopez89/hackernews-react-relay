import { GC_USER_ID } from '../constants'

export function getUserIDFromLocalStorage(){
    return localStorage.getItem(GC_USER_ID)
}