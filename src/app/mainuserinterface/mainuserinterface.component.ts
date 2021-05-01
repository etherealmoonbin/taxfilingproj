import { componentFactoryName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBreadSlice } from '@fortawesome/free-solid-svg-icons';
import { TaxfilingService } from '../taxfiling.service';

@Component({
  selector: 'app-mainuserinterface',
  templateUrl: './mainuserinterface.component.html',
  styleUrls: ['./mainuserinterface.component.css']
})
export class MainuserinterfaceComponent implements OnInit {
  onGetStarted : any = false;

  mainLogValue : any = null;
  usernameVal : any = null;
  sid : any = null;
  isAuthenticated = false;

  activeDashboard : any = true;
  activeBookeeping : any = false;
  activeTaxFiling : any = false;
  activeReports : any = false;

  trialbalance: any = this.taxfilingservice.taxFilingData['BookKeepingData'];
  totalDebit: any = 0;
  totalCredit: any = 0;
  keyword = 'Name';
  BSName = 'businessName';
  data = this.taxfilingservice.COA;
  birLink = this.taxfilingservice.birLink;
  businessname : any = [];
  dynamicVariable = false;
  increment = 0;
  record : any = []
  Selecteddata : any;
  bookkeepingModal = $('#bookkeeping-proceed');
  fullnameAuth: any;
  date: any;
  pdfSrc: any;

  accountInfo : any;

  businessNameCategory: any = [];
  businessCategoryTimestamp: any = [];
  clientData: any;
  clientRecordData: any;

  bookkeepingdropdown

  rdolist : any = [];
  rdoName = 'RDO';

  clientRecordAsset: any = [];
  clientRecordLiability: any = [];
  clientRecordEquity: any = [];
  clientRecordRevenue: any = [];
  clientRecordExpenses: any = [];
  clientOperatingCashFlow : any = [];
  clientInvestingCashFlow : any = [];
  clientFinancingCashFlow : any = [];

  balanceSheetDebit : any;
  balanceSheetCredit : any;

  incomeStatementRevenue : any;
  incomeStatementExpenses : any
  incomeStatementTotal : any;

  cashFlowOperationsTotal : any;
  cashFlowFinancialTotal : any;
  cashFlowInvestmentTotal : any;
  cashFlowEndingBalance : any;

  businessNameRecord : any;
  businessDateRecord : any;

  taxFilingPage1 : any = true;
  taxFilingPage2 : any = false;
  taxFilingPage3 : any = false;
  taxFilingPage4 : any = false;
  taxFilingPage5 : any = false;
  taxFilingPage6 : any = false;

  personalInformationPage : any = false;
  paymentMethodPage : any = false;

  taxPayerProfileList : any = [];

  bir1600vtAtc = [
    {
      'ATC' : 'Select ATC--',
      'Desc' : '',
      'Rate' : 0
    },
    {
      'ATC' : 'WV010',
      'Desc' : 'VAT Withholding on Purchase of Goods',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WV020',
      'Desc' : 'VAT Withholding on Purchase of Services',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WV040',
      'Desc' : 'Final Withholding VAT on Payments for lease or use of properties or property rights owned by non residents (Government Withholding Agent)',
      'Rate' : 0.12
    },
    {
      'ATC' : 'WV050',
      'Desc' : 'Final Withholding VAT on Payments for lease or use of properties or property rights owned by non residents (Private Withholding Agent)',
      'Rate' : 0.12
    },
    {
      'ATC' : 'WV060',
      'Desc' : 'Final Withholding VAT on Other Services rendered in the Philippines by non-residents (Government Withholding Agent)',
      'Rate' : 0.12
    },
    {
      'ATC' : 'WV070',
      'Desc' : 'Final Withholding VAT on Other Services rendered in the Philippines by non-residents (Private Withholding Agent)',
      'Rate' : 0.12
    },
    {
      'ATC' : 'WV012',
      'Desc' : 'VAT Withholding on Purchases of Goods (with waiver of privilege to claim input tax credit) (creditable)',
      'Rate' : 0.12
    },
    {
      'ATC' : 'WV014',
      'Desc' : 'VAT Withholding on Purchases of Goods (with waiver of privilege to claim input tax credit) (final) ',
      'Rate' : 0.12
    },

    {
      'ATC' : 'WV022',
      'Desc' : 'VAT Withholding on Purchases of Services (with waiver of privilege to claim input tax credit) (creditable)',
      'Rate' : 0.12
    },
    {
      'ATC' : 'WV024',
      'Desc' : 'VAT Withholding on Purchases of Services (with waiver of privilege to claim input tax credit) (final)',
      'Rate' : 0.12
    },
  ]

  bir1600ptAtc = [
    {
      'ATC' : 'Select ATC--',
      'Desc' : '',
      'Rate' : 0
    },
    {
      'ATC' : 'WB 030',
      'Desc' : 'Tax on Carriers and Keepers of Garages',
      'Rate' : 0.03
    },
    {
      'ATC' : 'WB 040',
      'Desc' : 'Franchise Tax on Gas and Utilities',
      'Rate' : 0.02
    },
    {
      'ATC' : 'WB 050',
      'Desc' : 'Franchise Tax on radio & radio & TV broadcasting companies whose annual gross receipts do not exceed P10M & who are not VAT-registered taxpayers',
      'Rate' : 0.03
    },
    {
      'ATC' : 'WB 070',
      'Desc' : 'Tax on Life Insurance Premiums',
      'Rate' : 0.02
    },
    {
      'ATC' : 'WB 090',
      'Desc' : 'Tax on Overseas Dispatch, Message or Conversation from the Philippines',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WB 120',
      'Desc' : 'Business tax on Agents of Foreign Insurance Companies – Insurance Agents',
      'Rate' : 0.04
    },
    {
      'ATC' : 'WB 121',
      'Desc' : 'Business tax on Agents of Foreign Insurance Companies – Owner of the Property',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WB 130',
      'Desc' : 'Tax on International Carriers ',
      'Rate' : 0.03
    },
    {
      'ATC' : 'WB 140',
      'Desc' : 'Tax on Cockpits',
      'Rate' : 0.18
    },
    {
      'ATC' : 'WB 150',
      'Desc' : 'Tax on amusement places, such as cabarets, night and day clubs, videoke bars, karaoke bars, karaoke television, karaoke boxes, music lounges and other similar establishments',
      'Rate' : 0.18
    },
    {
      'ATC' : 'WB 160',
      'Desc' : 'Tax on Boxing exhibitions',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WB 170',
      'Desc' : 'Tax on Professional basketball games',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WB 180',
      'Desc' : 'Tax on jai-alai and race tracks',
      'Rate' : 0.30
    },
    {
      'ATC' : 'WB 200',
      'Desc' : 'Tax on sale, barter or exchange of stocks listed and traded through Local Stock exchange',
      'Rate' : 0.01
    },
    {
      'ATC' : 'WB 201',
      'Desc' : 'Tax on shares of stock sold or exchanged through initial and secondary public offering Not over 25%',
      'Rate' : 0.04
    },
    {
      'ATC' : 'WB 202',
      'Desc' : 'Tax on shares of stock sold or exchanged through initial and secondary public offering Over 25% but not exceeding 33 1/3%',
      'Rate' : 0.02
    },
    {
      'ATC' : 'WB 203',
      'Desc' : 'Tax on shares of stock sold or exchanged through initial and secondary public offering Over 33 1/3%',
      'Rate' : 0.01
    },
    {
      'ATC' : 'WB 102',
      'Desc' : 'On dividends and equity shares and net income of subsidiaries',
      'Rate' : 0.00
    },
    {
      'ATC' : 'WB 103',
      'Desc' : 'On royalties, rentals of property, real or personal, profits from exchange and all other items treated as gross income under the Code',
      'Rate' : 0.07
    },
    {
      'ATC' : 'WB 104',
      'Desc' : 'On net trading gains within the taxable year on foreign currency, debt securities, derivatives and other similar financial instruments',
      'Rate' : 0.07
    },
    {
      'ATC' : 'WB 108',
      'Desc' : 'On interest, commissions and discounts from lending activities as well as Income from financial leasing, on the basis of the remaining maturities of Instrument from which such receipts are derived Maturity period is five years or less',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WB 109',
      'Desc' : 'On interest, commissions and discounts from lending activities as well as Income from financial leasing, on the basis of the remaining maturities of Instrument from which such receipts are derived Maturity period is more than five years',
      'Rate' : 0.01
    },
    {
      'ATC' : 'WB 080',
      'Desc' : 'Persons Exempt from VAT under Sec. 109BB (creditable)-Government Withholding Agent',
      'Rate' : 0.03
    },
    {
      'ATC' : 'WB 082',
      'Desc' : 'Persons Exempt from VAT under Sec. 109BB (creditable)-Private Withholding Agent',
      'Rate' : 0.03
    },
    {
      'ATC' : 'WB 084',
      'Desc' : 'Persons Exempt from VAT under Section 109BB (final) (Section 116 applies)',
      'Rate' : 0.03
    },


  ]

  bir1601eqtAtc = [
    {
      'ATC' : 'Select ATC--',
      'Desc' : '',
      'Rate' : 0
    },
    {
      'ATC' : 'WI010',
      'Desc' : 'Professional, If gross income for the current year did not exceed P 3M',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI011',
      'Desc' : 'Professional, If gross income is more than P 3M or VAT Registered regardless of amount',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC010',
      'Desc' : 'Professional, If gross income for the current year did not exceed P 720,000',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC011',
      'Desc' : 'If gross income exceeds P 720,000',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI020',
      'Desc' : 'Professional entertainers such as, but not limited to actors and actresses, Payment by the General Professional Partnerships (GPPs) to its partners singers, lyricists, composers, emcees, If gross income for the current year did not exceed P 3M',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI021',
      'Desc' : 'Professional entertainers such as, but not limited to actors and actresses, Payment by the General Professional Partnerships (GPPs) to its partners singers, lyricists, composers, emcees, If gross income is more than P 3M or VAT Registered regardless of amount',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC020',
      'Desc' : 'Professional entertainers such as, but not limited to actors and actresses, Payment by the General Professional Partnerships (GPPs) to its partners singers, lyricists, composers, emcees, If gross income for the current year did not exceed P 720,000',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC021',
      'Desc' : 'Professional entertainers such as, but not limited to actors and actresses, Payment by the General Professional Partnerships (GPPs) to its partners singers, lyricists, composers, emcees, If gross income exceeds P 720,000',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI030',
      'Desc' : 'Professional athletes including basketball players, pelotaris and jockeys, If gross income for the current year did not exceed P 3M',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI031',
      'Desc' : 'Professional athletes including basketball players, pelotaris and jockeys, If gross income is more than P 3M or VAT Registered regardless of amount',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC030',
      'Desc' : 'Professional athletes including basketball players, pelotaris and jockeys, If gross income for the current year did not exceed P 720,000 ',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC031',
      'Desc' : 'Professional athletes including basketball players, pelotaris and jockeys, If gross income exceeds P 720,000',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI040',
      'Desc' : 'All directors and producers involved in movies, stage, radio, television and other rates of withholding tax musical productions, If gross income for the current year did not exceed P 3M',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI041',
      'Desc' : 'All directors and producers involved in movies, stage, radio, television and other rates of withholding tax musical productions, If gross income is more than P 3M or VAT Registered regardless of amount',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC040',
      'Desc' : 'All directors and producers involved in movies, stage, radio, television and other rates of withholding tax musical productions, If gross income for the current year did not exceed P 720,000',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC041',
      'Desc' : 'All directors and producers involved in movies, stage, radio, television and other rates of withholding tax musical productions, If gross income exceeds P 720,000',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI050',
      'Desc' : 'Management and technical consultants, If gross income for the current year did not exceed P 3M',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI051',
      'Desc' : 'Management and technical consultants, If gross income is more than P 3M or VAT Registered regardless of amount',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WC050',
      'Desc' : 'Management and technical consultants, If gross income for the current year did not exceed P 720,000',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC051',
      'Desc' : 'Management and technical consultants, If gross income exceeds P 720,000',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI060',
      'Desc' : 'Business and bookkeeping agents and agencies, If gross income for the current year did not exceed P 3M',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI061',
      'Desc' : 'Business and bookkeeping agents and agencies, If gross income is more than P 3M or VAT Registered regardless of amount',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC060',
      'Desc' : 'Business and bookkeeping agents and agencies, If gross income for the current year did not exceed P 720,000',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC061',
      'Desc' : 'Business and bookkeeping agents and agencies, If gross income exceeds P 720,000',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI070',
      'Desc' : 'Insurance agents and insurance adjusters, If gross income for the current year did not exceed P 3M',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI071',
      'Desc' : 'Insurance agents and insurance adjusters, If gross income is more than P 3M or VAT Registered regardless of amount',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC070',
      'Desc' : 'Insurance agents and insurance adjusters, If gross income for the current year did not exceed P 720,000',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC071',
      'Desc' : 'Insurance agents and insurance adjusters, If gross income exceeds P 720,000',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI080',
      'Desc' : 'Other recipients of talent fees, If gross income for the current year did not exceed P 3M',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI081',
      'Desc' : 'Other recipients of talent fees, If gross income is more than P 3M or VAT Registered regardless of amount',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC080',
      'Desc' : 'Other recipients of talent fees, If gross income for the current year did not exceed P 720,000',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC081',
      'Desc' : 'Other recipients of talent fees, If gross income exceeds P 720,000',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI090',
      'Desc' : 'Fees of directors who are not employees of the company, If gross income for the current year did not exceed P 3M',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI091',
      'Desc' : 'Fees of directors who are not employees of the company, If gross income is more than P 3M or VAT Registered regardless of amount',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WI100',
      'Desc' : 'Rentals: On gross rental or lease for the continued use or possession of personal property in excess of Ten thousand pesos (P 10,000) annually and real property used in business which the payor or obligor has not taken title or is not taking title, or in which has no equity; poles, satellites, transmission facilities and billboards',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WC100',
      'Desc' : 'Rentals: On gross rental or lease for the continued use or possession of personal property in excess of Ten thousand pesos (P 10,000) annually and real property used in business which the payor or obligor has not taken title or is not taking title, or in which has no equity; poles, satellites, transmission facilities and billboards',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI110',
      'Desc' : 'Cinematographic film rentals and other payments to resident individuals and corporate cinematographic film owners, lessors or distributors',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WC110',
      'Desc' : 'Cinematographic film rentals and other payments to resident individuals and corporate cinematographic film owners, lessors or distributors',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI120',
      'Desc' : 'Income payments to certain contractors',
      'Rate' : 0.02
    },
    {
      'ATC' : 'WC120',
      'Desc' : 'Income payments to certain contractors',
      'Rate' : 0.02
    },
    {
      'ATC' : 'WI130',
      'Desc' : 'Income distribution to the beneficiaries of estates and trusts',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI139',
      'Desc' : 'Gross commissions or service fees of customs, insurance, stock, immigration and commercial brokers, fees of agents of professional entertainers and real estate service practitioners, If gross income for the current year did not exceed P 3M',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI140',
      'Desc' : 'Gross commissions or service fees of customs, insurance, stock, immigration and commercial brokers, fees of agents of professional entertainers and real estate service practitioners, If gross income is more than P 3M or VAT Registered regardless of amount',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC139',
      'Desc' : 'Gross commissions or service fees of customs, insurance, stock, immigration and commercial brokers, fees of agents of professional entertainers and real estate service practitioners, If gross income for the current year did not exceed P 720,000',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC140',
      'Desc' : 'Gross commissions or service fees of customs, insurance, stock, immigration and commercial brokers, fees of agents of professional entertainers and real estate service practitioners, If gross income exceeds P 720,000',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI151',
      'Desc' : 'Professional fees paid to medical practitioners by hospitals & clinics or paid directly by Health Maintenance Organizations (HMOs) and/or similar establishments, If gross income for the current year did not exceed P 3M',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI150',
      'Desc' : 'Professional fees paid to medical practitioners by hospitals & clinics or paid directly by Health Maintenance Organizations (HMOs) and/or similar establishments, If gross income is more than P 3M or VAT Registered regardless of amount',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC151',
      'Desc' : 'Professional fees paid to medical practitioners by hospitals & clinics or paid directly by Health Maintenance Organizations (HMOs) and/or similar establishments, If gross income for the current year did not exceed P 720,000',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC150',
      'Desc' : 'Professional fees paid to medical practitioners by hospitals & clinics or paid directly by Health Maintenance Organizations (HMOs) and/or similar establishments, If gross income exceeds P 720,000',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI152',
      'Desc' : 'Payment by the General Professional Partnerships (GPPs) to its partners, If gross income for the current year did not exceed P 720,000',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WI153',
      'Desc' : 'Payment by the General Professional Partnerships (GPPs) to its partners, If gross income exceeds P 720,000',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI156',
      'Desc' : 'Income payments made by credit card companies',
      'Rate' : 0.005
    },
    {
      'ATC' : 'WC156',
      'Desc' : 'Income payments made by credit card companies',
      'Rate' : 0.005
    },
    {
      'ATC' : 'WI159',
      'Desc' : 'Additional income payments to government personnel from importers, shipping and airline companies or their agents for overtime services',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI640',
      'Desc' : 'Income payments made by the government and government-owned and controlled corporations (GOCCs) to its local/resident suppliers of goods other than those covered by other rates of withholding tax',
      'Rate' : 0.01
    },
    {
      'ATC' : 'WC640',
      'Desc' : 'Income payments made by the government and government-owned and controlled corporations (GOCCs) to its local/resident suppliers of goods other than those covered by other rates of withholding tax',
      'Rate' : 0.01
    },
    {
      'ATC' : 'WI157',
      'Desc' : 'Income payments made by the government and government-owned and controlled corporations (GOCCs) to its local/resident suppliers of goods other than those covered by other rates of withholding tax',
      'Rate' : 0.02
    },
    {
      'ATC' : 'WC157',
      'Desc' : 'Income payments made by the government and government-owned and controlled corporations (GOCCs) to its local/resident suppliers of goods other than those covered by other rates of withholding tax',
      'Rate' : 0.02
    },
    {
      'ATC' : 'WI158',
      'Desc' : ' Income payment made by top withholding agents to their local/resident supplier of goods other than those covered by other rates of withholding tax',
      'Rate' : 0.01
    },
    {
      'ATC' : 'WC158',
      'Desc' : ' Income payment made by top withholding agents to their local/resident supplier of goods other than those covered by other rates of withholding tax',
      'Rate' : 0.01
    },
    {
      'ATC' : 'WC160',
      'Desc' : ' Income payment made by top withholding agents to their local/resident supplier of goods other than those covered by other rates of withholding tax',
      'Rate' : 0.02
    },
    {
      'ATC' : 'WI160',
      'Desc' : ' Income payment made by top withholding agents to their local/resident supplier of goods other than those covered by other rates of withholding tax',
      'Rate' : 0.02
    },
    {
      'ATC' : 'WI515',
      'Desc' : 'Commissions, rebates, discounts and other similar considerations paid/granted to independent and/or exclusive sales representatives and marketing agents and sub-agents of companies, including multi-level marketing companies',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI516',
      'Desc' : 'Commissions, rebates, discounts and other similar considerations paid/granted to independent and/or exclusive sales representatives and marketing agents and sub-agents of companies, including multi-level marketing companies',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC515',
      'Desc' : 'Commissions, rebates, discounts and other similar considerations paid/granted to independent and/or exclusive sales representatives and marketing agents and sub-agents of companies, including multi-level marketing companies',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC516',
      'Desc' : 'Commissions, rebates, discounts and other similar considerations paid/granted to independent and/or exclusive sales representatives and marketing agents and sub-agents of companies, including multi-level marketing companies',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI530',
      'Desc' : 'Gross payments to embalmers by funeral parlors',
      'Rate' : 0.01
    },
    {
      'ATC' : 'WI535',
      'Desc' : 'Payments made by pre-need companies to funeral parlors',
      'Rate' : 0.01
    },
    {
      'ATC' : 'WC535',
      'Desc' : 'Payments made by pre-need companies to funeral parlors',
      'Rate' : 0.01
    },
    {
      'ATC' : 'WI540',
      'Desc' : 'Tolling fees paid to refineries',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WC540',
      'Desc' : 'Tolling fees paid to refineries',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI610',
      'Desc' : 'Income payments made to suppliers of agricultural products in excess',
      'Rate' : 0.01
    },
    {
      'ATC' : 'WC610',
      'Desc' : 'Income payments made to suppliers of agricultural products in excess',
      'Rate' : 0.01
    },
    {
      'ATC' : 'WI630',
      'Desc' : 'Income payments on purchases of minerals, mineral products and quarry resources, such as but not limited to silver, gold, marble, granite, gravel, sand, boulders and other mineral products except purchases by Bangko Sentral ng Pilipinas',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WC630',
      'Desc' : 'Income payments on purchases of minerals, mineral products and quarry resources, such as but not limited to silver, gold, marble, granite, gravel, sand, boulders and other mineral products except purchases by Bangko Sentral ng Pilipinas',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WI632',
      'Desc' : 'On gross amount of interest on the refund of meter deposit whether paid directly to the customers or applied against customer’s billings of Residential and General Service customers whose monthly electricity consumption exceeds 200 kwh as classified by other electric Distribution Utilities',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC632',
      'Desc' : 'On gross amount of interest on the refund of meter deposit whether paid directly to the customers or applied against customer’s billings of Residential and General Service customers whose monthly electricity consumption exceeds 200 kwh as classified by other electric Distribution Utilities',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WI663',
      'Desc' : 'On gross amount of interest on the refund of meter deposit whether paid directly to the customers or applied against customer’s billings of Non-Residential customers whose monthly electricity consumption exceeds 200 kwh as classified by other electric Distribution Utilities (DU)',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WC663',
      'Desc' : 'On gross amount of interest on the refund of meter deposit whether paid directly to the customers or applied against customer’s billings of Non-Residential customers whose monthly electricity consumption exceeds 200 kwh as classified by other electric Distribution Utilities (DU)',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI680',
      'Desc' : 'Income payments made by political parties and candidates of local and national elections on all their purchases of goods and services related to campaign expenditures, and income payments made by individuals or juridical persons for their purchases of goods and services intended to be given as campaign contributions to political parties and candidates',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WC680',
      'Desc' : 'Income payments made by political parties and candidates of local and national elections on all their purchases of goods and services related to campaign expenditures, and income payments made by individuals or juridical persons for their purchases of goods and services intended to be given as campaign contributions to political parties and candidates',
      'Rate' : 0.05
    },
    {
      'ATC' : 'WC690',
      'Desc' : 'Income payments received by Real Estate Investment Trust (REIT) ',
      'Rate' : 0.01
    },
    {
      'ATC' : 'WI710',
      'Desc' : 'Interest income derived from any other debt instruments not within the coverage of deposit substitutes and Revenue Regulations No. 14-2012 ',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WC710',
      'Desc' : 'Interest income derived from any other debt instruments not within the coverage of deposit substitutes and Revenue Regulations No. 14-2012 ',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI720',
      'Desc' : ' Income payments on locally produced raw sugar',
      'Rate' : 0.01
    },
    {
      'ATC' : 'WC720',
      'Desc' : ' Income payments on locally produced raw sugar',
      'Rate' : 0.01
    },
  ]

  bir1601fqtAtc = [
    {
      'ATC' : 'Select ATC--',
      'Desc' : '',
      'Rate' : 0
    },
    {
      'ATC' : 'WC180',
      'Desc' : 'Interest on foreign loans payable to Non-Resident Foreign Corporations (NRFCs)',
      'Rate' : 0.20
    },
    {
      'ATC' : 'WC190',
      'Desc' : 'Interest and other income payments on foreign currency transactions/loans payable to Offshore Banking Units (OBUs)',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC191',
      'Desc' : 'Interest and other income payments on foreign currency transactions/loans payable to Foreign Currency Deposit Units (FCDUs)',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WI202',
      'Desc' : 'Cash dividend payment by domestic corporation to citizens and resident aliens/NRFCs',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC212',
      'Desc' : 'Cash dividend payment by domestic corporation to citizens and resident aliens/NRFCs',
      'Rate' : 0.30
    },
    {
      'ATC' : 'WI203',
      'Desc' : 'Property dividend payment by domestic corporation to citizens and resident aliens/NRFCs',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC213',
      'Desc' : 'Property dividend payment by domestic corporation to citizens and resident aliens/NRFCs',
      'Rate' : 0.30
    },
    {
      'ATC' : 'WC222',
      'Desc' : 'Cash dividend payment by domestic corporation to NRFCs whose countries allowed tax deemed paid credit',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WC223',
      'Desc' : 'Property dividend payment by domestic corporation to NRFCs whose countries allowed tax deemed paid credit',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WI224',
      'Desc' : 'Cash dividend payment by domestic corporation to Non-resident Alien engage in Trade or Business within the Philippines',
      'Rate' : 0.20
    },
    {
      'ATC' : 'WI225',
      'Desc' : 'Property dividend payment by domestic corporation to NRAETB ',
      'Rate' : 0.20
    },
    {
      'ATC' : 'WI226',
      'Desc' : 'VAT Withholding on Purchase of GoodsShare of NRAETB in the distributable net income after tax of a partnership (except General Professional Partnership) of which he is a partner, or share in the net income after tax of an association, joint account or a joint venture taxable as a corporation of which he is a member or a co-venturer',
      'Rate' : 0.20
    },
    {
      'ATC' : 'WC230',
      'Desc' : 'On other payments to NRFCs',
      'Rate' : 0.30
    },
    {
      'ATC' : 'WI240',
      'Desc' : 'Distributive share of individual partners in a taxable partnership, association, joint account or joint venture or consortium',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WI250',
      'Desc' : 'All kinds of royalty payments to citizens, residents aliens and NRAETB (other than WI380 and WI341), domestic and resident foreign corporations',
      'Rate' : 0.20
    },
    {
      'ATC' : 'WC250',
      'Desc' : 'All kinds of royalty payments to citizens, residents aliens and NRAETB (other than WI380 and WI341), domestic and resident foreign corporations',
      'Rate' : 0.20
    },
    {
      'ATC' : 'WI260',
      'Desc' : 'On prizes exceeding P10,000 and other winnings paid to individuals',
      'Rate' : 0.20
    },
    {
      'ATC' : 'WC280',
      'Desc' : 'Branch profit remittances by all corporations except PEZA/SBMA/CDA registered',
      'Rate' : 0.15
    },
    {
      'ATC' : 'WC290',
      'Desc' : 'On the gross rentals, lease and charter fees derived by non-resident owner or lessor of foreign vessels',
      'Rate' : 0.045
    },
    {
      'ATC' : 'WC300',
      'Desc' : 'On the gross rentals, charters and other fees derived by non-resident lessor or aircraft, machineries and equipment',
      'Rate' : 0.075
    },
    {
      'ATC' : 'WI310',
      'Desc' : 'On payments to oil exploration service contractors/sub-contractors',
      'Rate' : 0.08
    },
    {
      'ATC' : 'WC310',
      'Desc' : 'On payments to oil exploration service contractors/sub-contractors',
      'Rate' : 0.08
    },
    {
      'ATC' : 'WI330',
      'Desc' : 'Payments to Non-resident alien not engage in trade or business within the Philippines (NRANETB) except on sale of shares in domestic corporation and real property',
      'Rate' : 0.25
    },
    {
      'ATC' : 'WI340',
      'Desc' : 'On payments to non-resident individual/foreign corporate cinematographic film owners, lessors or distributors',
      'Rate' : 0.25
    },
    {
      'ATC' : 'WC340',
      'Desc' : 'On payments to non-resident individual/foreign corporate cinematographic film owners, lessors or distributors',
      'Rate' : 0.25
    },
    {
      'ATC' : 'WI341',
      'Desc' : 'Royalties paid to NRAETB on cinematographic films and similar works',
      'Rate' : 0.25
    },
    {
      'ATC' : 'WI350',
      'Desc' : 'Final tax on interest or other payments upon tax-free covenant bonds, mortgages, deeds of trust or other obligations under Sec. 57C of the National Internal Revenue Code of 1997, as amended',
      'Rate' : 0.30
    },
    {
      'ATC' : 'WI380',
      'Desc' : 'Royalties paid to citizens, resident aliens and NRAETB on books, other literary works and musical compositions',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WI410',
      'Desc' : 'Informers Cash Reward to individuals/juridical persons ',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC410',
      'Desc' : 'Informers Cash Reward to individuals/juridical persons ',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WI700',
      'Desc' : 'Cash or property dividend paid by a Real Estate Investment Trust (REIT) ',
      'Rate' : 0.10
    },
    {
      'ATC' : 'WC700',
      'Desc' : 'Cash or property dividend paid by a Real Estate Investment Trust (REIT) ',
      'Rate' : 0.10
    },
  ]

  bir1601fqtreaty = [
    {
      'Code' : 'Select Treaty Code --',
      'Country' : 'Select Country --',
    },
    {
      'Code' : 'AU',
      'Country' : 'Australia',
    },
    {
      'Code' : 'AT',
      'Country' : 'Austria',
    },
    {
      'Code' : 'BH',
      'Country' : 'Bahrain',
    },
    {
      'Code' : 'BD',
      'Country' : 'Bangladesh',
    },
    {
      'Code' : 'BE',
      'Country' : 'Belgium',
    },
    {
      'Code' : 'BR',
      'Country' : 'Brazil',
    },
    {
      'Code' : 'CA',
      'Country' : 'Canada',
    },
    {
      'Code' : 'CN',
      'Country' : 'China',
    },
    {
      'Code' : 'CZ',
      'Country' : 'Czech Republic',
    },
    {
      'Code' : 'DK',
      'Country' : 'Denmark',
    },
    {
      'Code' : 'FI',
      'Country' : 'Finland',
    },
    {
      'Code' : 'FR',
      'Country' : 'France',
    },
    {
      'Code' : 'DE',
      'Country' : 'Germany',
    },
    {
      'Code' : 'HU',
      'Country' : 'Hungary',
    },
    {
      'Code' : 'IN',
      'Country' : 'India',
    },
    {
      'Code' : 'ID',
      'Country' : 'Indonesia',
    },
    {
      'Code' : 'IL',
      'Country' : 'Israel',
    },
    {
      'Code' : 'IT',
      'Country' : 'Italy',
    },
    {
      'Code' : 'JP',
      'Country' : 'Japan',
    },
    {
      'Code' : 'KR',
      'Country' : 'Korea',
    },
    {
      'Code' : 'KW',
      'Country' : 'Kuwait',
    },
    {
      'Code' : 'MY',
      'Country' : 'Malaysia',
    },
    {
      'Code' : 'NL',
      'Country' : 'Netherlands',
    },
    {
      'Code' : 'NZ',
      'Country' : 'New Zealand',
    },
    {
      'Code' : 'NG',
      'Country' : 'Nigeria',
    },
    {
      'Code' : 'NO',
      'Country' : 'Norway',
    },
    {
      'Code' : 'PK',
      'Country' : 'Pakistan',
    },
    {
      'Code' : 'PL',
      'Country' : 'Poland',
    },
    {
      'Code' : 'RO',
      'Country' : 'Romania',
    },
    {
      'Code' : 'RU',
      'Country' : 'Russia',
    },
    {
      'Code' : 'SG',
      'Country' : 'Singapore',
    },
    {
      'Code' : 'ES',
      'Country' : 'Spain',
    },
    {
      'Code' : 'SE',
      'Country' : 'Sweden',
    },
    {
      'Code' : 'CH',
      'Country' : 'Switzerland',
    },
    {
      'Code' : 'TH',
      'Country' : 'Thailand',
    },
    {
      'Code' : 'UAE',
      'Country' : 'United Arab Emirates',
    },
    {
      'Code' : 'GB',
      'Country' : 'United Kingdom',
    },
    {
      'Code' : 'US',
      'Country' : 'United States of America',
    },
    {
      'Code' : 'VN',
      'Country' : 'Vietnam',
    },
  ]

  bir1602qtAtc = [
    {
      'ATC' : 'Select ATC--',
      'Desc' : '',
      'Rate' : 0
    },
    {
      'ATC' : 'WI161',
      'Desc' : '',
      'Rate' : 20
    },
    {
      'ATC' : 'WC161',
      'Desc' : '',
      'Rate' : 20
    },
    {
      'ATC' : 'WI162',
      'Desc' : '',
      'Rate' : 20
    },
    {
      'ATC' : 'WC162',
      'Desc' : '',
      'Rate' : 20
    },
    {
      'ATC' : 'WI163',
      'Desc' : '',
      'Rate' : 20
    },
    {
      'ATC' : 'WC163',
      'Desc' : '',
      'Rate' : 20
    },

    {
      'ATC' : 'WI440',
      'Desc' : '',
      'Rate' : 20
    },
    {
      'ATC' : 'WI441',
      'Desc' : '',
      'Rate' : 12
    },
    {
      'ATC' : 'WI442',
      'Desc' : '',
      'Rate' : 5
    },{
      'ATC' : 'WC440',
      'Desc' : '',
      'Rate' : 20
    },
    {
      'ATC' : 'WI170',
      'Desc' : '',
      'Rate' : 15
    },
    {
      'ATC' : 'WC170',
      'Desc' : '',
      'Rate' : 15
    },
  ]

  birIPA = [
    {
      'Code' : 'Select IPA Code --',
      'Name' : 'Select IPA Code --',
    },
    {
      'Code' : 'APECO',
      'Name' : 'Aurora Pacific Economic Zone and Freeport Authority',
    },
    {
      'Code' : 'AFAB',
      'Name' : 'Authority of the Freeport Area of Bataan',
    },
    {
      'Code' : 'BCDA',
      'Name' : 'Bases Conversion and Development Authority',
    },
    {
      'Code' : 'BOI',
      'Name' : 'Board of Investments',
    },
    {
      'Code' : 'CEZA',
      'Name' : 'Cagayan Economic Zone Authority',
    },
    {
      'Code' : 'CDC',
      'Name' : 'Clark Development Corporation ',
    },
    {
      'Code' : 'JHMC',
      'Name' : 'John Hay Management Corporation',
    },
    {
      'Code' : 'PEZA',
      'Name' : 'Philippine Economic Zone Authority',
    },
    {
      'Code' : 'PPMC',
      'Name' : 'Poro Point Management Corporation',
    },
    {
      'Code' : 'RBOI-ARMM',
      'Name' : 'Regional Board of Investment-Autonomous Region of Muslim Mindanao',
    },
    {
      'Code' : 'SBMA',
      'Name' : 'Subic Bay Metropolitan Authority',
    },
    {
      'Code' : 'TIEZA',
      'Name' : 'Tourism Infrastructure and Enterprise Zone Authority',
    },
    {
      'Code' : 'ZCSEZA',
      'Name' : 'Zamboanga City Special Economic Zone Authority',
    },
  ]

  penaltyValue : any = 0;
  amountpayable : any = 0;
  netamountofremittance : any = 0;
  totalamountremittance : any = 0;
  totalATC : any = 0;
  atc1TaxWithheld : any = 0;
  atc2TaxWithheld : any = 0;
  atc3TaxWithheld : any = 0;
  atc4TaxWithheld : any = 0;
  atc5TaxWithheld : any = 0;
  totalTaxPaymentsMade : any = 0;
  taxStillDue : any = 0;
  totalAmountStillDue: any = 0;
  totalNonTaxableCompensation : any = 0;
  totalTaxableCompensation: any;
  netTaxableCompensation: any;
  totaxTaxesWithheld: any;
  TaxesWithheldRemittance: number;
  totalTaxRemittancesMade: number;
  totalRemittanceMade: any;
  atc6TaxWithheld: number;
  taxesWithheldQuarterTaxTreaty: number;
  taxesWithheldQuarter: number;
  taxesWithheldQuarterRegularRates: any;
  taxesWithheldQuarterPreferentialRates: any;
  totalTaxesWithheldQuarter: any;

  isTaxPayerSubmit : any = true;

  taxpayerProfile = [];
  // taxpayerDetails = [];

  taxFilingRecord = [];
  taxfilindetails1: any;

  recentFiling: any = [];
  notificationContent: any;
  notificationReferenceNo: any;
  public taxpayerDetails: any = {
    taxpayerName:'',
    taxpayerType:'',
    tinid:'',
    rdoCode:'',
    taxpayerAddress:'',
    zipcode:'',
    contactNumber:'',
    email:'',
  };

  public taxpayerDetails1: any = {
    taxpayerName:'',
    taxpayerType:'',
    tinid:'',
    rdoCode:'',
    taxpayerAddress:'',
    zipcode:'',
    contactNumber:'',
    email:'',
  };
  returnDateVal: string;
  RecentFilingDataReady: any = false;

  constructor(private taxfilingservice : TaxfilingService,
    private router: Router) {
      this.rdolist = this.taxfilingservice.RDO;
     }

  ngOnInit() {
    this.taxpayerDetails = [];
    this.taxpayerDetails1 = [];
    this.onGetStarted = this.taxfilingservice.onGetStarted;
    this.sid = this.taxfilingservice.getCookie('sidClient');
    if(this.sid == "") {
      this.router.navigate(['/']);
      return;
    }
    this.onGetMainFeed(this.sid);
      
    this.getCurrentDate();
    this.getFullname();
    $("#tb-input-debit").prop('disabled', true);
    $("#tb-input-credit").prop('disabled', true);

    let username = this.sid;
    this.taxfilingservice.requestClientData()  
    .subscribe(res=> { 
      let logAuthID = res.filter(function(value){
        return value["username"] == username;
      });

      this.clientData = logAuthID;

      let businessnamevalu = logAuthID.map(function(data){ 
        return data['businessName']; 
      });

      this.businessNameRecord = businessnamevalu[0];

      this.taxfilingservice.getUniqueRecord(businessnamevalu, this.businessname);

      if(businessnamevalu !== null) {
        this.getBusinessRecord(businessnamevalu[0], null);
      }

    });
    
    this.CheckTaxProfile();
    this.dashboardRecentFilingList();
  }

  getCurrentDate(){
    let datetimevar = this.taxfilingservice.getDateTime(true);
    this.date = datetimevar["date"];

    var today = new Date();
    $('#tb-input-date').val(today.toISOString().substr(0, 10));
  }

  homeNavigate(event) {
    let target = event.target;
    let container = target.classList[0];
    switch(target.classList[1]) {
      case "dashboard":
        this.activeDashboard = true;
        this.activeBookeeping = false;
        this.activeTaxFiling = false;
        this.activeReports = false;

        this.dashboardRecentFilingList();
        break;
      case "bookeeping":
        this.activeDashboard = false;
        this.activeBookeeping = true;
        this.activeTaxFiling = false;
        this.activeReports = false;
        break;
      case "taxfiling":
        this.activeDashboard = false;
        this.activeBookeeping = false;
        this.activeTaxFiling = true;
        this.activeReports = false;
        break;
      case "reports":
        this.activeDashboard = false;
        this.activeBookeeping = false;
        this.activeTaxFiling = false;
        this.activeReports = true;
        break;
    }
    this.CheckTaxProfile();
  }

  onGetStartedNavigate(page){
    switch(page) {
      case "dashboard":
        this.activeDashboard = true;
        this.activeBookeeping = false;
        this.activeTaxFiling = false;
        this.activeReports = false;
        break;
      case "bookeeping":
        this.activeDashboard = false;
        this.activeBookeeping = true;
        this.activeTaxFiling = false;
        this.activeReports = false;
        break;
      case "taxfiling":
        this.activeDashboard = false;
        this.activeBookeeping = false;
        this.activeTaxFiling = true;
        this.activeReports = false;
        break;
    }
  }

  onGetMainFeed(id){
    let logValue = this.taxfilingservice.getLog()
    .subscribe(data => {
      let logAuthID = data.filter(function(value){
        return value["userID"] == id;
      });
      this.mainLogValue = logAuthID;
    });
  }

  selectEvent(item) {
    let drcr = item.drcr;
    let type = item.Type;
    $("#tb-input-debit").prop('disabled', true);
    $("#tb-input-credit").prop('disabled', true);
    $("#tb-input-debit").val(0.00);
    $("#tb-input-credit").val(0.00);
    switch(drcr){
      case 'DR':
        $("#tb-input-debit").prop('disabled', false);
        break;
      case 'CR':
        $("#tb-input-credit").prop('disabled', false);
        break;
      case 'DR|CR':
        $("#tb-input-debit").prop('disabled', false);
        $("#tb-input-credit").prop('disabled', false);
        break;
    }

    $('#tb-input-description').attr('data-Type', type);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
    $('#tb-input-businessname > .autocomplete-container > .input-container > input').removeClass('empty-field');
  }

  onFocusedDesc(e) {
    $('#tb-input-description > .autocomplete-container > .input-container > input').removeClass('empty-field');
  }

  selectRDOList(e) {

  }

  selectBusinessName(item){
    $('#tb-input-businessname > .autocomplete-container > .input-container > input').val('');
    $('#tb-input-description > .autocomplete-container > .input-container > input').val('');
    $('#tb-input-period').val('daily');
    $('#tb-input-selectjournal').val(1);
    $('#tb-input-selectjournal').val('purchase');
    $('#tb-input-typeofentry').val('transaction');
    // $('#tb-input-description > .autocomplete-container > .input-container > input').val('');
    $('#tb-input-debit').val('0.00');
    $('#tb-input-credit').val('0.00');
    $("#tb-input-debit").prop('disabled', true);
    $("#tb-input-credit").prop('disabled', true);
    var today = new Date();
    $('#tb-input-date').val(today.toISOString().substr(0, 10));
    $('#bookkeeping-proceed').css({ 'display' : 'none' });
  }

  removeRecord(target){
    this.taxfilingservice.taxFilingData['BookKeepingData'].splice(this.taxfilingservice.taxFilingData['BookKeepingData'].indexOf(target), 1);
  }

  AddRecord(){
    let data = null;
    let timestamp = this.taxfilingservice.getDateTime(false);

        if($('#tb-input-businessname > .autocomplete-container > .input-container > input').val() == '' || $('#tb-input-description > .autocomplete-container > .input-container > input').val() == '' || $('#tb-input-debit').val() == '' || $('#tb-input-credit').val() == '') {
          if($('#tb-input-businessname > .autocomplete-container > .input-container > input').val() == '') {
            $('#tb-input-businessname > .autocomplete-container > .input-container > input').addClass('empty-field');
          }
          if($('#tb-input-description > .autocomplete-container > .input-container > input').val() == '') {
            $('#tb-input-description > .autocomplete-container > .input-container > input').addClass('empty-field');
          }
          if($('#tb-input-debit').val() == ''){
            $('#tb-input-debit').addClass('empty-field');
          }
          if($('#tb-input-credit').val() == ''){
            $('#tb-input-credit').addClass('empty-field');
          }
          return;
        }

        this.increment = this.increment + 1;
        let accnttype = $('#tb-input-description > .autocomplete-container > .input-container > input').val();
        data = {
          'no' : this.increment,
          'journaltype' : $('#tb-input-selectjournal').val(),
          'date' : $('#tb-input-date').val(),
          'entrytype' : $('#tb-input-typeofentry').val(),
          'description' : $('#tb-input-description > .autocomplete-container > .input-container > input').val(),
          'type' : accnttype,
          'status' : 'pending',
          'timestamp' : timestamp,
          'debit' : parseFloat($('#tb-input-debit').val().toString()),
          'credit' : parseFloat($('#tb-input-credit').val().toString())
        }
    this.record.push(data);

    var debitval = 0, 
    creditval = 0,
    bookkeepingdata = this.record.map(function(data) { return data['credit'] }),
    bookkeepingdatadebit = this.record.map(function(data) { return data['debit'] });


    for(let i = 0; i <bookkeepingdata.length; i++){
      debitval = debitval + bookkeepingdatadebit[i];
      creditval = creditval + bookkeepingdata[i];
    }
    $('#tb-total-debit').val(debitval);
    $('#tb-total-credit').val(creditval);
  }

  RemoveVal() {
    if(this.Selecteddata == null) return;
    this.record.splice(this.record.indexOf(this.Selecteddata), 1);

    var debitval = 0, 
    creditval = 0,
    bookkeepingdata = this.record.map(function(data) { return data['credit'] }),
    bookkeepingdatadebit = this.record.map(function(data) { return data['debit'] });

    for(let i = 0; i <bookkeepingdata.length; i++){
      debitval = debitval + bookkeepingdatadebit[i];
      creditval = creditval + bookkeepingdata[i];
    }
    $('#tb-total-debit').val(debitval);
    $('#tb-total-credit').val(creditval);

    this.Selecteddata = null;
  }

  ResetVal(){
    $('#tb-input-businessname > .autocomplete-container > .input-container > input').val('');
    $('#tb-input-businessname > .autocomplete-container > .input-container > input').removeClass('empty-field');
    $('#tb-input-description > .autocomplete-container > .input-container > input').val('');
    $('#tb-input-description > .autocomplete-container > .input-container > input').removeClass('empty-field');
    $('#tb-input-period').val('daily');
    $('#tb-input-selectjournal').val(1);
    $('#tb-input-selectjournal').val('purchase');
    $('#tb-input-typeofentry').val('transaction');
    // inputDesc.val('');
    $('#tb-input-debit').val('0.00');
    $('#tb-input-credit').val('0.00');
    $("#tb-input-debit").prop('disabled', true);
    $("#tb-input-credit").prop('disabled', true);
    var today = new Date();
    $('#tb-input-date').val(today.toISOString().substr(0, 10));
    $('#bookkeeping-proceed').css({ 'display' : 'none' });

    this.record = [];
  }

  ProceedVal(){
    if( $('#tb-input-businessname > .autocomplete-container > .input-container > input').val() == '' || $('#tb-input-description > .autocomplete-container > .input-container > input').val() == '') {
      if( $('#tb-input-businessname > .autocomplete-container > .input-container > input').val() == '') {
        $('#tb-input-businessname > .autocomplete-container > .input-container > input').addClass('empty-field');
      }
      if($('#tb-input-description > .autocomplete-container > .input-container > input').val() == '') {
        $('#tb-input-description > .autocomplete-container > .input-container > input').addClass('empty-field');
      }
      return;
    }
    $('#bookkeeping-proceed').css({ 'display' : 'block' });
  }
  
  proceedSubmit() {
    let username = this.taxfilingservice.getSid();
    let pending = "Pending";
    let businessname = $('#tb-input-businessname > .autocomplete-container > .input-container > input').val();
    let period = $('#tb-input-period').val();
    let data = JSON.stringify(this.record);

    this.taxfilingservice.onSubmitBookkeeping(username, this.fullnameAuth.fullName, businessname, data);

    $('#tb-input-businessname > .autocomplete-container > .input-container > input').val('');
    $('#tb-input-businessname > .autocomplete-container > .input-container > input').removeClass('empty-field');
    $('#tb-input-description > .autocomplete-container > .input-container > input').val('');
    $('#tb-input-description > .autocomplete-container > .input-container > input').removeClass('empty-field');
    $('#tb-input-period').val('daily');
    $('#tb-input-selectjournal').val(1);
    $('#tb-input-selectjournal').val('purchase');
    $('#tb-input-typeofentry').val('transaction');
    // inputDesc.val('');
    $('#tb-input-debit').val('0.00');
    $('#tb-input-credit').val('0.00');
    $("#tb-input-debit").prop('disabled', true);
    $("#tb-input-credit").prop('disabled', true);
    var today = new Date();
    $('#tb-input-date').val(today.toISOString().substr(0, 10));
    $('#bookkeeping-proceed').css({ 'display' : 'none' });

    this.record = [];
    this.taxfilingservice.taxFilingData['BookKeepingData'] = [];

    $('#bookkeeping-proceed').css({ 'display' : 'none' });
  }

  proceedCancel(){
    $('#bookkeeping-proceed').css({ 'display' : 'none' });
  }

  getFullname(){
    let username = this.taxfilingservice.getSid();
    this.taxfilingservice.getAuth().subscribe(data => {
    let user = data.find(function(value){
      return value["username"] == username;
    });
    this.fullnameAuth = user;
  });
  }

  loadFile = function(event) {
    let image = document.getElementById('output');
    let file = event.target.files[0];
    let filetype = file["type"];
    let fileName = file["name"]
    let rawName = fileName.split('.').slice(0, -1).join('.')
    let validFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    this.serviceWorker.onAttachedFileHandler(file, false);
    if(filetype == validFileTypes[0] || filetype == validFileTypes[1]) {
      image["src"] = URL.createObjectURL(event.target.files[0]);
  
      $('.main-tax-filing-buttons').css('display', 'none');
    }
    else if(filetype == validFileTypes[2]) {
      let reader = new FileReader();
    reader.onload = (e: any) => {
      this.pdfSrc = e.target.result;
    };
    reader.readAsArrayBuffer(file);
    $('.main-tax-filing-buttons').css('display', 'none');
    } else {
      console.log('Error input file. Please Try again');
    }
    let input = document.getElementsByClassName('uploadtaxform');
  };

  getBusinessRecordDateBased(businessdate){
    this.businessDateRecord = businessdate;

    this.getBusinessRecord(this.businessNameRecord, businessdate);
  }

  getBusinessRecordNameBased(businessname){
    this.businessNameRecord = businessname;
    
    this.getBusinessRecord(this.businessNameRecord, null);
  }


  getBusinessRecord(businessname, businessdate) {
    this.clientRecordAsset = [];
    this.clientRecordLiability = [];
    this.clientRecordEquity = [];
    this.clientRecordRevenue = [];
    this.clientRecordExpenses = [];
    this.clientFinancingCashFlow = [];
    this.clientInvestingCashFlow = [];
    this.clientOperatingCashFlow = [];
    let businessnamerec = this.businessNameRecord; 
    let businessrecord = this.clientData.filter(function(data){ 
      return data['businessName'] == businessnamerec; 
    });
    this.clientRecordData = businessrecord.map(function(data){ 
      return JSON.parse(data['record']); 
    });

    for(var i = 0; i < this.clientRecordData.length; i++) {
      for(var ii = 0; ii < this.clientRecordData[i].length; ii++){
        let record = this.clientRecordData[i][ii];
        // this.businessCategoryTimestamp.push(datestr);

        if(businessdate == null) {
          let currDate = new Date(this.clientRecordData[0][0].timestamp);
          let currdatestr = currDate.toISOString().substr(0, 10);

          let recordtimestamp = new Date(this.clientRecordData[i][ii].timestamp);
          let recorddatestr = recordtimestamp.toISOString().substr(0, 10);
          if(currdatestr !== recorddatestr) continue;
        } else {
          let recordtimestamp = new Date(this.clientRecordData[i][ii].timestamp);
          let recorddatestr = recordtimestamp.toISOString().substr(0, 10);
          if(businessdate !== recorddatestr) continue;
        }
        switch(this.clientRecordData[i][ii].type) {
          case "Asset":
            this.clientRecordAsset.push(record);
            break;
          case "Liabilities":
            this.clientRecordLiability.push(record);
            break;
          case "Equity":
            this.clientRecordEquity.push(record);
            break;
          case "Revenue":
            this.clientRecordRevenue.push(record);
            break;
          case "Expenses":
            this.clientRecordExpenses.push(record);
            break;
        }
  
        var clientRecordDesc = this.clientRecordData[i][ii].description;
        if(clientRecordDesc.includes("Depreciation") || clientRecordDesc.includes("Amortization") || clientRecordDesc.includes("Account Payables") || clientRecordDesc.includes("Inventory") || clientRecordDesc.includes("Inventories") || clientRecordDesc.includes("Accrued Expenses") || clientRecordDesc.includes("Unearned Revenue")) {
          this.clientOperatingCashFlow.push(this.clientRecordData[i][ii]);
        } else if(clientRecordDesc.includes("Property") || clientRecordDesc.includes("Sales") || clientRecordDesc.includes("Investments") || clientRecordDesc.includes("Software")) {
          this.clientInvestingCashFlow.push(this.clientRecordData[i][ii]);
        } else if (clientRecordDesc.includes("Financial") || clientRecordDesc.includes("Capital") || clientRecordDesc.includes("Debts")) {
          this.clientFinancingCashFlow.push(this.clientRecordData[i][ii]);
        }
      }
    }

    this.getBusinessRecordDate();

    var debitval = 0, 
    creditval = 0,
    revenueval = 0,
    expensesval = 0,
    bookkeepingdata = [],
    bookkeepingdatadebit = [],
    incomestatementRevenue = [],
    incomestatementExpenses = [],
    incomeStatementTotalVal = 0,
    cashFlowTotalOperation = 0,
    cashFlowTotalFinancial = 0,
    cashFlowTotalInvestment = 0,
    cashFlowTotalValue = 0;

    // for(var x = 0; x < this.clientRecordData.length; x++) {
    //   for(var xx = 0; xx < this.clientRecordData[x].length; xx++){ 
    //       let creditVal = this.clientRecordData[x][xx].credit, 
    //       debitVal = this.clientRecordData[x][xx].debit;
    //       bookkeepingdata.push(creditVal);
    //       bookkeepingdatadebit.push(debitVal);
    //   }
    // }

    for(var x = 0; x < this.clientRecordAsset.length; x++) { 
      bookkeepingdatadebit.push(this.clientRecordAsset[x].debit);
      bookkeepingdata.push(this.clientRecordAsset[x].credit);
    }

    for(var x = 0; x < this.clientRecordLiability.length; x++) { 
      bookkeepingdata.push(this.clientRecordLiability[x].credit);
    }

    for(var x = 0; x < this.clientRecordEquity.length; x++) {
      bookkeepingdatadebit.push(this.clientRecordEquity[x].debit);
      bookkeepingdata.push(this.clientRecordEquity[x].credit);
    }

    for(var x = 0; x < this.clientRecordRevenue.length; x++) { 
      incomestatementRevenue.push(this.clientRecordRevenue[x].debit);
      incomestatementRevenue.push(this.clientRecordRevenue[x].credit);
    }

    for(var x = 0; x < this.clientRecordExpenses.length; x++) { 
      incomestatementExpenses.push(this.clientRecordExpenses[x].debit);
      incomestatementExpenses.push(this.clientRecordExpenses[x].credit);
    }

    for(let i = 0; i <bookkeepingdata.length; i++){
      if(bookkeepingdata.length == 0) {
        creditval = 0;
        continue;
      } else {
        creditval = creditval + bookkeepingdata[i];

      }
    }

    for(let i = 0; i <bookkeepingdatadebit.length; i++){
      if(bookkeepingdatadebit.length == 0) {
        debitval = 0;
        continue;
      } else {
        debitval = debitval + bookkeepingdatadebit[i];
      }
    }

    for(let i = 0; i <incomestatementRevenue.length; i++){
      if(incomestatementRevenue.length == 0) {
        revenueval = 0;
        continue;
      } else {
        revenueval = revenueval + incomestatementRevenue[i];
      }
    }

    for(let i = 0; i <incomestatementExpenses.length; i++){
      if( incomestatementExpenses.length == 0) {
        expensesval = 0;
        continue;
      } else {
        expensesval = expensesval + incomestatementExpenses[i];
      }
    }

    for(let ii = 0; ii < this.clientOperatingCashFlow.length; ii++) {
      cashFlowTotalOperation = cashFlowTotalOperation + this.clientOperatingCashFlow[ii].debit;
      cashFlowTotalOperation = cashFlowTotalOperation - this.clientOperatingCashFlow[ii].credit;
    }

    for(let iii = 0; iii < this.clientInvestingCashFlow.length; iii++) {
      cashFlowTotalInvestment = cashFlowTotalInvestment + this.clientInvestingCashFlow[iii].debit;
      cashFlowTotalInvestment = cashFlowTotalInvestment - this.clientInvestingCashFlow[iii].credit;
    }

    for(let iiii = 0; iiii < this.clientFinancingCashFlow.length; iiii++) {
      cashFlowTotalFinancial = cashFlowTotalFinancial + this.clientFinancingCashFlow[iiii].debit;
      cashFlowTotalFinancial = cashFlowTotalFinancial - this.clientFinancingCashFlow[iiii].credit;
    }


    incomeStatementTotalVal = Number.isNaN(revenueval) ? 0 : revenueval - expensesval;
    cashFlowTotalValue = cashFlowTotalOperation + cashFlowTotalInvestment + cashFlowTotalFinancial;

    this.balanceSheetDebit = debitval;
    this.balanceSheetCredit = creditval; 
    this.incomeStatementRevenue = revenueval;
    this.incomeStatementExpenses = expensesval;
    this.incomeStatementTotal = incomeStatementTotalVal;
    this.cashFlowOperationsTotal = cashFlowTotalOperation;
    this.cashFlowInvestmentTotal = cashFlowTotalInvestment;
    this.cashFlowFinancialTotal = cashFlowTotalFinancial;
    this.cashFlowEndingBalance = cashFlowTotalValue;
  }

  getBusinessRecordDate() {
    this.businessCategoryTimestamp = [];
    let businessTimeStamp = [];

    for(var i = 0; i < this.clientRecordData.length; i++) {
      for(var ii = 0; ii < this.clientRecordData[i].length; ii++){
        let timestamp = new Date(this.clientRecordData[i][ii].timestamp);
        let datestr = timestamp.toISOString().substr(0, 10);
        businessTimeStamp.push(datestr);
      }
    }

    this.taxfilingservice.getUniqueRecord(businessTimeStamp, this.businessCategoryTimestamp);

  }

  
  getSelectedTableRow(event, data) {
    let target = event.target;
    let td = document.getElementsByClassName('datalogVal');
    for(let i=0;i<td.length;i++){
      td[i].classList.remove('selected');
    }
    target.parentNode.classList.add('selected');
    this.Selecteddata = data;
    // let parentAttr = target.parentNode.dataset['logNo'];
    this.taxfilingservice.selected = data;
  }

  navigateTaxFilingPage(event, page){
    for(var i = 0; i < this.birLink.length; i++){
      this.birLink[i].active = false;
      for(var ii = 0; ii < this.birLink[i].pages.length; ii ++) {
        this.birLink[i].pages[ii] = false;
      }
      this.birLink[i].pages[0] = true;
    }
    page.active = !page.active;

    this.taxFilingPage1 = true;
    this.taxFilingPage2 = false;
    this.taxFilingPage3 = false;
    this.taxFilingPage4 = false;
    this.taxFilingPage5 = false;
    this.taxFilingPage6 = false;
  }

  getATCRate() {

  }
  
  navigateInnerPage(link, page, formName) {
    let data = null;
    for(var ii = 0; ii < link.pages.length; ii ++) {
      link.pages[ii] = false;
    }

    link.pages[page] = true;
    var step = formName.split('-');
    if(step[1] == 'submit' || step[2] == 'submit'){
      if(step[0] == '1701') {
        let refID = this.sid + '-' + this.recentFiling.length;
        this.taxfilingservice.onSubmitTaxFiling(this.sid, JSON.stringify(this.taxpayerDetails), this.taxpayerDetails1.length == 0 ? null : JSON.stringify(this.taxpayerDetails1), null, null, null, this.taxfilindetails1['birformno'], this.taxfilindetails1['returnperiod'],JSON.stringify(this.taxfilindetails1), refID, "Pending");
        var today = new Date();
        this.returnDateVal = today.toISOString().substr(0, 10);
        return;
      } else {
        let refID = this.sid + '-' + this.recentFiling.length;
        this.taxfilingservice.onSubmitTaxFiling(this.sid, JSON.stringify(this.taxpayerDetails), null, null, null, null, this.taxfilindetails1['birformno'], this.taxfilindetails1['returnperiod'],JSON.stringify(this.taxfilindetails1), refID, "Pending");
        var today = new Date();
        this.returnDateVal = today.toISOString().substr(0, 10);
        return;
      }
    } else if(step[1] == 'skip'){
      return;
    }
    if(formName !== null || formName !== undefined) {
      let basictax = parseFloat($('#' + formName + '-input-basictax').val()),
      surcharge = parseFloat($('#' + formName + '-input-surcharge').val()),
      interest = parseFloat($('#' + formName + '-input-interest').val()),
      compromise = parseFloat($('#' + formName + '-input-compromise').val()),
      penaltiespayable = parseFloat($('#' + formName + '-input-penaltiespayable').val()),
      remittance = parseFloat($('#' + formName + '-input-remittance').val()),
      remittedfrompreviously = parseFloat($('#' + formName + '-input-remittedfrompreviously').val()),
      WMF10 = parseFloat($('#' + formName + '-input-WMF10').val()),
      WMF20 = parseFloat($('#' + formName + '-input-WMF20').val()),
      ATC1 = $('#' + formName + '-input-atc1').val() !== undefined ? parseFloat($('#' + formName + '-input-atc1').val()) : 0,
      ATC2 = $('#' + formName + '-input-atc2').val() !== undefined ? parseFloat($('#' + formName + '-input-atc2').val()) : 0,
      ATC3 = $('#' + formName + '-input-atc3').val() !== undefined ? parseFloat($('#' + formName + '-input-atc3').val()) : 0,
      ATC4 = $('#' + formName + '-input-atc4').val() !== undefined ? parseFloat($('#' + formName + '-input-atc4').val()) : 0,
      ATC5 = $('#' + formName + '-input-atc5').val() !== undefined ? parseFloat($('#' + formName + '-input-atc5').val()) : 0,
      ATC6 = $('#' + formName + '-input-atc6').val() !== undefined ? parseFloat($('#' + formName + '-input-atc6').val()) : 0,
      atc1TaxBase = parseFloat($('#' + formName + '-input-atc1-tax-base').val()),
      atc2TaxBase = parseFloat($('#' + formName + '-input-atc2-tax-base').val()),
      atc3TaxBase = parseFloat($('#' + formName + '-input-atc3-tax-base').val()),
      atc4TaxBase = parseFloat($('#' + formName + '-input-atc4-tax-base').val()),
      atc5TaxBase = parseFloat($('#' + formName + '-input-atc5-tax-base').val()),
      atc6TaxBase = parseFloat($('#' + formName + '-input-atc6-tax-base').val()),
      otherpayments = parseFloat($('#' + formName + '-input-otherpayments').val()),
      totalAmountCompensation = parseFloat($('#' + formName + '-input-totalAmountCompensation').val()),
      statutoryMinimumWage = parseFloat($('#' + formName + '-input-statutoryMinimumWage').val()),
      holidayPay = parseFloat($('#' + formName + '-input-holidayPay').val()),
      Month13thPay = parseFloat($('#' + formName + '-input-Month13thPay').val()),
      DeMinimis = parseFloat($('#' + formName + '-input-DeMinimis').val()),
      SSSGSISPHIC = parseFloat($('#' + formName + '-input-SSSGSISPHIC').val()),
      otherNonTaxable = parseFloat($('#' + formName + '-input-otherNonTaxable').val()),
      taxableCompensationNotSubject = parseFloat($('#' + formName + '-input-taxableCompensationNotSubject').val()),
      otherRemittancesMade = parseFloat($('#' + formName + '-input-otherRemittancesMade').val()),
      overRemittancefromPreviousQuarter = parseFloat($('#' + formName + '-input-overRemittancefromPreviousQuarter').val()),
      remittance1stQuarter = parseFloat($('#' + formName + '-input-remittance1stQuarter').val()),
      remittance2ndQuarter = parseFloat($('#' + formName + '-input-remittance2ndQuarter').val()),
      atc1Country = $('#' + formName + '-input-sched-atc1-country').val(),
      atc2Country = $('#' + formName + '-input-sched-atc2-country').val(),
      atc3Country = $('#' + formName + '-input-sched-atc3-country').val(),
      atc4Country = $('#' + formName + '-input-sched-atc4-country').val(),
      atc5Country = $('#' + formName + '-input-sched-atc5-country').val(),
      schedATC1 = $('#' + formName + '-input-sched-atc1').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc1').val()) : 0,
      schedATC2 = $('#' + formName + '-input-sched-atc2').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc2').val()) : 0,
      schedATC3 = $('#' + formName + '-input-sched-atc3').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc3').val()) : 0,
      schedATC4 = $('#' + formName + '-input-sched-atc4').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc4').val()) : 0,
      schedATC5 = $('#' + formName + '-input-sched-atc5').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc5').val()) : 0,
      schedATC6 = $('#' + formName + '-input-sched-atc6').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc6').val()) : 0,
      schedATC7 = $('#' + formName + '-input-sched-atc7').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc7').val()) : 0,
      schedATC8 = $('#' + formName + '-input-sched-atc8').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc8').val()) : 0,
      schedATC9 = $('#' + formName + '-input-sched-atc9').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc9').val()) : 0,
      schedATC10 = $('#' + formName + '-input-sched-atc10').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc10').val()) : 0,
      schedATC11 = $('#' + formName + '-input-sched-atc11').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc11').val()) : 0,
      schedATC12 = $('#' + formName + '-input-sched-atc12').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc12').val()) : 0,
      schedATC13 = $('#' + formName + '-input-sched-atc13').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc13').val()) : 0,
      schedATC14 = $('#' + formName + '-input-sched-atc14').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc14').val()) : 0,
      schedATC15 = $('#' + formName + '-input-sched-atc15').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc15').val()) : 0,
      schedATC16 = $('#' + formName + '-input-sched-atc16').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc16').val()) : 0,
      schedATC17 = $('#' + formName + '-input-sched-atc17').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc17').val()) : 0,
      schedATC18 = $('#' + formName + '-input-sched-atc18').val() !== undefined ? parseFloat($('#' + formName + '-input-sched-atc18').val()) : 0,
      schedatc1TaxBase = parseFloat($('#' + formName + '-input-sched-atc1-tax-base').val()),
      schedatc2TaxBase = parseFloat($('#' + formName + '-input-sched-atc2-tax-base').val()),
      schedatc3TaxBase = parseFloat($('#' + formName + '-input-sched-atc3-tax-base').val()),
      schedatc4TaxBase = parseFloat($('#' + formName + '-input-sched-atc4-tax-base').val()),
      schedatc5TaxBase = parseFloat($('#' + formName + '-input-sched-atc5-tax-base').val()),
      schedatc6TaxBase = parseFloat($('#' + formName + '-input-sched-atc6-tax-base').val()),
      schedatc7TaxBase = parseFloat($('#' + formName + '-input-sched-atc7-tax-base').val()),
      schedatc8TaxBase = parseFloat($('#' + formName + '-input-sched-atc8-tax-base').val()),
      schedatc9TaxBase = parseFloat($('#' + formName + '-input-sched-atc9-tax-base').val()),
      schedatc10TaxBase = parseFloat($('#' + formName + '-input-sched-atc10-tax-base').val()),
      schedatc11TaxBase = parseFloat($('#' + formName + '-input-sched-atc11-tax-base').val()),
      schedatc12TaxBase = parseFloat($('#' + formName + '-input-sched-atc12-tax-base').val()),
      schedatc13TaxBase = parseFloat($('#' + formName + '-input-sched-atc13-tax-base').val()),
      schedatc14TaxBase = parseFloat($('#' + formName + '-input-sched-atc14-tax-base').val()),
      schedatc15TaxBase = parseFloat($('#' + formName + '-input-sched-atc15-tax-base').val()),
      schedatc16TaxBase = parseFloat($('#' + formName + '-input-sched-atc16-tax-base').val()),
      schedatc17TaxBase = parseFloat($('#' + formName + '-input-sched-atc17-tax-base').val()),
      schedatc18TaxBase = parseFloat($('#' + formName + '-input-sched-atc18-tax-base').val()),
      schedotherpayments = parseFloat($('#' + formName + '-input-otherpayments').val()),
      schedATCIPAInterest1 = parseFloat($('#' + formName + '-input-sched-atc1-tax-interest').val()),
      schedATCIPAInterest2 = parseFloat($('#' + formName + '-input-sched-atc2-tax-interest').val()),
      schedATCIPAInterest3 = parseFloat($('#' + formName + '-input-sched-atc3-tax-interest').val()),
      schedATCIPARate1 = parseFloat($('#' + formName + '-input-sched-atc1-tax-rate').val()), 
      schedATCIPARate2 = parseFloat($('#' + formName + '-input-sched-atc2-tax-rate').val()),
      schedATCIPARate3 = parseFloat($('#' + formName + '-input-sched-atc3-tax-rate').val()),
      returnPeriod = this.returnDateVal;      
      switch (formName) {
        case '0605' :
          this.penaltyValue = 0;
          this.amountpayable = basictax + this.penaltyValue;
          this.taxfilindetails1 = {
            'birformno': formName,
            'returnperiod' : returnPeriod,
            'penalty' : this.penaltyValue,
            'amountpayable': this.amountpayable,
          }
          break;
        case '0611-A':
          this.penaltyValue = 0;
          this.amountpayable = basictax + this.penaltyValue;
          this.taxfilindetails1 = {
            'birformno': formName,
            'returnperiod' : returnPeriod,
            'penalty' : this.penaltyValue,
            'amountpayable': this.amountpayable,
          }
          break;
        case '0613':
          this.penaltyValue = 0;
          this.amountpayable = penaltiespayable + this.penaltyValue;

          this.taxfilindetails1 = {
            'birformno': formName,
            'returnperiod' : returnPeriod,
            'penalty' : this.penaltyValue,
            'penaltiesPayable': penaltiespayable,
          }
          break;
        case '0619-E':
          this.netamountofremittance = remittance - remittedfrompreviously;
          this.penaltyValue = 0;
          this.totalamountremittance = this.netamountofremittance + this.penaltyValue;

          this.taxfilindetails1 = {
            'birformno': formName,
            'returnperiod' : returnPeriod,
            'penalty' : this.penaltyValue,
            'totalamountremittance': this.totalamountremittance,
          }
          break;
        case '0619-F':
          this.totalATC = WMF10 + WMF20;
          this.netamountofremittance = this.totalATC - remittedfrompreviously;
          this.penaltyValue = 0;
          this.totalamountremittance = this.netamountofremittance + this.penaltyValue;

          this.taxfilindetails1 = {
            'birformno': formName,
            'returnperiod' : returnPeriod,
            'penalty' : this.penaltyValue,
            'totalamountremittance': this.totalamountremittance,
          }
          break;
        case '1620':
          this.netamountofremittance = remittance - remittedfrompreviously;
          this.penaltyValue = 0;
          this.totalamountremittance = this.netamountofremittance + this.penaltyValue;

          this.taxfilindetails1 = {
            'birformno': formName,
            'returnperiod' : returnPeriod,
            'penalty' : this.penaltyValue,
            'totalamountremittance': this.totalamountremittance,
          }
          break;
        case '1600-VT':
          this.atc1TaxWithheld = atc1TaxBase * ATC1;
          this.atc2TaxWithheld = atc2TaxBase * ATC2;
          this.atc3TaxWithheld = atc3TaxBase * ATC3;
          this.atc4TaxWithheld = atc4TaxBase * ATC4;
          this.atc5TaxWithheld = atc5TaxBase * ATC5;
          this.totalATC = this.atc1TaxWithheld + this.atc2TaxWithheld + this.atc3TaxWithheld + this.atc4TaxWithheld + this.atc5TaxWithheld;
          this.totalTaxPaymentsMade = remittedfrompreviously + otherpayments;
          this.taxStillDue = this.totalATC - this.totalTaxPaymentsMade;
          this.penaltyValue = 0;
          this.totalAmountStillDue = this.taxStillDue + this.penaltyValue;

          this.taxfilindetails1 = {
            'birformno': formName,
            'returnperiod' : returnPeriod,
            'penalty' : this.penaltyValue,
            'totalAmountStillDue': this.totalAmountStillDue,
          }
          break;
          case '1600-PT':
          this.atc1TaxWithheld = atc1TaxBase * ATC1;
          this.atc2TaxWithheld = atc2TaxBase * ATC2;
          this.atc3TaxWithheld = atc3TaxBase * ATC3;
          this.atc4TaxWithheld = atc4TaxBase * ATC4;
          this.atc5TaxWithheld = atc5TaxBase * ATC5;
          this.totalATC = this.atc1TaxWithheld + this.atc2TaxWithheld + this.atc3TaxWithheld + this.atc4TaxWithheld + this.atc5TaxWithheld;
          this.totalTaxPaymentsMade = remittedfrompreviously + otherpayments;
          this.taxStillDue = this.totalATC - this.totalTaxPaymentsMade;
          this.penaltyValue = 0;
          this.totalAmountStillDue = this.taxStillDue + this.penaltyValue;

          this.taxfilindetails1 = {
            'birformno': formName,
            'returnperiod' : returnPeriod,
            'penalty' : this.penaltyValue,
            'totalAmountStillDue': this.totalAmountStillDue,
          }
          break;
          case '1600WP':
            this.atc1TaxWithheld = atc1TaxBase * 0.04;
            this.atc2TaxWithheld = atc2TaxBase * 0.10;
            this.atc3TaxWithheld = atc3TaxBase * 0.04;
            this.atc4TaxWithheld = atc4TaxBase * 0.10;
            this.totalATC = this.atc1TaxWithheld + this.atc2TaxWithheld + this.atc3TaxWithheld + this.atc4TaxWithheld;
            this.taxStillDue = this.totalATC - remittedfrompreviously;
            this.penaltyValue = 0;
            this.totalAmountStillDue = this.taxStillDue + this.penaltyValue;

            this.taxfilindetails1 = {
              'birformno': formName,
              'returnperiod' : returnPeriod,
              'penalty' : this.penaltyValue,
              'totalAmountStillDue': this.totalAmountStillDue,
            }
            break;
          case '1601-C':
            this.totalNonTaxableCompensation = statutoryMinimumWage + holidayPay + Month13thPay + DeMinimis + SSSGSISPHIC + otherNonTaxable;
            this.totalTaxableCompensation = totalAmountCompensation - this.totalNonTaxableCompensation;
            this.netTaxableCompensation = this.totalNonTaxableCompensation - taxableCompensationNotSubject;
            this.totaxTaxesWithheld  = this.netTaxableCompensation;
            this.TaxesWithheldRemittance = this.totaxTaxesWithheld - 0;
            this.totalTaxRemittancesMade = remittedfrompreviously + otherRemittancesMade;
            this.taxStillDue = this.TaxesWithheldRemittance - this.totalTaxRemittancesMade;
            this.penaltyValue = 0;
            this.totalAmountStillDue = this.taxStillDue + this.penaltyValue;
            
            this.taxfilindetails1 = {
              'birformno': formName,
              'returnperiod' : returnPeriod,
              'penalty' : this.penaltyValue,
              'totalAmountStillDue': this.totalAmountStillDue,
            }
            break;
          case '1601-EQ':
            this.atc1TaxWithheld = atc1TaxBase * ATC1;
            this.atc2TaxWithheld = atc2TaxBase * ATC2;
            this.atc3TaxWithheld = atc3TaxBase * ATC3;
            this.atc4TaxWithheld = atc4TaxBase * ATC4;
            this.atc5TaxWithheld = atc5TaxBase * ATC5;
            this.totalATC = this.atc1TaxWithheld + this.atc2TaxWithheld + this.atc3TaxWithheld + this.atc4TaxWithheld + this.atc5TaxWithheld;
            this.totalRemittanceMade = remittance1stQuarter + remittance2ndQuarter + remittedfrompreviously + overRemittancefromPreviousQuarter + otherpayments;
            this.taxStillDue = this.totalATC - this.totalRemittanceMade
            this.penaltyValue = 0;
            this.totalAmountStillDue = this.taxStillDue + this.penaltyValue;
            
            this.taxfilindetails1 = {
              'birformno': formName,
              'returnperiod' : returnPeriod,
              'penalty' : this.penaltyValue,
              'totalAmountStillDue': this.totalAmountStillDue,
            }
            break;
          case '1601-FQ':
            if(page == 1) {
              this.taxesWithheldQuarterTaxTreaty = (schedatc1TaxBase * schedATC1) + (schedatc2TaxBase * schedATC2) + (schedatc3TaxBase * schedATC3) + (schedatc4TaxBase * schedATC4) + (schedatc5TaxBase * schedATC5);
            } else {
              this.atc1TaxWithheld = atc1TaxBase * ATC1;
              this.atc2TaxWithheld = atc2TaxBase * ATC2;
              this.atc3TaxWithheld = atc3TaxBase * ATC3;
              this.atc4TaxWithheld = atc4TaxBase * ATC4;
              this.atc5TaxWithheld = atc5TaxBase * ATC5;
              this.atc6TaxWithheld = atc6TaxBase * ATC6;
              this.totalATC = this.atc1TaxWithheld + this.atc2TaxWithheld + this.atc3TaxWithheld + this.atc4TaxWithheld + this.atc5TaxWithheld;
              this.taxesWithheldQuarter = this.totalATC + this.taxesWithheldQuarterTaxTreaty;
              this.totalRemittanceMade = remittance1stQuarter + remittance2ndQuarter + remittedfrompreviously;
              this.taxStillDue = this.totalATC - this.totalRemittanceMade
              this.penaltyValue = 0;
              this.totalAmountStillDue = this.taxStillDue + this.penaltyValue;
            }
            
            this.taxfilindetails1 = {
              'birformno': formName,
              'returnperiod' : returnPeriod,
              'penalty' : this.penaltyValue,
              'totalAmountStillDue': this.totalAmountStillDue,
            }
            break;
          case '1602Q':
            switch(page){
              case 1:
                this.taxesWithheldQuarterRegularRates = (schedATC1 * 0.20) + (schedATC2 * 0.20) + (schedATC3 * 0.20) + (schedATC4 * 0.20) + (schedATC5 * 0.20) + (schedATC6 * 0.20) + (schedATC7 * 0.20) + (schedATC8 * 0.20) + (schedATC9 * 0.20) + (schedATC10 * 0.12) + (schedATC11 * 0.05) + (schedATC12 * 0.20) + (schedATC13 * 0.20) + (schedATC14 * 0.15) + (schedATC15 * 0.15)
                break;
              case 2:
                this.taxesWithheldQuarterTaxTreaty = (schedatc16TaxBase * schedATC16) + (schedatc17TaxBase * schedATC17) + (schedatc18TaxBase * schedATC18);
                break;
              case 3:
                this.taxesWithheldQuarterPreferentialRates = (schedATCIPAInterest1 * (schedATCIPARate1 / 100)) + (schedATCIPAInterest2 * (schedATCIPARate2 / 100)) + (schedATCIPAInterest3 * (schedATCIPARate3 / 100));
                break;
              case 4:
                this.totalTaxesWithheldQuarter = this.taxesWithheldQuarterRegularRates + this.taxesWithheldQuarterTaxTreaty + this.taxesWithheldQuarterPreferentialRates;
                this.totalTaxRemittancesMade = remittance1stQuarter + remittance2ndQuarter + remittedfrompreviously + overRemittancefromPreviousQuarter;
                this.taxStillDue = this.totalTaxesWithheldQuarter - this.totalTaxRemittancesMade;
                this.penaltyValue = 0;
                this.totalAmountStillDue = this.taxStillDue + this.penaltyValue;
            }
            
            this.taxfilindetails1 = {
              'birformno': formName,
              'returnperiod' : returnPeriod,
              'penalty' : this.penaltyValue,
              'totalAmountStillDue': this.totalAmountStillDue,
            }
            break;
          case '1603Q':
            this.totalATC = (schedATC1 * 0.35) + (schedATC2 * 0.25);
            this.totalRemittanceMade = remittedfrompreviously + otherRemittancesMade;
            this.taxStillDue = this.totalATC + this.totalRemittanceMade;
            this.penaltyValue = 0;
            this.totalAmountStillDue = this.taxStillDue + this.penaltyValue;
            
            this.taxfilindetails1 = {
              'birformno': formName,
              'returnperiod' : returnPeriod,
              'penalty' : this.penaltyValue,
              'totalAmountStillDue': this.totalAmountStillDue,
            }
            break;
            case '1700':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
            case '1701':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
            case '1701A':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
            case '1701Q':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
            case '1702-RT':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': penaltiespayable,
              }
            break;
            case '1702-EX':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
            case '1702-MX':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
            case '1702Q':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
          case '1704':
            this.totalAmountStillDue = parseFloat($('#' + formName + '-input-NOLCO').val()) + parseFloat($('#' + formName + '-input-Income').val()) + parseFloat($('#' + formName + '-input-Dividends').val()) + parseFloat($('#' + formName + '-input-Amount').val()) + parseFloat($('#' + formName + '-input-Improperly').val());
            
            this.taxfilindetails1 = {
              'birformno': formName,
              'returnperiod' : returnPeriod,
              'penalty' : this.penaltyValue,
              'totalAmountStillDue': this.totalAmountStillDue,
            }
            break;
          case '1707':
            this.totalAmountStillDue = parseFloat($('#' + formName + '-input-Foreclosure').val()) + parseFloat($('#' + formName + '-input-Period').val()) + parseFloat($('#' + formName + '-input-Previously').val());
            
            this.taxfilindetails1 = {
              'birformno': formName,
              'returnperiod' : returnPeriod,
              'penalty' : this.penaltyValue,
              'totalAmountStillDue': this.totalAmountStillDue,
            }
            break;
            case '1707-A':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': penaltiespayable,
              }
            break;
            case '1709':
              this.penaltyValue = 0;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
              }
            break;
            case '1800':
              this.penaltyValue = 0;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
              }
            break;
            case '1801':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
            case '2000':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
            case '2200-A':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
            case '2200-AN':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'balancetobecarriedover': this.amountpayable,
              }
            break;
            case '2200-C':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'balancetobecarriedover': this.amountpayable,
              }
            break;
            case '2200-M':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'balancetobecarriedover': this.amountpayable,
              }
            break;
            case '2200-P':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'balancetobecarriedover': this.amountpayable,
              }
            break;
            case '2200-S':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'balancetobecarriedover': this.amountpayable,
              }
            break;
            case '2200-T':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'balancetobecarriedover': this.amountpayable,
              }
            break;
            case '2304':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'taxableincome': this.amountpayable,
              }
            break;
            case '2306':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
            case '2307':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
            case '2316':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'taxableincome': this.amountpayable,
              }
            break;
            case '2550M':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
            case '2550Q':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
            case '2551Q':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
            case '2552':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
            case '2553':
              this.penaltyValue = 0;
              this.amountpayable = basictax + this.penaltyValue;
    
              this.taxfilindetails1 = {
                'birformno': formName,
                'returnperiod' : returnPeriod,
                'penalty' : this.penaltyValue,
                'amountpayable': this.amountpayable,
              }
            break;
      }

    } else if(formName == "reset") {
      this.taxFilingRecord = [];
    }
  }

  TINIDValidation(event){
    var inputtxt = event.target.value;
    var newInput = ""
    for(var i = 0; i < inputtxt.length;i++){
      var txt = inputtxt.charAt(i);
      if(i == 3 && inputtxt.length == 4){
        if(txt == "-") {
          newInput = newInput;
        } else {
          newInput = newInput + '-' + txt;
        }
      } else if(i == 7 && inputtxt.length == 8) { 
        if(txt == "-") {
          newInput = newInput
        } else {
          newInput = newInput + '-' + txt;
        }
      } else if(i == 11 && inputtxt.length == 12) { 
        if(txt == "-") {
          newInput = newInput
        } else {
          newInput = newInput + '-' + txt;
        }
      }else {
        newInput = newInput + txt;
      }
    }
    $('#profile-taxpayer-tin').val(newInput);
    return;
  }

  TINIDValidationCheck(event){
    var key = event.which || event.keyCode;

    // if((key >= 48 && key <= 57) || (key == 8 && key == 46)){
      
    // } else {
    //   return false;
   
    // }
  }

  AddNewTaxPayerProfile(){
    let payertype;
    if($('#profile-taxpayertype-individual').is(':checked')) {
      payertype = "individual";
    } else {
      payertype = "non-individual";
    }
    this.taxfilingservice.addTaxPayerProfile(this.sid, payertype, $('#profile-taxpayer-tin').val(), $('#profile-taxpayer-fullname').val(), $('#profile-taxpayer-rdo > .autocomplete-container > .input-container > input').val(), $('#profile-taxpayer-address').val(), $('#profile-taxpayer-zip').val(), $('#profile-taxpayer-contactnumber').val(), $('#profile-taxpayer-email').val());
  }

  triggerCheckTaxpayerType(id){
    $('.checkbox-taxpayertype').not('#' + id).prop('checked', false);  
  }

  NextIsOnGetStarted() {
    this.onGetStarted = false;
    this.taxfilingservice.onGetStarted = false;
    $('.main-tax-filing-container.successNextPageTrigger').css('display', 'none');
  }

  CheckTaxProfile(){
    this.taxfilingservice.getTaxPayerProfile().subscribe(res=> { 
      let username = this.sid;
      let profileByID = res.filter(function(value){
        return value["username"] == username;
      });

      this.taxpayerProfile = profileByID;

      if(this.taxpayerProfile.length !== 0) {
        this.taxpayerDetails = this.taxpayerProfile[0];
        this.taxpayerDetails1 = this.taxpayerProfile[0];
        this.onGetStarted = false;
        this.taxfilingservice.onGetStarted = false;
        $('.main-tax-filing-container.successNextPageTrigger').css('display', 'none');
      } else {
        this.onGetStarted = true;
        this.taxfilingservice.onGetStarted = true;
      }

      // let dateInput = $('.form-input.taxfiling-form.date');
      // var today = new Date();
      // for(let i = 0; i < dateInput.length; i++){
      //   dateInput[i]["value"] = today.toISOString().substr(0, 10);
      // }

      var today = new Date();
      this.returnDateVal = today.toISOString().substr(0, 10);
    });
  }

  getTaxProfileDetails(type, data) {
    switch (type) {
      case 1:
        this.taxpayerDetails = [];
        var searchValue = this.taxpayerProfile.filter(function(value) {
          return value["taxpayerName"] == data;
        });

        this.taxpayerDetails = searchValue[0];
        break;
      case 2:
        this.taxpayerDetails1 = [];
        var searchValue2 = this.taxpayerProfile.filter(function(value) {
          return value["taxpayerName"] == data;
        });
        this.taxpayerDetails1 = searchValue2[0];
        break;
    }
  }

  dashboardTaxProfileBth(nav) {
    switch (nav) {
      case "new":
        this.onGetStarted = true;
        this.taxfilingservice.onGetStarted = true;
        this.activeDashboard = false;
        this.activeBookeeping = false;
        this.activeTaxFiling = true;
        this.activeReports = false;
        $('.main-tax-filing-container.successNextPageTrigger').css('display', 'none');
        break;
    }
  }

  dashboardRecentFilingList() {
    let username = this.sid;
    let dataReady = false;
    this.recentFiling = [];
    this.taxfilingservice.getTaxFilingRecords()
    .subscribe(res=> { 
      let logRecentFiling = res.filter(function(value){
        return value["username"] == username;
      });

      for(let list = 0; list < logRecentFiling.length; list++) {
        let tempRecentFiling = {
          "birFormNo" : logRecentFiling[list]["birFormNo"],
          "returnPeriod" : logRecentFiling[list]["returnPeriod"],
          "username" : logRecentFiling[list]["username"],
          "keyID" : logRecentFiling[list]["keyID"],
          "assignedID" : logRecentFiling[list]["assignedID"],
          "status" : logRecentFiling[list]["status"],
          "taxpayerprofile1" : logRecentFiling[list]["taxpayerprofile1"],
          "taxpayerprofile2" : logRecentFiling[list]["taxpayerprofile2"],
          "taxpayerprofile3" : logRecentFiling[list]["taxpayerprofile3"],
          "taxpayerprofile4" : logRecentFiling[list]["taxpayerprofile4"],
          "taxpayerprofile5" : logRecentFiling[list]["taxpayerprofile5"],
          "txfrid" : logRecentFiling[list]["txfrid"],
          "values" : JSON.parse(logRecentFiling[list]["values"]),
          "isActive" : false
        }
  
        this.recentFiling.push(tempRecentFiling);
      }
      this.RecentFilingDataReady = true;
    });

  }

  recentFilingAccordionToggle(data) {
    data.isActive = !data.isActive;
  }
  
}
