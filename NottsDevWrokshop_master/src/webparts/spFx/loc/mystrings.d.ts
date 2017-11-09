declare interface ISpFxWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'SpFxWebPartStrings' {
  const strings: ISpFxWebPartStrings;
  export = strings;
}
