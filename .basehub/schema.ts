/* eslint-disable */

// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
  Boolean: boolean,
  DateTime: any,
  Float: number,
  ID: string,
  Int: number,
  JSON: any,
  String: string,
}

export interface Authors {
  _id: Scalars['String']
  _meta: ListMeta
  _slug: Scalars['String']
  _sys: BlockDocumentSys
  _title: Scalars['String']
  items: AuthorsItem[]
  __typename: 'Authors'
}

export interface AuthorsItem {
  _id: Scalars['String']
  _slug: Scalars['String']
  _sys: BlockDocumentSys
  _title: Scalars['String']
  avatar: BlockImage
  __typename: 'AuthorsItem'
}

export type AuthorsItemOrderByEnum = '_sys_createdAt__ASC' | '_sys_createdAt__DESC' | '_sys_hash__ASC' | '_sys_hash__DESC' | '_sys_id__ASC' | '_sys_id__DESC' | '_sys_lastModifiedAt__ASC' | '_sys_lastModifiedAt__DESC' | '_sys_slug__ASC' | '_sys_slug__DESC' | '_sys_title__ASC' | '_sys_title__DESC' | 'avatar__ASC' | 'avatar__DESC'

export interface BaseRichTextJson {
  blocks: Scalars['String']
  content: Scalars['JSON']
  toc: Scalars['JSON']
  __typename: 'BaseRichTextJson'
}

export interface BlockAudio {
  fileName: Scalars['String']
  fileSize: Scalars['Int']
  lastModified: Scalars['Float']
  mimeType: Scalars['String']
  url: Scalars['String']
  __typename: 'BlockAudio'
}

export interface BlockCodeSnippet {
  code: Scalars['String']
  html: Scalars['String']
  language: Scalars['String']
  __typename: 'BlockCodeSnippet'
}

export interface BlockColor {
  hex: Scalars['String']
  hsl: Scalars['String']
  rgb: Scalars['String']
  __typename: 'BlockColor'
}

export type BlockDocument = (Authors | AuthorsItem | Blog | Posts | PostsItem) & { __isUnion?: true }

export interface BlockDocumentSys {
  createdAt: Scalars['String']
  hash: Scalars['String']
  id: Scalars['ID']
  lastModifiedAt: Scalars['String']
  slug: Scalars['String']
  title: Scalars['String']
  __typename: 'BlockDocumentSys'
}

export interface BlockFile {
  fileName: Scalars['String']
  fileSize: Scalars['Int']
  lastModified: Scalars['Float']
  mimeType: Scalars['String']
  url: Scalars['String']
  __typename: 'BlockFile'
}

export interface BlockImage {
  alt: (Scalars['String'] | null)
  aspectRatio: Scalars['String']
  fileName: Scalars['String']
  fileSize: Scalars['Int']
  height: Scalars['Int']
  lastModified: Scalars['Float']
  mimeType: Scalars['String']
  rawUrl: Scalars['String']
  url: Scalars['String']
  width: Scalars['Int']
  __typename: 'BlockImage'
}

export type BlockList = (Authors | Posts) & { __isUnion?: true }


/** Rich text block */
export type BlockRichText = (Body) & { __isUnion?: true }

export interface BlockVideo {
  aspectRatio: Scalars['String']
  fileName: Scalars['String']
  fileSize: Scalars['Int']
  height: Scalars['Int']
  lastModified: Scalars['Float']
  mimeType: Scalars['String']
  url: Scalars['String']
  width: Scalars['Int']
  __typename: 'BlockVideo'
}

export interface Blog {
  _id: Scalars['String']
  _slug: Scalars['String']
  _sys: BlockDocumentSys
  _title: Scalars['String']
  authors: Authors
  posts: Posts
  __typename: 'Blog'
}

export interface Body {
  html: Scalars['String']
  json: BodyRichText
  markdown: Scalars['String']
  plainText: Scalars['String']
  readingTime: Scalars['Int']
  __typename: 'Body'
}

export interface BodyRichText {
  blocks: BlockDocument[]
  content: Scalars['JSON']
  toc: Scalars['JSON']
  __typename: 'BodyRichText'
}

export interface ListMeta {
  totalCount: Scalars['Int']
  __typename: 'ListMeta'
}

export interface Posts {
  _id: Scalars['String']
  _meta: ListMeta
  _slug: Scalars['String']
  _sys: BlockDocumentSys
  _title: Scalars['String']
  items: PostsItem[]
  __typename: 'Posts'
}

export interface PostsItem {
  _id: Scalars['String']
  _slug: Scalars['String']
  _sys: BlockDocumentSys
  _title: Scalars['String']
  author: AuthorsItem
  body: Body
  coverImage: BlockImage
  /** ISO 8601 date string. */
  date: Scalars['String']
  excerpt: Scalars['String']
  __typename: 'PostsItem'
}

export type PostsItemOrderByEnum = '_sys_createdAt__ASC' | '_sys_createdAt__DESC' | '_sys_hash__ASC' | '_sys_hash__DESC' | '_sys_id__ASC' | '_sys_id__DESC' | '_sys_lastModifiedAt__ASC' | '_sys_lastModifiedAt__DESC' | '_sys_slug__ASC' | '_sys_slug__DESC' | '_sys_title__ASC' | '_sys_title__DESC' | 'author__ASC' | 'author__DESC' | 'body__ASC' | 'body__DESC' | 'coverImage__ASC' | 'coverImage__DESC' | 'date__ASC' | 'date__DESC' | 'excerpt__ASC' | 'excerpt__DESC'

export interface Query {
  _sys: RepoSys
  blog: Blog
  __typename: 'Query'
}

export interface RepoSys {
  hash: Scalars['String']
  id: Scalars['ID']
  slug: Scalars['String']
  title: Scalars['String']
  __typename: 'RepoSys'
}

export type RichTextJson = (BaseRichTextJson | BodyRichText) & { __isUnion?: true }

export interface AuthorsGenqlSelection{
  _id?: boolean | number
  _meta?: ListMetaGenqlSelection
  _slug?: boolean | number
  _sys?: BlockDocumentSysGenqlSelection
  _title?: boolean | number
  items?: AuthorsItemGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface AuthorsItemGenqlSelection{
  _id?: boolean | number
  _slug?: boolean | number
  _sys?: BlockDocumentSysGenqlSelection
  _title?: boolean | number
  avatar?: BlockImageGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface AuthorsItemFilterInput {AND?: (AuthorsItemFilterInput | null),OR?: (AuthorsItemFilterInput | null),_sys_createdAt?: (DateFilter | null),_sys_hash?: (StringFilter | null),_sys_id?: (StringFilter | null),_sys_lastModifiedAt?: (DateFilter | null),_sys_slug?: (StringFilter | null),_sys_title?: (StringFilter | null)}

export interface BaseRichTextJsonGenqlSelection{
  blocks?: boolean | number
  content?: boolean | number
  toc?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface BlockAudioGenqlSelection{
  fileName?: boolean | number
  fileSize?: boolean | number
  lastModified?: boolean | number
  mimeType?: boolean | number
  url?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface BlockCodeSnippetGenqlSelection{
  code?: boolean | number
  html?: { __args: {
  /** Theme for the code snippet */
  theme?: (Scalars['String'] | null)} } | boolean | number
  language?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface BlockColorGenqlSelection{
  hex?: boolean | number
  hsl?: boolean | number
  rgb?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface BlockDocumentGenqlSelection{
  _id?: boolean | number
  _slug?: boolean | number
  _sys?: BlockDocumentSysGenqlSelection
  _title?: boolean | number
  on_Authors?: AuthorsGenqlSelection
  on_AuthorsItem?: AuthorsItemGenqlSelection
  on_Blog?: BlogGenqlSelection
  on_Posts?: PostsGenqlSelection
  on_PostsItem?: PostsItemGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface BlockDocumentSysGenqlSelection{
  createdAt?: boolean | number
  hash?: boolean | number
  id?: boolean | number
  lastModifiedAt?: boolean | number
  slug?: boolean | number
  title?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface BlockFileGenqlSelection{
  fileName?: boolean | number
  fileSize?: boolean | number
  lastModified?: boolean | number
  mimeType?: boolean | number
  url?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface BlockImageGenqlSelection{
  alt?: boolean | number
  aspectRatio?: boolean | number
  fileName?: boolean | number
  fileSize?: boolean | number
  height?: boolean | number
  lastModified?: boolean | number
  mimeType?: boolean | number
  rawUrl?: boolean | number
  url?: { __args: {blur?: (Scalars['Int'] | null), brightness?: (Scalars['Int'] | null), compression?: (Scalars['String'] | null), contrast?: (Scalars['Int'] | null), dpr?: (Scalars['Int'] | null), fit?: (Scalars['String'] | null), format?: (Scalars['String'] | null), height?: (Scalars['Int'] | null), quality?: (Scalars['Int'] | null), width?: (Scalars['Int'] | null)} } | boolean | number
  width?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface BlockListGenqlSelection{
  _id?: boolean | number
  _meta?: ListMetaGenqlSelection
  _slug?: boolean | number
  _sys?: BlockDocumentSysGenqlSelection
  _title?: boolean | number
  on_Authors?: AuthorsGenqlSelection
  on_Posts?: PostsGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}


/** Rich text block */
export interface BlockRichTextGenqlSelection{
  html?: { __args: {
  /** It automatically generates a unique id for each heading present in the HTML. Enabled by default. */
  slugs?: (Scalars['Boolean'] | null), 
  /** Inserts a table of contents at the beginning of the HTML. */
  toc?: (Scalars['Boolean'] | null)} } | boolean | number
  json?: RichTextJsonGenqlSelection
  markdown?: boolean | number
  plainText?: boolean | number
  readingTime?: { __args: {
  /** Words per minute, defaults to average 183wpm */
  wpm?: (Scalars['Int'] | null)} } | boolean | number
  on_Body?: BodyGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface BlockVideoGenqlSelection{
  aspectRatio?: boolean | number
  fileName?: boolean | number
  fileSize?: boolean | number
  height?: boolean | number
  lastModified?: boolean | number
  mimeType?: boolean | number
  url?: boolean | number
  width?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface BlogGenqlSelection{
  _id?: boolean | number
  _slug?: boolean | number
  _sys?: BlockDocumentSysGenqlSelection
  _title?: boolean | number
  authors?: (AuthorsGenqlSelection & { __args?: {
  /** Filter by a field. */
  filter?: (AuthorsItemFilterInput | null), 
  /** Limit the number of items returned. Defaults to 500. */
  first?: (Scalars['Int'] | null), 
  /** Order by a field. */
  orderBy?: (AuthorsItemOrderByEnum | null), 
  /** Skip the first n items. */
  skip?: (Scalars['Int'] | null)} })
  posts?: (PostsGenqlSelection & { __args?: {
  /** Filter by a field. */
  filter?: (PostsItemFilterInput | null), 
  /** Limit the number of items returned. Defaults to 500. */
  first?: (Scalars['Int'] | null), 
  /** Order by a field. */
  orderBy?: (PostsItemOrderByEnum | null), 
  /** Skip the first n items. */
  skip?: (Scalars['Int'] | null)} })
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface BodyGenqlSelection{
  html?: { __args: {
  /** It automatically generates a unique id for each heading present in the HTML. Enabled by default. */
  slugs?: (Scalars['Boolean'] | null), 
  /** Inserts a table of contents at the beginning of the HTML. */
  toc?: (Scalars['Boolean'] | null)} } | boolean | number
  json?: BodyRichTextGenqlSelection
  markdown?: boolean | number
  plainText?: boolean | number
  readingTime?: { __args: {
  /** Words per minute, defaults to average 183wpm */
  wpm?: (Scalars['Int'] | null)} } | boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface BodyRichTextGenqlSelection{
  blocks?: BlockDocumentGenqlSelection
  content?: boolean | number
  toc?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface DateFilter {eq?: (Scalars['DateTime'] | null),isAfter?: (Scalars['DateTime'] | null),isBefore?: (Scalars['DateTime'] | null),neq?: (Scalars['DateTime'] | null),onOrAfter?: (Scalars['DateTime'] | null),onOrBefore?: (Scalars['DateTime'] | null)}

export interface ListFilter {isEmpty?: (Scalars['Boolean'] | null),length?: (Scalars['Int'] | null)}

export interface ListMetaGenqlSelection{
  totalCount?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface NumberFilter {eq?: (Scalars['Float'] | null),gt?: (Scalars['Float'] | null),gte?: (Scalars['Float'] | null),lt?: (Scalars['Float'] | null),lte?: (Scalars['Float'] | null),neq?: (Scalars['Float'] | null)}

export interface PostsGenqlSelection{
  _id?: boolean | number
  _meta?: ListMetaGenqlSelection
  _slug?: boolean | number
  _sys?: BlockDocumentSysGenqlSelection
  _title?: boolean | number
  items?: PostsItemGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PostsItemGenqlSelection{
  _id?: boolean | number
  _slug?: boolean | number
  _sys?: BlockDocumentSysGenqlSelection
  _title?: boolean | number
  author?: AuthorsItemGenqlSelection
  body?: BodyGenqlSelection
  coverImage?: BlockImageGenqlSelection
  /** ISO 8601 date string. */
  date?: boolean | number
  excerpt?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PostsItemFilterInput {AND?: (PostsItemFilterInput | null),OR?: (PostsItemFilterInput | null),_sys_createdAt?: (DateFilter | null),_sys_hash?: (StringFilter | null),_sys_id?: (StringFilter | null),_sys_lastModifiedAt?: (DateFilter | null),_sys_slug?: (StringFilter | null),_sys_title?: (StringFilter | null),date?: (DateFilter | null),excerpt?: (StringFilter | null)}

export interface QueryGenqlSelection{
  _sys?: RepoSysGenqlSelection
  blog?: BlogGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface RepoSysGenqlSelection{
  hash?: boolean | number
  id?: boolean | number
  slug?: boolean | number
  title?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface RichTextJsonGenqlSelection{
  content?: boolean | number
  toc?: boolean | number
  on_BaseRichTextJson?: BaseRichTextJsonGenqlSelection
  on_BodyRichText?: BodyRichTextGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface StringFilter {eq?: (Scalars['String'] | null),matches?: (StringMatchesFilter | null),notEq?: (Scalars['String'] | null)}

export interface StringMatchesFilter {caseSensitive?: (Scalars['Boolean'] | null),pattern: Scalars['String']}


  const Authors_possibleTypes: string[] = ['Authors']
  export const isAuthors = (obj?: { __typename?: any } | null): obj is Authors => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isAuthors"')
    return Authors_possibleTypes.includes(obj.__typename)
  }
  


  const AuthorsItem_possibleTypes: string[] = ['AuthorsItem']
  export const isAuthorsItem = (obj?: { __typename?: any } | null): obj is AuthorsItem => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isAuthorsItem"')
    return AuthorsItem_possibleTypes.includes(obj.__typename)
  }
  


  const BaseRichTextJson_possibleTypes: string[] = ['BaseRichTextJson']
  export const isBaseRichTextJson = (obj?: { __typename?: any } | null): obj is BaseRichTextJson => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isBaseRichTextJson"')
    return BaseRichTextJson_possibleTypes.includes(obj.__typename)
  }
  


  const BlockAudio_possibleTypes: string[] = ['BlockAudio']
  export const isBlockAudio = (obj?: { __typename?: any } | null): obj is BlockAudio => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isBlockAudio"')
    return BlockAudio_possibleTypes.includes(obj.__typename)
  }
  


  const BlockCodeSnippet_possibleTypes: string[] = ['BlockCodeSnippet']
  export const isBlockCodeSnippet = (obj?: { __typename?: any } | null): obj is BlockCodeSnippet => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isBlockCodeSnippet"')
    return BlockCodeSnippet_possibleTypes.includes(obj.__typename)
  }
  


  const BlockColor_possibleTypes: string[] = ['BlockColor']
  export const isBlockColor = (obj?: { __typename?: any } | null): obj is BlockColor => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isBlockColor"')
    return BlockColor_possibleTypes.includes(obj.__typename)
  }
  


  const BlockDocument_possibleTypes: string[] = ['Authors','AuthorsItem','Blog','Posts','PostsItem']
  export const isBlockDocument = (obj?: { __typename?: any } | null): obj is BlockDocument => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isBlockDocument"')
    return BlockDocument_possibleTypes.includes(obj.__typename)
  }
  


  const BlockDocumentSys_possibleTypes: string[] = ['BlockDocumentSys']
  export const isBlockDocumentSys = (obj?: { __typename?: any } | null): obj is BlockDocumentSys => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isBlockDocumentSys"')
    return BlockDocumentSys_possibleTypes.includes(obj.__typename)
  }
  


  const BlockFile_possibleTypes: string[] = ['BlockFile']
  export const isBlockFile = (obj?: { __typename?: any } | null): obj is BlockFile => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isBlockFile"')
    return BlockFile_possibleTypes.includes(obj.__typename)
  }
  


  const BlockImage_possibleTypes: string[] = ['BlockImage']
  export const isBlockImage = (obj?: { __typename?: any } | null): obj is BlockImage => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isBlockImage"')
    return BlockImage_possibleTypes.includes(obj.__typename)
  }
  


  const BlockList_possibleTypes: string[] = ['Authors','Posts']
  export const isBlockList = (obj?: { __typename?: any } | null): obj is BlockList => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isBlockList"')
    return BlockList_possibleTypes.includes(obj.__typename)
  }
  


  const BlockRichText_possibleTypes: string[] = ['Body']
  export const isBlockRichText = (obj?: { __typename?: any } | null): obj is BlockRichText => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isBlockRichText"')
    return BlockRichText_possibleTypes.includes(obj.__typename)
  }
  


  const BlockVideo_possibleTypes: string[] = ['BlockVideo']
  export const isBlockVideo = (obj?: { __typename?: any } | null): obj is BlockVideo => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isBlockVideo"')
    return BlockVideo_possibleTypes.includes(obj.__typename)
  }
  


  const Blog_possibleTypes: string[] = ['Blog']
  export const isBlog = (obj?: { __typename?: any } | null): obj is Blog => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isBlog"')
    return Blog_possibleTypes.includes(obj.__typename)
  }
  


  const Body_possibleTypes: string[] = ['Body']
  export const isBody = (obj?: { __typename?: any } | null): obj is Body => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isBody"')
    return Body_possibleTypes.includes(obj.__typename)
  }
  


  const BodyRichText_possibleTypes: string[] = ['BodyRichText']
  export const isBodyRichText = (obj?: { __typename?: any } | null): obj is BodyRichText => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isBodyRichText"')
    return BodyRichText_possibleTypes.includes(obj.__typename)
  }
  


  const ListMeta_possibleTypes: string[] = ['ListMeta']
  export const isListMeta = (obj?: { __typename?: any } | null): obj is ListMeta => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isListMeta"')
    return ListMeta_possibleTypes.includes(obj.__typename)
  }
  


  const Posts_possibleTypes: string[] = ['Posts']
  export const isPosts = (obj?: { __typename?: any } | null): obj is Posts => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isPosts"')
    return Posts_possibleTypes.includes(obj.__typename)
  }
  


  const PostsItem_possibleTypes: string[] = ['PostsItem']
  export const isPostsItem = (obj?: { __typename?: any } | null): obj is PostsItem => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isPostsItem"')
    return PostsItem_possibleTypes.includes(obj.__typename)
  }
  


  const Query_possibleTypes: string[] = ['Query']
  export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
    return Query_possibleTypes.includes(obj.__typename)
  }
  


  const RepoSys_possibleTypes: string[] = ['RepoSys']
  export const isRepoSys = (obj?: { __typename?: any } | null): obj is RepoSys => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isRepoSys"')
    return RepoSys_possibleTypes.includes(obj.__typename)
  }
  


  const RichTextJson_possibleTypes: string[] = ['BaseRichTextJson','BodyRichText']
  export const isRichTextJson = (obj?: { __typename?: any } | null): obj is RichTextJson => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isRichTextJson"')
    return RichTextJson_possibleTypes.includes(obj.__typename)
  }
  

export const enumAuthorsItemOrderByEnum = {
 _sys_createdAt__ASC: '_sys_createdAt__ASC' as const,
 _sys_createdAt__DESC: '_sys_createdAt__DESC' as const,
 _sys_hash__ASC: '_sys_hash__ASC' as const,
 _sys_hash__DESC: '_sys_hash__DESC' as const,
 _sys_id__ASC: '_sys_id__ASC' as const,
 _sys_id__DESC: '_sys_id__DESC' as const,
 _sys_lastModifiedAt__ASC: '_sys_lastModifiedAt__ASC' as const,
 _sys_lastModifiedAt__DESC: '_sys_lastModifiedAt__DESC' as const,
 _sys_slug__ASC: '_sys_slug__ASC' as const,
 _sys_slug__DESC: '_sys_slug__DESC' as const,
 _sys_title__ASC: '_sys_title__ASC' as const,
 _sys_title__DESC: '_sys_title__DESC' as const,
 avatar__ASC: 'avatar__ASC' as const,
 avatar__DESC: 'avatar__DESC' as const
}

export const enumPostsItemOrderByEnum = {
 _sys_createdAt__ASC: '_sys_createdAt__ASC' as const,
 _sys_createdAt__DESC: '_sys_createdAt__DESC' as const,
 _sys_hash__ASC: '_sys_hash__ASC' as const,
 _sys_hash__DESC: '_sys_hash__DESC' as const,
 _sys_id__ASC: '_sys_id__ASC' as const,
 _sys_id__DESC: '_sys_id__DESC' as const,
 _sys_lastModifiedAt__ASC: '_sys_lastModifiedAt__ASC' as const,
 _sys_lastModifiedAt__DESC: '_sys_lastModifiedAt__DESC' as const,
 _sys_slug__ASC: '_sys_slug__ASC' as const,
 _sys_slug__DESC: '_sys_slug__DESC' as const,
 _sys_title__ASC: '_sys_title__ASC' as const,
 _sys_title__DESC: '_sys_title__DESC' as const,
 author__ASC: 'author__ASC' as const,
 author__DESC: 'author__DESC' as const,
 body__ASC: 'body__ASC' as const,
 body__DESC: 'body__DESC' as const,
 coverImage__ASC: 'coverImage__ASC' as const,
 coverImage__DESC: 'coverImage__DESC' as const,
 date__ASC: 'date__ASC' as const,
 date__DESC: 'date__DESC' as const,
 excerpt__ASC: 'excerpt__ASC' as const,
 excerpt__DESC: 'excerpt__DESC' as const
}