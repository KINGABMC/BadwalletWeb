import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../layouts/private/header/header';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [RouterOutlet, Header],
  templateUrl: './private.html',
  styleUrl: './private.css',
})
export class PrivateComponent {}