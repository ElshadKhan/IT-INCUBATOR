import {SortDirection} from "../middleware/queryValidation";

export class BlogDbType {
    constructor(public id: string,
                public name: string,
                public youtubeUrl: string,
                public createdAt: string
    ) {
    }

}

export type QueryBlogType = {
    searchNameTerm: string
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: SortDirection
}

export class BlogsBusinessType {
    constructor(public pagesCount: number,
                public page: number,
                public pageSize: number,
                public totalCount: number,
                public items: Array<BlogDbType>) {
    }

}