/* eslint-disable */
// @ts-nocheck

export default {
    "scalars": [
        3,
        18,
        20,
        21,
        22,
        23,
        24,
        31,
        35
    ],
    "types": {
        "Authors": {
            "_id": [
                35
            ],
            "_meta": [
                26
            ],
            "_slug": [
                35
            ],
            "_sys": [
                9
            ],
            "_title": [
                35
            ],
            "items": [
                1
            ],
            "__typename": [
                35
            ]
        },
        "AuthorsItem": {
            "_id": [
                35
            ],
            "_slug": [
                35
            ],
            "_sys": [
                9
            ],
            "_title": [
                35
            ],
            "avatar": [
                11
            ],
            "__typename": [
                35
            ]
        },
        "AuthorsItemFilterInput": {
            "AND": [
                2
            ],
            "OR": [
                2
            ],
            "_sys_createdAt": [
                19
            ],
            "_sys_hash": [
                36
            ],
            "_sys_id": [
                36
            ],
            "_sys_lastModifiedAt": [
                19
            ],
            "_sys_slug": [
                36
            ],
            "_sys_title": [
                36
            ],
            "__typename": [
                35
            ]
        },
        "AuthorsItemOrderByEnum": {},
        "BaseRichTextJson": {
            "blocks": [
                35
            ],
            "content": [
                24
            ],
            "toc": [
                24
            ],
            "__typename": [
                35
            ]
        },
        "BlockAudio": {
            "fileName": [
                35
            ],
            "fileSize": [
                23
            ],
            "lastModified": [
                21
            ],
            "mimeType": [
                35
            ],
            "url": [
                35
            ],
            "__typename": [
                35
            ]
        },
        "BlockCodeSnippet": {
            "code": [
                35
            ],
            "html": [
                35,
                {
                    "theme": [
                        35
                    ]
                }
            ],
            "language": [
                35
            ],
            "__typename": [
                35
            ]
        },
        "BlockColor": {
            "hex": [
                35
            ],
            "hsl": [
                35
            ],
            "rgb": [
                35
            ],
            "__typename": [
                35
            ]
        },
        "BlockDocument": {
            "_id": [
                35
            ],
            "_slug": [
                35
            ],
            "_sys": [
                9
            ],
            "_title": [
                35
            ],
            "on_Authors": [
                0
            ],
            "on_AuthorsItem": [
                1
            ],
            "on_Blog": [
                15
            ],
            "on_Posts": [
                28
            ],
            "on_PostsItem": [
                29
            ],
            "__typename": [
                35
            ]
        },
        "BlockDocumentSys": {
            "createdAt": [
                35
            ],
            "hash": [
                35
            ],
            "id": [
                22
            ],
            "lastModifiedAt": [
                35
            ],
            "slug": [
                35
            ],
            "title": [
                35
            ],
            "__typename": [
                35
            ]
        },
        "BlockFile": {
            "fileName": [
                35
            ],
            "fileSize": [
                23
            ],
            "lastModified": [
                21
            ],
            "mimeType": [
                35
            ],
            "url": [
                35
            ],
            "__typename": [
                35
            ]
        },
        "BlockImage": {
            "alt": [
                35
            ],
            "aspectRatio": [
                35
            ],
            "fileName": [
                35
            ],
            "fileSize": [
                23
            ],
            "height": [
                23
            ],
            "lastModified": [
                21
            ],
            "mimeType": [
                35
            ],
            "rawUrl": [
                35
            ],
            "url": [
                35,
                {
                    "blur": [
                        23
                    ],
                    "brightness": [
                        23
                    ],
                    "compression": [
                        35
                    ],
                    "contrast": [
                        23
                    ],
                    "dpr": [
                        23
                    ],
                    "fit": [
                        35
                    ],
                    "format": [
                        35
                    ],
                    "height": [
                        23
                    ],
                    "quality": [
                        23
                    ],
                    "width": [
                        23
                    ]
                }
            ],
            "width": [
                23
            ],
            "__typename": [
                35
            ]
        },
        "BlockList": {
            "_id": [
                35
            ],
            "_meta": [
                26
            ],
            "_slug": [
                35
            ],
            "_sys": [
                9
            ],
            "_title": [
                35
            ],
            "on_Authors": [
                0
            ],
            "on_Posts": [
                28
            ],
            "__typename": [
                35
            ]
        },
        "BlockRichText": {
            "html": [
                35,
                {
                    "slugs": [
                        18
                    ],
                    "toc": [
                        18
                    ]
                }
            ],
            "json": [
                34
            ],
            "markdown": [
                35
            ],
            "plainText": [
                35
            ],
            "readingTime": [
                23,
                {
                    "wpm": [
                        23
                    ]
                }
            ],
            "on_Body": [
                16
            ],
            "__typename": [
                35
            ]
        },
        "BlockVideo": {
            "aspectRatio": [
                35
            ],
            "fileName": [
                35
            ],
            "fileSize": [
                23
            ],
            "height": [
                23
            ],
            "lastModified": [
                21
            ],
            "mimeType": [
                35
            ],
            "url": [
                35
            ],
            "width": [
                23
            ],
            "__typename": [
                35
            ]
        },
        "Blog": {
            "_id": [
                35
            ],
            "_slug": [
                35
            ],
            "_sys": [
                9
            ],
            "_title": [
                35
            ],
            "authors": [
                0,
                {
                    "filter": [
                        2
                    ],
                    "first": [
                        23
                    ],
                    "orderBy": [
                        3
                    ],
                    "skip": [
                        23
                    ]
                }
            ],
            "posts": [
                28,
                {
                    "filter": [
                        30
                    ],
                    "first": [
                        23
                    ],
                    "orderBy": [
                        31
                    ],
                    "skip": [
                        23
                    ]
                }
            ],
            "__typename": [
                35
            ]
        },
        "Body": {
            "html": [
                35,
                {
                    "slugs": [
                        18
                    ],
                    "toc": [
                        18
                    ]
                }
            ],
            "json": [
                17
            ],
            "markdown": [
                35
            ],
            "plainText": [
                35
            ],
            "readingTime": [
                23,
                {
                    "wpm": [
                        23
                    ]
                }
            ],
            "__typename": [
                35
            ]
        },
        "BodyRichText": {
            "blocks": [
                8
            ],
            "content": [
                24
            ],
            "toc": [
                24
            ],
            "__typename": [
                35
            ]
        },
        "Boolean": {},
        "DateFilter": {
            "eq": [
                20
            ],
            "isAfter": [
                20
            ],
            "isBefore": [
                20
            ],
            "neq": [
                20
            ],
            "onOrAfter": [
                20
            ],
            "onOrBefore": [
                20
            ],
            "__typename": [
                35
            ]
        },
        "DateTime": {},
        "Float": {},
        "ID": {},
        "Int": {},
        "JSON": {},
        "ListFilter": {
            "isEmpty": [
                18
            ],
            "length": [
                23
            ],
            "__typename": [
                35
            ]
        },
        "ListMeta": {
            "totalCount": [
                23
            ],
            "__typename": [
                35
            ]
        },
        "NumberFilter": {
            "eq": [
                21
            ],
            "gt": [
                21
            ],
            "gte": [
                21
            ],
            "lt": [
                21
            ],
            "lte": [
                21
            ],
            "neq": [
                21
            ],
            "__typename": [
                35
            ]
        },
        "Posts": {
            "_id": [
                35
            ],
            "_meta": [
                26
            ],
            "_slug": [
                35
            ],
            "_sys": [
                9
            ],
            "_title": [
                35
            ],
            "items": [
                29
            ],
            "__typename": [
                35
            ]
        },
        "PostsItem": {
            "_id": [
                35
            ],
            "_slug": [
                35
            ],
            "_sys": [
                9
            ],
            "_title": [
                35
            ],
            "author": [
                1
            ],
            "body": [
                16
            ],
            "coverImage": [
                11
            ],
            "date": [
                35
            ],
            "excerpt": [
                35
            ],
            "__typename": [
                35
            ]
        },
        "PostsItemFilterInput": {
            "AND": [
                30
            ],
            "OR": [
                30
            ],
            "_sys_createdAt": [
                19
            ],
            "_sys_hash": [
                36
            ],
            "_sys_id": [
                36
            ],
            "_sys_lastModifiedAt": [
                19
            ],
            "_sys_slug": [
                36
            ],
            "_sys_title": [
                36
            ],
            "date": [
                19
            ],
            "excerpt": [
                36
            ],
            "__typename": [
                35
            ]
        },
        "PostsItemOrderByEnum": {},
        "Query": {
            "_sys": [
                33
            ],
            "blog": [
                15
            ],
            "__typename": [
                35
            ]
        },
        "RepoSys": {
            "hash": [
                35
            ],
            "id": [
                22
            ],
            "slug": [
                35
            ],
            "title": [
                35
            ],
            "__typename": [
                35
            ]
        },
        "RichTextJson": {
            "content": [
                24
            ],
            "toc": [
                24
            ],
            "on_BaseRichTextJson": [
                4
            ],
            "on_BodyRichText": [
                17
            ],
            "__typename": [
                35
            ]
        },
        "String": {},
        "StringFilter": {
            "eq": [
                35
            ],
            "matches": [
                37
            ],
            "notEq": [
                35
            ],
            "__typename": [
                35
            ]
        },
        "StringMatchesFilter": {
            "caseSensitive": [
                18
            ],
            "pattern": [
                35
            ],
            "__typename": [
                35
            ]
        }
    }
}