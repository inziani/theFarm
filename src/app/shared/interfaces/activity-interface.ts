export interface ActivityCategoryInterface {
  id: number;
  title: string;
  description: string;
  activity_category: string;
  date_created: string;
  date_changed: string;
  url: string;
  owner: string;
}

export interface ActivityInterface {
  id: number;
  title: string;
  description: string;
  status: string;
  date_created: string;
  date_changed: string;
  activity_category: number;
  url: string;
  owner: string;
}

export interface Category {
  value: string;
  viewValue: string;
}

export interface Status {
  value: string;
  viewValue: string;
}

export interface RandomQuote {
  Author: string;
  Id: number;
  Quote: string;
  Link: string;
}
