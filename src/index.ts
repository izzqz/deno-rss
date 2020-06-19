import Fetch from 'https://cdn.pika.dev/@economia/feed-to-json-promise@^1.8.2';
import EventEmitter from 'https://raw.githubusercontent.com/denoland/deno/master/std/node/events.ts'
import { Cache } from "./types/cache.interface.ts";
import { Article } from "./types/article.interface.ts";

export default class RssFeed extends EventEmitter {
    private tools: {
        parseXmlToJson(data: string): any
    };
    urls: string[]
    private _interval: number;
    cache: Cache;

    constructor(urls?: string[], interval?: number) {
        super()
        this.tools = new Fetch()
        this.urls = urls || []
        this._interval = (interval || 60) * 1000
        this.cache = {}
    }

    getAllArticles(url: string): Promise<Article[]> {
        return fetch(url)
            .then(data => data.text())
            .then(async rawXml => {
                const xml = await this.tools.parseXmlToJson(rawXml)
                    .catch(this.emitError)

                return xml.rss.channel[0].item.map(item => {
                    item.title = item.title[0]
                    return item
                })
            })
            .catch(this.emitError)
    }

    checkUpdate(url: string): void {
        this.getAllArticles(url)
            .then((articles) => {
                for (const article of articles) {
                    if (!this.cacheHasTitle(url, article.title)) {
                        this.emit('update', article)
                    } else break;
                }

                const titles = articles.map(a => a.title).slice(0, 2)
                this.saveToCache(url, titles[0], titles[1])
            })
    }

    checkAllUpdates(): void {
        const requests = this.urls.map(url => this.checkUpdate(url))
        Promise.all(requests)
    }

    private emitError(err: string | ErrorEvent) {
        this.emit('error', err)
    }

    private saveToCache(url: string, lastTitle: string | undefined, preLastTitle: string | undefined) {
        this.cache[url] = {
            last: lastTitle || null,
            second: preLastTitle || null
        }
    }

    private cacheHasTitle(url: string, title: string): boolean {
        return this.cache[url].last === title || this.cache[url].second === title
    }
}
