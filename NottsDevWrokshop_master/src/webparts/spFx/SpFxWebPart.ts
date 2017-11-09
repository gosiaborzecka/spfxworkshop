import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import {SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';

import styles from './SpFxWebPart.module.scss';
import * as strings from 'SpFxWebPartStrings';

import MockHttpClient from './MockHttpClient';

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
}

export interface ISpFxWebPartProps {
  description: string;
}

export default class SpFxWebPartWebPart extends BaseClientSideWebPart<ISpFxWebPartProps> {

  private _getMockListData(): Promise<ISPLists> {
    return MockHttpClient.get()
      .then((data: ISPList[]) => {
        var listData: ISPLists = {value: data};
        return listData;
      }) as Promise<ISPLists>;
  }

  private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('SPFxList')/Items?$select=*`,
    SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
    }

  private _renderList(items: ISPList[]):void{
    let html : string = '';
    items.forEach((item: ISPList) => {
      html += `
      <ul class="${styles.row}">
        <li class="${styles.column}">
        <h4>${item.Title}</h4>
        </li>
      </ul>
      `;
    });

    const listContainer: Element = this.domElement.querySelector('#spListContainer');
    listContainer.innerHTML = html;
    }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.spFx }">
          <div id="spListContainer" />
      </div>`;

      if (Environment.type === EnvironmentType.Local) {
        this._getMockListData().then((response) => {
          this._renderList(response.value);
        });
      }
      else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
        this._getListData().then((response) => {
          this._renderList(response.value);
        });
      }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
