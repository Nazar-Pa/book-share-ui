import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';

@Component({
  selector: 'app-my-books',
  standalone: false,
  
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit {

    bookResponse: PageResponseBookResponse = {};
        page: number = 0;
        size: number = 4;
    
        constructor(
            private bookService: BookService,
            private router: Router
        ){}
    
        ngOnInit(): void {
            this.findAllBooks();
        }
    
        findAllBooks() {
            this.bookService.findAllBooksByOwner({
                page: this.page,
                size: this.size
            }).subscribe({
                next: (books) => {
                    this.bookResponse = books;
                }
            });
        }

        archiveBook(book: BookResponse) {
            this.bookService.updateArchivedStatus({
                'book-id': book.id as number
            }).subscribe({
                next: () => {
                    book.archived = !book.archived
                }
            })
        }

        shareBook(book: BookResponse) {
            this.bookService.updateShareableStatus({
                'book-id': book.id as number
            }).subscribe({
                next: () => {
                    book.shareable = !book.shareable
                }
            })
        }

        editBook(book: BookResponse) {
            this.router.navigate(['books', 'manage', book.id]);
        }
    
        goToFirstPage() {
            this.page = 0;
            this.findAllBooks()
        }
    
        goToPreviousPage() {
            this.page--;
            this.findAllBooks()
        }
    
        goToPage(page: number) {
            if (this.page === page){
                return;
            }
            this.page = page;
            this.findAllBooks()
        }
    
        goToNextPage() {
            this.page++;
            this.findAllBooks()
        }
    
        goToLastPage() {
            this.page = this.bookResponse.totalPages as number - 1;
            this.findAllBooks()
        }
    
        get isLastPage(): boolean {
            return this.page == this.bookResponse.totalPages as number - 1;
        }
}
