export interface JobCard {
  title: string;
  company: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  employmentType?: string;
  deadline?: string;
  applyUrl: string;
  salaryInterval?: string;
}

export interface JobDetails extends JobCard {
  id: string;
  department: string;
  schedule?: string;
  openDate?: string;
  closeDate?: string;
  jobSummary: string;
  qualificationSummary?: string;
  education?: string;
  responsibilities?: string[];
  totalOpenings?: string;
  securityClearance?: string;
}
export interface PositionLocation {
  LocationName: string;
  CountryCode: string;
  CountrySubDivisionCode: string;
  CityName: string;
  Longitude: number;
  Latitude: number;
}

export interface PositionRemuneration {
  MinimumRange: string;
  MaximumRange: string;
  RateIntervalCode: string;
  Description: string;
}

export interface UserAreaDetails {
  JobSummary: string;
  QualificationSummary?: string;
  Education?: string;
  TotalOpenings?: string;
  SecurityClearance?: string;
  MajorDuties?: string[];
}

export interface MatchedObjectDescriptor {
  PositionID: string;
  PositionTitle: string;
  PositionURI: string;
  ApplyURI: string[];
  PositionLocationDisplay: string;
  PositionLocation: PositionLocation[];
  OrganizationName: string;
  DepartmentName: string;
  QualificationSummary: string;
  PositionRemuneration: PositionRemuneration[];
  PositionStartDate: string;
  PositionEndDate: string;
  PublicationStartDate: string;
  ApplicationCloseDate: string;
  UserArea: {
    Details: UserAreaDetails;
  };
}

export interface SearchResultItem {
  MatchedObjectId: string;
  MatchedObjectDescriptor: MatchedObjectDescriptor;
  RelevanceRank: number;
}

export interface SearchResultUserArea {
  NumberOfPages: number;
}

export interface SearchResult {
  SearchResultCount: number;
  SearchResultCountAll: number;
  SearchResultItems: SearchResultItem[];
  UserArea: SearchResultUserArea;
}

export interface JobsData {
  jobs: JobDetails[];
  searchResultCount: number;
  searchResultCountAll: number;
  numberOfPages: number;
}

export interface JobsApiResponse {
  LanguageCode: string;
  SearchParameters: any;
  SearchResult: SearchResult;
}

