import { QueryResult } from '@apollo/client'

export type RemoteData<D> =
  | {
      type: 'LOADING'
    }
  | { type: 'ERROR' }
  | { type: 'SUCCESS'; data: D | null }

const map =
  <A>(r: RemoteData<A>) =>
  <B>(f: (a: A | null) => B): RemoteData<B> =>
    r.type === 'SUCCESS'
      ? {
          type: 'SUCCESS',
          data: f(r.data),
        }
      : r

const query = <D>(x: QueryResult<D>): RemoteData<D> => {
  if (x.error) {
    return { type: 'ERROR' }
  }

  if (x.loading) {
    return { type: 'LOADING' }
  }

  return { type: 'SUCCESS', data: x.data || null }
}

const fold = <T, K>(x: RemoteData<T>, error: () => K, loading: () => K, success: (x: T | null) => K) => {
  switch (x.type) {
    case 'ERROR':
      return error()
    case 'LOADING':
      return loading()
    case 'SUCCESS':
      return success(x.data)
  }
}

export const RemoteData = {
  map,
  query,
  fold,
}
