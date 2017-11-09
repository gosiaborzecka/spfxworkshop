import { Version, Environment, EnvironmentType, DisplayMode, Log } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './NottsDevWorkshopWebPart.module.scss';
import * as strings from 'NottsDevWorkshopWebPartStrings';

export interface INottsDevWorkshopWebPartProps {
  description: string;
  favColour: string;
}

export default class NottsDevWorkshopWebPartWebPart extends BaseClientSideWebPart<INottsDevWorkshopWebPartProps> {

private _getEnvType(): string {
  var envType: string;

  switch (Environment.type) {
    case EnvironmentType.Local:
      envType = "Local";
      break;
    case EnvironmentType.SharePoint:
      envType = "Modern";
      break;
    case EnvironmentType.ClassicSharePoint:
      envType = "Classic";
      break;
    default:
      break;
  }

  return envType;
}

// Show Display Mode
private _getPageMode() : string{
  return this.displayMode === DisplayMode.Edit
    ? 'You are in <b>edit</b> mode! Edit.. Edit.. Edit..'
    : 'You are on <b>read</b> mode now..';
}


  public render(): void {
    Log.info('HelloWorld', 'Info message', this.context.serviceScope);
    Log.warn('HelloWorld', 'Warn message', this.context.serviceScope);
    Log.error('HelloWorld', new Error('Error message'), this.context.serviceScope);
    Log.verbose('HelloWorld', 'Verbose message', this.context.serviceScope);

    this.domElement.innerHTML = `
      <div class="${ styles.nottsDevWorkshop }">
      <font color="${escape(this.properties.favColour)}">My fav colour is: <b>${escape(this.properties.favColour)}</b></font>
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to <b>${this._getEnvType()}</b> SharePoint!</span>
              <p class="${ styles.subTitle }">${this._getPageMode()}</p>
              <p class="${styles.description}">Page Title: <b>${this.context.pageContext.web.title}</b<</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('favColour', {
                  label: 'My fav colour is: ',
                  options: [
                    {key: 'black', text: 'black'},
                    {key: 'white', text: 'white'},
                    {key: 'yellow', text: 'yellow'},
                    {key: 'red', text: 'red'},
                    {key: 'deeppink', text:'deeppink'},
                    {key: 'pink', text: 'pink'}
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
