import { Injectable } from '@angular/core';
import { Note } from './note';
import { NOTES } from './mock-notes';

@Injectable()
export class NoteService {

  constructor() { }

  getNotes(): Note[] {
    return NOTES;
  }

  getNote(id: number): Note {
    for (const note of NOTES) {
      if (note.id === id) {
        return note;
      }
    }
    return null;
  }

}
