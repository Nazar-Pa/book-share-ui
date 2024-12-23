import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: false,
  
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

    ngOnInit(): void {
        // TODO: search for implementation of active link with angular itself
        const linkColor = document.querySelectorAll('.nav-link');
        linkColor.forEach(link => {
            if(window.location.href.endsWith(link.getAttribute('href') || '')) {
                link.classList.add('active');
            }
            link.addEventListener('click', () => {
                linkColor.forEach(link => link.classList.remove('active'));
                link.classList.add('active');
            })
        })
    }

    logout() {
        localStorage.removeItem('token');
        window.location.reload();
    }
}
