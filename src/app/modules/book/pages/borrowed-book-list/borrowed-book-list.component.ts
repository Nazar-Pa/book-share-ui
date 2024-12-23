import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, FeedbackRequest, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BookService, FeedbackService } from '../../../../services/services';

@Component({
  selector: 'app-borrowed-book-list',
  standalone: false,
  
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit{

    borrowedBooks: PageResponseBorrowedBookResponse = {};
    feedBackRequest: FeedbackRequest = {
        bookId: 0,
        note: 0,
        comment: ''
    };
    page: number = 0;
    size: number = 5;
    selectedBook: BorrowedBookResponse | undefined = undefined;

    constructor(private bookService: BookService,
        private feedbackService: FeedbackService
    ) {}

    ngOnInit(): void {
        this.findAllBorrowedBooks();
    }

    findAllBorrowedBooks() {
        this.bookService.findAllBorrowedBooks({
            page: this.page,
            size: this.size
        }).subscribe({
            next: (resp) => {
                this.borrowedBooks = resp;
            }
        });
    }

    returnBorrowedBook(book: BorrowedBookResponse) {
        this.selectedBook = book;
        this.feedBackRequest.bookId = book.id as number;
    }

    returnBook(withFeedback: boolean) {
        this.bookService.returnBorrowBook({
            'book-id': this.selectedBook?.id as number
        }).subscribe({
            next: () => {
                if (withFeedback) {
                    this.giveFeedback();
                }
                this.selectedBook = undefined;
                this.findAllBorrowedBooks();
            }
        })
    }

    giveFeedback() {
        this.feedbackService.saveFeedback({
            body: this.feedBackRequest
        }).subscribe();
    }

    goToFirstPage() {
        this.page = 0;
        this.findAllBorrowedBooks()
    }

    goToPreviousPage() {
        this.page--;
        this.findAllBorrowedBooks()
    }

    goToPage(page: number) {
        if (this.page === page){
            return;
        }
        this.page = page;
        this.findAllBorrowedBooks()
    }

    goToNextPage() {
        this.page++;
        this.findAllBorrowedBooks()
    }

    goToLastPage() {
        this.page = this.borrowedBooks.totalPages as number - 1;
        this.findAllBorrowedBooks()
    }

    get isLastPage(): boolean {
        return this.page == this.borrowedBooks.totalPages as number - 1;
    }

}
