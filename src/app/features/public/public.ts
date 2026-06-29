import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPublic } from '../../layouts/public/header-public/header-public';

@Component({
  selector: 'app-public-feature',
  standalone: true,
  imports: [RouterOutlet, HeaderPublic],
  templateUrl: './public.html',
  styleUrl: './public.css',
})
export class PublicFeature {}