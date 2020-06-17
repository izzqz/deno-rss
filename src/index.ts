import Fetch from 'https://cdn.pika.dev/@economia/feed-to-json-promise@^1.8.2';
import EventEmitter from 'https://raw.githubusercontent.com/denoland/deno/master/std/node/events.ts'

export default class RssFeed extends EventEmitter {
    private tools: {
        parseXmlToJson(data: string): any
    };
    urls: string[]
    private _interval: number;

    constructor(urls?: string[], interval?: number) {
        super();
        this.tools = new Fetch()
        this.urls = urls || []
        this._interval = (interval || 60) * 1000
    }

    getArticles(url: string) {
        return fetch(url)
            .then(data => data.text())
            .then(async rawXml => {
                const xml = await this.tools.parseXmlToJson(rawXml)
                return xml.rss.channel[0]
            })
    }
}
