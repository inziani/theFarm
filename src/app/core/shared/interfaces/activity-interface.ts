export interface ActivityCategoryInterface{
    url: string,
    id: number,
    title: string,
    description: string,
    activity_category: string,
    date_created: string,
    date_changed: string,
    owner: string

}

export interface ActivityInterface{

        url: string,
        owner: string,
        id: number,
        title: string,
        description: string,
        status: string,
        date_created: string,
        date_changed: string,
        activity_category: number
}


export interface Category {

    value: string;
    viewValue: string;
}

export interface Status {

    value: string;
    viewValue: string;
}

export interface RandomQuote{
    "Author": string,
    "Id": number,
    "Quote": string,
    "Link": string
}




