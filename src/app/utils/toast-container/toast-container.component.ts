import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from "../../services/toast.service";
@Component({
  selector: 'app-toasts',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.css'],
  host: {'class': 'toast-container position-fixed top-0 start-50 translate-middle-x text-center', 
  'style': 'z-index: 1200'}
})
export class ToastContainerComponent implements OnInit {

  constructor(public toastService: ToastService) { }
  isTemplate(toast:any) { return toast.textOrTpl instanceof TemplateRef; }
  ngOnInit(): void {
  }

}
