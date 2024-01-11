import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  scrollToTop(event: Event) {
    // Prevent the default behavior of the anchor tag
    event.preventDefault();

    // Scroll smoothly to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
