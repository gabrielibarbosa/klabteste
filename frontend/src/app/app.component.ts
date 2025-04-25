import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpServiceModule} from "./modules/http-service.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpServiceModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
