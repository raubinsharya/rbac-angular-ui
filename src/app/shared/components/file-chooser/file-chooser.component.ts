import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-chooser',
  templateUrl: './file-chooser.component.html',
  styleUrl: './file-chooser.component.scss',
})
export class FileChooserComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  files: File[] = [];

  onFileDropped($event: FileList) {
    this.handleFiles($event);
  }

  fileBrowseHandler(event: any) {
    const files = event.target.files as FileList;
    this.handleFiles(files);
  }

  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i) as File);
    }
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  // Prevent browser's default behavior on dragover, dragleave and drop events
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files as FileList;
    this.onFileDropped(files);
  }

  formatFileName(name: string): string {
    return name.length > 20 ? `${name.substring(0, 20)}...` : name;
  }

  clearAllFiles(): void {
    this.files = [];
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
