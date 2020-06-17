import Fetch from 'https://cdn.pika.dev/@economia/feed-to-json-promise@^1.8.2';
import EventEmitter from 'https://raw.githubusercontent.com/denoland/deno/master/std/node/events.ts'

export class Feed extends EventEmitter {
    private tools: any;
    urls: string[]
    protected _interval: number;

    constructor(urls?: string[], interval?: number) {
        super();
        this.tools = new Fetch()
        this.urls = urls || []
        this._interval = (interval || 60) * 1000
    }
}
