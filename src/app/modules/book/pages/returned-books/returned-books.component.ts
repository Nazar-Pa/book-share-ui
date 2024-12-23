import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services';

@Component({
  selector: 'app-returned-books',
  standalone: false,
  
  templateUrl: './returned-books.component.html',
  styleUrl: './returned-books.component.scss'
})
export class ReturnedBooksComponent implements OnInit{

    returnedBooks: PageResponseBorrowedBookResponse = {};
    page: number = 0;
    size: number = 5;
    message: string = '';
    level: string = 'success';

    constructor(private bookService: BookService
    ) {}

    ngOnInit(): void {
        this.findAllReturnedBooks();
    }

    findAllReturnedBooks() {
        this.bookService.findAllReturnedBooks({
            page: this.page,
            size: this.size
        }).subscribe({
            next: (resp) => {
                this.returnedBooks = resp;
            }
        });
    }

    approveBookReturn(book: BorrowedBookResponse) {
        if(!book.returned) {
            this.level = 'error';
            this.message = 'The book was not returned yet';
            return;
        } this.bookService.approveReturnBorrowBook({
            'book-id': book.id as number
        }).subscribe({
            next: () => {
                this.level = 'success';
                this.message = 'Book return approved';
                this.findAllReturnedBooks();
            },
            error: (err) => {
                console.log(err.error)
            }
        });
    }

    goToFirstPage() {
        this.page = 0;
        this.findAllReturnedBooks()
    }

    goToPreviousPage() {
        this.page--;
        this.findAllReturnedBooks()
    }

    goToPage(page: number) {
        if (this.page === page){
            return;
        }
        this.page = page;
        this.findAllReturnedBooks()
    }

    goToNextPage() {
        this.page++;
        this.findAllReturnedBooks()
    }

    goToLastPage() {
        this.page = this.returnedBooks.totalPages as number - 1;
        this.findAllReturnedBooks()
    }

    get isLastPage(): boolean {
        return this.page == this.returnedBooks.totalPages as number - 1;
    }

}
