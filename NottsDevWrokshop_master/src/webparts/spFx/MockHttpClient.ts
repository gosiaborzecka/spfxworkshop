import { ISPList } from './SpFxWebPart';

export default class MockHttpClient {
    private static _items: ISPList[] = [
        {Title: "Tweet 1 #SPFx #SharePoint"},
        {Title: "Tweet 2 #SPFx #SharePoint"}
    ];

    public static get(): Promise<ISPList[]> {
        return new Promise<ISPList[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }
}
