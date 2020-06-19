// Type definitions for rss
// Project: https://github.com/dylang/node-rss
// Definitions by: Second Datke <https://github.com/secondwtq>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export interface Article {
    /**
     * Title of your site or feed.
     */
    title: string;
    /**
     * A short description of the feed.
     */
    description?: string;
    /**
     * Feed generator.
     */
    generator?: string;
    /**
     * URL to the rss feed.
     */
    feed_url: string;
    /**
     * URL to the site that the feed is for.
     */
    site_url: string;
    /**
     * Small image for feed readers to use.
     */
    image_url?: string;
    /**
     * URL to documentation on this feed.
     */
    docs?: string;
    /**
     * Who manages content in this feed.
     */
    managingEditor?: string;
    /**
     * Who manages feed availability and technical support.
     */
    webMaster?: string;
    /**
     * Copyright information for this feed.
     */
    copyright?: string;
    /**
     * The language of the content of this feed.
     */
    language?: string;
    /**
     * One or more categories this feed belongs to.
     */
    categories?: string[];
    /**
     * The publication date for content in the feed.
     * Accepts Date object or string with any format
     * JS Date can parse.
     */
    pubDate?: string;
    /**
     * Number of minutes feed can be cached before refreshing
     * from source.
     */
    ttl?: number;
    /**
     * Where is the PubSubHub hub located.
     */
    hub?: string;
    /**
     * Put additional namespaces in element
     * (without 'xmlns:' prefix).
     */
    custom_namespaces?: Object;
    /**
     * Put additional elements in the feed (node-xml syntax).
     */
    custom_elements?: any[];
}