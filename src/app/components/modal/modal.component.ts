import { Component, OnInit } from "@angular/core";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
  modalRef: NgbModalRef;
  modalContent: any;
  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalRef = this.modalService.open(content);
    this.modalContent = content;
  }

  toggleModel() {
    this.open(this.modalContent);
  }

  ngOnInit() {}
}
