/* eslint-disable */
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// .basehub/index.ts
var index_exports = {};
__export(index_exports, {
  GenqlError: () => GenqlError,
  basehub: () => basehub,
  enumAuthorsItemOrderByEnum: () => enumAuthorsItemOrderByEnum,
  enumPostsItemOrderByEnum: () => enumPostsItemOrderByEnum,
  everything: () => everything,
  generateQueryOp: () => generateQueryOp,
  isAuthors: () => isAuthors,
  isAuthorsItem: () => isAuthorsItem,
  isBaseRichTextJson: () => isBaseRichTextJson,
  isBlockAudio: () => isBlockAudio,
  isBlockCodeSnippet: () => isBlockCodeSnippet,
  isBlockColor: () => isBlockColor,
  isBlockDocument: () => isBlockDocument,
  isBlockDocumentSys: () => isBlockDocumentSys,
  isBlockFile: () => isBlockFile,
  isBlockImage: () => isBlockImage,
  isBlockList: () => isBlockList,
  isBlockRichText: () => isBlockRichText,
  isBlockVideo: () => isBlockVideo,
  isBlog: () => isBlog,
  isBody: () => isBody,
  isBodyRichText: () => isBodyRichText,
  isListMeta: () => isListMeta,
  isPosts: () => isPosts,
  isPostsItem: () => isPostsItem,
  isQuery: () => isQuery,
  isRepoSys: () => isRepoSys,
  isRichTextJson: () => isRichTextJson
});
module.exports = __toCommonJS(index_exports);

// .basehub/runtime/error.ts
var GenqlError = class extends Error {
  errors = [];
  /**
   * Partial data returned by the server
   */
  data;
  constructor(errors, data) {
    let message = Array.isArray(errors) ? errors.map((x) => x?.message || "").join("\n") : "";
    if (!message) {
      message = "GraphQL error";
    }
    super(message);
    this.errors = errors;
    this.stringified = JSON.stringify(this);
    this.data = data;
  }
};

// .basehub/runtime/batcher.ts
function dispatchQueueBatch(client, queue) {
  let batchedQuery = queue.map((item) => item.request);
  if (batchedQuery.length === 1) {
    batchedQuery = batchedQuery[0];
  }
  client.fetcher(batchedQuery).then((responses) => {
    if (queue.length === 1 && !Array.isArray(responses)) {
      if (responses.errors && responses.errors.length) {
        queue[0].reject(
          new GenqlError(responses.errors, responses.data)
        );
        return;
      }
      queue[0].resolve(responses);
      return;
    } else if (responses.length !== queue.length) {
      throw new Error("response length did not match query length");
    }
    for (let i = 0; i < queue.length; i++) {
      if (responses[i].errors && responses[i].errors.length) {
        queue[i].reject(
          new GenqlError(responses[i].errors, responses[i].data)
        );
      } else {
        queue[i].resolve(responses[i]);
      }
    }
  });
}
function dispatchQueue(client, options) {
  const queue = client._queue;
  const maxBatchSize = options.maxBatchSize || 0;
  client._queue = [];
  if (maxBatchSize > 0 && maxBatchSize < queue.length) {
    for (let i = 0; i < queue.length / maxBatchSize; i++) {
      dispatchQueueBatch(
        client,
        queue.slice(i * maxBatchSize, (i + 1) * maxBatchSize)
      );
    }
  } else {
    dispatchQueueBatch(client, queue);
  }
}
var QueryBatcher = class _QueryBatcher {
  fetcher;
  _options;
  _queue;
  constructor(fetcher, {
    batchInterval = 6,
    shouldBatch = true,
    maxBatchSize = 0
  } = {}) {
    this.fetcher = fetcher;
    this._options = {
      batchInterval,
      shouldBatch,
      maxBatchSize
    };
    this._queue = [];
  }
  /**
   * Fetch will send a graphql request and return the parsed json.
   * @param {string}      query          - the graphql query.
   * @param {Variables}   variables      - any variables you wish to inject as key/value pairs.
   * @param {[string]}    operationName  - the graphql operationName.
   * @param {Options}     overrides      - the client options overrides.
   *
   * @return {promise} resolves to parsed json of server response
   *
   * @example
   * client.fetch(`
   *    query getHuman($id: ID!) {
   *      human(id: $id) {
   *        name
   *        height
   *      }
   *    }
   * `, { id: "1001" }, 'getHuman')
   *    .then(human => {
   *      // do something with human
   *      console.log(human);
   *    });
   */
  fetch(query, variables, operationName, overrides = {}) {
    const request = {
      query
    };
    const options = Object.assign({}, this._options, overrides);
    if (variables) {
      request.variables = variables;
    }
    if (operationName) {
      request.operationName = operationName;
    }
    const promise = new Promise((resolve, reject) => {
      this._queue.push({
        request,
        resolve,
        reject
      });
      if (this._queue.length === 1) {
        if (options.shouldBatch) {
          setTimeout(
            () => dispatchQueue(this, options),
            options.batchInterval
          );
        } else {
          dispatchQueue(this, options);
        }
      }
    });
    return promise;
  }
  /**
   * Fetch will send a graphql request and return the parsed json.
   * @param {string}      query          - the graphql query.
   * @param {Variables}   variables      - any variables you wish to inject as key/value pairs.
   * @param {[string]}    operationName  - the graphql operationName.
   * @param {Options}     overrides      - the client options overrides.
   *
   * @return {Promise<Array<Result>>} resolves to parsed json of server response
   *
   * @example
   * client.forceFetch(`
   *    query getHuman($id: ID!) {
   *      human(id: $id) {
   *        name
   *        height
   *      }
   *    }
   * `, { id: "1001" }, 'getHuman')
   *    .then(human => {
   *      // do something with human
   *      console.log(human);
   *    });
   */
  forceFetch(query, variables, operationName, overrides = {}) {
    const request = {
      query
    };
    const options = Object.assign({}, this._options, overrides, {
      shouldBatch: false
    });
    if (variables) {
      request.variables = variables;
    }
    if (operationName) {
      request.operationName = operationName;
    }
    const promise = new Promise((resolve, reject) => {
      const client = new _QueryBatcher(this.fetcher, this._options);
      client._queue = [
        {
          request,
          resolve,
          reject
        }
      ];
      dispatchQueue(client, options);
    });
    return promise;
  }
};

// .basehub/runtime/fetcher.ts
var DEFAULT_BATCH_OPTIONS = {
  maxBatchSize: 10,
  batchInterval: 40
};
var createFetcher = ({
  url,
  headers = {},
  fetcher,
  fetch: _fetch,
  batch = false,
  ...rest
}) => {
  if (!url && !fetcher) {
    throw new Error("url or fetcher is required");
  }
  if (!fetcher) {
    fetcher = async (body) => {
      let headersObject = typeof headers == "function" ? await headers() : headers;
      headersObject = headersObject || {};
      if (typeof fetch === "undefined" && !_fetch) {
        throw new Error(
          "Global `fetch` function is not available, pass a fetch polyfill to Genql `createClient`"
        );
      }
      let fetchImpl = _fetch || fetch;
      const res = await fetchImpl(url, {
        headers: {
          "Content-Type": "application/json",
          ...headersObject
        },
        method: "POST",
        body: JSON.stringify(body),
        ...rest
      });
      if (!res.ok) {
        throw new Error(`${res.statusText}: ${await res.text()}`);
      }
      const json = await res.json();
      return json;
    };
  }
  if (!batch) {
    return async (body) => {
      const json = await fetcher(body);
      if (Array.isArray(json)) {
        return json.map((json2) => {
          if (json2?.errors?.length) {
            throw new GenqlError(json2.errors || [], json2.data);
          }
          return json2.data;
        });
      } else {
        if (json?.errors?.length) {
          throw new GenqlError(json.errors || [], json.data);
        }
        return json.data;
      }
    };
  }
  const batcher = new QueryBatcher(
    async (batchedQuery) => {
      const json = await fetcher(batchedQuery);
      return json;
    },
    batch === true ? DEFAULT_BATCH_OPTIONS : batch
  );
  return async ({ query, variables }) => {
    const json = await batcher.fetch(query, variables);
    if (json?.data) {
      return json.data;
    }
    throw new Error(
      "Genql batch fetcher returned unexpected result " + JSON.stringify(json)
    );
  };
};

// .basehub/runtime/generateGraphqlOperation.ts
var parseRequest = (request, ctx, path) => {
  if (typeof request === "object" && "__args" in request) {
    const args = request.__args;
    let fields = { ...request };
    delete fields.__args;
    const argNames = Object.keys(args);
    if (argNames.length === 0) {
      return parseRequest(fields, ctx, path);
    }
    const field = getFieldFromPath(ctx.root, path);
    const argStrings = argNames.map((argName) => {
      ctx.varCounter++;
      const varName = `v${ctx.varCounter}`;
      const typing = field.args && field.args[argName];
      if (!typing) {
        throw new Error(
          `no typing defined for argument \`${argName}\` in path \`${path.join(
            "."
          )}\``
        );
      }
      ctx.variables[varName] = {
        value: args[argName],
        typing
      };
      return `${argName}:$${varName}`;
    });
    return `(${argStrings})${parseRequest(fields, ctx, path)}`;
  } else if (typeof request === "object" && Object.keys(request).length > 0) {
    const fields = request;
    const fieldNames = Object.keys(fields).filter((k) => Boolean(fields[k]));
    if (fieldNames.length === 0) {
      throw new Error(
        `field selection should not be empty: ${path.join(".")}`
      );
    }
    const type = path.length > 0 ? getFieldFromPath(ctx.root, path).type : ctx.root;
    const scalarFields = type.scalar;
    let scalarFieldsFragment;
    if (fieldNames.includes("__scalar")) {
      const falsyFieldNames = new Set(
        Object.keys(fields).filter((k) => !Boolean(fields[k]))
      );
      if (scalarFields?.length) {
        ctx.fragmentCounter++;
        scalarFieldsFragment = `f${ctx.fragmentCounter}`;
        ctx.fragments.push(
          `fragment ${scalarFieldsFragment} on ${type.name}{${scalarFields.filter((f) => !falsyFieldNames.has(f)).join(",")}}`
        );
      }
    }
    const fieldsSelection = fieldNames.filter((f) => !["__scalar", "__name"].includes(f)).map((f) => {
      const parsed = parseRequest(fields[f], ctx, [...path, f]);
      if (f.startsWith("on_")) {
        ctx.fragmentCounter++;
        const implementationFragment = `f${ctx.fragmentCounter}`;
        const typeMatch = f.match(/^on_(.+)/);
        if (!typeMatch || !typeMatch[1])
          throw new Error("match failed");
        ctx.fragments.push(
          `fragment ${implementationFragment} on ${typeMatch[1]}${parsed}`
        );
        return `...${implementationFragment}`;
      } else {
        return `${f}${parsed}`;
      }
    }).concat(scalarFieldsFragment ? [`...${scalarFieldsFragment}`] : []).join(",");
    return `{${fieldsSelection}}`;
  } else {
    return "";
  }
};
var generateGraphqlOperation = (operation, root, fields) => {
  const ctx = {
    root,
    varCounter: 0,
    variables: {},
    fragmentCounter: 0,
    fragments: []
  };
  const result = parseRequest(fields, ctx, []);
  const varNames = Object.keys(ctx.variables);
  const varsString = varNames.length > 0 ? `(${varNames.map((v) => {
    const variableType = ctx.variables[v].typing[1];
    return `$${v}:${variableType}`;
  })})` : "";
  const operationName = fields?.__name || "";
  return {
    query: [
      `${operation} ${operationName}${varsString}${result}`,
      ...ctx.fragments
    ].join(","),
    variables: Object.keys(ctx.variables).reduce(
      (r, v) => {
        r[v] = ctx.variables[v].value;
        return r;
      },
      {}
    ),
    ...operationName ? { operationName: operationName.toString() } : {}
  };
};
var getFieldFromPath = (root, path) => {
  let current;
  if (!root)
    throw new Error("root type is not provided");
  if (path.length === 0)
    throw new Error(`path is empty`);
  path.forEach((f) => {
    const type = current ? current.type : root;
    if (!type.fields)
      throw new Error(`type \`${type.name}\` does not have fields`);
    const possibleTypes = Object.keys(type.fields).filter((i) => i.startsWith("on_")).reduce(
      (types, fieldName) => {
        const field2 = type.fields && type.fields[fieldName];
        if (field2)
          types.push(field2.type);
        return types;
      },
      [type]
    );
    let field = null;
    possibleTypes.forEach((type2) => {
      const found = type2.fields && type2.fields[f];
      if (found)
        field = found;
    });
    if (!field)
      throw new Error(
        `type \`${type.name}\` does not have a field \`${f}\``
      );
    current = field;
  });
  return current;
};

// .basehub/runtime/createClient.ts
var createClient = ({
  queryRoot,
  mutationRoot,
  subscriptionRoot,
  ...options
}) => {
  const fetcher = createFetcher(options);
  const client = {};
  if (queryRoot) {
    client.query = (request) => {
      if (!queryRoot)
        throw new Error("queryRoot argument is missing");
      const resultPromise = fetcher(
        generateGraphqlOperation("query", queryRoot, request)
      );
      return resultPromise;
    };
  }
  if (mutationRoot) {
    client.mutation = (request) => {
      if (!mutationRoot)
        throw new Error("mutationRoot argument is missing");
      const resultPromise = fetcher(
        generateGraphqlOperation("mutation", mutationRoot, request)
      );
      return resultPromise;
    };
  }
  return client;
};

// .basehub/runtime/linkTypeMap.ts
var linkTypeMap = (typeMap2) => {
  const indexToName = Object.assign(
    {},
    ...Object.keys(typeMap2.types).map((k, i) => ({ [i]: k }))
  );
  let intermediaryTypeMap = Object.assign(
    {},
    ...Object.keys(typeMap2.types || {}).map(
      (k) => {
        const type = typeMap2.types[k];
        const fields = type || {};
        return {
          [k]: {
            name: k,
            // type scalar properties
            scalar: Object.keys(fields).filter((f) => {
              const [type2] = fields[f] || [];
              return type2 && typeMap2.scalars.includes(type2);
            }),
            // fields with corresponding `type` and `args`
            fields: Object.assign(
              {},
              ...Object.keys(fields).map(
                (f) => {
                  const [typeIndex, args] = fields[f] || [];
                  if (typeIndex == null) {
                    return {};
                  }
                  return {
                    [f]: {
                      // replace index with type name
                      type: indexToName[typeIndex],
                      args: Object.assign(
                        {},
                        ...Object.keys(args || {}).map(
                          (k2) => {
                            if (!args || !args[k2]) {
                              return;
                            }
                            const [
                              argTypeName,
                              argTypeString
                            ] = args[k2];
                            return {
                              [k2]: [
                                indexToName[argTypeName],
                                argTypeString || indexToName[argTypeName]
                              ]
                            };
                          }
                        )
                      )
                    }
                  };
                }
              )
            )
          }
        };
      }
    )
  );
  const res = resolveConcreteTypes(intermediaryTypeMap);
  return res;
};
var resolveConcreteTypes = (linkedTypeMap) => {
  Object.keys(linkedTypeMap).forEach((typeNameFromKey) => {
    const type = linkedTypeMap[typeNameFromKey];
    if (!type.fields) {
      return;
    }
    const fields = type.fields;
    Object.keys(fields).forEach((f) => {
      const field = fields[f];
      if (field.args) {
        const args = field.args;
        Object.keys(args).forEach((key) => {
          const arg = args[key];
          if (arg) {
            const [typeName2] = arg;
            if (typeof typeName2 === "string") {
              if (!linkedTypeMap[typeName2]) {
                linkedTypeMap[typeName2] = { name: typeName2 };
              }
              arg[0] = linkedTypeMap[typeName2];
            }
          }
        });
      }
      const typeName = field.type;
      if (typeof typeName === "string") {
        if (!linkedTypeMap[typeName]) {
          linkedTypeMap[typeName] = { name: typeName };
        }
        field.type = linkedTypeMap[typeName];
      }
    });
  });
  return linkedTypeMap;
};

// .basehub/types.ts
var types_default = {
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
};

// .basehub/schema.ts
var Authors_possibleTypes = ["Authors"];
var isAuthors = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isAuthors"');
  return Authors_possibleTypes.includes(obj.__typename);
};
var AuthorsItem_possibleTypes = ["AuthorsItem"];
var isAuthorsItem = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isAuthorsItem"');
  return AuthorsItem_possibleTypes.includes(obj.__typename);
};
var BaseRichTextJson_possibleTypes = ["BaseRichTextJson"];
var isBaseRichTextJson = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isBaseRichTextJson"');
  return BaseRichTextJson_possibleTypes.includes(obj.__typename);
};
var BlockAudio_possibleTypes = ["BlockAudio"];
var isBlockAudio = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isBlockAudio"');
  return BlockAudio_possibleTypes.includes(obj.__typename);
};
var BlockCodeSnippet_possibleTypes = ["BlockCodeSnippet"];
var isBlockCodeSnippet = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isBlockCodeSnippet"');
  return BlockCodeSnippet_possibleTypes.includes(obj.__typename);
};
var BlockColor_possibleTypes = ["BlockColor"];
var isBlockColor = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isBlockColor"');
  return BlockColor_possibleTypes.includes(obj.__typename);
};
var BlockDocument_possibleTypes = ["Authors", "AuthorsItem", "Blog", "Posts", "PostsItem"];
var isBlockDocument = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isBlockDocument"');
  return BlockDocument_possibleTypes.includes(obj.__typename);
};
var BlockDocumentSys_possibleTypes = ["BlockDocumentSys"];
var isBlockDocumentSys = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isBlockDocumentSys"');
  return BlockDocumentSys_possibleTypes.includes(obj.__typename);
};
var BlockFile_possibleTypes = ["BlockFile"];
var isBlockFile = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isBlockFile"');
  return BlockFile_possibleTypes.includes(obj.__typename);
};
var BlockImage_possibleTypes = ["BlockImage"];
var isBlockImage = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isBlockImage"');
  return BlockImage_possibleTypes.includes(obj.__typename);
};
var BlockList_possibleTypes = ["Authors", "Posts"];
var isBlockList = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isBlockList"');
  return BlockList_possibleTypes.includes(obj.__typename);
};
var BlockRichText_possibleTypes = ["Body"];
var isBlockRichText = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isBlockRichText"');
  return BlockRichText_possibleTypes.includes(obj.__typename);
};
var BlockVideo_possibleTypes = ["BlockVideo"];
var isBlockVideo = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isBlockVideo"');
  return BlockVideo_possibleTypes.includes(obj.__typename);
};
var Blog_possibleTypes = ["Blog"];
var isBlog = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isBlog"');
  return Blog_possibleTypes.includes(obj.__typename);
};
var Body_possibleTypes = ["Body"];
var isBody = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isBody"');
  return Body_possibleTypes.includes(obj.__typename);
};
var BodyRichText_possibleTypes = ["BodyRichText"];
var isBodyRichText = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isBodyRichText"');
  return BodyRichText_possibleTypes.includes(obj.__typename);
};
var ListMeta_possibleTypes = ["ListMeta"];
var isListMeta = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isListMeta"');
  return ListMeta_possibleTypes.includes(obj.__typename);
};
var Posts_possibleTypes = ["Posts"];
var isPosts = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isPosts"');
  return Posts_possibleTypes.includes(obj.__typename);
};
var PostsItem_possibleTypes = ["PostsItem"];
var isPostsItem = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isPostsItem"');
  return PostsItem_possibleTypes.includes(obj.__typename);
};
var Query_possibleTypes = ["Query"];
var isQuery = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isQuery"');
  return Query_possibleTypes.includes(obj.__typename);
};
var RepoSys_possibleTypes = ["RepoSys"];
var isRepoSys = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isRepoSys"');
  return RepoSys_possibleTypes.includes(obj.__typename);
};
var RichTextJson_possibleTypes = ["BaseRichTextJson", "BodyRichText"];
var isRichTextJson = (obj) => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isRichTextJson"');
  return RichTextJson_possibleTypes.includes(obj.__typename);
};
var enumAuthorsItemOrderByEnum = {
  _sys_createdAt__ASC: "_sys_createdAt__ASC",
  _sys_createdAt__DESC: "_sys_createdAt__DESC",
  _sys_hash__ASC: "_sys_hash__ASC",
  _sys_hash__DESC: "_sys_hash__DESC",
  _sys_id__ASC: "_sys_id__ASC",
  _sys_id__DESC: "_sys_id__DESC",
  _sys_lastModifiedAt__ASC: "_sys_lastModifiedAt__ASC",
  _sys_lastModifiedAt__DESC: "_sys_lastModifiedAt__DESC",
  _sys_slug__ASC: "_sys_slug__ASC",
  _sys_slug__DESC: "_sys_slug__DESC",
  _sys_title__ASC: "_sys_title__ASC",
  _sys_title__DESC: "_sys_title__DESC",
  avatar__ASC: "avatar__ASC",
  avatar__DESC: "avatar__DESC"
};
var enumPostsItemOrderByEnum = {
  _sys_createdAt__ASC: "_sys_createdAt__ASC",
  _sys_createdAt__DESC: "_sys_createdAt__DESC",
  _sys_hash__ASC: "_sys_hash__ASC",
  _sys_hash__DESC: "_sys_hash__DESC",
  _sys_id__ASC: "_sys_id__ASC",
  _sys_id__DESC: "_sys_id__DESC",
  _sys_lastModifiedAt__ASC: "_sys_lastModifiedAt__ASC",
  _sys_lastModifiedAt__DESC: "_sys_lastModifiedAt__DESC",
  _sys_slug__ASC: "_sys_slug__ASC",
  _sys_slug__DESC: "_sys_slug__DESC",
  _sys_title__ASC: "_sys_title__ASC",
  _sys_title__DESC: "_sys_title__DESC",
  author__ASC: "author__ASC",
  author__DESC: "author__DESC",
  body__ASC: "body__ASC",
  body__DESC: "body__DESC",
  coverImage__ASC: "coverImage__ASC",
  coverImage__DESC: "coverImage__DESC",
  date__ASC: "date__ASC",
  date__DESC: "date__DESC",
  excerpt__ASC: "excerpt__ASC",
  excerpt__DESC: "excerpt__DESC"
};

// .basehub/index.ts
var typeMap = linkTypeMap(types_default);
var createClient2 = function(options) {
  const { url, headers } = getStuffFromEnv(options);
  return createClient({
    url: url.toString(),
    ...options,
    headers: { ...options?.headers, ...headers },
    queryRoot: typeMap.Query,
    mutationRoot: typeMap.Mutation,
    subscriptionRoot: typeMap.Subscription
  });
};
var everything = {
  __scalar: true
};
var generateQueryOp = function(fields) {
  return generateGraphqlOperation("query", typeMap.Query, fields);
};
var getStuffFromEnv = (options) => {
  const parsedDebugForcedURL = Deno.env.get("BASEHUB_DEBUG_FORCED_URL");
  const parsedBackwardsCompatURL = Deno.env.get("BASEHUB_URL");
  const backwardsCompatURL = parsedBackwardsCompatURL ? new URL(parsedBackwardsCompatURL) : void 0;
  const basehubUrl = new URL(
    parsedDebugForcedURL ? parsedDebugForcedURL : `https://api.basehub.com/graphql`
  );
  const parsedBasehubTokenEnv = Deno.env.get("BASEHUB_TOKEN");
  const parsedBasehubRefEnv = Deno.env.get("BASEHUB_REF");
  const parsedBasehubDraftEnv = Deno.env.get("BASEHUB_DRAFT");
  const token = basehubUrl.searchParams.get("token") ?? (parsedBasehubTokenEnv ? parsedBasehubTokenEnv : void 0) ?? (backwardsCompatURL ? backwardsCompatURL.searchParams.get("token") : void 0) ?? null;
  if (!token) {
    throw new Error(
      "Token not found. Make sure to include the BASEHUB_TOKEN env var."
    );
  }
  const ref = basehubUrl.searchParams.get("ref") ?? (parsedBasehubRefEnv ? parsedBasehubRefEnv : void 0) ?? (backwardsCompatURL ? backwardsCompatURL.searchParams.get("ref") : void 0) ?? null;
  let draft = basehubUrl.searchParams.get("draft") ?? (parsedBasehubDraftEnv ? parsedBasehubDraftEnv : void 0) ?? (backwardsCompatURL ? backwardsCompatURL.searchParams.get("draft") : void 0) ?? null;
  if (options?.draft) {
    draft = "true";
  }
  if (basehubUrl.pathname.split("/")[1] !== "graphql") {
    throw new Error(`Invalid URL. The URL needs to point your repo's GraphQL endpoint, so the pathname should end with /graphql`);
  }
  basehubUrl.searchParams.delete("token");
  basehubUrl.searchParams.delete("ref");
  basehubUrl.searchParams.delete("draft");
  return {
    url: basehubUrl,
    headers: {
      "x-basehub-token": token,
      ...ref ? { "x-basehub-ref": ref } : {},
      ...draft ? { "x-basehub-draft": draft } : {}
    }
  };
};
var basehub = (options) => {
  const { url, headers } = getStuffFromEnv(options);
  return {
    ...createClient2(options),
    raw: createFetcher({ ...options, url, headers })
  };
};