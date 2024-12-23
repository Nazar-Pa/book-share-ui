import { Component, OnInit } from '@angular/core';
import { BookRequest } from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-book',
  standalone: false,
  
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent implements OnInit {

    errorMsgs: Array<string> = [];
    selectedBookCover: any;
    selectedPicture: string | undefined;
    bookRequest: BookRequest = {
        authorName: '',
        isbn: '',
        synopsis: '',
        title: ''
    }

    constructor(private bookService: BookService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const bookId = this.activatedRoute.snapshot.params['bookId'];
        if(bookId) {
            this.bookService.findBookById({
                'book-id': bookId
            }).subscribe({
                next: (book) => {
                    this.bookRequest = {
                        id: book.id,
                        title: book.title as string,
                        authorName: book.authorName as string,
                        isbn: book.isbn as string,
                        synopsis: book.synopsis as string,
                        shareable: book.shareable
                    }
                    if(book.cover) {
                        this.selectedPicture = 'data:image/jpg;base64,' + book.cover
                    }
                }
            })
        }
    }

    onFileSelected(event: any) {
        console.log(event.target.files[0])
        this.selectedBookCover = event.target.files[0];
        if (this.selectedBookCover) {
            const reader: FileReader = new FileReader();
            reader.onload = () => {
                this.selectedPicture = reader.result as string;
            }
            reader.readAsDataURL(this.selectedBookCover);
        }
    }

    saveBook() {
        this.bookService.saveBook({
            body: this.bookRequest
        }).subscribe({
            next: (bookId) => {
                this.bookService.uploadBookCoverPicture({
                    'book-id': bookId,
                    body: {
                        file: this.selectedBookCover
                    }
                }).subscribe({
                    next: () => {
                        this.router.navigate(['/books/my-books'])
                    }
                })
            },
            error: (err) => {
                
                this.errorMsgs = err.error.validationErrors;
                console.log(this.errorMsgs)
            }
        })
    }
}
