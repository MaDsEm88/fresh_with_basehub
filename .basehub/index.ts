/* eslint-disable */

// @ts-nocheck
import type { QueryGenqlSelection, Query } from './schema.ts'

import {
  linkTypeMap,
  createClient as createClientOriginal,
  generateGraphqlOperation,
  type FieldsSelection,
  type GraphqlOperation,
  type ClientOptions,
  GenqlError,
} from './runtime/index.ts' 

export type { FieldsSelection } from './runtime/index.ts'
export { GenqlError }

import types from './types.ts'
export * from './schema.ts'
const typeMap = linkTypeMap(types as any)

export interface Client {
  query<R extends QueryGenqlSelection>(
    request: R & { __name?: string },
  ): Promise<FieldsSelection<Query, R>>
}

const createClient = function (options?: ClientOptions): Client {
  const { url, headers } = getStuffFromEnv(options)
  return createClientOriginal({
    url: url.toString(),

    ...options,
    headers: { ...options?.headers, ...headers },
    queryRoot: typeMap.Query!,
    mutationRoot: typeMap.Mutation!,
    subscriptionRoot: typeMap.Subscription!,
  }) as any
}

export const everything = {
  __scalar: true,
}

export type QueryResult<fields extends QueryGenqlSelection> = FieldsSelection<
  Query,
  fields
>
export const generateQueryOp: (
  fields: QueryGenqlSelection & { __name?: string },
) => GraphqlOperation = function (fields) {
  return generateGraphqlOperation('query', typeMap.Query!, fields as any)
}


const getStuffFromEnv = (options) => {
  const parsedDebugForcedURL = Deno.env.get("BASEHUB_DEBUG_FORCED_URL");
const parsedBackwardsCompatURL = Deno.env.get("BASEHUB_URL");

    const backwardsCompatURL = parsedBackwardsCompatURL
      ? new URL(parsedBackwardsCompatURL)
      : undefined;


    const basehubUrl = new URL(
      parsedDebugForcedURL
        ? parsedDebugForcedURL
        : `https://api.basehub.com/graphql`
    );

    // These params can either come disambiguated, or in the URL.
    // Params that come from the URL take precedence.

    const parsedBasehubTokenEnv = Deno.env.get("BASEHUB_TOKEN");
    const parsedBasehubRefEnv = Deno.env.get("BASEHUB_REF");
    const parsedBasehubDraftEnv = Deno.env.get("BASEHUB_DRAFT");

    const token =
      basehubUrl.searchParams.get("token") ??
      (parsedBasehubTokenEnv ? parsedBasehubTokenEnv : undefined) ??
      (backwardsCompatURL
        ? backwardsCompatURL.searchParams.get("token")
        : undefined) ??
      null;

    if (!token) {
      throw new Error(
        "Token not found. Make sure to include the BASEHUB_TOKEN env var."
      );
    }

    const ref =
      basehubUrl.searchParams.get("ref") ??
      (parsedBasehubRefEnv ? parsedBasehubRefEnv : undefined) ??
      (backwardsCompatURL
        ? backwardsCompatURL.searchParams.get("ref")
        : undefined) ??
      null;

    let draft =
       basehubUrl.searchParams.get("draft") ??
      (parsedBasehubDraftEnv ? parsedBasehubDraftEnv : undefined) ??
      (backwardsCompatURL
        ? backwardsCompatURL.searchParams.get("draft")
        : undefined) ??
      null;

    if (options?.draft) {
      draft = "true";
    }

    // 2. let's validate the URL

    if (basehubUrl.pathname.split("/")[1] !== "graphql") {
        throw new Error(`Invalid URL. The URL needs to point your repo's GraphQL endpoint, so the pathname should end with /graphql`);
    }

    // we'll pass these via headers
    basehubUrl.searchParams.delete("token");
    basehubUrl.searchParams.delete("ref");
    basehubUrl.searchParams.delete("draft");

    // 3. done.

    return {
      url: basehubUrl,
      headers: {
        "x-basehub-token": token,
        ...(ref ? { "x-basehub-ref": ref } : {}),
        ...(draft ? { "x-basehub-draft": draft } : {}),
      },
    };
};


import { createFetcher } from "./runtime/fetcher.ts";

// we limit options to only the ones we want to expose.
type Options = Omit<ClientOptions, 'url' | 'method' | 'batch' | 'credentials' | 'fetch' | 'fetcher' | 'headers' | 'integrity' | 'keepalive' | 'mode' | 'redirect' | 'referrer' | 'referrerPolicy' | 'window'> & { draft?: boolean }

/**
 * Create a basehub client.
 *
 * @param options (optional) Options for the `fetch` request; for example in Next.js, you can do `{ next: { revalidate: 60 } }` to tweak your app's cache.
 * @returns A basehub client.
 *
 * @example
 * import { basehub } from 'basehub'
 *
 * const firstQuery = await basehub().query({
 *   __typename: true,
 * });
 *
 * console.log(firstQuery.__typename) // => 'Query'
 *
 */
export const basehub = (options?: Options) => {
  const { url, headers } = getStuffFromEnv(options);

  return {
    ...createClient(options),
    raw: createFetcher({ ...options, url, headers }) as <Cast = unknown>(
      gql: GraphqlOperation
    ) => Promise<Cast>,
  };
};