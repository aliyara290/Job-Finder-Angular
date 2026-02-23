export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export interface Application {
    id: string;
    userId: string;
    offerId: string;
    title: string;
    company: string;
    location: string;
    url: string;
    status: ApplicationStatus;
    notes: string;
    dateAdded: string;
}
