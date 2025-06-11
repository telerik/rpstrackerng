import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';


import { ModalService } from '../../services/modal.service';



@Component({
    selector: 'custom-modal',
    templateUrl: 'modal-dialog.component.html',
    styleUrls: ['modal-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string | undefined;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        document.body.appendChild(this.element);

        this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
            if (el.target.className === 'custom-modal') {
                this.close();
            }
        });

        this.modalService.add(this);
    }

    ngOnDestroy(): void {
        if (this.id) {
            this.modalService.remove(this.id);
        }
        this.element.remove();
    }

    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('custom-modal-open');
    }

    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('custom-modal-open');
    }
}