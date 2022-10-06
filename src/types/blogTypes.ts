export type BlogDbType = {
    id: string
    name: string
    youtubeUrl: string
    createdAt: string
}

export type BlogDto = {
    id: string
    name: string
    youtubeUrl: string
    createdAt: string
}

export type QueryBlogType = {
    searchNameTerm: string
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: string
}

export type BlogsBusinessType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<BlogDto>
}