import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookResponse } from '../../../../services/models';

@Component({
  selector: 'app-book-card',
  standalone: false,
  
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {

    private _book: BookResponse = {};
    private _bookCover: string | undefined;
    private _manage: boolean = false;

    @Output() share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
    @Output() archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
    @Output() addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
    @Output() borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
    @Output() details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
    @Output() edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

    onShowDetails() {
        this.details.emit(this._book)
    }

    onBorrow() {
        this.borrow.emit(this._book)

    }

    onAddToWaitingList() {
        this.addToWaitingList.emit(this._book)

    }

    onEdit() {
        this.edit.emit(this._book)

    }

    onShare() {
        this.share.emit(this._book)

    }

    onArchive() {
        this.archive.emit(this._book)

    }

    get manage(): boolean {
        return this._manage;
    }

    @Input()
    set manage(value: boolean) {
        this._manage = value;
    }

    get bookCover(): string | undefined {
        if (this._book.cover) {
            const str = 'data:image/jpg;base64,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';
            return 'data:image/jpg;base64,' + this._book.cover;
        }
        return 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9';
    }
    set bookCover(value: string | undefined) {
        this._bookCover = value;
    }

    get book(): BookResponse {
        return this._book;
    }

    @Input()
    set book(value: BookResponse) {
        this._book = value;
    }

}
