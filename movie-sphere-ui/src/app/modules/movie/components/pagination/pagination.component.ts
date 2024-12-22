import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() page: number = 0;
  @Input() totalPages: number = 0;
  @Input() pageLimit: number = 5;

  @Output() onFirstPage = new EventEmitter<void>();
  @Output() onPreviousPage = new EventEmitter<void>();
  @Output() onNextPage = new EventEmitter<void>();
  @Output() onLastPage = new EventEmitter<void>();
  @Output() onPageChange = new EventEmitter<number>();

  getPageNumbers(currentPage: number, totalPages: number): number[] {
    let startPage = Math.max(0, currentPage - Math.floor(this.pageLimit / 2));
    let endPage = Math.min(totalPages, startPage + this.pageLimit);

    if (endPage - startPage < this.pageLimit) {
      startPage = Math.max(0, endPage - this.pageLimit);
    }

    return Array.from({ length: endPage - startPage }, (_, i) => startPage + i);
  }

  goToPage(page: number) {
    this.onPageChange.emit(page);
  }

  goToFirstPage() {
    this.onFirstPage.emit();
  }

  goToPreviousPage() {
    this.onPreviousPage.emit();
  }

  goToLastPage() {
    this.onLastPage.emit();
  }

  goToNextPage() {
    this.onNextPage.emit();
  }

  get isLastPage() {
    return this.page === this.totalPages - 1;
  }
}
