// import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
// import { getInitialSavedTracks } from '../firebase/functions/functions.controller'
// import { RootState } from '../../store/store'
// import { savedDataExtractor } from './spotify.service'
// import { HTTPUserTracksResponse, SavedTracksData } from './spotify.interface'

// type TracksResponse = {
//   total: number,
//   nextUrl: string
//   savedTracks: SavedTracksData[],
//   filteredTracks: SavedTracksData[]
// }

// Define a service using a base URL and expected endpoints
// export const userApi = createApi({
//   reducerPath: 'userApi',
//   baseQuery: fakeBaseQuery(),
//   endpoints: (builder) => ({
//     getInitialTracks: builder.query<TracksResponse | Error, void>({
//       queryFn: async (arg, api, ): Promise<any> => {
//         const state = api.getState()
//         const token: string = state.user.spotify.token
//         const userSavedTracks = await getInitialSavedTracks({ token })

//         if (!userSavedTracks) {
//           return {
//             error: {
//               status: 500,
//               statusText: 'Internal Server Error',
//               data: "Coin landed on it's edge!",
//             }
//           }
//         }

//         if (userSavedTracks) {
          
//           const response = userSavedTracks.data
          
//           const data = savedDataExtractor(response.items);
          
//           return {
//             total: response.total,
//             nextUrl: response.next,
//             savedTracks: data,
//             filteredTracks: data,
//           };
//         }
//       },
//     }),
//   }),
// })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useGetInitialTracksQuery } = userApi