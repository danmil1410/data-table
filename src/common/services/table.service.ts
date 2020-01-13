import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

import { Company } from '../models/company.model';
import { CompanyIncomes } from '../models/company-incomes.model';
import { Income } from '../models/income.model';

import * as config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private companies$: Subject<any[]> = new Subject();

  constructor(private http: HttpClient) {
    this.loadInitialData().then(companies => {
      this.companies$.next(companies);
    });
  }
  
  get companies() {
    return this.companies$.asObservable();
  }

  private getCompanies(): Promise<Company[]> {
    return this.http
      .get<Company[]>(`${config.apiPath}/companies`)
      .toPromise();
  }

  private getCompanyIncomes(id: number): Promise<CompanyIncomes> {
    return this.http
      .get<CompanyIncomes>(`${config.apiPath}/incomes/${id}`)
      .toPromise();
  }

  private async loadInitialData(): Promise<any> {
    const companies = await this.getCompanies();

    return Promise.all(companies.map(async (company: Company) => {
      const companyIncomes: CompanyIncomes = await this.getCompanyIncomes(company.id);
      const incomeDetails = this.getIncomeDetails(companyIncomes.incomes);

      return {...company, ...incomeDetails, hidden: false};
    }));
  }

  private getIncomeDetails(incomes: Income[]) {
    /*
      There is no data for current month (january) - monthlyIncome can't be computed,
      will be displayed as 0

      Income value is rounded for better displaying
    */
    const monthlyIncomes = incomes.filter((income: Income) => this.isDateHasLastMonth(income.date));
    const incomeSum = Math.floor(this.getIncomeSum(incomes));
    const monthlyIncomeSum = Math.floor(this.getIncomeSum(monthlyIncomes));
    const averageIncome = Math.floor(incomeSum / incomes.length);

    return {incomeSum, monthlyIncomeSum, averageIncome};
  }

  private getIncomeSum(incomes: Income[]) {
    return incomes.reduce( ( sum, { value } ) => sum + +value , 0);
  }

  private isDateHasLastMonth(date: string): boolean {
    const parts = date.split(/[- :]/);

    const month = +parts[1];
    const year = +parts[0];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    // There is no data for 2020, so 2019 data is used
    const currentYear = currentDate.getFullYear() - 1;

    return currentMonth === month && year === currentYear;
  }
}
