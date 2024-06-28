import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../company.service";

@Component({
  selector: 'app-company-info',
  standalone: true,
  imports: [],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.css'
})
export class CompanyInfoComponent implements OnInit {
  aboutUs: any = {};

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompanyInfo().subscribe(data => {
      this.aboutUs = data;
    });
  }
}
