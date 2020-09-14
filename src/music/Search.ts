import url from "url"
import ytdl from "ytdl-core-discord"
import Youtube from "./sources/Youtube/Youtube3"
import {Utils} from "../utils/Utils"
import {Readable} from "stream"
import {Track} from "./tracks/Track"
import YoutubeTrack from "./tracks/YoutubeTrack"

const YoutubeSource = new Youtube()
export namespace Search {
    export function search(query): Promise<Track[]> {
        return new Promise((res, rej) => {
            parse(query).then(async result => {
                if (result.metadata.mode == "single") {
                    resolveSingleTrack(result).then((trackInfo) => {
                        res([trackInfo])
                    }).catch(err => { rej(err) })
                } else if (result.metadata.mode == "playlist") {

                } else if (result.metadata.mode == "stream") {

                }
            }).catch(err => {
                console.log(`Search error: ${err}`)
                rej(err)
            })
        })
    }

    async function resolveSingleTrack(result: SearchResult): Promise<Track> {
        let resolved = false
        for (let info of result.infos) {
            const basicInfo = await ytdl.getBasicInfo(info.url)
            if (basicInfo.formats.length > 0) {
                resolved = true
                console.log(`Found ${basicInfo.title} for ${result.metadata.query}`)
                return new YoutubeTrack(Utils.generateUUID(), {
                    description: basicInfo.description,
                    length: +basicInfo.length_seconds,
                    title: basicInfo.title,
                    url: info.url,
                    thumbnailURL: basicInfo.thumbnail_url
                })
            }
        }
        return Promise.reject('Could not find a playable video (region locked)')
    }
}

function parse(query: string): Promise<SearchResult> {
    const result = url.parse(query)
    if (result.hostname === 'www.youtube.com') {
        switch (result.pathname) {
            case '/watch':
                console.log(`Found a Youtube video for ${query}`)
                return YoutubeSource.getTrackUrl(query)
            case '/playlist':
                console.log(`Found a Youtube playlist for ${query}`)
                return YoutubeSource.getTrackUrlsFromPlaylist(query)
        }
    } else if (result.hostname === 'open.spotify.com') {
        if (result.pathname.includes('playlist')) {
            // return retrieveSongsFromSpotifyPlaylist(result.pathname)
        }
    }
    return YoutubeSource.getTrackUrl(query)
}

export interface TrackSource {
    getTrackUrl(query: string): Promise<SearchResult>
    getTrackUrlsFromPlaylist(playlistURL: string): Promise<SearchResult>
}

export interface SearchResult {
    infos: ResultInfo[]
    metadata: SearchMetaData
}

export interface ResultInfo {
    url?: string
    stream?: Readable
}

export interface SearchMetaData {
    mode: string // single, playlist
    query: string
}

